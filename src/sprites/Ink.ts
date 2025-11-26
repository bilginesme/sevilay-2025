import Phaser from "phaser";

export default class Ink extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "ink");

    scene.add.existing(this);

    this.setScale(1);
    this.setOrigin(0, 0);
    this.alpha = 0.0;
  
    this.fadeIn(scene);
  }

  private fadeIn(scene: Phaser.Scene): void {
      scene.tweens.add({
      targets: this,      // "this" refers to the sprite itself
      alpha: 0.8,           // final alpha
      duration: 4000,     // 1 second
      ease: 'Linear',
      repeat: 0,
      yoyo: false
    });
  }
}