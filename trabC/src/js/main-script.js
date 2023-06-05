//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
//General
var camera, renderer, scene, axis;
var geometry, mesh;

var materials = {};
var cameras = {};
var keysPressed = {};

var mainPlane;

//Ovni
var ovni;
var rotationSpeed = 0.025;
var ovniSpeed = 0.3;
var target;

//Cork-Oak
var corkOaksList = [];
var corkOaksNumber = 50;
var corkOakPositions = [];

//House
var house;

//Moon
var moon;
var directionalLight;
var ambientLight;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0,0,0);
    axis = new THREE.AxesHelper(10);
    axis.visible = false;
    scene.add(axis);

	createOvni(0,30,0);
    generateCoarOaks();
    createHouse(0,1.5,0);
    createMainPlane(0, 0, 0);
	createMoon(-60, 30, -60); 
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
function createCorkOak(x, y, z, rotation) {
    'use strict';

    var corkOak = new THREE.Object3D();

    var scaleY = Math.random() * 0.5 + 0.5; // Random value between 0.5 and 1

    corkOak.scale.set(1, scaleY, 1);

    addMainTrunk(corkOak, 0, 0, 0);

    scene.add(corkOak);

    corkOak.position.set(x, y, z);
    corkOak.rotation.set(0, rotation, 0);

    return corkOak;
}

function createMoon(x, y, z) {
	'use strict'
	addMoon(x,y,z);
	addDirectionalLight();
	addAmbientLight();
}

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
	scene.add(ovni);

	ovni.position.x = x;
	ovni.position.y = y;
	ovni.position.z = z;
}

function createHouse(x, y, z) {
    'use strict';

    house = new THREE.Object3D();
    addHouseStructure(house, x, y, z);
    addDoor(house, x, y, z);
    addWindows(house, x, y, z);
    addRoof(house, x, y, z);
    addChimney(house, x, y, z);
    addCollumns(house, x, y, z);
    addLine(house, x, y, z);

    scene.add(house);

    house.position.set(x, y, z);

}

function createMainPlane(x, y, z) {
    'use strict';
    mainPlane = new THREE.Object3D();
    geometry = new THREE.BoxGeometry(100, 1, 100);

    var mainPlaneMaterial = new THREE.MeshBasicMaterial();
    mainPlaneMaterial.color.set('oliveDrab');

    mesh = new THREE.Mesh(geometry, mainPlaneMaterial);
    mainPlane.add(mesh);

    scene.add(mainPlane);

    mainPlane.position.set(x, y, z);
}


/////////////////////////
/* GENERATE COARK-OAKS */
/////////////////////////
function generateCoarOaks(){

    for (var i = 0; i < corkOaksNumber; i++) {
        var x;
        do {
            x = Math.random() * 90 - 45;
        } while (x > -10 && x < 10);
        var z;
        do {
            z = Math.random() * 90 - 45;
        } while (z > -10 && z < 10);
        corkOakPositions.push({ x: x, z: z });
    }

    for (var i = 0; i < corkOaksNumber; i++) {
        var position = corkOakPositions[i];
        var rotation = Math.random() * Math.PI * 4;
        var corkOak = createCorkOak(position.x, 1.5, position.z, rotation);
        corkOaksList.push(corkOak);
    }

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
		case 68: //d
			if (directionalLight.intensity == 0) {
				directionalLight.intensity = 1;
			}
			else {
				directionalLight.intensity = 0;
			}
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
			updateOvniLights(new THREE.Color('green'));
			break;
		case 87: //w
			updateMaterials(new THREE.MeshPhongMaterial());
			break;
	}
}

function updateMaterials(material) {
    // Update ovni material
	ovni.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            var color = child.material.color;
            child.material = material.clone();
            child.material.color.set(color);
        }
    });

    // Update cork oaks material
    corkOaksList.forEach(function(corkOak){
        corkOak.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                var color = child.material.color.clone();
                child.material = material.clone();
                child.material.color.set(color);
            }
        });
    });

    // Update house materials
    house.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            var color = child.material.color;
            child.material = material.clone();
            child.material.color.set(color);
        }
    });

    // Update mainPlane material
    if (mainPlane) {
        var color = mainPlane.children[0].material.color.clone();
        mainPlane.children[0].material = material.clone();
        mainPlane.children[0].material.color.copy(color);
    }
	moon.traverse(function(child) {
		if (child instanceof THREE.Mesh) {
			var color = child.material.color;
			child.material = material.clone();
			child.material.color.set(color);
			if (!(material instanceof(THREE.MeshBasicMaterial))) {
				child.material.emissive.set(0xfBB81f);
				child.material.emissiveIntensity = 1;
			}
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
