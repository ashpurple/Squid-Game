import {Scene} from '../node_modules/three/src/scenes/Scene.js'
import {Color} from '../node_modules/three/src/math/Color.js'
import {createRoom} from './map.js'

function createScene() {
  const scene = new Scene();
  scene.background = new Color('skyblue');

  createRoom(scene);

  return scene;
}

export { createScene };

