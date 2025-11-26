import Phaser from "phaser";

export default class FrameForSea extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "frame-for-sea");

    scene.add.existing(this);

    this.setScale(1);
    this.setOrigin(0, 0);
  }
}