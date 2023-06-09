
function createCameraFront() {

    cameras.front = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

    cameras.front.position.x = 0;
    cameras.front.position.y = 15;
    cameras.front.position.z = 40;
    cameras.front.lookAt(0, 0, 0);
}

function createCameraGrass() {
    cameras.grass = new THREE.OrthographicCamera(
        grassSize / -2,
        grassSize / 2,
        grassSize / 2,
        grassSize / -2,
        0,
        1000,
    )

    cameras.grass.position.x = 0;
    cameras.grass.position.y = 0;
    cameras.grass.position.z = 200;
    cameras.grass.lookAt(0, 0, 300);
}

function createCameraStereo() {
	cameras.stereoCamera = new THREE.StereoCamera();
	cameras.stereoCamera.aspect = 0.5;
    cameras.stereoCamera.left = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

	cameras.stereoCamera.left.position.set(-0.2,1.70,0);
	cameras.stereoCamera.left.lookAt(0,1.70,-1);
    cameras.stereoCamera.right = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )
	cameras.stereoCamera.right.position.set(0.2,1.70,0)
	cameras.stereoCamera.right.lookAt(0,1.70,-1);
}
