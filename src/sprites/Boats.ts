import * as Phaser from 'phaser'; // Use * as Phaser for consistency
import { DTC } from "../DTC"; // Assuming DTC is in your parent directory

export default class Boats extends Phaser.GameObjects.Container {
    private numBoatTypes: number = 7;
    private dtc: DTC = new DTC();
    private readonly numInitialBoats:number = 1;
    private readonly maxNumBoats:number = 1;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0); // Use a position that makes sense, e.g., top left of the scene
        this.setScale(1);
        scene.add.existing(this);   // Add container to scene

        setTimeout(() => { this.addBoat(true); }, 5000);
    }

    private addBoat(isInitial:boolean): void {
        var boatNo: number = Math.ceil(Math.random() * this.numBoatTypes);
        var strBoatName: string = 'boat-' + this.dtc.doubleDigit(boatNo);
        const startY = Phaser.Math.Between(462, 468); 
        const duration = Phaser.Math.Between(55000, 180000); 

        let startX = 1300;    
        if(isInitial) {
            startX = Phaser.Math.Between(700, 900); 
        }

        let boat: Phaser.GameObjects.Sprite = this.scene.add.sprite(startX, startY, strBoatName);
        boat.setScale(1);
        boat.setOrigin(0.5, 1.0);
        this.add(boat);

        // Start the movement tween
        this.scene.tweens.add({
            targets: boat,
            x: -200,            // Move completely off-screen left
            duration: duration,
            ease: 'Linear',
            onComplete: (tween, targets) => {
                // 'targets' will be an array containing the cloud sprite
                const completedBoat = targets[0] as Phaser.GameObjects.Sprite;

                // 1. Destroy the sprite object. This removes it from the scene and cleans up resources.
                // NOTE: When a Game Object is destroyed, it is also automatically removed from any Container it belongs to.
                completedBoat.destroy(); 
                
                if(this.list.length < this.maxNumBoats) {
                    this.addBoat(false);
                }
            }
        });
    }
}