import { PerspectiveCamera } from '../node_modules/three/src/cameras/PerspectiveCamera.js';


function setCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.set(0.6, 4, 6);
  // console.log("camera: " + viewPoint)
  // if(viewPoint == 0){
  //   camera.position.set(0.6, 4, 6);
    
  // }
  // else if(viewPoint == 1){
  //   camera.position.set(10, 10, 6);
  // }
  // else{
  //   camera.position.set(0, 0, 0);
  // }

  // camera.
  // camera.position.z = 5;
  // camera.rotation.y = 10;

  return camera;
}

export { setCamera as createCamera };