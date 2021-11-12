import { PerspectiveCamera } from '../node_modules/three/src/cameras/PerspectiveCamera.js';


function setCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.set(0.6, 4, 10);

  return camera;
}

export { setCamera as createCamera };