import * as THREE from '../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const start_position = 7
const end_position = - 8.7
const text = document.querySelector('.text')

let DEAD_PLAYERS = 0
let SAFE_PLAYERS = 0

class Player {
    constructor(name = "Player", radius = .25, posY = 0, color = 0xffffff){
        // // ---- 캐릭터 삽입 ---- //

        this.playerInfo = {
            positionZ: start_position - .4,
            positionX: 0,
            w_velocity: 0,
            s_velocity: 0,
            a_velocity: 0,
            d_velocity: 0,
            name,
            isDead: false
        }
    }

    getObj() {
        return this.playerObj
    }

    w_run(){
        if(this.playerInfo.isDead) return
        this.playerInfo.w_velocity = .03
    }
    s_run(){
        if(this.playerInfo.isDead) return
        this.playerInfo.s_velocity = .03
    }
    a_run(){
        if(this.playerInfo.isDead) return
        this.playerInfo.a_velocity = .03
    }
    d_run(){
        if(this.playerInfo.isDead) return
        this.playerInfo.d_velocity = .03
    }

    stop(){
        gsap.to(this.playerInfo, { duration: .1, w_velocity: 0 })
        gsap.to(this.playerInfo, { duration: .1, s_velocity: 0 })
        gsap.to(this.playerInfo, { duration: .1, a_velocity: 0 })
        gsap.to(this.playerInfo, { duration: .1, d_velocity: 0 })
    }

    check(world){
        let dallFacingBack = world.doll.getDollState()
        if(this.playerInfo.isDead) return
        var velocity = false;
        if(this.playerInfo.w_velocity > 0 || this.playerInfo.a_velocity > 0 
            || this.playerInfo.s_velocity > 0 || this.playerInfo.d_velocity > 0 ){
                velocity = true;
            }
        if(!dallFacingBack && velocity){
            text.innerText = this.playerInfo.name + " Move!"
            this.playerInfo.isDead = true
            this.stop()
            DEAD_PLAYERS++
            world.loseMusic.play()
            world.gameStat = "ended"
        }
        if(this.playerInfo.positionZ < end_position){
            text.innerText = this.playerInfo.name + " reach the finish line!"
            this.playerInfo.isDead = true
            this.stop()
            SAFE_PLAYERS++
            world.winMusic.play()
            world.gameStat = "ended"
        }
    }

    update(world){
        this.check(world)
        if(this.playerObj.position.x < -4.3){ // left wall
            this.playerObj.position.x += 0.001
        }
        else if(this.playerObj.position.x > 4.3){ // right wall
            this.playerObj.position.x -= 0.001
        }
        else if(this.playerObj.position.z > 7.8){ // back wall
            this.playerObj.position.z -= 0.001
        }
        else{
            this.playerInfo.positionZ -= this.playerInfo.w_velocity
            this.playerObj.position.z = this.playerInfo.positionZ
            this.playerInfo.positionZ += this.playerInfo.s_velocity
            this.playerObj.position.z = this.playerInfo.positionZ
            this.playerInfo.positionX -= this.playerInfo.a_velocity
            this.playerObj.position.x = this.playerInfo.positionX
            this.playerInfo.positionX += this.playerInfo.d_velocity
            this.playerObj.position.x = this.playerInfo.positionX
        }
    }

    async loadPlayer(radius = .25, posY = 0, color = 0xffffff) {
        const loader = new GLTFLoader()
    
        const playerData = await Promise.all([loader.loadAsync('../resource/player/scene.gltf')])
    
        this.playerObj = playerData["0"]["scene"];
        this.playerObj.position.set(1, -1, 0)
        this.playerObj.rotation.y = 3.2
    }
}

export {Player};