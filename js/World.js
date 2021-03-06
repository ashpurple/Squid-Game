import { Player} from './player.js';
import { Doll } from './doll.js'
import { createCamera as setCamera } from './camera.js';
import { createLights } from './lights.js';
import { createScene } from './scene.js';

import { createControls } from './controls.js';
import { createRenderer } from './renderer.js';
import { Resizer } from './Resizer.js';
import { Loop } from './Loop.js';

class World {
  constructor(container) {
    this.bgMusic = new Audio('../resource/music/bg.mp3')
    this.bgMusic.loop = true
    this.winMusic = new Audio('../resource/music/win.mp3')
    this.loseMusic = new Audio('../resource/music/gun_sound.mp3')
    this.loseMusic.volume = 0.2
    this.dollSound = new Audio('../resource/music/dollSound.mp3')
    this.scanSound = new Audio('../resource/music/scanSound.mp3')
    
    this.victory = false
    this.viewPoint = 0
    this.camera = setCamera();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);
    this.scene = createScene();
    this.controls = createControls(this.camera, this.renderer.domElement);

    this.gameStat = "Loading"

    const { ambientLight, mainLight } = createLights();

    this.loop.updatables.push(this.controls);
    this.scene.add(ambientLight, mainLight);

    this.resizer = new Resizer(container, this.camera, this.renderer);
  }

  async init(start_content, loading_content, main_content) {

    this.player = new Player()
    await this.player.loadPlayer()
    let playerObj = this.player.getObj()
    this.doll = new Doll()
    await this.doll.loadDoll()
    let dollObj = this.doll.getObj()

    // move the target to the center of the front bird
    console.log(playerObj.position)
    this.controls.target.copy(playerObj.position);


    this.scene.add(dollObj);
    this.scene.add(playerObj);

    loading_content.style.display = "none";
    start_content.style.display = "block";
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start(this);
  }

  stop() {
    this.loop.stop();
  }

}

export { World };
