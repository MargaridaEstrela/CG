
function addBody(obj, x, y, z) {
	'use strict'
	var body = new THREE.Object3D();
	geometry = new THREE.SphereGeometry(1.2,64,32);

	geometry.scale(4,1,4);
	var bodyMaterial = new THREE.MeshBasicMaterial();
	bodyMaterial.color.set('grey');

	mesh = new THREE.Mesh(geometry, bodyMaterial);
	mesh.position.set(x,y,z);
	body.add(mesh);

	obj.add(body);
}

function addCockpit(obj, x, y, z) {
	'use strict'
	var cockpit = new THREE.Object3D();
	geometry = new THREE.SphereGeometry(2,64,32);

	var cockpitMaterial = new THREE.MeshBasicMaterial();
	cockpitMaterial.color.set('lawngreen');

	mesh = new THREE.Mesh(geometry, cockpitMaterial);
	mesh.position.set(x,y,z);
	cockpit.add(mesh);
	obj.add(cockpit);
}

function addPlane(obj, x, y, z) {
        'use strict'
        var plane = new THREE.Object3D();
        geometry = new THREE.BoxGeometry(60,3,60);

        var planeMaterial = new THREE.MeshBasicMaterial();
        planeMaterial.color.set('grey');

        mesh = new THREE.Mesh(geometry, planeMaterial);
        mesh.position.set(x,y,z);
        plane.add(mesh);
        obj.add(plane);
}



function addCylinder(obj, x ,y ,z) {
	'use strict'
	var cylinder = new THREE.Object3D();
	geometry = new THREE.CylinderGeometry(1.2, 1.2, 1.2, 32);

	var cylinderMaterial = new THREE.MeshBasicMaterial();
	cylinderMaterial.color.set('grey');

	mesh = new THREE.Mesh(geometry, cylinderMaterial);
	mesh.position.set(x,y,z);
	cylinder.add(mesh);
	obj.add(cylinder);

	var spotLight = new THREE.SpotLight('yellow');
	spotLight.position.set(x , y , z);
	spotLight.intensity = 0.5;
	spotLight.angle = Math.PI / 4;
	target = new THREE.Object3D();
	target.position.set(x, 0, z);
	spotLight.target = target;
	scene.add(target);
	obj.add(spotLight);
}

function addBall(obj, x, y, z) {
	'use strict'
	var ball = new THREE.Object3D();
	geometry = new THREE.SphereGeometry(0.8,64,32);

	var ballMaterial = new THREE.MeshBasicMaterial();
	ballMaterial.color.set('lawngreen');

	mesh = new THREE.Mesh(geometry, ballMaterial);
	mesh.position.set(x,y,z);
	ball.add(mesh);
	obj.add(ball);

	var light = new THREE.PointLight('lawngreen', 0.5, 10);
	light.position.set( x + Math.sign(x) * 2 , y - 3, z);
	obj.add(light);
}

function updateOvniPosition() {
    'use strict';

    var movementVector = new THREE.Vector3();

    if (keysPressed.up)
        movementVector.z += 1;
    if (keysPressed.down)
        movementVector.z -= 1;
    if (keysPressed.left)
        movementVector.x += 1;
    if (keysPressed.right)
        movementVector.x -= 1;

    movementVector.normalize().multiplyScalar(ovniSpeed);
    ovni.position.add(movementVector);
	ovni.rotateY(rotationSpeed * Math.PI); 
}

