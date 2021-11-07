import { PerspectiveCamera } from '../node_modules/three/src/cameras/PerspectiveCamera.js';
// import * as THREE from 'three'
// import * as THREE from '../node_modules/three/build/three.js';


function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  //camera.position.set(-1.5, 1.5, 6.5);
  camera.position.z = 5;
  camera.rotation.y = 10;

  return camera;
}

export { createCamera };