import { World } from './js/World.js';
import * as THREE from '../node_modules/three/build/three.module.js';
import { Loop } from './js/Loop.js';


let doll
const TIME_LIMIT = 30
const text = document.querySelector('.text')
const text_time = document.querySelector('.time')
let DEAD_PLAYERS = 0
let SAFE_PLAYERS = 0

const oBtn = document.querySelector('.oBtn');
const xBtn = document.querySelector('.xBtn');
const loading_content = document.querySelector('.loading-content');
const start_content = document.querySelector('.start-content');

const container = document.querySelector('#scene-container');
const world = new World(container);
var viewPoint = 0

async function main() {
  // Get a reference to the container element
  // complete async tasks
  await world.init(start_content, loading_content);
  // start the animation loop
  world.start();

  const TIME_LIMIT = 15
  
  oBtn.addEventListener('click', () => {
      init()
      document.querySelector('.modal').style.display = "none"
      startDall()
  })

  window.addEventListener( "keydown", function(e){
    if(world.gameStat != "started") return
    const key = document.getElementById(e.key);
    if(key){ // key press effect
      key.classList.add("pressed")
    }
    if(e.key == "w"){
      world.player.w_run()
    }
    if(e.key == "s"){
      world.player.s_run()
    }
    if(e.key == "a"){
      world.player.a_run()
    }
    if(e.key == "d"){
      world.player.d_run()
    }
    if(e.key == "p"){
      viewPoint++
      world.viewPoint = viewPoint % 3
      world.loop.updateCamera(world)
    }

  })
  window.addEventListener( "keyup", function(e){
    const key = document.getElementById(e.key);
    if(key){ // key press effect
      key.classList.remove("pressed")
    }
    if(e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d"){
      world.player.stop()
    }
   
  })

  window.addEventListener( 'resize', onWindowResize, false )
  function onWindowResize(){
      world.camera.aspect = window.innerWidth / window.innerHeight
      world.camera.updateProjectionMatrix()
      world.renderer.setSize( window.innerWidth, window.innerHeight )
  }
}

async function startDall(){
  if(world.gameStat != "ended"){
    
    world.doll.lookBackward()

    var backWardTime = (Math.random() * 3000 ) + 500
    console.log("back: "+backWardTime)
    world.dollSound.playbackRate = 4500 / backWardTime
    world.dollSound.play()
    await delay(backWardTime)
    world.dollSound.pause()
    world.dollSound.currentTime = 0

    var forwardTime = (Math.random() * 1500) + 1000
    console.log("forward: "+forwardTime)
    world.doll.lookForward()
    world.scanSound.playbackRate = 3300 / forwardTime
    world.scanSound.play()
    await delay(forwardTime)
    world.scanSound.pause()
    world.scanSound.currentTime = 0

    startDall()
  }
}

// function createCube(size, posX, rotY = 0, color = 0xfbc851){
//   const geometry = new THREE.BoxGeometry( size.w, size.h, size.d )
//   const material = new THREE.MeshBasicMaterial( { color } )
//   const cube = new THREE.Mesh( geometry, material )
//   cube.position.set(posX, 0, 0)
//   cube.rotation.y = rotY
//   world.scene.add( cube )
//   return cube
// }

async function timer(time){
  var startTimer
  var sec
  var milli
  startTimer = setInterval(function(){
    time-=10
    sec = Math.floor(time/1000)
    milli = (time%1000)/10
    var ts = sec
    var tm = milli
    if(ts < 10){
      ts = "0"+sec
    }
    if(world.gameStat != "ended"){
      text_time.innerText = ts + ":" + tm
      document.getElementById('output').innerHTML = text_time.innerText;
    }
  }, 10)
}

function start(){
  world.gameStat = "started"
  //const progressBar = createCube({w: 8, h: .1, d: 1}, 0, 0, 0xebaa12)
  //progressBar.position.y = 3.35
  //gsap.to(progressBar.scale, {duration: TIME_LIMIT, x: 0, ease: "none"})
  timer(TIME_LIMIT * 1000)
  setTimeout(() => {
      if(world.gameStat != "ended"){
          text.innerText = "Time Out"
          world.loseMusic.play()
          world.gameStat = "ended"
          text_time.innerText = "00:00"
          document.getElementById('output').innerHTML = text_time.innerText;
      }
  }, TIME_LIMIT * 1000)
  // startDall()
}

async function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function init(){
  await delay(500)
  text.innerText = "3"
  await delay(500)
  text.innerText = "2"
  await delay(500)
  text.innerText = "1"
  // lookBackward()
  await delay(500)
  text.innerText = "Start"
  //world.bgMusic.volume = 0.3
  //world.bgMusic.play() // 브금 시끄러워서 끔
  start()
}

function show () {
  document.querySelector(".background").className = "background show";
}

function close () {
  document.querySelector(".background").className = "background";
}

document.querySelector("#close").addEventListener("click", close);

main().catch((err) => {
  console.error(err);
});
