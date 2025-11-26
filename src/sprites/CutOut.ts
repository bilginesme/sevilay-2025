import Phaser from "phaser";

export default class CutOut extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "cut-out");

    scene.add.existing(this);

    this.setScale(1);
    this.setOrigin(0, 0);
    this.alpha = 1;
  }
}