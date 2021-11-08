import { PerspectiveCamera } from '../node_modules/three/src/cameras/PerspectiveCamera.js';


function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.set(0, 3, 8);
  // camera.
  // camera.position.z = 5;
  // camera.rotation.y = 0;

  return camera;
}

export { createCamera };