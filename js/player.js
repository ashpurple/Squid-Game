import * as THREE from '../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const start_position = 5
const end_position = - 8.7
const text = document.querySelector('.text')

let DEAD_PLAYERS = 0
let SAFE_PLAYERS = 0

class Player {
    constructor(name = "Player", radius = .25, posY = 0, color = 0xffffff){
        // // ---- 캐릭터 삽입 ---- //

        this.playerInfo = {
            positionX: start_position - .4,
            velocity: 0,
            name,
            isDead: false
        }
    }

    getObj() {
        return this.playerObj
    }

    run(){
        if(this.playerInfo.isDead) return
        this.playerInfo.velocity = .03
    }

    stop(){
        gsap.to(this.playerInfo, { duration: .1, velocity: 0 })
    }

    check(world){
        let dallFacingBack = world.doll.getDollState()
        if(this.playerInfo.isDead) return
        if(!dallFacingBack && this.playerInfo.velocity > 0){
            text.innerText = this.playerInfo.name + " lost!!!"
            this.playerInfo.isDead = true
            this.stop()
            DEAD_PLAYERS++
            world.loseMusic.play()
            world.gameStat = "ended"
        }
        if(this.playerInfo.positionX < end_position){
            text.innerText = this.playerInfo.name + " is safe!!!"
            this.playerInfo.isDead = true
            this.stop()
            SAFE_PLAYERS++
            world.winMusic.play()
            world.gameStat = "ended"
        }
    }

    update(world){
        this.check(world)
        this.playerInfo.positionX -= this.playerInfo.velocity
        this.playerObj.position.z = this.playerInfo.positionX
    }

    async loadPlayer(radius = .25, posY = 0, color = 0xffffff) {
        const loader = new GLTFLoader()
    
        const playerData = await Promise.all([loader.loadAsync('../resource/player/scene.gltf')])
    
        this.playerObj = playerData["0"]["scene"];
        // console.log(playerObj)
        this.playerObj.position.set(1, -1, 0)
        this.playerObj.rotation.y = 3.2
    }
}

export {Player};