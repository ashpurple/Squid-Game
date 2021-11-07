import { Clock } from '../node_modules/three/src/core/Clock.js';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.gameStat = ""
  }

  start(world) {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();
      this.animate(world)
      world.controls.update()

      // render a frame
      world.render(this.scene, this.camera);

      if(world.gameStat == "ended") {
        this.stop()
      }
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }

  animate(world){
    world.player.update(world)
    //this.camera.position.x -= world.player.playerInfo.velocity // 1인칭 (없애면 전체시점)
    // players.map(player => player.player.update()) 
  }

}

export { Loop };