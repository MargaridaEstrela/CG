
function createCameraFront() {

    cameraFront = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    
    cameraFront.position.x = 0;
    cameraFront.position.y = 15;
    cameraFront.position.z = 40;
    cameraFront.lookAt(0, 15, 0);
}

function createCameraSide() {

    cameraSide = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    cameraSide.position.x = 80;
    cameraSide.position.y = 15;
    cameraSide.position.z = 0;
    cameraSide.lookAt(0, 15, 0);

}

function createCameraTop() {

    cameraTop = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

    cameraTop.position.x = 0;
    cameraTop.position.y = 40;
    cameraTop.position.z = 0;
    cameraTop.lookAt(0, 0, 0);
}

function createCameraOrthographic() {
    
    cameraOrtographic = new THREE.OrthographicCamera(
        window.innerWidth / -20,
        window.innerWidth / 20,
        window.innerHeight / 20,
        window.innerHeight / -20,
        -1000,
        1000,
    )

    cameraOrtographic.position.x = 30;
    cameraOrtographic.position.y = 30;
    cameraOrtographic.position.z = 30;
    cameraOrtographic.lookAt(0, 0, 0);

}

function createCameraPerspective() {
    
    cameraPerspective = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    )

    cameraPerspective.position.x = 50;
    cameraPerspective.position.y = 50;
    cameraPerspective.position.z = 50;
    cameraPerspective.lookAt(0, 0, 0);

}