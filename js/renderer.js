import { WebGLRenderer } from '../node_modules/three/src/renderers/WebGLRenderer.js';

function createRenderer() {
  const renderer = new WebGLRenderer()
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setClearColor( 0xB7C3F3, 1 )

  renderer.physicallyCorrectLights = true

  return renderer
}

export { createRenderer };
