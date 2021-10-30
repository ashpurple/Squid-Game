var clock = new THREE.Clock();

var controlsCar = {
    accelerator: false,
    break: false,
    moveLeft: false,
    moveRight: false,
    gearDrive: false,
    gearReverse: false,
    gearParking: true,
    gearNeutral: false
};

var car, cameraTarget;
var config = {
    "car": {r: 0.5, model: null}
};

var currentCamera;
// var FOLLOW_CAMERA = true;
var i;
var sprites = [];

// parking
var parking_time = 12000;
var parking_timer_f;
var parking_start_cnt = 0;
var parking_success_cnt = 0;

function main() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);

    cameraTarget = new THREE.Vector3();

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xdddddd));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var textureCube = new THREE.CubeTextureLoader()
        .setPath('./texture/Nalovardo/')
        .load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);

    scene = new THREE.Scene();
    scene.background = textureCube;

    //Import the map
    map(scene);

    //Lights
    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);
    var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(0, 4000, 50000);
    scene.add(light);

    //CAR
    car = new THREE.Car();
    car.modelScale = 2.5;
    car.callback = function (object) {
        addCar(object, -11720, -215, -11100, 0);
    };
    car.loadPartsBinary("obj/veyron/parts/veyron_body_binary.js", "obj/veyron/parts/veyron_wheel_binary.js");
    config["car"].model = car;
    currentCamera = car;

    //USER INTERACTION
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    document.getElementById('velocity').innerText = car.speed + ' KM';

    render();

    function addCar(object, x, y, z, s) {
        object.root.position.set(x, y, z);
        scene.add(object.root);
        // FOLLOW_CAMERA &&
        if (object == currentCamera) {
            object.root.add(camera);
            camera.position.set(0, 300, -1000);
            cameraTarget.set(0, 150, 500);
            camera.lookAt(cameraTarget);
        }
    }


    //RENDER FUNCTION
    function render() {
        document.getElementById('velocity').innerText =
            Math.abs(Math.round(car.speed / car.MAX_SPEED * 200)) + ' KM';

        if (car.root.position.x <= -5260 && car.root.position.x >= -6260 &&
            car.root.position.z >= -800 && car.root.position.z <= -550) {
            if (parking_start_cnt == 0) {
                startParking();
                parking_start_cnt++;
            }
            if (parking_success_cnt > 0) {
                successParking();
            }
        }

        if (car.root.position.x >= -7500 && car.root.position.x <= -7000 &&
            car.root.position.z <= -3800 && car.root.position.z >= -4200) {
            if (parking_success_cnt == 0) {
                var audio = new Audio('./sound.mp3');
                audio.src = "./sound.mp3";
                audio.play();
                parking_success_cnt++;
            }
        }

        var delta = clock.getDelta();
        renderer.render(scene, camera);
        car.updateCarModel(delta, controlsCar);
        camera.lookAt(cameraTarget);

        requestAnimationFrame(render);

        // //updatecamera - center
        // if (!FOLLOW_CAMERA) {
        //     cameraTarget.x = currentCamera.root.position.x;
        //     cameraTarget.z = currentCamera.root.position.z;
        // }
    }

    //CAMERA MANAGEMENT
    function setCurrentCamera(car, cameraType) {
        var oldCamera = currentCamera;
        oldCamera.root.remove(camera);
        currentCamera.root.add(camera);
        if (cameraType == "front") {
            camera.position.set(350, 500, 2200);
        } else if (cameraType == "internal") {
            camera.position.set(50, 150, -10);
        } else if (cameraType == "back") {
            camera.position.set(0, 300, -1000);
        }
    }


    function onKeyDown(event) {
        switch (event.keyCode) {
            case 82: /*R*/
                controlsCar.accelerator = true;
                break;
            case 87: /*W*/
                controlsCar.break = true;
                break;
            case 74: /*J*/
                controlsCar.moveLeft = true;
                break;
            case 76: /*L*/
                controlsCar.moveRight = true;
                break;
            case 65: /*Parking A, R*/
                if (controlsCar.break && Math.abs(Math.round(car.speed / car.MAX_SPEED * 200)) == 0) {
                    controlsCar.gearDrive = false;
                    controlsCar.gearReverse = false;
                    controlsCar.gearParking = true;
                    controlsCar.gearNeutral = false;
                    document.getElementById('reverse').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('drive').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('parking').style.background = "rgba(250, 167, 2, 0.8)";
                    document.getElementById('neutral').style.background = "rgba(0, 0, 0, 0.7)";
                }
                break;
            case 83: /*Reverse S, R*/
                if (controlsCar.break && Math.abs(Math.round(car.speed / car.MAX_SPEED * 200)) == 0) {
                    controlsCar.gearDrive = false;
                    controlsCar.gearReverse = true;
                    controlsCar.gearParking = false;
                    controlsCar.gearNeutral = false;
                    document.getElementById('reverse').style.background = "rgba(250, 167, 2, 0.8)";
                    document.getElementById('drive').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('parking').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('neutral').style.background = "rgba(0, 0, 0, 0.7)";
                }
                break;
            case 68: /*Neutral D, R*/
                if (controlsCar.break && Math.abs(Math.round(car.speed / car.MAX_SPEED * 200)) == 0) {
                    controlsCar.gearDrive = false;
                    controlsCar.gearReverse = false;
                    controlsCar.gearParking = false;
                    controlsCar.gearNeutral = true;
                    document.getElementById('reverse').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('drive').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('parking').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('neutral').style.background = "rgba(250, 167, 2, 0.8)";
                }
                break;
            case 70: /*Drive F, R*/
                if (controlsCar.break && Math.abs(Math.round(car.speed / car.MAX_SPEED * 200)) == 0) {
                    controlsCar.gearDrive = true;
                    controlsCar.gearReverse = false;
                    controlsCar.gearParking = false;
                    controlsCar.gearNeutral = false;
                    document.getElementById('reverse').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('drive').style.background = "rgba(250, 167, 2, 0.8)";
                    document.getElementById('parking').style.background = "rgba(0, 0, 0, 0.7)";
                    document.getElementById('neutral').style.background = "rgba(0, 0, 0, 0.7)";
                }
                break;
            case 49: /*1*/
                setCurrentCamera("car", "back");
                break;
            case 50: /*2*/
                setCurrentCamera("car", "internal");
                break;
            case 51: /*3*/
                setCurrentCamera("car", "front");
                break;
        }
    }

    function onKeyUp(event) {
        switch (event.keyCode) {
            case 82: /*R*/
                controlsCar.accelerator = false;
                break;
            case 87: /*W*/
                controlsCar.break = false;
                break;
            case 74: /*J*/
                controlsCar.moveLeft = false;
                break;
            case 76: /*L*/
                controlsCar.moveRight = false;
        }
    }

    // 주차 시작
    function startParking() {
        document.getElementById('parking_background').style.display = "table";
        parking_timer_f = setInterval(timer1Min, 10);
    }

    // 주차 1분 안에 성공했을 때
    function successParking() {
        clearInterval(parking_timer_f);
        document.getElementById('parking_timer').style.color = "#1DDB16";
        document.getElementById('parking_timer').style.fontSize = "50px";
        document.getElementById('parking_timer').innerText = 'SUCCESS!';
        setTimeout(endParking, 3000);
    }

    function endParking() {  // T자 끝
        document.getElementById('parking_background').style.display = "none"
    }

    function timer1Min() {
        parking_time--;

        if(parking_time==0){
            // FAIL 표시 해주고 3초 뒤 안내메세지 끝
            document.getElementById('parking_timer').style.color = "#FF0000";
            document.getElementById('parking_timer').style.fontSize = "50px";
            document.getElementById('parking_timer').innerText = 'FAIL';
            setTimeout(endParking, 3000);
        }else if(parking_time<0){
            clearInterval(parking_timer_f);
        }else {
            var mins = Math.floor(parking_time / 100 / 60);
            var secs = Math.floor(parking_time / 100) % 60;
            var milisec = parking_time % 100;

            if (mins < 10) {
                mins = "0" + mins;
            }
            if (secs < 10) {
                secs = "0" + secs;
            }
            if (milisec < 10) {
                milisec = "0" + milisec;
            }
            document.getElementById('parking_timer').innerText = mins + ":" + secs + ":" + milisec;
        }
    }
}