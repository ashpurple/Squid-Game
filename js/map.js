import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from '../node_modules/three/build/three.module.js';

const FloorColor = '#DED2A0'
const FinishLineColor = "#FA3FE6"

function createRoom(scene){
    const roomWidth = 20;
    const roomHeight = 30;
    const roomDepth = 9;
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

    loader = new THREE.TextureLoader();

    // side (left, right)
    geometry = new THREE.PlaneGeometry( roomHeight, roomDepth );
    material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: loader.load('./resource/img/cloud.jpg')} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(roomWidth / 2, roomDepth/2 - 1, -3)
    plane.rotation.y = Math.PI / 2;
    scene.add( plane );

    plane = new THREE.Mesh( geometry, material );
    plane.position.set(-roomWidth / 2, roomDepth/2 - 1, -3)
    plane.rotation.y = Math.PI / 2;
    scene.add( plane );

    // side (front, back)
    geometry = new THREE.PlaneGeometry( roomWidth, roomDepth );
    material = new THREE.MeshBasicMaterial( {color:'#FFFFFF' ,side: THREE.DoubleSide, map: loader.load('./resource/img/front_background.jpeg')} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, roomDepth/2 - 1,  -roomHeight/2 - 3);
    scene.add( plane );

    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, roomDepth/2 - 1, roomHeight/2 - 3)
    scene.add( plane );


    // Finish line 
    geometry = new THREE.PlaneGeometry( roomWidth, 0.5 );
    material = new THREE.MeshBasicMaterial( {color: FinishLineColor, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, -0.999, -roomHeight/2 - 3 + 7);
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );

    // Tree
    loader = new GLTFLoader();
	loader.load('../resource/model/tree_scene.gltf', function(gltf){
        const tree_model = gltf.scene.children[0];
	    tree_model.scale.set(0.02, 0.02, 0.02);
        tree_model.position.set(0, -2, -roomHeight / 2 )
	    scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});

     // Soldiers
    loader.load('../resource/model/soldier_scene.gltf', function(gltf){
         const leftSolier_model = gltf.scene.children[0];
         leftSolier_model.scale.set(0.03, 0.03, 0.03);
         leftSolier_model.position.set(-4, -1, -roomHeight / 2 )
         scene.add(gltf.scene);
     }, undefined, function (error) {
         console.error(error);
     });

    loader.load('../resource/model/soldier_scene.gltf', function(gltf){
        const rightSolier_model = gltf.scene.children[0];
        rightSolier_model.scale.set(0.03, 0.03, 0.03);
        rightSolier_model.position.set(4, -1, -roomHeight / 2 )
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}

export {createRoom}