function addMainTrunk(obj, x, y, z) {
    'use strict';

    var mainTrunk = new THREE.Object3D();
    mainTrunk.name = 'mainTrunk';

    geometry = new THREE.CylinderGeometry(0.5, 0.5, Math.sqrt(5), 64);

    var mainTrunkMaterial = new THREE.MeshBasicMaterial();
    mainTrunkMaterial.color.set("chocolate");

    mesh = new THREE.Mesh(geometry, mainTrunkMaterial);
    mesh.position.set(x, y, z);

    mainTrunk.add(mesh);
    mainTrunk.position.set(x, y, z);
    mainTrunk.rotation.set(Math.PI/4, -Math.PI/4, Math.PI/2);

    obj.add(mainTrunk);

    addSecondaryTrunk(obj, 1, 0, 0);
    addLowerCrown(obj, -1.25, 1, 0);
    addTopCrown(obj, 0.5, 1.5+Math.sqrt(5), 0);
}

function addSecondaryTrunk(obj, x, y, z) {
    'use strict';

    var secondaryTrunk = new THREE.Object3D();
    secondaryTrunk.name = 'secondaryTrunk';

    geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 64);

    var secondaryTrunkMaterial = new THREE.MeshBasicMaterial();
    secondaryTrunkMaterial.color.set("chocolate");

    mesh = new THREE.Mesh(geometry, secondaryTrunkMaterial);
    mesh.position.set(x, y, z);

    secondaryTrunk.add(mesh);
    mesh.position.set(x, y, z);
    mesh.rotation.set(Math.PI/4, Math.PI/4, Math.PI/2);

    obj.add(secondaryTrunk);

    addLowerCrown(obj, 1.75, 1, 0);

}

function addLowerCrown(obj, x, y, z) {
    'use strict';

    var lowerCrown = new THREE.Object3D();
    if (x > 0) {
        lowerCrown.name = 'lCrown';
    } else {
        lowerCrown.name = "rCrown";
    }

    geometry = new THREE.SphereGeometry(1.5, 64, 32);
    geometry.scale(2, 0.75, 1);

    var lowerCrownMaterial = new THREE.MeshBasicMaterial();
    lowerCrownMaterial.color.set("darkgreen");

    mesh = new THREE.Mesh(geometry, lowerCrownMaterial);
    mesh.position.set(x, y, z);

    lowerCrown.add(mesh);
    lowerCrown.position.set(x, y, z);

    obj.add(lowerCrown);
}

function addTopCrown(obj, x, y, z) {
    'use strict';

    var topCrown = new THREE.Object3D();
    topCrown.name = 'topCrown';

    geometry = new THREE.SphereGeometry(1.5, 64, 32);
    geometry.scale(2, 0.75, 1);

    var topCrownMaterial = new THREE.MeshBasicMaterial();
    topCrownMaterial.color.set("darkgreen");

    mesh = new THREE.Mesh(geometry, topCrownMaterial);

    topCrown.add(mesh);
    topCrown.position.set(x, y, z);

    obj.add(topCrown);
}