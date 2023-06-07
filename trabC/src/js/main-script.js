//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
//General
//
var camera, renderer, scene, axis;
var geometry, mesh;

var materials = {};
var cameras = {};
var keysPressed = {};

var mainPlane;
// 0 - no update, 1 - Basic, 2 - Lambert, 3 - Phong, 4 - Toon;
// 5 - Grass Texture, 6 - Sky Texture;
var materialUpdate = 0;  
var directUpdate = false; 
var pointUpdate = false;
var spotUpdate = false;

//Ovni
var ovni;
var rotationSpeed = 0.025;
var ovniSpeed = 0.3;
var target;

//Cork-Oak
var corkOaksList = [];
var corkOaksNumber = 70;
var corkOakPositions = [];

//House
var house;

//Moon
var moon;
var directionalLight;
var ambientLight;

//Skydome
var skydome;
var sphereRadius = 32;

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

	createOvni(0,20,0);
    generateCoarOaks();
    createHouse(0,0,0);
    createGrassTexture();
    createMainPlane(0, 0, 0);

	createMoon(-50, 35, -10);
    
    createSkyTexture();
    createSkydome();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras() {
    createCameraFront();
    createCameraGrass();
    createCameraSide();
    createCameraTop();
    createCameraOrthographic();
    createCameraPerspective();
	createCameraStereo();
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

    house.position.set(x, y, z - 10);

}

function createMainPlane(x, y, z) {
    'use strict';
    mainPlane = new THREE.Object3D();
    geometry = new THREE.CylinderGeometry(70, 70, 0, 64);

    var mainPlaneMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });

    mesh = new THREE.Mesh(geometry, mainPlaneMaterial);
    mainPlane.add(mesh);

    scene.add(mainPlane);

    mainPlane.position.set(x, y, z);
}

function createSkydome() {
    geometry = new THREE.SphereGeometry(70, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5); 

    material = new THREE.MeshBasicMaterial({ 
        side: THREE.BackSide,
        map: skyTexture,
        transparent: true,
        opacity: 0.8,
    });
    
    skydome = new THREE.Mesh(geometry, material);
    scene.add(skydome);
}

/////////////////////////
/* GENERATE CORK-OAKS */
/////////////////////////
function generateCoarOaks(){

    for (var i = 0; i < corkOaksNumber; i++) {
        var phi, theta;

        do {
            phi = Math.random() * Math.PI - Math.PI / 2;
            theta = Math.random() * Math.PI * 2;
        } while (Math.abs(Math.sin(phi) * Math.cos(theta)) < 0.1);

        var radius = 47;

        var x = radius * Math.sin(phi) * Math.cos(theta);
        var y = radius * Math.cos(phi);
        var z = radius * Math.sin(phi) * Math.sin(theta);

        var rotation = Math.random() * Math.PI * 4;
        var corkOak = createCorkOak(x, y, z, rotation);

        while (corkOak.position.x > -10 && corkOak.position.x < 10) {
            corkOak.position.x = Math.random() * radius * 2 - radius;
        }

        while (corkOak.position.z > -10 && corkOak.position.z < 10) {
            corkOak.position.z = Math.random() * radius * 2 - radius;
        }

        corkOak.position.y = 0;

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
	updateLights();
	switch(materialUpdate) {
		case 1:
			updateMaterials(new THREE.MeshBasicMaterial());
			break;
		case 2:
			updateMaterials(new THREE.MeshLambertMaterial());
			break;
		case 3:
			updateMaterials(new THREE.MeshPhongMaterial());
			break;
		case 4:
			updateMaterials(new THREE.MeshToonMaterial());
			break;
        case 5:
            createGrassTexture();
            mainPlane.children[0].material.map = grassTexture;
            break;
        case 6:
            createSkyTexture();
            skydome.material.map = skyTexture;
            break;
	}
	materialUpdate = 0;
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
        mainPlane.children[0].material.map = grassTexture;
    }

    // Update skydome material
    if (skydome) {
        skydome.material = material.clone();
        skydome.material.map = skyTexture;
        skydome.material.side = THREE.BackSide;
        skydome.material.transparent = true;
        skydome.material.opacity = 0.8;
    }

	//Update moon material
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

function updateLights() {
	target.position.set(ovni.position.x, 0, ovni.position.z); //update spotlight target
	
	if (directUpdate) {
		if (directionalLight.intensity == 0) {
			directionalLight.intensity = 1;
		}
		else {
			directionalLight.intensity = 0;
		}
		directUpdate = false;
	}

	if (pointUpdate) {
		var pointColor = new THREE.Color('lawngreen');
    	updateOvniLight(pointColor);
		pointUpdate = false;
	}

	if (spotUpdate) {
		var spotColor = new THREE.Color('green');
		updateOvniLight(spotColor);
		spotUpdate = false;
	}

}

function updateOvniLight(color) {
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
	document.body.appendChild( VRButton.createButton( renderer ) );
	renderer.xr.enabled = true;

    createCameras();
    createScene();
    
    // camera = cameras.grass;
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
	if (renderer.xr.isPresenting) {
		renderer.xr.setAnimationLoop( animate);
	}
	else {
		requestAnimationFrame(animate);
	}
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
        case 49: //1
            materialUpdate = 5;
            break;
        case 50: //2
            materialUpdate = 6;
            break;
        case 68: //d
            directUpdate = !directUpdate;
            break;
		case 69: //e
			materialUpdate = 4;
			break;
		case 80: //p
			pointUpdate = true;
			break;
		case 81: //q
			materialUpdate = 2;
			break;
		case 82: //r
			materialUpdate = 1;
			break;
		case 83: //s
			spotUpdate = true;
			break;
		case 87: //w
			materialUpdate = 3;
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
