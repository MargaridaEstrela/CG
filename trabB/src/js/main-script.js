//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

//General
var camera, renderer, scene;
var geometry, mesh;

var materials = {};
var cameras = {};
var keysPressed = {};

// Trailer
var trailer;
var trailerSpeed = 0.3;
var trailerWidth = 16;
var trailerLength = 49;
var trailerFrontDist = 22.5 + 4;
var trailerBackDist = 22.5;

//Robot
var robot;
var robotState = [0,0,0,0]; //1 - Head, 2 - Arms, 3 - Thighs, 4 - Feet
var armSpeed = 0.05;
var rotationSpeed = 0.025;
var robotWidth = 22.5;
var robotFrontDist = 5;
var robotBackDist = 30;

//Colisions
var robotAABB, trailerAABB;
var colisionON = false;
var locked = false;
var ongoingAnim = false;
var truck = false;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.9,0.9,0.9);

    scene.add(new THREE.AxisHelper(10));

    
    materials.default = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    createTrailer(30, 9, -50);
    createRobot(0, 20, 20);
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras() {
    createCameraFront();
    createCameraSide();
    createCameraTop();
    createCameraOrthographic();
    createCameraPerspective();
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createRobot(x, y, z){
    'use strict';

    robot = new THREE.Object3D();
	createRobotMaterials();

    addAbdomen(robot, 0, 0, 0);

    scene.add(robot);

    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;
}


function createTrailer(x, y, z) {
    'use strict';

    trailer = new THREE.Object3D();

    createTrailerMaterials();

    addTrailerBase(trailer, 0, 10, 2.5);
    addTrailerUnder(trailer, 0, 2, -5);
    addTrailerConnector(trailer, 0, 10, 27);
    // add a wheel standing on the ground
    addWheel(trailer, 7, 5, -15, 0, 0, Math.PI / 2);
    addWheel(trailer, 7, 5, -5, 0, 0, Math.PI / 2);
    addWheel(trailer, -7, 5, -15, 0, 0, Math.PI / 2);
    addWheel(trailer, -7, 5, -5, 0, 0, Math.PI / 2);

    scene.add(trailer);

    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;
}

function updateRobotState() {
	if (robotState[0] == 41 && robotState[1] == 12 && robotState[2] == 21 && robotState[3] == 41) {
		truck = true;
	}
	else {
		truck = false;
	}
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

	if(!truck || ongoingAnim) { return; }

    var robotXmin = robot.position.x - robotWidth / 2;
    var robotXmax = robot.position.x + robotWidth / 2;
    var robotZmin = robot.position.z - robotBackDist;
    var robotZmax = robot.position.z + robotFrontDist;

    var trailerXmin = trailer.position.x - trailerWidth / 2;
    var trailerXmax = trailer.position.x + trailerWidth / 2;
    var trailerZmin = trailer.position.z - trailerBackDist;
    var trailerZmax = trailer.position.z + trailerFrontDist;

    var boundXmin = (trailerXmin >= robotXmin) && (trailerXmin <= robotXmax);
	var boundXmax = (trailerXmax >= robotXmin) && (trailerXmax <= robotXmax);
	var boundZmin = (trailerZmin >= robotZmin) && (trailerZmin <= robotZmax);
    var boundZmax = (trailerZmax >= robotZmin) && (trailerZmax <= robotZmax);  
	var containedX = (trailerXmin <= robotXmin) && (trailerXmax >= robotXmax);
	var containedZ = (trailerZmin <= robotZmin) && (trailerZmax >= robotZmax);
	var contained = (containedX && (boundZmin || boundZmax)) || (containedZ && (boundXmin || boundXmax));

    colisionON = (boundXmin || boundXmax) && (boundZmin || boundZmax) || contained;

    if (colisionON == true && locked == false) {
		ongoingAnim = true;
       	deactivateInput();
    }

	else if (colisionON == false && locked == true) {
		locked = false;
	}
}

/////////////////////
/* START ANIMATION */
/////////////////////

function updateAnimation(){
    'use strict';
	if (!ongoingAnim) { return; }
	var xDest = 0 - trailer.position.x;
	var xOrientation = Math.sign(xDest); 
	var zDest = -20 - trailer.position.z;
	var zOrientation= Math.sign(zDest);
	if (Math.abs(xDest) > trailerSpeed) {
		xDest = Math.sign(xDest) * trailerSpeed;
	}
	if (Math.abs(zDest) > trailerSpeed) {
		zDest = Math.sign(zDest) * trailerSpeed;
	}
	if (xDest == 0 && zDest == 0) {
		ongoingAnim = false;
		locked = true;
	}
	else {
		trailer.position.set(trailer.position.x + xDest, trailer.position.y, trailer.position.z + zDest);
	}
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

    updateTrailerPosition();
    updateRobot();
	updateRobotState();

    checkCollisions();
	updateAnimation();
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();

    camera = cameras.front;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    update();

    render();

    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    if (ongoingAnim) {
        return;
    }

    switch (e.keyCode) {
        case 37: //left
            keysPressed.left = true;
            break;
        case 38: //up
            keysPressed.up = true;
            break;
        case 39: //right
            keysPressed.right = true;
            break;
        case 40: //down
            keysPressed.down = true;
            break;
        case 49: //1
            camera = cameras.front;
            break;
        case 50: //2
            camera = cameras.side;
            break;
        case 51: //3
            camera = cameras.top;
            break;
        case 52: //4
            camera = cameras.ortographic;
            break;
        case 53: //5
            camera = cameras.perspective;
            break;
        case 54: //6
            // toggle wireframe for every material
            for (var material in materials) {
                materials[material].wireframe = !materials[material].wireframe;
            }
            break;
		case 65: //a
			keysPressed.a = true;
			break;
		case 68: //d
			keysPressed.d = true;
		    break;
		case 69: //e
			keysPressed.e = true;
			break;
		case 70: //f
			keysPressed.f = true;
			break;
		case 81: //q
			keysPressed.q = true;
			break;
		case 82: //r
		    keysPressed.r = true;
		    break;
		case 83: //s;
			keysPressed.s = true;
			break;
		case 87: //w
			keysPressed.w = true;
			break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

	if (ongoingAnim) { 
        return; 
    }

    switch (e.keyCode) {
        case 37: //left
            keysPressed.left = false;
            break;
        case 38: //up
            keysPressed.up = false;
            break;
        case 39: //right
            keysPressed.right = false;
            break;
        case 40: //down
            keysPressed.down = false;
            break;
		case 65: //a
            keysPressed.a = false;
            break;
        case 68: //d
            keysPressed.d = false;
	        break;
        case 69: //e
            keysPressed.e = false;
            break;
        case 70: //f
            keysPressed.f = false;
            break;
        case 81: //q
            keysPressed.q = false;
            break;
	    case 82: //r
	        keysPressed.r = false;
	        break;
        case 83: //s;
            keysPressed.s = false;
            break;
        case 87: //w
            keysPressed.w = false;
            break;
    }
}

///////////////////////
/* DEACTIVATE INPUT */
///////////////////////
function deactivateInput() {

    for (var key in keysPressed) {
        keysPressed[key] = false;
    }
}
