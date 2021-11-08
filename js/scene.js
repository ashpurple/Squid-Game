import {Scene} from '../node_modules/three/src/scenes/Scene.js'
import {Color} from '../node_modules/three/src/math/Color.js'
import {createRoom} from './map.js'

const SkyColor = "#afe8f7"

function createScene() {
  const scene = new Scene();
  scene.background = new Color(SkyColor);

  createRoom(scene);

  return scene;
}

export { createScene };

