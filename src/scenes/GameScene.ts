import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // load assets

  }

  create() {
    this.add.text(100, 100, "Hello Phaser!", { fontSize: "32px", color: "#fff" });
  }

  update() {
    // game loop
  }
}
