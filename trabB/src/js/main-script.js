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

    createRobot(0, 0, 0);
    createTrailer(0, 0, -30);
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

    var robot = new THREE.Object3D();

    addHead(robot, 1, 1, 1);

    scene.add(robot);

    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;
}

function addHead(obj, x, y, z){
    'use strict';

    var head = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(4, 4, 4);
    mesh = new THREE.Mesh(geometry, materials.default);

    head.add(mesh);
    head.position.set(x, y, z);

    // Calculate the offset to move the head so that its center aligns with the origin
    var headOffset = new THREE.Vector3(2, 0, 2);
    head.position.sub(headOffset);

    addEye(head, 1, 2, 4);
    addEye(head, 3, 2, 4);
    addAntenna(head, 6.5, 8, 4);
    addAntenna(head, 4, 8, 4);

    obj.add(head);
}

function addEye(obj, x, y, z){
    'use strict';
    geometry = new THREE.BoxGeometry(1, 1, 0.5);
    mesh = new THREE.Mesh(geometry, materials.default);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addAntenna(obj, x, y, z){
    'use strict';
    geometry = new THREE.BoxGeometry(1, 2, 1);
    mesh = new THREE.Mesh(geometry, materials.default);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTrailer(x, y, z) {
    'use strict';

    trailer = new THREE.Object3D();

    createTrailerMaterials();

    addTrailerBase(trailer, 0, 9, 0);
    addTrailerUnder(trailer, 0, 4, -4);
    addTrailerConnector(trailer, 0, 9, 22);
    // add a wheel standing on the ground
    addWheel(trailer, 7, 4, -15, 0, 0, Math.PI / 2);
    addWheel(trailer, 7, 4, -5, 0, 0, Math.PI / 2);
    addWheel(trailer, -7, 4, -15, 0, 0, Math.PI / 2);
    addWheel(trailer, -7, 4, -5, 0, 0, Math.PI / 2);

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
    }
}