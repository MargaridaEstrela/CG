function createRobotMaterials() {

    materials.eye = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    materials.blue = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    materials.metalic = new THREE.MeshBasicMaterial({color: 0x9c9c9c, wireframe: true});

}

function addHead(obj, x, y, z){
    'use strict';

    var head = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(4, 4, 4);
    mesh = new THREE.Mesh(geometry, materials.blue);

    head.add(mesh);
    head.position.set(x, y, z);
    geometry.translate(0, 2, 2);

    obj.add(head);

    addEye(head, -1, 2, 4.25);
    addEye(head, 1, 2, 4.25);
    addAntenna(head, -1, 4, 3);
    addAntenna(head, 1, 4, 3);
}

function addEye(obj, x, y, z){
    'use strict';
    geometry = new THREE.BoxGeometry(1, 1, 0.5);
    mesh = new THREE.Mesh(geometry, materials.eye);

    geometry.translate(0, 0.5, 0);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addAntenna(obj, x, y, z){
    'use strict';
    geometry = new THREE.BoxGeometry(1, 2, 1);
    mesh = new THREE.Mesh(geometry, materials.metalic);

    geometry.translate(0, 1, 0);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTorso(obj, x, y, z){
    'use strict';

    var torso = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(16, 6, 10);
    mesh = new THREE.Mesh(geometry, materials.default);

    torso.add(mesh);
    torso.position.set(x, y, z);

    geometry.translate(0, 3, 0);

    obj.add(torso);

    addHead(torso, 0, 6, -5);
    addUpperArm(torso, 9.5, 0, -6.5);
    addUpperArm(torso, -9.5, 0, -6.5);
}

function addUpperArm(obj, x, y, z){
    'use strict';

    var upperArm = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(3, 6, 3);
    mesh = new THREE.Mesh(geometry, materials.default);

    upperArm.add(mesh);
    upperArm.position.set(x, y, z);

    geometry.translate(0, 3, 0);

    obj.add(upperArm);

    addLowerArm(upperArm, -0.75, -3, 5);
    addLowerArm(upperArm, 0.75, -3, 5);
    addExhaust(upperArm, 0, 0, -2);

}

function addLowerArm(obj, x, y, z){
    'use strict';
    geometry = new THREE.BoxGeometry(2, 3, 13);
    mesh = new THREE.Mesh(geometry, materials.blue);

    geometry.translate(0, 1.5, 0);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addExhaust(obj, x, y, z){
    'use strict';
    geometry = new THREE.BoxGeometry(1, 8, 1);
    mesh = new THREE.Mesh(geometry, materials.metalic);

    geometry.translate(0, 4, 0);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addAbdomen(obj, x, y, z){
    'use strict';

    var abdomen = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(10, 4, 10);
    mesh = new THREE.Mesh(geometry, materials.default);

    abdomen.add(mesh);
    abdomen.position.set(x, y, z);

    geometry.translate(0, 2, 0);

    obj.add(abdomen);

    addTorso(abdomen, 0, 4, 0);
    addWaist(abdomen, 0, -6, 0);
}

function addWaist(obj, x, y, z){
    'use strict';

    var waist = new THREE.Object3D();

    geometry = new THREE.BoxGeometry(14, 6, 10);
    mesh = new THREE.Mesh(geometry, materials.metalic);

    waist.add(mesh);
    waist.position.set(x, y, z);

    geometry.translate(0, 3, 0);

    obj.add(waist);

	addThigh(waist,3.5,0,-1);
	addThigh(waist,-3.5,0,-1);
    addWheel(waist, 7, 3, 0, 0, 0, Math.PI/2);
    addWheel(waist, -7, 3, 0, 0, 0, Math.PI/2);
}

function addThigh(obj, x, y, z){
	'use strict';
	
	var thigh = new THREE.Object3D();
	var sign = Math.sign(x);

	geometry = new THREE.BoxGeometry(2,5,2);
	mesh = new THREE.Mesh(geometry, materials.metalic);

	thigh.add(mesh);
	thigh.position.set(x, y, z);

	geometry.translate(0,-2.5,1);

	obj.add(thigh);

	addLeg(thigh,sign * 0.5,-25,1);

}

function addLeg(obj, x, y, z){
	'use strict';

	var leg = new THREE.Object3D();
	var sign = Math.sign(x);

	geometry = new THREE.BoxGeometry(4,20,4);
	mesh = new THREE.Mesh(geometry, materials.blue);

	leg.add(mesh);
	leg.position.set(x,y,z);

	geometry.translate(0,10,0);

	obj.add(leg);

	addWheel(leg,sign * 3,14,0,0,0,Math.PI/2);
	addWheel(leg,sign * 3,4,0,0,0,Math.PI/2);
	addFoot(leg,0, 0, 2);
}


function addFoot(obj, x, y, z){
	'use strict';

	var foot = new THREE.Object3D();
	var sign = Math.sign(x);

	geometry = new THREE.BoxGeometry(4,4,6);
	mesh = new THREE.Mesh(geometry, materials.blue);

	foot.add(mesh);
	foot.position.set(x, y, z);

	geometry.translate(0,2,3)

	obj.add(foot);

}



