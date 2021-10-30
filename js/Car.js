THREE.Car = function () {
    var scope = this;

    // car geometry manual parameters
    this.modelScale = 1;

    this.backWheelOffset = 2;
    this.frontWheelOffset = 2;

    this.autoWheelGeometry = true;

    // car geometry parameters automatically set from wheel mesh
    // 	- assumes wheel mesh is front left wheel in proper global
    //    position with respect to body mesh
    //	- other wheels are mirrored against car root
    //	- if necessary back wheels can be offset manually
    this.wheelOffset = new THREE.Vector3();

    this.wheelDiameter = 1;

    // car parameters
    this.MAX_SPEED = 2200;
    this.MAX_REVERSE_SPEED = -2200;

    this.MAX_WHEEL_ROTATION = 0.6;

    this.ACCELERATION = 300;
    this.DECCELERATION = 500;
    this.BREAK = 800;

    this.WHEEL_ANGULAR_ACCELERATION = 0.5;
    this.WHEEL_ANGULAR_DECCELERATION = 0.5;

    this.STEERING_RADIUS_RATIO = 0.0023;

    // internal control variables
    this.speed = 0;
    this.acceleration = 0;

    this.wheelOrientation = 0;
    this.carOrientation = 0;

    // car rigging
    this.root = new THREE.Object3D();

    this.frontLeftWheelRoot = new THREE.Object3D();
    this.frontRightWheelRoot = new THREE.Object3D();

    this.bodyMesh = null;

    this.frontLeftWheelMesh = null;
    this.frontRightWheelMesh = null;
    this.backLeftWheelMesh = null;
    this.backRightWheelMesh = null;

    this.bodyGeometry = null;
    this.wheelGeometry = null;

    this.bodyMaterials = null;
    this.wheelMaterials = null;

    // internal helper variables
    this.loaded = false;

    this.meshes = [];

    // API
    this.enableShadows = function (enable) {
        for (let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].castShadow = enable;
            this.meshes[i].receiveShadow = enable;
        }
    };

    this.setVisible = function (enable) {
        for (let i = 0; i < this.meshes.length; i++) {
            this.meshes[i].visible = enable;
            this.meshes[i].visible = enable;
        }
    };

    this.loadPartsBinary = function (bodyURL, wheelURL) {
        var loader = new THREE.BinaryLoader();

        loader.load(bodyURL, function (geometry, materials) {
            createBody(geometry, materials);
        });
        loader.load(wheelURL, function (geometry, materials) {
            createWheels(geometry, materials);
        });
    };

    // speed and wheels based on controls
    this.updateCarModel = function (delta, controls) {
        // speed up
        if (!controls.gearParking) {
            if (controls.accelerator) {
                // go straight
                if (controls.gearDrive) {
                    this.speed = THREE.Math.clamp(this.speed + delta * this.ACCELERATION,
                            0, this.MAX_SPEED);
                // go backward
                } else if (controls.gearReverse) {
                    this.speed = THREE.Math.clamp(this.speed - delta * this.ACCELERATION,
                        this.MAX_REVERSE_SPEED, 0);
                }
            }
            // break
            if (controls.break) {
                if (controls.gearDrive) {
                    this.speed = THREE.Math.clamp(this.speed - delta * this.BREAK,
                        0, this.MAX_SPEED);
                }
                else if (controls.gearReverse) {
                    this.speed = THREE.Math.clamp(this.speed + delta * this.BREAK,
                        this.MAX_REVERSE_SPEED, 0);
                }
            }
        }

        // steering
        if (controls.moveLeft) {
            if (this.wheelOrientation < 50) {
                this.wheelOrientation = THREE.Math.clamp(this.wheelOrientation +
                    delta * this.WHEEL_ANGULAR_ACCELERATION, -this.MAX_WHEEL_ROTATION,
                    this.MAX_WHEEL_ROTATION);
            }
        }
        if (controls.moveRight) {
            if (this.wheelOrientation < 50) {
                this.wheelOrientation = THREE.Math.clamp(this.wheelOrientation -
                    delta * this.WHEEL_ANGULAR_ACCELERATION, -this.MAX_WHEEL_ROTATION,
                    this.MAX_WHEEL_ROTATION);
            }
        }

        // speed down
        if (!controls.accelerator && !controls.break) {
            if (this.speed > 0) {
                this.speed = THREE.Math.clamp(this.speed - delta * this.DECCELERATION,
                    0, this.MAX_SPEED);
            } else {
                this.speed = THREE.Math.clamp(this.speed + delta * this.DECCELERATION,
                    this.MAX_REVERSE_SPEED, 0);
            }
        }

        // steering decay
        if (!(controls.moveLeft || controls.moveRight)) {
            if (this.wheelOrientation > 0) {
                this.wheelOrientation = THREE.Math.clamp(this.wheelOrientation -
                    delta * this.WHEEL_ANGULAR_DECCELERATION, 0, this.MAX_WHEEL_ROTATION);
            } else {
                this.wheelOrientation = THREE.Math.clamp(this.wheelOrientation +
                    delta * this.WHEEL_ANGULAR_DECCELERATION, -this.MAX_WHEEL_ROTATION, 0);
            }
        }

        // car update
        var forwardDelta = this.speed * delta;
        this.carOrientation += (forwardDelta * this.STEERING_RADIUS_RATIO) * this.wheelOrientation;

        // displacement
        this.root.position.x += Math.sin(this.carOrientation) * forwardDelta;
        this.root.position.z += Math.cos(this.carOrientation) * forwardDelta;

        // steering
        this.root.rotation.y = this.carOrientation;

        // wheels rolling
        var angularSpeedRatio = 1 / (this.modelScale * (this.wheelDiameter / 2));

        var wheelDelta = forwardDelta * angularSpeedRatio;
        if (this.loaded) {
            this.frontLeftWheelMesh.rotation.x += wheelDelta;
            this.frontRightWheelMesh.rotation.x += wheelDelta;
            this.backLeftWheelMesh.rotation.x += wheelDelta;
            this.backRightWheelMesh.rotation.x += wheelDelta;
        }

        // front wheels steering
        this.frontLeftWheelRoot.rotation.y = this.wheelOrientation;
        this.frontRightWheelRoot.rotation.y = this.wheelOrientation;
    };

    // internal helper methods
    function createBody(geometry, materials) {
        scope.bodyGeometry = geometry;
        scope.bodyMaterials = materials;

        createCar();
    }

    function createWheels(geometry, materials) {
        scope.wheelGeometry = geometry;
        scope.wheelMaterials = materials;

        createCar();
    }

    function createCar() {
        if (scope.bodyGeometry && scope.wheelGeometry) {
            // compute wheel geometry parameters
            if (scope.autoWheelGeometry) {
                scope.wheelGeometry.computeBoundingBox();

                var bb = scope.wheelGeometry.boundingBox;
                scope.wheelOffset.addVectors(bb.min, bb.max);
                scope.wheelOffset.multiplyScalar(0.5);

                scope.wheelDiameter = bb.max.y - bb.min.y;

                scope.wheelGeometry.center();
            }

            // rig the car
            var s = scope.modelScale, delta = new THREE.Vector3();

            var bodyFaceMaterial = new THREE.MultiMaterial(scope.bodyMaterials);
            var wheelFaceMaterial = new THREE.MultiMaterial(scope.wheelMaterials);

            // body
            scope.bodyMesh = new THREE.Mesh(scope.bodyGeometry, bodyFaceMaterial);
            scope.bodyMesh.scale.set(s, s, s);

            scope.root.add(scope.bodyMesh);

            // front left wheel
            delta.multiplyVectors(scope.wheelOffset, new THREE.Vector3(s, s, s));

            scope.frontLeftWheelRoot.position.add(delta);

            scope.frontLeftWheelMesh = new THREE.Mesh(scope.wheelGeometry, wheelFaceMaterial);
            scope.frontLeftWheelMesh.scale.set(s, s, s);

            scope.frontLeftWheelRoot.add(scope.frontLeftWheelMesh);
            scope.root.add(scope.frontLeftWheelRoot);

            // front right wheel
            delta.multiplyVectors(scope.wheelOffset, new THREE.Vector3(-s, s, s));

            scope.frontRightWheelRoot.position.add(delta);

            scope.frontRightWheelMesh = new THREE.Mesh(scope.wheelGeometry, wheelFaceMaterial);

            scope.frontRightWheelMesh.scale.set(s, s, s);

            scope.frontRightWheelRoot.add(scope.frontRightWheelMesh);
            scope.root.add(scope.frontRightWheelRoot);

            // back left wheel
            delta.multiplyVectors(scope.wheelOffset, new THREE.Vector3(s, s, -s));
            delta.z -= scope.backWheelOffset;

            scope.backLeftWheelMesh = new THREE.Mesh(scope.wheelGeometry, wheelFaceMaterial);

            scope.backLeftWheelMesh.position.add(delta);
            scope.backLeftWheelMesh.scale.set(s, s, s);

            scope.root.add(scope.backLeftWheelMesh);

            // back right wheel
            delta.multiplyVectors(scope.wheelOffset, new THREE.Vector3(-s, s, -s));
            delta.z -= scope.backWheelOffset;

            scope.backRightWheelMesh = new THREE.Mesh(scope.wheelGeometry, wheelFaceMaterial);

            scope.backRightWheelMesh.position.add(delta);
            scope.backRightWheelMesh.scale.set(s, s, s);

            scope.root.add(scope.backRightWheelMesh);

            // cache meshes
            scope.meshes = [scope.bodyMesh, scope.frontLeftWheelMesh, scope.frontRightWheelMesh,
                scope.backLeftWheelMesh, scope.backRightWheelMesh];

            // callback
            scope.loaded = true;

            if (scope.callback) {
                scope.callback(scope);
            }
        }
    }
};
