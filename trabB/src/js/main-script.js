//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
// Cameras
var cameras = {};

// Trailer
var trailer;
var trailerSpeed = 0.3;
var trailerMovingLeft = false;
var trailerMovingRight = false;
var trailerMovingForward = false;
var trailerMovingBackward = false;

//Robot
var robot;
var robotState = [0,0,0,0]; //1 - Head, 2 - Arms, 3 - Thighs, 4 - Feet
var armSpeed = 0.05;
var rotationSpeed = 0.025;
var qPressed = false;
var aPressed = false;
var wPressed = false;
var sPressed = false;
var ePressed = false;
var dPressed = false;
var rPressed = false;
var fPressed = false;

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

    createTrailer(0, 9, -25);
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

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

    updateTrailerPosition();
    updateRobot();
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
