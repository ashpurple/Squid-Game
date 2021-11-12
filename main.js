import { World } from './js/World.js';

const TIME_LIMIT = 30
const text = document.querySelector('.text')
const text_time = document.querySelector('.time')

const oBtn = document.querySelector('.oBtn');
const xBtn = document.querySelector('.xBtn');
const fileLoadBtn = document.getElementById('fileLoad_btn')
const fileSaveBtn = document.getElementById('fileSave_btn')
const loading_content = document.querySelector('.loading-content');
const start_content = document.querySelector('.start-content');
const scoreboard_popup= document.querySelector('.popup_container');
const retry_popup= document.querySelector('.popup_container1');

const container = document.querySelector('#scene-container');
const world = new World(container);
var viewPoint = 0
let textFile =""

async function main() {
  // Get a reference to the container element
  // complete async tasks
  await world.init(start_content, loading_content);
  // start the animation loop
  world.start();
  
  oBtn.addEventListener('click', () => {
    world.bgMusic.pause()
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
    // if(e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d"){
    //   console.log("w stop")
    //   world.player.stop()
    // }
    if(e.key == "w" ){
      world.player.w_stop()
    }
    if(e.key == "s"){
      world.player.s_stop()
    }
    if(e.key == "a"){
      world.player.a_stop()
    }
    if( e.key == "d"){
      world.player.d_stop()
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

    var backWardTime = (Math.random() * 3000 ) + 500//+ 500
    world.dollSound.playbackRate = 4500 / backWardTime
    world.dollSound.play()
    await delay(backWardTime)
    world.dollSound.pause()
    world.dollSound.currentTime = 0

    var forwardTime = (Math.random() * 1500) + 1000
    world.doll.lookForward()
    world.scanSound.playbackRate = 3300 / forwardTime
    world.scanSound.play()
    await delay(forwardTime)
    world.scanSound.pause()
    world.scanSound.currentTime = 0

    startDall()
  }
}

var flag = true
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
    }
    if(world.gameStat == "ended" && flag && world.victory){
      flag = false
      scoreboard_popup.style.display = "block";
      scoreBoard()
    }
    if(world.gameStat == "ended" && flag && !world.victory){
      flag = false
      // failure
      retry_popup.style.display="block";
    }
  }, 10)
}

function scoreBoard(){
  let newRecord = text_time.innerText;
  document.getElementById('output').innerHTML = newRecord;
  fileLoadBtn.addEventListener('click', () => {
    openTextFile(newRecord)
  })
}
function openTextFile(newRecord){
  var input = document.createElement("input")
  input.type = "file"
  input.accept = "text/plain, text/html, .jsp"
  input.click()
  input.onchange = function(event){
    processFile(event.target.files[0], newRecord)
  }
}
function buildTable(data) {
  var table = document.getElementById('table_data');
  var sorted_data = data.sort(sortTime);
  for (var i=0; i < sorted_data.length; i++) { 
    var row = `<tr> 
      <td>${i+1}</td> 
      <td>${sorted_data[i]}</td> 
    </tr>` 
    table.innerHTML += row 
  } 
}

function sortTime(a, b){
  var sec1 = a.split(":")[0];
  var msec1 = a.split(":")[1];
  var sec2 = b.split(":")[0];
  var msec2 = b.split(":")[1];

  if (sec2 - sec1 == 0) {
    return msec2 - msec1;
  }
  return sec2 - sec1;
}

function processFile(file, newRecord){
  var reader = new FileReader()
  reader.readAsText(file, "UTF-8")
  reader.onload = function(){
    var time_string = newRecord + "\n" + reader.result
    var time_arr = time_string.split("\n");
    buildTable(time_arr);
    document.querySelector(".not_load_msg").style.display="none"
    document.querySelector(".recordTable").style.display="block"
    fileSaveBtn.addEventListener('click', () => {
      download("Score.txt", time_string)
    })
  }
}

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}


function start(){
  world.gameStat = "started"
  timer(TIME_LIMIT * 1000)
  setTimeout(() => {
      if(world.gameStat != "ended"){
          text.innerText = "Time Out"
          world.loseMusic.play()
          world.gameStat = "ended"
          text_time.innerText = "00:00"
          //document.getElementById('output').innerHTML = text_time.innerText;
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
  await delay(500)
  text.innerText = "Start"
  start()
}

function show () {
  document.querySelector(".background").className = "background show";
}

main().catch((err) => {
  console.error(err);
});
