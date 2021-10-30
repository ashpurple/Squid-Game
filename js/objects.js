function stopSignal(x, y, z, angle, scene) {
    var stop = new THREE.Object3D();

    var textureStop = new THREE.TextureLoader().load('texture/stop.png');
    textureStop.minFilter = THREE.MipMapLinearFilter;
    textureStop.magFilter = THREE.NearestFilter;

    var textureMetal = new THREE.TextureLoader().load('texture/metal-texture-7.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var materials = [
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // right
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureStop}), // left
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // top
        new THREE.MeshLambertMaterial({color: 0x000000, map: textureMetal}), // bottom
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // back
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal})  // front
    ];

    var sidesMaterial = new THREE.MultiMaterial(materials);
    var signal = new THREE.Mesh(new THREE.CylinderGeometry(70, 70, 20, 8, 1, false, 2), sidesMaterial);
    stop.add(signal);
    signal.rotation.z = Math.PI / 2;

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 480, 32), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    stop.add(pole);
    pole.position.y = -305;

    stop.position.set(x, y + 500, z);
    stop.rotation.y = angle;
    scene.add(stop);
}

function lamp(x, y, z, angle, scene) {
    var streetLamp = new THREE.Object3D();

    var lampMaterial = new THREE.MeshLambertMaterial({color: 0xfffa93, ambient: 0xfffa93});
    var lamp = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32, 0, Math.PI), lampMaterial);
    lamp.rotation.x = Math.PI / 2;
    streetLamp.add(lamp);

    var textureMetal = new THREE.TextureLoader().load('texture/black-metal.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 650, 32), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    lamp.add(pole);
    pole.rotation.x = Math.PI / 2;
    pole.position.y = 100;
    pole.position.z = 305;

    var bracket = new THREE.Mesh(new THREE.BoxGeometry(50, 20, 150), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    lamp.add(bracket);
    bracket.rotation.x = Math.PI / 2;
    bracket.position.y = 30;
    bracket.position.z = -5;

    streetLamp.position.set(x, y + 600, z);
    streetLamp.rotation.y = angle;
    scene.add(streetLamp);
}

function trafficLight(x, y, z, angle, scene, color) {
    var streetTrafficLight = new THREE.Object3D();
    var redTrafficLightMaterial;
    var greenTrafficLightMaterial;
    var yellowTrafficLightMaterial;

    if (color === 'green') {    // 초록불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x610B0B, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x5F4C0B, ambient: 0xFFA500});
    } else if (color === 'red') {   // 빨간불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x21610B, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x5F4C0B, ambient: 0xFFA500});
    } else if (color === 'yellow') {    // 노란불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x610B0B, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x21610B, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0xffff00, ambient: 0xFFA500});
    }

    var redTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), redTrafficLightMaterial);
    var greenTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), greenTrafficLightMaterial);
    var yellowTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), yellowTrafficLightMaterial);
    streetTrafficLight.add(redTrafficLight);
    streetTrafficLight.add(greenTrafficLight);
    streetTrafficLight.add(yellowTrafficLight);
    redTrafficLight.position.x = 1000;
    redTrafficLight.position.y = 30;
    redTrafficLight.position.z = 0;
    greenTrafficLight.position.x = 1200;
    greenTrafficLight.position.y = 30;
    greenTrafficLight.position.z = 0;
    yellowTrafficLight.position.x = 1100;
    yellowTrafficLight.position.y = 30;
    yellowTrafficLight.position.z = 0;

    var textureMetal = new THREE.TextureLoader().load('texture/black-metal.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var bracket = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 300), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    greenTrafficLight.add(bracket);
    bracket.rotation.y = Math.PI / 2;
    bracket.position.x = -100;
    bracket.position.y = 30;
    bracket.position.z = -5;

    streetTrafficLight.position.set(x, y + 600, z);
    streetTrafficLight.rotation.y = angle;

    scene.add(streetTrafficLight);

    return streetTrafficLight;
}

function stopSignal(x, y, z, angle, scene) {
    var stop = new THREE.Object3D();

    var textureStop = new THREE.TextureLoader().load('texture/stop.png');
    textureStop.minFilter = THREE.MipMapLinearFilter;
    textureStop.magFilter = THREE.NearestFilter;

    var textureMetal = new THREE.TextureLoader().load('texture/metal-texture-7.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var materials = [
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // right
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureStop}), // left
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // top
        new THREE.MeshLambertMaterial({color: 0x000000, map: textureMetal}), // bottom
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // back
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal})  // front
    ];

    var sidesMaterial = new THREE.MultiMaterial(materials);
    var signal = new THREE.Mesh(new THREE.CylinderGeometry(70, 70, 20, 8, 1, false, 2), sidesMaterial);
    stop.add(signal);
    signal.rotation.z = Math.PI / 2;

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 480, 32), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    stop.add(pole);
    pole.position.y = -305;

    stop.position.set(x, y + 500, z);
    stop.rotation.y = angle;
    scene.add(stop);
}

function lamp(x, y, z, angle, scene) {
    var streetLamp = new THREE.Object3D();

    var lampMaterial = new THREE.MeshLambertMaterial({color: 0xfffa93, ambient: 0xfffa93});
    var lamp = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32, 0, Math.PI), lampMaterial);
    lamp.rotation.x = Math.PI / 2;
    streetLamp.add(lamp);

    var textureMetal = new THREE.TextureLoader().load('texture/black-metal.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 650, 32), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    lamp.add(pole);
    pole.rotation.x = Math.PI / 2;
    pole.position.y = 100;
    pole.position.z = 305;

    var bracket = new THREE.Mesh(new THREE.BoxGeometry(50, 20, 150), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    lamp.add(bracket);
    bracket.rotation.x = Math.PI / 2;
    bracket.position.y = 30;
    bracket.position.z = -5;

    streetLamp.position.set(x, y + 600, z);
    streetLamp.rotation.y = angle;
    scene.add(streetLamp);
}

function trafficLight(x, y, z, angle, scene, color) {
    var streetTrafficLight = new THREE.Object3D();
    var redTrafficLightMaterial;
    var greenTrafficLightMaterial;
    var yellowTrafficLightMaterial;

    if (color === 'green') {    // 초록불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x610B0B, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x5F4C0B, ambient: 0xFFA500});
    } else if (color === 'red') {   // 빨간불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x21610B, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x5F4C0B, ambient: 0xFFA500});
    } else if (color === 'yellow') {    // 노란불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x610B0B, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x21610B, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0xffff00, ambient: 0xFFA500});
    }

    var redTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), redTrafficLightMaterial);
    var greenTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), greenTrafficLightMaterial);
    var yellowTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), yellowTrafficLightMaterial);
    // redTrafficLight.rotation.x = Math.PI / 2;
    // greenTrafficLight.rotation.x = Math.PI / 2;
    // yellowTrafficLight.rotation.x = Math.PI / 2;
    streetTrafficLight.add(redTrafficLight);
    streetTrafficLight.add(greenTrafficLight);
    streetTrafficLight.add(yellowTrafficLight);
    redTrafficLight.position.x = 1000;
    redTrafficLight.position.y = 30;
    redTrafficLight.position.z = 0;
    greenTrafficLight.position.x = 1200;
    greenTrafficLight.position.y = 30;
    greenTrafficLight.position.z = 0;
    yellowTrafficLight.position.x = 1100;
    yellowTrafficLight.position.y = 30;
    yellowTrafficLight.position.z = 0;

    var textureMetal = new THREE.TextureLoader().load('texture/black-metal.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var bracket = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 300), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    greenTrafficLight.add(bracket);
    bracket.rotation.y = Math.PI / 2;
    bracket.position.x = -100;
    bracket.position.y = 30;
    bracket.position.z = -5;

    streetTrafficLight.position.set(x, y + 600, z);
    streetTrafficLight.rotation.y = angle;

    scene.add(streetTrafficLight);

    return streetTrafficLight;
}

function stopSignal(x, y, z, angle, scene) {
    var stop = new THREE.Object3D();

    var textureStop = new THREE.TextureLoader().load('texture/stop.png');
    textureStop.minFilter = THREE.MipMapLinearFilter;
    textureStop.magFilter = THREE.NearestFilter;

    var textureMetal = new THREE.TextureLoader().load('texture/metal-texture-7.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var materials = [
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // right
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureStop}), // left
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // top
        new THREE.MeshLambertMaterial({color: 0x000000, map: textureMetal}), // bottom
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal}), // back
        new THREE.MeshLambertMaterial({color: 0xffffff, map: textureMetal})  // front
    ];

    var sidesMaterial = new THREE.MultiMaterial(materials);
    var signal = new THREE.Mesh(new THREE.CylinderGeometry(70, 70, 20, 8, 1, false, 2), sidesMaterial);
    stop.add(signal);
    signal.rotation.z = Math.PI / 2;

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 480, 32), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    stop.add(pole);
    pole.position.y = -305;

    stop.position.set(x, y + 500, z);
    stop.rotation.y = angle;
    scene.add(stop);
}

function lamp(x, y, z, angle, scene) {
    var streetLamp = new THREE.Object3D();

    var lampMaterial = new THREE.MeshLambertMaterial({color: 0xfffa93, ambient: 0xfffa93});
    var lamp = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32, 0, Math.PI), lampMaterial);
    lamp.rotation.x = Math.PI / 2;
    streetLamp.add(lamp);

    var textureMetal = new THREE.TextureLoader().load('texture/black-metal.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 650, 32), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    lamp.add(pole);
    pole.rotation.x = Math.PI / 2;
    pole.position.y = 100;
    pole.position.z = 305;

    var bracket = new THREE.Mesh(new THREE.BoxGeometry(50, 20, 150), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    lamp.add(bracket);
    bracket.rotation.x = Math.PI / 2;
    bracket.position.y = 30;
    bracket.position.z = -5;

    streetLamp.position.set(x, y + 600, z);
    streetLamp.rotation.y = angle;
    scene.add(streetLamp);
}

function trafficLight(x, y, z, angle, scene, color) {
    var streetTrafficLight = new THREE.Object3D();
    var redTrafficLightMaterial;
    var greenTrafficLightMaterial;
    var yellowTrafficLightMaterial;

    if (color === 'green') {    // 초록불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x610B0B, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x5F4C0B, ambient: 0xFFA500});
    } else if (color === 'red') {   // 빨간불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x21610B, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x5F4C0B, ambient: 0xFFA500});
    } else if (color === 'yellow') {    // 노란불일 때
        redTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x610B0B, ambient: 0xff0000});
        greenTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0x21610B, ambient: 0x80E12A});
        yellowTrafficLightMaterial = new THREE.MeshLambertMaterial({color: 0xffff00, ambient: 0xFFA500});
    }

    var redTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), redTrafficLightMaterial);
    var greenTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), greenTrafficLightMaterial);
    var yellowTrafficLight = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32, 0, Math.PI), yellowTrafficLightMaterial);
    // redTrafficLight.rotation.x = Math.PI / 2;
    // greenTrafficLight.rotation.x = Math.PI / 2;
    // yellowTrafficLight.rotation.x = Math.PI / 2;
    streetTrafficLight.add(redTrafficLight);
    streetTrafficLight.add(greenTrafficLight);
    streetTrafficLight.add(yellowTrafficLight);
    redTrafficLight.position.x = 1000;
    redTrafficLight.position.y = 30;
    redTrafficLight.position.z = 0;
    greenTrafficLight.position.x = 1200;
    greenTrafficLight.position.y = 30;
    greenTrafficLight.position.z = 0;
    yellowTrafficLight.position.x = 1100;
    yellowTrafficLight.position.y = 30;
    yellowTrafficLight.position.z = 0;

    var textureMetal = new THREE.TextureLoader().load('texture/black-metal.jpg');
    textureMetal.minFilter = THREE.MipMapLinearFilter;
    textureMetal.magFilter = THREE.NearestFilter;

    var bracket = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 300), new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureMetal
    }));
    greenTrafficLight.add(bracket);
    bracket.rotation.y = Math.PI / 2;
    bracket.position.x = -100;
    bracket.position.y = 30;
    bracket.position.z = -5;

    streetTrafficLight.position.set(x, y + 600, z);
    streetTrafficLight.rotation.y = angle;

    scene.add(streetTrafficLight);

    return streetTrafficLight;
}