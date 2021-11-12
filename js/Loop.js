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
      this.tick();
      this.animate(world)

      if(world.viewPoint == 2){ // 1인칭 move
        var x = world.player.playerInfo.positionX
        var z = world.player.playerInfo.positionZ
        world.controls.target.set(0, 1 , -100);
        this.camera.position.set(x, 1, z + 1.3);
      }
  
      world.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    this.delta = clock.getDelta();

    for (const object of this.updatables) {
      object.tick(this.delta);
    }
  }

  animate(world){
    world.player.update(world)
  }

  updateCamera(world){
    if(world.viewPoint == 0){ // 기본
      world.controls.target.set(1, -1, 0)
      this.camera.position.set(0.6, 4, 10);
    }
    else if(world.viewPoint == 1){ // 영희
      world.controls.target.set(1, -1, 0)
      this.camera.position.set(0.6, 3, -14);
    }
    else if(world.viewPoint == 3){ // 1인칭
      world.controls.target.set(0, 1 , -100);
    }
    
  }
}

export { Loop };