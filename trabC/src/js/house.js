function addHouseStructure(obj, x, y, z){
    'use strict';

    var houseStructure = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        -5.4, 0, 2.2,     // Vertex 0: front left bottom
        -5.4, 3.3, 2.2,   // Vertex 1: front left top
        5.4, 0, 2.2,      // Vertex 2: front right bottom
        5.4, 3.3, 2.2,    // Vertex 3: front right top
        -5.4, 0, -2.2,    // Vertex 4: back left bottom
        -5.4, 3.3, -2.2,  // Vertex 5: back left top
        5.4, 0, -2.2,     // Vertex 6: back right bottom
        5.4, 3.3, -2.2,   // Vertex 7: back right top
    ];

    var indices = [
        1, 0, 2,  // Triangle 1
        1, 2, 3,  // Triangle 2
        1, 3, 5,  // Triangle 3
        5, 3, 7,  // Triangle 4
        5, 4, 6,  // Triangle 5
        5, 6, 7,  // Triangle 6
        0, 4, 5,  // Triangle 7
        1, 0, 5,  // Triangle 8
        6, 2, 7,  // Triangle 9
        2, 3, 7,  // Triangle 10
        0, 2, 4,  // Triangle 11
        4, 2, 6  // Triangle 12
    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var houseMaterial = new THREE.MeshBasicMaterial();
    houseMaterial.color.set("white");

    var houseMesh = new THREE.Mesh(geometry, houseMaterial);
    houseMesh.position.set(x, y, z);

    houseStructure.add(houseMesh);

    obj.add(houseStructure);
}

function addDoor(obj, x, y, z){
    'use strict';

    var door = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        -2.475, 0, 2.2,     // Vertex 0: bottom left
        -1.375, 0, 2.2,     // Vertex 1: bottom right
        -2.475, 2.2, 2.2,   // Vertex 2: top left
        -1.375, 2.2, 2.2    // Vertex 3: top right
    ];

    var indices = [
        0, 1, 2,  // Triangle 1
        2, 1, 3,  // Triangle 2
    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var doorMaterial = new THREE.MeshBasicMaterial();
    doorMaterial.color.set("brown");

    var doorMesh = new THREE.Mesh(geometry, doorMaterial);
    doorMesh.position.set(x, y, z);

    door.add(doorMesh);

    obj.add(door);
}

function addWindows(obj, x, y, z){
    'use strict';

    var door = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        // Front left windown
        -4.125, 1.65, 2.2,     // Vertex 0: bottom left
        -3.575, 1.65, 2.2,     // Vertex 1: bottom right
        -4.125, 2.2, 2.2,      // Vertex 2: top left
        -3.575, 2.2, 2.2,      // Vertex 3: top right

        // Front center window
        1.375, 1.65, 2.2,      // Vertex 4: bottom left
        1.925, 1.65, 2.2,      // Vertex 5: bottom right
        1.375, 2.2, 2.2,       // Vertex 6: top left
        1.925, 2.2, 2.2,        // Vertex 7: top right

        // Front right window
        3.025, 1.65, 2.2,     // Vertex 8: bottom left
        3.575, 1.65, 2.2,     // Vertex 9: bottom right
        3.025, 2.2, 2.2,   // Vertex 10: top left
        3.575, 2.2, 2.2    // Vertex 11: top right
    ];

    var indices = [
        0, 1, 2,    // Triangle 1
        2, 1, 3,    // Triangle 2
        4, 5, 6,    // Triangle 3
        6, 5, 7,    // Triangle 4
        8, 9, 10,   // Triangle 5
        10, 9, 11   // Triangle 6

    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var doorMaterial = new THREE.MeshBasicMaterial();
    doorMaterial.color.set("deepskyblue");

    var doorMesh = new THREE.Mesh(geometry, doorMaterial);
    doorMesh.position.set(x, y, z);

    door.add(doorMesh);

    obj.add(door);
}

function addRoof(obj, x, y, z) {
    'use strict';

    var roof = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        // Left triangle
        -5.4, 3.3, 2.2,    // Vertex 0
        -5.4, 3.3, -2.2,   // Vertex 1
        -5.4, 3.85, 0,     // Vertex 3

        // Right triangle
        5.4, 3.3, 2.2,     // Vertex 4
        5.4, 3.3, -2.2,    // Vertex 5
        5.4, 3.85, 0,      // Vertex 6  
    ];

    var indices = [
        0, 1, 2,    // Triangle 1
        3, 4, 5,    // Triangle 2
        0, 3, 2,    // Triangle 3
        2, 3, 5,    // Triangle 4
    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var roofMaterial = new THREE.MeshBasicMaterial();
    roofMaterial.color.set("tomato");

    var roofMesh = new THREE.Mesh(geometry, roofMaterial);
    roofMesh.position.set(x, y, z);

    roof.add(roofMesh);

    obj.add(roof);
}

function addChimney(obj, x, y, z){
    'use strict';

    var chimney = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        0.275, 3.575, 1.65,    // Vertex 0: front bottom left
        1.925, 3.575, 1.65,    // Vertex 1: front bottom right
        0.275, 4.675, 1.65,    // Vertex 2: front top left
        1.925, 4.675, 1.65,    // Vertex 3: front top right
        0.275, 4.675, 1.1,     // Vertex 4: middle top left
        1.925, 4.675, 1.1,     // Vertex 5: middle top right
        0.275, 3.575, 0.55,    // Vertex 6: back bottom left
        1.925, 3.575, 0.55,    // Vertex 7: back bottm right
    ];

    var indices = [
        0, 1, 2,  // Triangle 1
        2, 1, 3,  // Triangle 2
    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var chimneyMaterial = new THREE.MeshBasicMaterial();
    chimneyMaterial.color.set("white");

    var chimneyMesh = new THREE.Mesh(geometry, chimneyMaterial);
    chimneyMesh.position.set(x, y, z);

    chimney.add(chimneyMesh);

    obj.add(chimney);
}

function addCollumns(obj, x, y, z){
    'use strict';

    var collumns = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        -5.4, 0, 2.2,     // Vertex 0
        -5.4, 0, 2.75,    // Vertex 1
        -4.85, 0, 2.2,      // Vertex 2
        -4.85, 0, 2.75,     // Vertex 3
        -4.85, 3.3, 2.2,    // Vertex 4
        -5.4, 3.3, 2.2,   // Vertex 5

        -0.275, 0, 2.2,    // Vertex 6
        -0.275, 0, 2.75,   // Vertex 7
        0.275, 0, 2.2,     // Vertex 8
        0.275, 0, 2.75,    // Vertex 9
        0.275, 3.3, 2.2,   // Vertex 10
        -0.275, 3.3, 2.2,  // Vertex 11

        4.85, 0, 2.2,       // Vertex 12
        4.85, 0, 2.75,      // Vertex 13
        5.4, 0, 2.2,      // Vertex 15
        5.4, 0, 2.75,     // Vertex 16
        5.4, 3.3, 2.2,    // Vertex 17
        4.85, 3.3, 2.2      // Vertex 14
    ];

    var indices = [
        0, 1, 3,    // Triangle 1
        0, 3, 2,    // Triangle 2
        0, 2, 4,    // Triangle 3
        0, 4, 5,    // Triangle 4

        6, 7, 9,    // Triangle 5
        6, 9, 8,
        6, 8, 10,
        6, 10, 11,

        12, 13, 15,
        12, 15, 14,
        12, 14, 16,
        12, 16, 17
    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var collumnsMaterial = new THREE.MeshBasicMaterial();
    collumnsMaterial.color.set("powderblue");

    var collumnsMesh = new THREE.Mesh(geometry, collumnsMaterial);
    collumnsMesh.position.set(x, y, z);

    collumns.add(collumnsMesh);

    obj.add(collumns);
}

function addLine(obj, x, y, z){
    'use strict';

    var line = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        -4.85, 0, 2.2,      // Vertex 0: bottom left
        -2.475, 0, 2.2,     // Vertex 1: bottom right
        -4.85, 0.2, 2.2,    // Vertex 2: top left
        -2.475, 0.2, 2.2,    // Vertex 3: top right

        -1.375, 0, 2.2,     // Vertex 4
        -0.275, 0, 2.2,     // Vertex 5
        -1.375, 0.2, 2.2,   // Vertex 6
        -0.275, 0.2, 2.2,    // Vertex 7

        0.275, 0, 2.2,
        4.85, 0, 2.2,
        0.275, 0.2, 2.2,
        4.85, 0.2, 2.2
    ];

    var indices = [
        0, 1, 2,  // Triangle 1
        2, 1, 3,  // Triangle 2

        4, 5, 6,
        6, 5, 7,

        8, 9, 10,
        10, 9, 11

    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var lineMaterial = new THREE.MeshBasicMaterial();
    lineMaterial.color.set("royalblue");

    var lineMesh = new THREE.Mesh(geometry, lineMaterial);
    lineMesh.position.set(x, y, z);

    line.add(lineMesh);

    obj.add(line);
}