import * as Phaser from 'phaser'; // Use * as Phaser for consistency
import { DTC } from "../DTC"; // Assuming DTC is in your parent directory

export default class Birds extends Phaser.GameObjects.Container {
    private numBirdTypes: number = 1;
    private dtc: DTC = new DTC();
    private readonly numInitialBirds:number = 1;
    private readonly maxNumBirds:number = 1;
    private readonly defaultScale: number = 0.5;
    private readonly targetScale: number = 1.0;
    private isAnimating: boolean = false;

    // A list of fun messages to show when clicked
    private messages: string[] = [
        "Kuşu rahat\nbırakalım!", 
    ];

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0); // Use a position that makes sense, e.g., top left of the scene
        this.setScale(1);
        scene.add.existing(this);   // Add container to scene

        for(let i:number = 0; i < this.numInitialBirds; i++) {
            this.addBird(true);
        }
    }

    private addBird(isInitial:boolean): void {
        var birdNo: number = Math.ceil(Math.random() * this.numBirdTypes);
        var strBirdName: string = 'bird-anim-' + this.dtc.doubleDigit(birdNo);
        const startY = Phaser.Math.Between(400, 480); 
        const duration = Phaser.Math.Between(12000, 12000); 

        let startX = 1300;    
        if(isInitial) {
            startX = Phaser.Math.Between(700, 900); 
        }

        let bird: Phaser.GameObjects.Sprite = this.scene.add.sprite(startX, startY, strBirdName);
        bird.setScale(1);
        bird.setOrigin(0.5, 0.5);
        bird.setScale(0.5);
          
        if (!this.scene.anims.exists('fly')) {
            this.scene.anims.create({
                key: 'fly',
                // Helper to generate frame names from the Atlas JSON
                frames: this.scene.anims.generateFrameNames(strBirdName, {
                    // INFO: Open your JSON file to check these values!
                    // If frames are named "bird-01.png", "bird-02.png"...
                    prefix: '',  // The string before the number
                    start: 1,         // Start frame number
                    end: 12,           // End frame number (change based on your sheet)
                    zeroPad: 2,       // e.g. '01' needs 2, '1' needs 0
                    suffix: '.png'    // If the JSON names include extensions
                }),
                frameRate: 6,
                repeat: -1 // Loop forever
            });
        }
            
        bird.play('fly');
        bird.setInteractive();
        bird.on('pointerdown', this.handleClick, this);

        this.add(bird);

        // Start the movement tween
        this.scene.tweens.add({
            targets: bird,
            x: -200,            // Move completely off-screen left
            duration: duration,
            ease: 'Linear',
            onComplete: (tween, targets) => {
                // 'targets' will be an array containing the cloud sprite
                const completedBird = targets[0] as Phaser.GameObjects.Sprite;

                // 1. Destroy the sprite object. This removes it from the scene and cleans up resources.
                // NOTE: When a Game Object is destroyed, it is also automatically removed from any Container it belongs to.
                completedBird.destroy(); 
                
                if(this.list.length < this.maxNumBirds) {
                    setTimeout(() => { this.addBird(false); }, 10000);
                }
            }
        });
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
        this.scene.sound.play('bird-screech');

        // Tween 1: Enlarge (Scale Up)
        const scaleUpTween = this.scene.tweens.add({
            targets: this.list[0],
            scaleX: this.targetScale, // Scale up to 1.2
            duration: 150, // Quick enlargement
            ease: 'Power1',
            onComplete: () => {

            // Tween 2: Shrink (Scale Down)
            // This tween will start immediately after the scaleUpTween completes.
            
            const scaleDownTween = this.scene.tweens.add({
                targets: this.list[0],
                scaleX: this.defaultScale, // Scale down to 1.0 (original size)
                duration: 600, // Slightly slower retreat for a 'pop' feel
                ease: 'Bounce.Out', // Add a little bounce effect on return
                onComplete: () => {
                    // Reset the animation flag when the entire sequence is done
                    this.isAnimating = false;
                    this.freakOut();
                }
            });
            }
        });
    }

    private freakOut(): void {
        console.log('Freak out');
        this.scene.tweens.add({
            targets: this.list[0],
            x: -200,            // Move completely off-screen left
            duration: 500,
            ease: 'Linear',
            onComplete: (tween, targets) => {
                const completedBird = targets[0] as Phaser.GameObjects.Sprite;
                completedBird.destroy(); 
                
                if(this.list.length < this.maxNumBirds) {

                    setTimeout(() => { this.addBird(false); }, 5000);
                    
                }
            }
        });
    }

    private showPopupText(): void {
        const bird = this.list[0] as Phaser.GameObjects.Sprite;

            // 1. Pick a random message
            const message = Phaser.Utils.Array.GetRandom(this.messages);
    
            // 2. Calculate position (Center of the stamp)
            // Since origin is (0,0), center X is x + width/2
            const popupX = bird.x;
            const popupY = bird.y + (bird.height * bird.scaleY) / 2;
    
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