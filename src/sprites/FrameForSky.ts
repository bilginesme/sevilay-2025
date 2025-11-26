import Phaser from "phaser";

export default class FrameForSky extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "frame-for-sky");

    scene.add.existing(this);

    this.setScale(1);
    this.setOrigin(0, 0);
  }
}