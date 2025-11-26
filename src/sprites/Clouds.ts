import * as Phaser from 'phaser'; // Use * as Phaser for consistency
import { DTC } from "../DTC"; // Assuming DTC is in your parent directory

export default class Clouds extends Phaser.GameObjects.Container {
    private numCloudTypes: number = 121;
    private dtc: DTC = new DTC();
    private readonly numInitialClouds:number = 6;
    private readonly maxNumClouds:number = 9;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0); // Use a position that makes sense, e.g., top left of the scene
        this.setScale(1);
        scene.add.existing(this);   // Add container to scene

        for(let i:number = 0; i < this.numInitialClouds; i++) {
            this.addCloud(true);
        }

        scene.time.addEvent({
            delay: 15000, 
            callback: this.addCloud,
            callbackScope: this,
            loop: true
        });
    }

    private addCloud(isInitial:boolean): void {
        var cloudNo: number = Math.ceil(Math.random() * this.numCloudTypes);
        var strCloudName: string = 'cloud-' + this.dtc.tripleDigit(cloudNo);
        const startY = Phaser.Math.Between(50, 350); 
        const duration = Phaser.Math.Between(55000, 180000); 

        let startX = 1300;    // Start cloud far to the right, outside the visible area
        if(isInitial) {
            startX = Phaser.Math.Between(100, 1500); 
        }

        let cloud: Phaser.GameObjects.Sprite = this.scene.add.sprite(startX, startY, strCloudName);
        const theScale = Phaser.Math.Between(1.5, 3.5);
        cloud.setScale(theScale);
        cloud.setOrigin(0.5, 0.5);
        this.add(cloud);

        // Start the movement tween
        this.scene.tweens.add({
            targets: cloud,
            x: -200,            // Move completely off-screen left
            duration: duration,
            ease: 'Linear',
            onComplete: (tween, targets) => {
                // 'targets' will be an array containing the cloud sprite
                const completedCloud = targets[0] as Phaser.GameObjects.Sprite;

                // 1. Destroy the sprite object. This removes it from the scene and cleans up resources.
                // NOTE: When a Game Object is destroyed, it is also automatically removed from any Container it belongs to.
                completedCloud.destroy(); 
                
                if(this.list.length < this.maxNumClouds) {
                    this.addCloud(false);
                }
            }
        });
    }
}