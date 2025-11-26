import Phaser from "phaser";
import { DTC } from "../DTC";
import Background  from "../sprites/Background";
import Lines  from "../sprites/Lines";
import Stamp from "../sprites/Stamp";
import Ink from "../sprites/Ink";
import Sea from "../sprites/Sea";
import FrameForSea from "../sprites/FrameForSea";
import FrameForSky from "../sprites/FrameForSky";
import CutOut from "../sprites/CutOut";
import Clouds from "../sprites/Clouds";
import Boats from "../sprites/Boats";
import RockyIsland from "../sprites/RockyIsland";
import Lighthouse from "../sprites/Lighthouse";
import Sailboats from "../sprites/Sailboats";
import Bottles from "../sprites/Bottles";
import Buoy from "../sprites/Buoy";
import DistantIsland from "../sprites/DistantIsland";
import Birds from "../sprites/Birds";
import BirthdayMesage from "../sprites/BirthdayMesage";

export default class Sevilay extends Phaser.Scene {
  private dtc:DTC = new DTC();
  private background!:Background;
  private lines!:Lines;
  private stamp!:Stamp;
  private ink!:Ink;
  private birthdayMesage!:BirthdayMesage;
  private sea!:Sea;
  private frameForSea!:FrameForSea;
  private frameForSky!:FrameForSky;
  private cutOut!:CutOut;
  private clouds!:Clouds;
  private boats!:Boats;
  private birds!:Birds;
  private rockyIsland!:RockyIsland;
  private distantIsland!:DistantIsland;
  private lighthouse!:Lighthouse;
  private sailboats!:Sailboats;
  private bottles!:Bottles;
  private buoy!:Buoy;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('lines', 'assets/lines.png');
    this.load.image('stamp', 'assets/stamp.png');
    this.load.image('ink', 'assets/ink.png');
    this.load.image('birthday-message', 'assets/birthday-message.png');
    this.load.image('sea-up', 'assets/sea-up.png');
    this.load.image('rocky-island', 'assets/rocky-island.png');
    this.load.image('distant-island', 'assets/distant-island.png');
    this.load.image('lighthouse1', 'assets/lighthouse1.png');
    this.load.image('lighthouse2', 'assets/lighthouse2.png');
    this.load.image('lighthouse3', 'assets/lighthouse3.png');
    this.load.image('buoy', 'assets/buoy.png');
    this.load.image('sea-middle', 'assets/sea-middle.png');
    this.load.image('sea-bottom', 'assets/sea-bottom.png');
    this.load.image('frame-for-sea', 'assets/frame-for-sea.png');
    this.load.image('frame-for-sky', 'assets/frame-for-sky.png');
    this.load.image('cut-out', 'assets/cut-out.png');
    this.load.image('sailboat-01', 'assets/sailboat-01.png');
    this.load.image('bottle-01', 'assets/bottle-01.png');

    for(let i:number=1; i <= 121; i++) {
      let suffix:string = this.dtc.tripleDigit(i);
        this.load.image('cloud-' + suffix, '/assets/clouds/cloud-' + suffix  + '.png');
    }

    for(let i:number=1; i <= 7; i++) {
      let suffix:string = this.dtc.doubleDigit(i);
        this.load.image('boat-' + suffix, '/assets/boats/boat-' + suffix  + '.png');
    }

    this.load.atlas('bird-anim-01', '/assets/bird-anim-01.png', '/assets/bird-anim-01.json');

    this.load.audio('bird-screech', 'assets/sounds/bird-screech.mp3');
    this.load.audio('click', 'assets/sounds/click.mp3');
    this.load.audio('ocean-ambience', 'assets/sounds/ocean-ambience.mp3');
  }

  create() {
    this.background = new Background(this, 18, 15);
    this.cutOut = new CutOut(this, 40, 30);
    this.sea = new Sea(this, 0, 0);
    this.clouds = new Clouds(this);
    this.distantIsland = new DistantIsland(this, 210, 460);
    this.boats = new Boats(this);
    this.rockyIsland = new RockyIsland(this, 820, 474);
    this.lighthouse = new Lighthouse(this, 100, 490);
    this.buoy = new Buoy(this, 280, 485);
    this.sailboats = new Sailboats(this);
    this.birds = new Birds(this);
    this.bottles = new Bottles(this);

    const rect1 = this.add.rectangle(0, 0, 40, 720, 0xffffff);
    rect1.setOrigin(0, 0);

    const rect2 = this.add.rectangle(870, 0, 80, 720, 0xffffff);
    rect2.setOrigin(0, 0);

    this.frameForSea = new FrameForSea(this, 18, 458);
    this.frameForSky = new FrameForSky(this, 18, 13);
    this.lines = new Lines(this, 125, 60);
    this.stamp = new Stamp(this, 730, 145);
    this.ink = new Ink(this, 500, 50);
    this.birthdayMesage = new BirthdayMesage(this, 120, 85);


    //this.add.text(100, 100, "Hello Phaser! -> Sevilay ", { fontSize: "32px", color: "#fff" });

    this.sound.play('ocean-ambience', { loop: true, volume: 0.05 });

    // Handle INITIAL orientation
    const orientation:Phaser.Scale.Orientation = this.scale.orientation;

    if (orientation.toString() === Phaser.Scale.PORTRAIT) {
      console.log("INITIAL: Portrait");
      console.log('Please rotate your device to landscape');
      // show rotate overlay
    } else {
      console.log("INITIAL: Landscape");
      // hide rotate overlay
    }

    this.scale.on('orientationchange', (orientation: string) => {
      if (orientation === Phaser.Scale.PORTRAIT) {
        console.log('Portrait mode');
        console.log('Please rotate your device to landscape');
        // You can also show a warning graphic or overlay
      } else {
        console.log('Landscape mode');
      }
    });
  }

  update() {
    // game loop
    this.clouds.update();
    
  }
}
