//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
//General
var camera, renderer, scene, axis;
var geometry, mesh;

var materials = {};
var cameras = {};
var keysPressed = {};

//Ovni
var ovni;
var rotationSpeed = 0.025;
var ovniSpeed = 0.3;
var target;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.9,0.9,0.9);
    axis = new THREE.AxesHelper(10);
    axis.visible = false;
    scene.add(axis);

	createOvni(0,30,0);

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

function createOvni(x, y, z) {
	'use strict'
	ovni = new THREE.Object3D();
	addBody(ovni, 0, 0, 0);
	addCockpit(ovni, 0, 0.6, 0);
	addCylinder(ovni, 0, -1.2,0);
	addBall(ovni,1.8, -1, 0);
	addBall(ovni, -1.8, -1, 0);
	addBall(ovni, 0, -1, -1.8);
	addBall(ovni, 0, -1, 1.8);
	addPlane(ovni, 0, -10, 0);
	scene.add(ovni);

	ovni.position.x = x;
	ovni.position.y = y;
	ovni.position.z = z;
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
	updateOvniPosition();
	target.position.set(ovni.position.x, 0, ovni.position.z); //update spotlight target

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
	switch(e.keyCode) {
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
		case 69: //e
			updateMaterials(new THREE.MeshToonMaterial());
			break;
		case 80: //p
			updateOvniLights(new THREE.Color('lawngreen'));
			break;
		case 81: //q
			updateMaterials(new THREE.MeshLambertMaterial());
			break;
		case 82: //r
			updateMaterials(new THREE.MeshBasicMaterial());
			break;
		case 83: //s
			updateOvniLights(new THREE.Color('yellow'));
			break;
		case 87: //w
			updateMaterials(new THREE.MeshPhongMaterial());
			break;
	}
}

function updateMaterials(material) {
	ovni.traverse(function(child) {
	if (child instanceof THREE.Mesh) {
		var color = child.material.color;
		child.material = material.clone();
		child.material.color.set(color);
    }
    });
}


function updateOvniLights(color) {
    ovni.traverse(function(child) {
    if (child instanceof THREE.Light) {
        if (child.color.equals(color) ) {
            if (child.intensity == 0) {
                child.intensity = 0.5;
            }
            else {
                child.intensity = 0;
            }
        }
	}
    });
}


///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

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
	}
}
