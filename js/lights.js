import * as THREE from '../node_modules/three/build/three.module.js';

function createLights() {
  const ambientLight = new THREE.AmbientLight( 0xffffff )

  const mainLight = new THREE.DirectionalLight( 0xffffff, 3 )
  mainLight.castShadow = true

  mainLight.position.set( 0, 5, 2 )

  return { ambientLight, mainLight }
}

export { createLights };
