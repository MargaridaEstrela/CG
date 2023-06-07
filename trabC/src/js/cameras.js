
function createCameraFront() {

    cameras.front = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

    cameras.front.position.x = 0;
    cameras.front.position.y = 30;
    cameras.front.position.z = 75;
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

function createCameraSide() {

    cameras.side = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

    cameras.side.position.x = 110;
    cameras.side.position.y = 10;
    cameras.side.position.z = 0;
    cameras.side.lookAt(0, 0, 0);
}

function createCameraTop() {

    cameras.top = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

    cameras.top.position.x = 0;
    cameras.top.position.y = 150;
    cameras.top.position.z = 0;
    cameras.top.lookAt(0, 0, 0);
}

function createCameraOrthographic() {
    
    cameras.ortographic = new THREE.OrthographicCamera(
        window.innerWidth / -12,
        window.innerWidth / 12,
        window.innerHeight / 12,
        window.innerHeight / -12,
        -1000,
        1000,
    )

    cameras.ortographic.position.x = 30;
    cameras.ortographic.position.y = 30;
    cameras.ortographic.position.z = 30;
    cameras.ortographic.lookAt(0, 0, 0);

}

function createCameraPerspective() {
    
    cameras.perspective = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

    cameras.perspective.position.x = 50;
    cameras.perspective.position.y = 50;
    cameras.perspective.position.z = 50;
    cameras.perspective.lookAt(0, 0, 0);

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
