import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import Sevilay from "./scenes/Sevilay";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 861,
  height: 674,
  transparent: false,
  backgroundColor: "#FFFFFF",
  parent: "game",
    scale: { 
          mode: Phaser.Scale.FIT, // This maintains aspect ratio (letterboxing if needed) 
          autoCenter: Phaser.Scale.CENTER_BOTH, // Define a reference size for your game world 
          width: 890,     
          height: 720,     
        }, 
  scene: [Sevilay],

};

new Phaser.Game(config);

