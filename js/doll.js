import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const text = document.querySelector('.text')

class Doll {
    constructor(name = "doll", radius = .25, posY = 0, color = 0xffffff){
        this.dallFacingBack = true
    }

    getObj() {
        return this.dollObj
    }

    getDollState() {
        return this.dallFacingBack
    }

    lookBackward(){

        gsap.to(this.dollObj.rotation, {duration: .45, y: 3.2}) //
        text.innerText = "Go"
        setTimeout(() => this.dallFacingBack = true, 150)
    }
    lookForward(){

        gsap.to(this.dollObj.rotation, {duration: .45, y: 0}) //
        text.innerText = "Stop"
        setTimeout(() => this.dallFacingBack = false, 450)
    }


    async loadDoll(radius = .25, posY = 0, color = 0xffffff) {
        const loader = new GLTFLoader()
    
        const dollData = await Promise.all([loader.loadAsync('../resource/model/scene.gltf')])
    
        this.dollObj = dollData["0"]["scene"];

        this.dollObj.position.set(0, 0.2, -13) 
        this.dollObj.scale.set(0.25, 0.25, 0.25)
    }
}

export {Doll};