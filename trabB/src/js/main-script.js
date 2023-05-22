//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
// Cameras
var cameras = {};

// Trailer
var trailer;
var trailerSpeed = 0.3;
var trailerWidth = 16;
var trailerLength = 49;
var trailerFrontDist = 22.5 + 4;
var trailerBackDist = 22.5;
var trailerMovingLeft = false;
var trailerMovingRight = false;
var trailerMovingForward = false;
var trailerMovingBackward = false;

//Robot
var robot;
var robotState = [0,0,0,0]; //1 - Head, 2 - Arms, 3 - Thighs, 4 - Feet
var armSpeed = 0.05;
var rotationSpeed = 0.025;
var robotWidth = 22.5;
var robotFrontDist = 5;
var robotBackDist = 30;
var qPressed = false;
var aPressed = false;
var wPressed = false;
var sPressed = false;
var ePressed = false;
var dPressed = false;
var rPressed = false;
var fPressed = false;

//Colisions
var robotAABB, trailerAABB;
var colisionON = false;
var locked = false;

//General
var camera, renderer, scene;
var geometry, mesh;

var materials = {};

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
    addWheel(trailer, 7, 4.5, -15, 0, 0, Math.PI / 2);
    addWheel(trailer, 7, 4.5, -5, 0, 0, Math.PI / 2);
    addWheel(trailer, -7, 4.5, -15, 0, 0, Math.PI / 2);
    addWheel(trailer, -7, 4.5, -5, 0, 0, Math.PI / 2);

    scene.add(trailer);

    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

    var robotXmin = robot.position.x - robotWidth / 2;
    var robotXmax = robot.position.x + robotWidth / 2;
    var robotZmin = robot.position.z - robotBackDist;
    var robotZmax = robot.position.z + robotFrontDist;

    const geometry = new THREE.BoxGeometry(robotXmax - robotXmin, 9, robotZmax - robotZmin);
    const mesh = new THREE.Mesh(geometry, materials.trailer);
    mesh.position.set(robot.position.x, robot.position.y, robot.position.z);
    scene.add(mesh);

    var trailerXmin = robot.position.x - trailerWidth / 2;
    var trailerXmax = robot.position.x + trailerWidth / 2;
    var trailerZmin = robot.position.z - trailerBackDist;
    var trailerZmax = robot.position.z + trailerFrontDist;

    const geometry1 = new THREE.BoxGeometry(trailerXmax - trailerXmin, 9, trailerZmax - trailerZmin);
    const mesh1 = new THREE.Mesh(geometry1, materials.trailer);
    mesh1.position.set(trailer.position.x, trailer.position.y, trailer.position.z);
    //scene.add(mesh1);

    var colisionLeft1 = trailerXmax <= robotXmax && trailerXmax >= robotXmin &&
                        (trailerZmax >= robotZmin && trailerZmax <= robotZmax || trailerZmin <= robotZmax);

    colisionON = (trailerXmin <= robotXmax || trailerXmax >= trailerXmin) &&
                (trailerZmax >= robotZmin || trailerZmin <= robotZmax);

    if (colisionON) {
        handleCollisions();
    }
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

    desactivateInput();
    startAnimation();
}

/////////////////////
/* START ANIMATION */
/////////////////////
function startAnimation(){
    'use strict';

    trailer.position.set(0, 9, -20);
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

    updateTrailerPosition();
    updateRobot();

    checkCollisions();
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

    colisionON = false;
    locked = true;
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

    if (colisionON) {
        return;
    }

    switch (e.keyCode) {
        case 37: //left
            trailerMovingLeft = true;
            break;
        case 38: //up
            trailerMovingForward = true;
            break;
        case 39: //right
            trailerMovingRight = true;
            break;
        case 40: //down
            trailerMovingBackward = true;
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
			aPressed = true;
			break;
		case 68: //d
			dPressed = true;
		    	break;
		case 69: //e
			ePressed = true;
			break;
		case 70: //f
			fPressed = true;
			break;
		case 81: //q
			qPressed = true;
			break;
		case 82: //r
		    	rPressed = true;
		    	break;
		case 83: //s;
			sPressed = true;
			break;
		case 87: //w
			wPressed = true;
			break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch (e.keyCode) {
        case 37: //left
            trailerMovingLeft = false;
            break;
        case 38: //up
            trailerMovingForward = false;
            break;
        case 39: //right
            trailerMovingRight = false;
            break;
        case 40: //down
            trailerMovingBackward = false;
            break;
		case 65: //a
            aPressed = false;
            break;
        case 68: //d
            dPressed = false;
	    break;
        case 69: //e
            ePressed = false;
            break;
        case 70: //f
            fPressed = false;
            break;
        case 81: //q
            qPressed = false;
            break;
	case 82: //r
	    rPressed = false;
	    break;
        case 83: //s;
            sPressed = false;
            break;
        case 87: //w
            wPressed = false;
            break;
    }
}

///////////////////////
/* DESACTIVATE INPUT */
///////////////////////
function desactivateInput() {

    //Trailer
    trailerMovingLeft = false;
    trailerMovingRight = false;
    trailerMovingForward = false;
    trailerMovingBackward = false;

    //Commands
    qPressed = false;
    aPressed = false;
    wPressed = false;
    sPressed = false;
    ePressed = false;
    dPressed = false;
    rPressed = false;
    fPressed = false;
}
