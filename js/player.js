class Player {
    constructor(name = "Player", radius = .25, posY = 0, color = 0xffffff){
        // const geometry = new THREE.SphereGeometry( radius, 100, 100 )
        // const material = new THREE.MeshBasicMaterial( { color } )
        // const player = new THREE.Mesh( geometry, material )
        // scene.add( player )
        // player.position.x = start_position - .4
        // player.position.z = 1
        // player.position.y = posY

        // // ---- 캐릭터 삽입 ---- //

        this.playerInfo = {
            positionX: start_position - .4,
            velocity: 0,
            name,
            isDead: false
        }
    }

    run(){
        if(this.playerInfo.isDead) return
        this.playerInfo.velocity = .03
    }

    stop(){
        gsap.to(this.playerInfo, { duration: .1, velocity: 0 })
    }

    check(){
        if(this.playerInfo.isDead) return
        if(!dallFacingBack && this.playerInfo.velocity > 0){
            text.innerText = this.playerInfo.name + " lost!!!"
            this.playerInfo.isDead = true
            this.stop()
            DEAD_PLAYERS++
            loseMusic.play()
            if(DEAD_PLAYERS == players.length){
                text.innerText = "Everyone lost!!!"
                gameStat = "ended"
            }
            if(DEAD_PLAYERS + SAFE_PLAYERS == players.length){
                gameStat = "ended"
            }
        }
        if(this.playerInfo.positionX < end_position + .7){
            text.innerText = this.playerInfo.name + " is safe!!!"
            this.playerInfo.isDead = true
            this.stop()
            SAFE_PLAYERS++
            winMusic.play()
            if(SAFE_PLAYERS == players.length){
                text.innerText = "Everyone is safe!!!"
                gameStat = "ended"
            }
            if(DEAD_PLAYERS + SAFE_PLAYERS == players.length){
                gameStat = "ended"
            }
        }
    }

    update(){
        this.check()
        this.playerInfo.positionX -= this.playerInfo.velocity
        this.player.position.x = this.playerInfo.positionX
        camera.position.x -= this.playerInfo.velocity // 1인칭 (없애면 전체시점)
    }
}

async function loadPlayer() {
    const loader = new GLTFLoader()

    const playerData = await Promise.all(loader.loadAsync(./resouce/player/scene.gltf))

    playerObj = playerData.scene.children[0];
    playerObj.position.set(start_position - .4, 1, posY)

    return playerObj

    // loader.load( './resouce/player/scene.gltf', ( gltf )=>{
    //     scene.add(gltf.scene)
    //     player = gltf.scene
    //     gltf.scene.position.set(start_position - .4, 1, posY)
    // })
}

export {loadPlayer};