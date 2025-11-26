import * as Phaser from 'phaser'; // Use * as Phaser for consistency
import { DTC } from "../DTC"; // Assuming DTC is in your parent directory

export default class Bottles extends Phaser.GameObjects.Container {
    private dtc: DTC = new DTC();
    private bottle!: Phaser.GameObjects.Sprite;
    private isAnimating: boolean = false;
    private readonly defaultScale: number = 1.0;
    private readonly targetScale: number = 1.6;

    // A list of fun messages to show when clicked
    private messages: string[] = [
        "Pula dokunmuyoruz!", 
        "Love it!", 
        "Postage Paid", 
        "Swoosh!", 
        "On its way!"
    ];


    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0); // Use a position that makes sense, e.g., top left of the scene
        this.setScale(1);
        scene.add.existing(this);   // Add container to scene

        this.createBottle(true);
    }

    private createBottle(isInitial:boolean): void {
        var strBottleName: string = 'bottle-01';
        const startY = Phaser.Math.Between(600, 640); 
        const duration = Phaser.Math.Between(70000, 90000); 

        let startX = 900;    // Start far to the right, outside the visible area
        if(isInitial) {
            startX = Phaser.Math.Between(600, 900); 
        }

        this.bottle = this.scene.add.sprite(startX, startY, strBottleName);
        this.bottle.setScale(1);
        this.bottle.setOrigin(0.5, 1.0);
        this.add(this.bottle);
        
        this.bottle.setInteractive();
        this.bottle.on('pointerdown', this.handleClick, this);

        // Start the movement tween
        this.scene.tweens.add({
            targets: this.bottle,
            x: -200,            // Move completely off-screen left
            duration: duration,
            ease: 'Linear',
            onComplete: (tween, targets) => {
                // 'targets' will be an array containing the cloud sprite
                const completedBottle = targets[0] as Phaser.GameObjects.Sprite;

                // 1. Destroy the sprite object. This removes it from the scene and cleans up resources.
                // NOTE: When a Game Object is destroyed, it is also automatically removed from any Container it belongs to.
                completedBottle.destroy(); 
                this.createBottle(false);
            }
        });

        this.startSwaying();
        this.startBobbing();
    }

       private handleClick(): void {
        if (!this.isAnimating) {
            this.scene.sound.play('click');
            this.animateClick();
            this.showPopupText(); // Trigger the text effect
        }
    }

    private animateClick(): void {
        this.isAnimating = true;

        // Tween 1: Enlarge (Scale Up)
        const scaleUpTween = this.scene.tweens.add({
            targets: this.bottle,
            scale: this.targetScale, // Scale up to 1.2
            duration: 150, // Quick enlargement
            ease: 'Power1',
            onComplete: () => {

            // Tween 2: Shrink (Scale Down)
            // This tween will start immediately after the scaleUpTween completes.
            const scaleDownTween = this.scene.tweens.add({
                targets: this.bottle,
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

    private startSwaying(): void {
        this.scene.tweens.add({
            targets: this.bottle,
            angle: { from: -3, to: 3 }, // Rock 10 degrees left and right
            duration: Phaser.Math.Between(2000, 4000),               // 3 seconds for one sway
            ease: 'Sine.easeInOut',       // Smooth wave-like motion
            yoyo: true,                   // Go back and forth
            repeat: -1,                   // Infinite loop
            delay: 0   // Random start delay so it looks natural
        });
    }

     private startBobbing(): void {
        // Move slightly up and down to simulate waves
        // We use 'yoyo' to go up then back down, and 'repeat -1' for infinity
        this.scene.tweens.add({
            targets: this.bottle,
            y: '-=18',              // Move UP 10 pixels relative to current position
            duration: 2000,         // 2 seconds up, 2 seconds down
            ease: 'Sine.easeInOut', // Smooth sine wave for natural water motion
            yoyo: true,             // Reverse the animation (go back down)
            repeat: -1              // Loop forever
        });
    }
    
    private showPopupText(): void {
        // 1. Pick a random message
        const message = Phaser.Utils.Array.GetRandom(this.messages);

        // 2. Calculate position (Center of the stamp)
        // Since origin is (0,0), center X is x + width/2
        const popupX = this.bottle.x;
        const popupY = this.bottle.y + (this.bottle.height * this.bottle.scaleY) / 2;

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