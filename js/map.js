import * as THREE from '../node_modules/three/build/three.module.js';

const FloorColor = '#DED2A0'
const FinishLineColor = "#FA3FE6"

function createRoom(scene){
    const roomWidth = 10;
    const roomHeight = 18;
    const roomDepth = 4;
    let geometry
    let material
    let plane
    let loader
    // floor
    geometry = new THREE.PlaneGeometry( roomWidth, roomHeight );
    material = new THREE.MeshBasicMaterial( {color: FloorColor, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, -1, -3)
    plane.rotation.x = Math.PI / 2;
    plane.color
    scene.add( plane );

    // side (left, right)
    geometry = new THREE.PlaneGeometry( roomHeight, roomDepth );
    material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(roomWidth / 2, roomDepth/2 - 1, -3)
    plane.rotation.y = Math.PI / 2;
    scene.add( plane );

    plane = new THREE.Mesh( geometry, material );
    plane.position.set(-roomWidth / 2, roomDepth/2 - 1, -3)
    plane.rotation.y = Math.PI / 2;
    scene.add( plane );
    
    // Side wall 텍스쳐 작업
    loader = new THREE.TextureLoader();
    material = new THREE.MeshBasicMaterial({
         color: 0xFF8844,
         map: loader.load('./img/cloud.jpg'),
     });    

    // side (front, back)
    geometry = new THREE.PlaneGeometry( roomWidth, roomDepth );
    material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, roomDepth/2 - 1, -12)
    scene.add( plane );

    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, roomDepth/2 - 1, 6)
    scene.add( plane );


    // Finish line 
    geometry = new THREE.PlaneGeometry( roomWidth, 0.5 );
    material = new THREE.MeshBasicMaterial( {color: FinishLineColor, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, -0.999, -9);
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );
}

export {createRoom}