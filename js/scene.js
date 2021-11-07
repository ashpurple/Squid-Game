import {Scene} from '../node_modules/three/src/scenes/Scene.js'
import {Color} from '../node_modules/three/src/math/Color.js'

function createScene() {
  const scene = new Scene();

  scene.background = new Color('skyblue');

  return scene;
}

export { createScene };
