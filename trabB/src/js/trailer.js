function createTrailerMaterials() {
    
    materials.wheel = new THREE.MeshBasicMaterial({color: 0x111111, wireframe: true});
    materials.trailer = new THREE.MeshBasicMaterial({color: 0xaaaaaa, wireframe: true});
    materials.trailerUnder = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});

}

function addTrailerBase(obj, x, y, z) {
    'use strict';

    var trailerWidth = 16;
    var trailerHeight = 15;
    var trailerLength = 45;

    const geometry = new THREE.BoxGeometry(trailerWidth, trailerHeight, trailerLength);

    const offsetY = trailerHeight / 2;
    geometry.translate(0, offsetY, 0);

    const mesh = new THREE.Mesh(geometry, materials.trailer);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


function addTrailerUnder(obj, x, y, z){
    'use strict';

    var trailerUnderWidth = 12;
    var trailerUnderHeight = 8;
    var trailerUnderLength = 30;

    geometry = new THREE.BoxGeometry(trailerUnderWidth, trailerUnderHeight, trailerUnderLength);

    const offsetY = trailerUnderHeight / 2;
    geometry.translate(0, offsetY, 0);

    const mesh = new THREE.Mesh(geometry, materials.trailerUnder);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function addTrailerConnector(obj, x, y, z){
    'use strict';

    var trailerConnectorWidth = 16;
    var trailerConnectorHeight = 4;
    var trailerConnectorLength = 4;

    geometry = new THREE.BoxGeometry(trailerConnectorWidth, trailerConnectorHeight, trailerConnectorLength);

    // 20 is half of the trailer height
    const offsetY = trailerConnectorHeight / 2;
    geometry.translate(0, offsetY, 0);

    const mesh = new THREE.Mesh(geometry, materials.trailer);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addWheel(obj, x, y, z, rx, ry, rz){
    'use strict';

    geometry = new THREE.CylinderGeometry( 4, 4, 2, 32 );

    mesh = new THREE.Mesh(geometry, materials.wheel);
    mesh.position.set(x, y, z);
    mesh.rotation.x = rx;
    mesh.rotation.y = ry;
    mesh.rotation.z = rz;
    obj.add(mesh);

}

function updateTrailerPosition(){
    'use strict';

    if (trailerMovingForward)
        trailer.position.z += trailerSpeed;
    if (trailerMovingBackward)
        trailer.position.z -= trailerSpeed;
    if (trailerMovingLeft)
        trailer.position.x += trailerSpeed;
    if (trailerMovingRight)
        trailer.position.x -= trailerSpeed;
}
