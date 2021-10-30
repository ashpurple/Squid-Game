function map(scene) {
    const PERCENT = 0.6;

    //GROUND TEXTURE
    var textureRoad = new THREE.TextureLoader().load("texture/strada.jpg");
    textureRoad.wrapT = THREE.RepeatWrapping;
    textureRoad.magFilter = THREE.MipMapLinearFilter;
    textureRoad.minFilter = THREE.LinearFilter;
    textureRoad.repeat.set(1, 10);

    var textureSidewalk = new THREE.TextureLoader().load("texture/sidewalk.jpg");
    textureSidewalk.wrapT = THREE.RepeatWrapping;
    textureSidewalk.magFilter = THREE.LinearFilter;
    textureSidewalk.minFilter = THREE.MipMapLinearFilter;
    textureSidewalk.repeat.set(1, 50);

    var textureNoLine = new THREE.TextureLoader().load("texture/strada_noline.jpg");
    textureNoLine.wrapT = THREE.RepeatWrapping;
    textureNoLine.magFilter = THREE.MipMapLinearFilter;
    textureNoLine.minFilter = THREE.LinearFilter;
    textureNoLine.repeat.set(1, 1);

    var textureContinueLine = new THREE.TextureLoader().load("texture/strada_lineacontinua.jpg");
    textureContinueLine.magFilter = THREE.MipMapLinearFilter;
    textureContinueLine.minFilter = THREE.LinearFilter;

    var textureOneLine = new THREE.TextureLoader().load("texture/strada_oneLine.jpg");
    textureOneLine.magFilter = THREE.MipMapLinearFilter;
    textureOneLine.minFilter = THREE.LinearFilter;

    var textureStop = new THREE.TextureLoader().load("texture/strada_Stop.jpg");
    textureStop.magFilter = THREE.MipMapLinearFilter;
    textureStop.minFilter = THREE.LinearFilter;

    var textureGrass = new THREE.TextureLoader().load("texture/grasslight-big.jpg");
    textureGrass.wrapS = textureGrass.wrapT = THREE.RepeatWrapping;
    textureGrass.minFilter = THREE.MipMapLinearFilter;
    textureGrass.magFilter = THREE.NearestFilter;
    textureGrass.repeat.set(50, 50);

    //GROUND MATERIAL
    var roadMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureRoad});
    var sidewalkMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureSidewalk});
    var crossNoLineMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: textureNoLine,
        side: THREE.DoubleSide
    });
    var continueLineMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureContinueLine});
    var oneLineMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureOneLine});
    var stopMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureStop});
    var grassMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: textureGrass});

    // SQUARE
    // 반쪼가리 잔디밭 2개 그리기
    square = new THREE.Mesh(new THREE.PlaneGeometry(16000 * PERCENT, 8600), grassMaterial);
    square.rotation.x = -Math.PI / 2;
    square.position.x = 9500 * PERCENT;
    square.position.z = 5000;
    square.position.y = -215;
    scene.add(square);

    square = new THREE.Mesh(new THREE.PlaneGeometry(16000 * PERCENT, 8600), grassMaterial);
    square.rotation.x = -Math.PI / 2;
    square.position.x = -9500 * PERCENT;
    square.position.z = 5000;
    square.position.y = -215;
    scene.add(square);

    square = new THREE.Mesh(new THREE.PlaneGeometry(16000 * PERCENT, 17600 * PERCENT), grassMaterial);
    square.rotation.x = -Math.PI / 2;
    square.position.x = -9500 * PERCENT;
    square.position.z = -10100 * PERCENT;
    square.position.y = -215;
    scene.add(square);

    square = new THREE.Mesh(new THREE.PlaneGeometry(16000 * PERCENT, 17600 * PERCENT), grassMaterial);
    square.rotation.x = -Math.PI / 2;
    square.position.x = 9500 * PERCENT;
    square.position.z = -10100 * PERCENT;
    square.position.y = -215;
    scene.add(square);

    //STREET
    var street;
    for (i = 0; i < 3; i++) {
        // 가운데 세로로된 길
        street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 5500), roadMaterial);
        street.rotation.x = -Math.PI / 2;
        street.position.x = (-19000 + i * 19000) * PERCENT;
        street.position.y = -215;
        street.position.z = -6000;
        scene.add(street);
    }

    // T자 길 그리기
    // 길쭉한 길
    street = new THREE.Mesh(new THREE.PlaneGeometry(1000, 7000), crossNoLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = -9600 * PERCENT;
    street.position.y = -213;
    street.position.z = -4200;
    scene.add(street);

    // 주차 공간
    street = new THREE.Mesh(new THREE.PlaneGeometry(1000, 3000), crossNoLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = -11300 * PERCENT;
    street.position.y = -213;
    street.position.z = -4000;
    scene.add(street);

    // TRAFFIC LIGHT
    var horizontalArray = [];
    var verticalArray = [];

    var horizontalLight = 'red'
    var verticalLight = 'green'
    var seconds = 0;

    // 신호등을 처음에 그려줌
    horizontalArray.push(trafficLight(-1000, -175, 1000, Math.PI / 2, scene, 'red'));    // 오른쪽
    horizontalArray.push(trafficLight(1000, -175, -1000, -Math.PI / 2, scene, 'red'));   // 왼쪽
    verticalArray.push(trafficLight(1000, -175, 1000, Math.PI, scene, 'green'));     //  정면
    verticalArray.push(trafficLight(-1000, -175, -1000, Math.PI * 2, scene, 'green'));     //  자기 자리

    // 1초마다 신호등 확인
    setInterval(function () {
        seconds++;

        if (seconds === 9) {    // 노란불 할건지 말건지 확인
            // 전에 초록불이었으면 노란불 있음
            if (horizontalLight === 'green') {
                scene.remove(horizontalArray);      // 씬에서 신호등 지우기
                horizontalArray = [];   // 배열 비우기

                horizontalArray.push(trafficLight(-1000, -175, 1000, Math.PI / 2, scene, 'yellow'));    // 오른쪽
                horizontalArray.push(trafficLight(1000, -175, -1000, -Math.PI / 2, scene, 'yellow'));   // 왼쪽

                horizontalLight = 'yellow';
            }
            if (verticalLight === 'green') {
                scene.remove(verticalArray);      // 씬에서 신호등 지우기
                verticalArray = [];   // 배열 비우기

                verticalArray.push(trafficLight(1000, -175, 1000, Math.PI, scene, 'yellow'));     //  정면
                verticalArray.push(trafficLight(-1000, -175, -1000, Math.PI * 2, scene, 'yellow'));     //  자기자리

                verticalLight = 'yellow';
            }

            // 전에 빨간불이었으면 노란불 없음
            // nothing
        } else if (seconds === 10) {    // 불 바꿔주기
            // 전에 빨간불이었으면 초록불로 바꿔주기
            if (horizontalLight === 'red') {
                scene.remove(horizontalArray);      // 씬에서 신호등 지우기
                horizontalArray = [];   // 배열 비우기

                horizontalArray.push(trafficLight(-1000, -175, 1000, Math.PI / 2, scene, 'green'));    // 오른쪽
                horizontalArray.push(trafficLight(1000, -175, -1000, -Math.PI / 2, scene, 'green'));   // 왼쪽

                horizontalLight = 'green';
            }
            if (verticalLight === 'red') {
                scene.remove(verticalArray);      // 씬에서 신호등 지우기
                verticalArray = [];   // 배열 비우기

                verticalArray.push(trafficLight(1000, -175, 1000, Math.PI, scene, 'green'));     //  정면
                verticalArray.push(trafficLight(-1000, -175, -1000, Math.PI * 2, scene, 'green'));     //  자기자리

                verticalLight = 'green';
            }

            // 전에 노란불이었으면 빨간불로 바꿔주기
            if (horizontalLight === 'yellow') {
                scene.remove(horizontalArray);      // 씬에서 신호등 지우기
                horizontalArray = [];   // 배열 비우기

                horizontalArray.push(trafficLight(-1000, -175, 1000, Math.PI / 2, scene, 'red'));    // 오른쪽
                horizontalArray.push(trafficLight(1000, -175, -1000, -Math.PI / 2, scene, 'red'));   // 왼쪽

                horizontalLight = 'red';
            }
            if (verticalLight === 'yellow') {
                scene.remove(verticalArray);      // 씬에서 신호등 지우기
                verticalArray = [];   // 배열 비우기

                verticalArray.push(trafficLight(1000, -175, 1000, Math.PI, scene, 'red'));     //  정면
                verticalArray.push(trafficLight(-1000, -175, -1000, Math.PI * 2, scene, 'red'));     //  자기자리

                verticalLight = 'red';
            }

            seconds = 0;
        }
    }, 1000)

    //SIDEWALK STREET
    var sidewalk;
    for (i = 0; i < 2; i++) {
        // 가운데(왼쪽)랑 오른쪽(왼쪽) 긴부분
        if (i === 1) {  // 가운데는 안움직이게 하기
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = -18125 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.z = -6000;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp(-18125 + i * 19000, -175, -1200 - j * 2000, Math.PI / 2, scene);
            }
        } else {    // 오른쪽
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = (-18125 + i * 19000) * PERCENT + 350;
            sidewalk.position.y = -195;
            sidewalk.position.z = -6000;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp((-18125 + i * 19000) * PERCENT + 350, -175, -1200 - j * 2000, Math.PI / 2, scene);
            }
        }
    }
    for (i = 0; i < 2; i++) {
        // 가운데 윗부분(왼쪽)이랑 오른쪽 윗부분(왼쪽)
        if (i === 1) {  // 가운데는 안움직이게 하기
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 8500, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = -18125 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.z = 5000;
            scene.add(sidewalk);

            for (j = 0; j < 4; j++) {   // 가로등 개수 반으로 줄이기
                lamp(-18125 + i * 19000, -175, 1200 + j * 2000, Math.PI / 2, scene);
            }
        } else {
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 8500, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = (-18125 + i * 19000) * PERCENT + 350;
            sidewalk.position.y = -195;
            sidewalk.position.z = 5000;
            scene.add(sidewalk);

            for (j = 0; j < 4; j++) {   // 가로등 개수 반으로 줄이기
                lamp((-18125 + i * 19000) * PERCENT + 350, -175, 1200 + j * 2000, Math.PI / 2, scene);
            }
        }
    }
    for (i = 1; i < 3; i++) {
        // 가운데(오른쪽)랑 오른쪽(오른쪽) 긴부분
        if (i === 1) {  // 가운데는 안움직이게 하기
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = -19875 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.z = -6000;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp(-19875 + i * 19000, -175, -1200 - j * 2000, -Math.PI / 2, scene);
            }
        } else {
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = (-19875 + i * 19000) * PERCENT - 350;
            sidewalk.position.y = -195;
            sidewalk.position.z = -6000;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp((-19875 + i * 19000) * PERCENT - 350, -175, -1200 - j * 2000, -Math.PI / 2, scene);
            }
        }
    }

    // 가운데 윗부분(왼쪽)이랑 오른쪽 윗부분(왼쪽)
    for (i = 1; i < 3; i++) {
        if (i === 1) {
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 8500, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = -19875 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.z = 5000;
            scene.add(sidewalk);

            for (j = 0; j < 4; j++) {   // 가로등 개수 반으로 줄이기
                lamp(-19875 + i * 19000, -175, 1200 + j * 2000, -Math.PI / 2, scene);
            }
        } else {
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 8500, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.position.x = (-19875 + i * 19000) * PERCENT - 350;
            sidewalk.position.y = -195;
            sidewalk.position.z = 5000;
            scene.add(sidewalk);

            for (j = 0; j < 4; j++) {   // 가로등 개수 반으로 줄이기
                lamp((-19875 + i * 19000) * PERCENT - 350, -175, 1200 + j * 2000, -Math.PI / 2, scene);
            }
        }
    }

    //AVENUE
    // 왼쪽 가운데,아래 가로로된 길
    for (i = 0; i < 3; i++) {
        if (i === 0) {  // 아래
            street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 9500 * PERCENT), roadMaterial);
            street.rotation.x = -Math.PI / 2;
            street.rotation.z = -Math.PI / 2;
            street.position.x = 10100 * PERCENT;
            street.position.z = -12000 + i * 12000;
            street.position.y = -215;
            scene.add(street);
        } else if (i === 1) {    // 가운데
            street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 9500 * PERCENT), roadMaterial);
            street.rotation.x = -Math.PI / 2;
            street.rotation.z = -Math.PI / 2;
            street.position.x = 10100 * PERCENT;
            street.position.z = -19000 + i * 19000;
            street.position.y = -215;
            scene.add(street);
        } else {
            // 왼쪽 반정도에 길 그리기
            street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 9500 * PERCENT), roadMaterial);
            street.rotation.x = -Math.PI / 2;
            street.rotation.z = -Math.PI / 2;
            street.position.x = 10100 * PERCENT;
            street.position.z = -10000 + i * 10000;
            street.position.y = -215;
            scene.add(street);
        }
    }

    // 오른쪽 가운데,아래 가로로된 길
    for (i = 0; i < 3; i++) {
        if (i === 0) {  // 아래
            street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 9500 * PERCENT), roadMaterial);
            street.rotation.x = -Math.PI / 2;
            street.rotation.z = -Math.PI / 2;
            street.position.x = -10100 * PERCENT;
            street.position.z = -12000 + i * 12000;
            street.position.y = -215;
            scene.add(street);
        } else if (i === 1) {    // 가운데
            street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 9500 * PERCENT), roadMaterial);
            street.rotation.x = -Math.PI / 2;
            street.rotation.z = -Math.PI / 2;
            street.position.x = -10100 * PERCENT;
            street.position.z = -19000 + i * 19000;
            street.position.y = -215;
            scene.add(street);
        } else {
            // 오른쪽 반정도에 길 그리기
            street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 9500 * PERCENT), roadMaterial);
            street.rotation.x = -Math.PI / 2;
            street.rotation.z = -Math.PI / 2;
            street.position.x = -10100 * PERCENT;
            street.position.z = -10000 + i * 10000;
            street.position.y = -215;
            scene.add(street);
        }
    }


    //SIDEWALK AVENUE
    for (i = 0; i < 2; i++) {
        // 오른쪽 아래(위쪽)과 가운데(위쪽)
        if (i === 0) {  // 아래
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = -11200 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.x = -9500 * PERCENT;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp(-1200 - j * 2000, -175, -11200, 0, scene);
            }
        } else {    // 가운데
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = -18125 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.x = -9500 * PERCENT;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp(-1200 - j * 2000, -175, -18125 + i * 19000, 0, scene);
            }
        }
    }
    for (i = 0; i < 2; i++) {
        // 왼쪽 아래(위쪽)과 가운데(위쪽)
        if (i === 0) {  // 아래
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = -11200 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.x = 9500 * PERCENT;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp(1200 + j * 2000, -175, -11200, 0, scene);
            }
        } else {  // 가운데
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = -18125 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.x = 9500 * PERCENT;
            scene.add(sidewalk);

            for (j = 0; j < 5; j++) {
                lamp(1200 + j * 2000, -175, -18125 + i * 19000, 0, scene);
            }
        }
    }
    for (i = 1; i < 3; i++) {
        // 오른쪽 가운데(아랫쪽)랑 반쪼가리 윗부분(아랫쪽)
        if (i === 1) {
            // T자 주차해야하니까 반으로 잘라서 두번 그려주기
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 4560, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = -19875 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.x = -4960 * PERCENT;
            scene.add(sidewalk);

            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 4500, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = -19875 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.x = -14100 * PERCENT;
            scene.add(sidewalk);
        } else {
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = (-19875 + i * 19000) / 2 + 100;
            sidewalk.position.y = -195;
            sidewalk.position.x = -9500 * PERCENT;
            scene.add(sidewalk);
        }

        if (i === 1) {  // 가운데 가로등 세우기
            for (j = 0; j < 5; j++) {
                lamp(-1200 - j * 2000, -175, -19875 + i * 19000, Math.PI, scene);
            }
        } else {
            for (j = 0; j < 5; j++) {
                lamp(-1200 - j * 2000, -175, (-19875 + i * 19000) / 2 + 100, Math.PI, scene);
            }
        }
    }
    for (i = 1; i < 3; i++) {
        // 왼쪽 가운데(아랫쪽)랑 반쪼가리 윗부분(아랫쪽)
        if (i === 1) {
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = -19875 + i * 19000;
            sidewalk.position.y = -195;
            sidewalk.position.x = 9500 * PERCENT;
            scene.add(sidewalk);
        } else {
            sidewalk = new THREE.Mesh(new THREE.BoxGeometry(350, 10000, 40), sidewalkMaterial);
            sidewalk.rotation.x = -Math.PI / 2;
            sidewalk.rotation.z = -Math.PI / 2;
            sidewalk.position.z = (-19875 + i * 19000) / 2 + 100;
            sidewalk.position.y = -195;
            sidewalk.position.x = 9500 * PERCENT;
            scene.add(sidewalk);
        }

        if (i === 1) {  // 가운데 가로등 세우기
            for (j = 0; j < 5; j++) {
                lamp(1200 + j * 2000, -175, -19875 + i * 19000, Math.PI, scene);
            }
        } else {
            for (j = 0; j < 5; j++) {
                lamp(1200 + j * 2000, -175, (-19875 + i * 19000) / 2 + 100, Math.PI, scene);
            }
        }
    }

    // ANGLE 1
    // 왼쪽 윗부분 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 6000), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = 19000 * PERCENT;
    street.position.z = 6300;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2200), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = 16000 * PERCENT;
    street.position.z = 10000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.RingGeometry(0.1, 1400, 30, 30, 0, Math.PI / 2), crossNoLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = 17800 * PERCENT;
    street.position.z = 9300;
    street.position.y = -215;
    scene.add(street);

    // CROSS A
    // 가운데 윗부분 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 6000), stopMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI;
    street.position.z = 6300;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = -2000;
    street.position.z = 10000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), oneLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.z = 10000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = 2000;
    street.position.z = 10000;
    street.position.y = -215;
    scene.add(street);

    // 오른쪽 윗부분 교차로
    // ANGLE 2
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 6000), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = -19000 * PERCENT;
    street.position.z = 6300;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2200), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = -16000 * PERCENT;
    street.position.z = 10000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.RingGeometry(0.1, 1400, 30, 30, 0, Math.PI / 2), crossNoLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI;
    street.position.x = -17800 * PERCENT;
    street.position.z = 9300;
    street.position.y = -215;
    scene.add(street);

    // CROSS D
    // 오른쪽 중간 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), oneLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = Math.PI;
    street.position.x = -19000 * PERCENT;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = -19000 * PERCENT;
    street.position.y = -215;
    street.position.z = 2000;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = -19000 * PERCENT;
    street.position.y = -215;
    street.position.z = -2000;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1900), stopMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = Math.PI / 2;
    street.position.y = -215;
    street.position.x = -16300 * PERCENT;
    scene.add(street);

    // CROSS C
    // 가운데 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), crossNoLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.y = -215;
    street.position.z = 2000;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.y = -215;
    street.position.z = -2000;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), stopMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.y = -215;
    street.position.x = -2000;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), stopMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = Math.PI / 2;
    street.position.y = -215;
    street.position.x = 2000;
    scene.add(street);

    // CROSS B
    // 왼쪽 가운데 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), oneLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = 19000 * PERCENT;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = 19000 * PERCENT;
    street.position.y = -215;
    street.position.z = 2000;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = 19000 * PERCENT;
    street.position.y = -215;
    street.position.z = -2000;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1900), stopMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.y = -215;
    street.position.x = 16300 * PERCENT;
    scene.add(street);

    // ANGLE 3
    // 왼쪽 아래 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = 19000 * PERCENT;
    street.position.z = -10000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2200), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = 16000 * PERCENT;
    street.position.z = -12000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.RingGeometry(0.1, 1400, 30, 30, 0, Math.PI / 2), crossNoLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = 17800 * PERCENT;
    street.position.z = -11300;
    street.position.y = -215;
    scene.add(street);

    // CROSS E
    // 가운데 아래 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), stopMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.z = -10000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = -2000;
    street.position.z = -12000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), oneLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = Math.PI / 2;
    street.position.z = -12000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = 2000;
    street.position.z = -12000;
    street.position.y = -215;
    scene.add(street);

    // ANGLE 4
    // 오른쪽 아래 교차로
    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2600), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.position.x = -19000 * PERCENT;
    street.position.z = -10000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.PlaneGeometry(1400, 2200), continueLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = -Math.PI / 2;
    street.position.x = -16000 * PERCENT;
    street.position.z = -12000;
    street.position.y = -215;
    scene.add(street);

    street = new THREE.Mesh(new THREE.RingGeometry(0.1, 1400, 30, 30, 0, Math.PI / 2), crossNoLineMaterial);
    street.rotation.x = -Math.PI / 2;
    street.rotation.z = Math.PI / 2;
    street.position.x = -17800 * PERCENT;
    street.position.z = -11300;
    street.position.y = -215;
    scene.add(street);

    // GREEN
    // left
    var green = new THREE.Mesh(new THREE.PlaneBufferGeometry(25600, 39400), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.x = 24900;
    green.position.y = -215;
    scene.add(green);

    // right
    var green = new THREE.Mesh(new THREE.PlaneBufferGeometry(25600, 39400), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.x = -24900;
    green.position.y = -215;
    scene.add(green);

    // up
    var green = new THREE.Mesh(new THREE.PlaneBufferGeometry(75400, 18000), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.z = 19700;
    green.position.y = -215;
    scene.add(green);

    // down
    var green = new THREE.Mesh(new THREE.PlaneBufferGeometry(75400, 18000), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.z = -21700;
    green.position.y = -215;
    scene.add(green);

    // 각 끝자락 4
    // angle1
    green = new THREE.Mesh(new THREE.PlaneBufferGeometry(1400, 1400), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.x = 19000 * PERCENT;
    green.position.z = 10000;
    green.position.y = -216;
    scene.add(green);

    //angle 2
    green = new THREE.Mesh(new THREE.PlaneBufferGeometry(1400, 1400), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.x = -19000 * PERCENT;
    green.position.z = 10000;
    green.position.y = -216;
    scene.add(green);

    //angle 3
    green = new THREE.Mesh(new THREE.PlaneBufferGeometry(1400, 1400), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.x = -19000 * PERCENT;
    green.position.z = -12000;
    green.position.y = -216;
    scene.add(green);

    //angle 4
    green = new THREE.Mesh(new THREE.PlaneBufferGeometry(1400, 1400), grassMaterial);
    green.rotation.x = -Math.PI / 2;
    green.position.x = 19000 * PERCENT;
    green.position.z = -12000;
    green.position.y = -216;
    scene.add(green);

    //Stop signals
    stopSignal(-10000, -175, -800, Math.PI, scene);     // 오른쪽
    stopSignal(10000, -175, 800, 0, scene);     // 왼쪽
    stopSignal(800, -175, -10000, Math.PI / 2, scene);  // 아래
    stopSignal(-800, -175, 8000, -Math.PI / 2, scene);  // 위
}