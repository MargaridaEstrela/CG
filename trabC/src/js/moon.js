function addMoon(x, y, z) {
	'use strict'
	moon = new THREE.Object3D();
	geometry = new THREE.SphereGeometry(10, 64, 32);

	var moonMaterial = new THREE.MeshBasicMaterial();
	moonMaterial.color.set(0xfBB81f);

	mesh = new THREE.Mesh(geometry, moonMaterial);
	mesh.position.set(x,y,z);
	moon.add(mesh);
	scene.add(moon);
}

function addDirectionalLight() {
	'use strict'
	directionalLight = new THREE.DirectionalLight(0xfBB81f , 1 );
	var dirTarget = new THREE.Object3D();
        dirTarget.position.set(2, 0, 2);
        directionalLight.target = dirTarget;
	scene.add(directionalLight);
        scene.add(dirTarget);
}

function addAmbientLight() {
	'use strict'
	ambientLight = new THREE.AmbientLight(0xfBB81f, 0.2);
	scene.add(ambientLight);
}


