import Phaser from "phaser";

export default class Sea extends Phaser.GameObjects.Container {
   private SeaUp!:Phaser.GameObjects.Sprite;
   private SeaMiddle!:Phaser.GameObjects.Sprite;
   private SeaBottom!:Phaser.GameObjects.Sprite;   
   
   constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y);

      this.setScale(1);
      scene.add.existing(this);  // Add container to scene

      // Example: add child sprites inside container
      this.SeaBottom = scene.add.sprite(32, 580, "sea-bottom");   // offset to the right
      this.SeaMiddle = scene.add.sprite(32, 460, "sea-middle");   // offset to the right
      this.SeaUp = scene.add.sprite(32, 460, "sea-up"); // centered in container

      this.SeaUp.setScale(1);
      this.SeaMiddle.setScale(1);
      this.SeaBottom.setScale(1);

      this.SeaUp.setOrigin(0, 0);
      this.SeaMiddle.setOrigin(0, 0);
      this.SeaBottom.setOrigin(0, 0);

      scene.tweens.add({
         targets: this.SeaMiddle,
         scaleY: () => Phaser.Math.FloatBetween(1.3, 1.7),   
         duration: Phaser.Math.Between(2500, 3500),
         delay: () => Phaser.Math.Between(100, 900),
         yoyo: true,
         repeat: -1,
         ease: 'Sine.easeInOut'
      });
 
  }
}
