function addTrailerBase(obj, x, y, z) {
    'use strict';

    var trailerWidth = 16;
    var trailerHeight = 20;
    var trailerLength = 40;

    const geometry = new THREE.BoxGeometry(trailerWidth, trailerHeight, trailerLength);

    const offsetY = trailerHeight / 2;
    geometry.translate(0, offsetY, 0);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


function addTrailerUnder(obj, x, y, z){
    'use strict';

    var trailerUnderWidth = 12;
    var trailerUnderHeight = 5;
    var trailerUnderLength = 32;

    geometry = new THREE.BoxGeometry(trailerUnderWidth, trailerUnderHeight, trailerUnderLength);

    const offsetY = trailerUnderHeight / 2;
    geometry.translate(0, offsetY, 0);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function addWheel(obj, x, y, z, rx, ry, rz){
    'use strict';

    geometry = new THREE.CylinderGeometry( 4, 4, 2, 32 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = rx;
    mesh.rotation.y = ry;
    mesh.rotation.z = rz;
    obj.add(mesh);

}