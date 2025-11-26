import Phaser from "phaser";

export default class Background extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "background");

    // Add sprite to the scene
    scene.add.existing(this);

    // Optional: scale, physics, etc.
    this.setScale(1);
    this.setOrigin(0, 0);
  
  }
}