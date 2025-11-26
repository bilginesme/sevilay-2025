import Phaser from "phaser";

export default class Lines extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "lines");

    scene.add.existing(this);

    this.setScale(1);
    this.setOrigin(0, 0);
    this.alpha = 0.3;
  
  }
}