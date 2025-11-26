import * as Phaser from "phaser";

export default class Buoy extends Phaser.GameObjects.Sprite {
    private readonly defaultScale: number = 1.0;
    private readonly targetScale: number = 2.0;
    private isAnimating: boolean = false;

    // A list of fun messages to show when clicked
    private messages: string[] = [
        "Pula dokunmuyoruz!", 
        "Love it!", 
        "Postage Paid", 
        "Swoosh!", 
        "On its way!"
    ];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "buoy");

        scene.add.existing(this);

        this.setScale(this.defaultScale);
        this.setOrigin(0.5, 1.0);
        this.alpha = 1.0;

        this.setInteractive();
        this.on('pointerdown', this.handleClick, this);

        this.startSwaying();
    }

    private handleClick(): void {
        if (!this.isAnimating) {
            this.scene.sound.play('click');
            this.animateClick();
            this.showPopupText(); // Trigger the text effect
        }
    }

    private startSwaying(): void {
        this.scene.tweens.add({
            targets: this,
            angle: { from: -10, to: 10 }, // Rock 10 degrees left and right
            duration: Phaser.Math.Between(2000, 4000),               // 3 seconds for one sway
            ease: 'Sine.easeInOut',       // Smooth wave-like motion
            yoyo: true,                   // Go back and forth
            repeat: -1,                   // Infinite loop
            delay: 0   // Random start delay so it looks natural
        });
    }

    private animateClick(): void {
        this.isAnimating = true;

        // Tween 1: Enlarge (Scale Up)
        const scaleUpTween = this.scene.tweens.add({
            targets: this,
            scale: this.targetScale, // Scale up to 1.2
            duration: 150, // Quick enlargement
            ease: 'Power1',
            onComplete: () => {

            // Tween 2: Shrink (Scale Down)
            // This tween will start immediately after the scaleUpTween completes.
            const scaleDownTween = this.scene.tweens.add({
                targets: this,
                scale: this.defaultScale, // Scale down to 1.0 (original size)
                duration: 800, // Slightly slower retreat for a 'pop' feel
                ease: 'Bounce.Out', // Add a little bounce effect on return
                onComplete: () => {
                    // Reset the animation flag when the entire sequence is done
                    this.isAnimating = false;
                }
            });
            }
        });
    }

    private showPopupText(): void {
        // 1. Pick a random message
        const message = Phaser.Utils.Array.GetRandom(this.messages);

        // 2. Calculate position (Center of the stamp)
        // Since origin is (0,0), center X is x + width/2
        const popupX = this.x;
        const popupY = this.y + (this.height * this.scaleY) / 2;

        // 3. Create the Text Object
        const popupText = this.scene.add.text(popupX, popupY, message, {
            fontFamily: '"Arial", serif',
            fontSize: '24px',
            color: '#004d40',
            stroke: '#ffffff',
            strokeThickness: 3,
            fontStyle: 'bold'
        });

        // Center the text so it scales/rotates from its center
        popupText.setOrigin(0.5, 0.5);
        popupText.setDepth(100); // Ensure it appears on top of everything

        // 4. Animate: Float Up + Fade Out
        this.scene.tweens.add({
            targets: popupText,
            y: popupY - 50,   // Float up by 50 pixels
            alpha: 0,         // Fade to invisible
            scale: 1.5,       // Grow slightly
            duration: 4000,   // 2 seconds total
            ease: 'Power2',
            onComplete: () => {
                // 5. Cleanup: Destroy the text object when done
                popupText.destroy();
            }
        });
    }
}