function addHouseStructure(obj, x, y, z){
    'use strict';

    var houseStructure = new THREE.Object3D();
    geometry = new THREE.BufferGeometry();

    var vertices = [
        -5.125, 0.2, 2.2,     // Vertex 0: front left bottom
        -5.125, 3.3, 2.2,     // Vertex 1: front left top
        5.125, 0.2, 2.2,      // Vertex 2: front right bottom
        5.125, 3.3, 2.2,      // Vertex 3: front right top
        -5.125, 0.2, -2.2,    // Vertex 4: back left bottom
        -5.125, 3.3, -2.2,    // Vertex 5: back left top
        5.125, 0.2, -2.2,     // Vertex 6: back right bottom
        5.125, 3.3, -2.2,     // Vertex 7: back right top

        -4.125, 0.2, 2.2,     // Vertex 8
        -3.575, 0.2, 2.2,     // Vertex 9
        -2.475, 0.2, 2.2,     // Vertex 10
        -1.375, 0.2, 2.2,     // Vertex 11
        -0.275, 0.2, 2.2,     // Vertex 12

        -4.125, 1.65, 2.2,    // Vertex 13
        -3.575, 1.65, 2.2,    // Vertex 14

        -5.125, 2.2, 2.2,     // Vertex 15
        -4.125, 2.2, 2.2,     // Vertex 16
        -3.575, 2.2, 2.2,     // Vertex 17
        -2.475, 2.2, 2.2,     // Vertex 18
        -1.375, 2.2, 2.2,     // Vertex 19

        -1.375, 3.3, 2.2,     // Vertex 20
        -0.275, 3.3, 2.2,     // Vertex 21

        0.275, 0.2, 2.2,      // Vertex 22
        0.275, 1.65, 2.2,     // Vertex 23
        1.375, 1.65, 2.2,     // Vertex 24
        1.925, 1.65, 2.2,     // Vertex 25
        3.575, 1.65, 2.2,     // Vertex 26
        4.125, 1.65, 2.2,     // Vertex 27
        5.675, 1.65, 2.2,     // Vertex 28

        0.275, 2.2, 2.2,      // Vertex 29
        1.375, 2.2, 2.2,      // Vertex 30
        1.925, 2.2, 2.2,      // Vertex 31
        3.575, 2.2, 2.2,      // Vertex 32
        4.125, 2.2, 2.2,      // Vertex 33
        5.675, 2.2, 2.2,      // Vertex 34

        0.275, 3.3, 2.2       // Vertex 35
    ];

    var indices = [
        0, 8, 15,
        15, 8, 16,
        15, 19, 1,
        1, 19, 20,
        11, 12, 20,
        20, 12, 21,
        9, 10, 17,
        17, 10, 18,
        8, 9, 13,
        13, 9, 14,
        22, 2, 23,
        23, 2, 28,
        23, 24, 29,
        29, 24, 30,
        25, 26, 31,
        31, 26, 32,
        27, 28, 33,
        33, 28, 34,
        29, 34, 35,
        35, 34, 3
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
        0, 1, 2,
        2, 1, 3
    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var doorMaterial = new THREE.MeshBasicMaterial();
    doorMaterial.color.set("royalblue");

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
        3.575, 1.65, 2.2,     // Vertex 8: bottom left
        4.125, 1.65, 2.2,     // Vertex 9: bottom right
        3.575, 2.2, 2.2,      // Vertex 10: top left
        4.125, 2.2, 2.2,    // Vertex 11: top right
    ];

    var indices = [
        0, 1, 2,
        2, 1, 3,
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

    var doorMaterial = new THREE.MeshBasicMaterial();
    doorMaterial.color.set("royalblue");

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
        -5.675, 3.3, 2.2,    // Vertex 0
        -5.675, 3.3, -2.2,   // Vertex 1
        -5.675, 3.85, 0,     // Vertex 3

        // Right triangle
        5.675, 3.3, 2.2,     // Vertex 4
        5.675, 3.3, -2.2,    // Vertex 5
        5.675, 3.85, 0,      // Vertex 6  
    ];

    var indices = [
        0, 1, 2,    
        3, 4, 5,    
        0, 3, 2,    
        2, 3, 5, 
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
        0, 1, 2,  
        2, 1, 3,  
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
        -5.675, 0, 2.2,     // Vertex 0
        -5.675, 0, 2.75,    // Vertex 1
        -5.125, 0, 2.2,      // Vertex 2
        -5.125, 0, 2.75,     // Vertex 3
        -5.125, 3.3, 2.2,    // Vertex 4
        -5.675, 3.3, 2.2,   // Vertex 5

        -0.275, 0, 2.2,    // Vertex 6
        -0.275, 0, 2.75,   // Vertex 7
        0.275, 0, 2.2,     // Vertex 8
        0.275, 0, 2.75,    // Vertex 9
        0.275, 3.3, 2.2,   // Vertex 10
        -0.275, 3.3, 2.2,  // Vertex 11

        5.125, 0, 2.2,       // Vertex 12
        5.125, 0, 2.75,      // Vertex 13
        5.675, 0, 2.2,      // Vertex 14
        5.675, 0, 2.75,     // Vertex 15
        5.675, 3.3, 2.2,    // Vertex 16
        5.125, 3.3, 2.2      // Vertex 17
    ];

    var indices = [
        1, 3, 5,
        5, 3, 4,
        3, 2, 4,
        1, 3, 0,
        0, 3, 2,
        0, 2, 5,
        5, 2, 4,
        1, 0, 5,

        7, 9, 6,
        6, 9, 8,
        7, 9, 11,
        11, 9, 10,
        9, 8, 10,
        7, 6, 11,
        6, 8, 11,
        11, 8, 10,

        13, 15, 17,
        17, 15, 16,
        13, 15, 12,
        12, 15, 14,
        15, 14, 16,
        13, 12, 17,
        12, 14, 17,
        17, 14, 16
    ];

    var positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    var indexAttribute = new THREE.Uint32BufferAttribute(indices, 1);
    
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    geometry.computeVertexNormals(); 

    var collumnsMaterial = new THREE.MeshBasicMaterial();
    collumnsMaterial.color.set("white");

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
        -5.125, 0, 2.2,        // Vertex 0: bottom left
        -2.475, 0, 2.2,       // Vertex 1: bottom right
        -5.125, 0.2, 2.2,      // Vertex 2: top left
        -2.475, 0.2, 2.2,     // Vertex 3: top right

        -1.375, 0, 2.2,       // Vertex 4
        -0.275, 0, 2.2,       // Vertex 5
        -1.375, 0.2, 2.2,     // Vertex 6
        -0.275, 0.2, 2.2,     // Vertex 7

        0.275, 0, 2.2,        // Vertex 8
        5.125, 0, 2.2,         // Vertex 9
        0.275, 0.2, 2.2,      // Vertex 10
        5.125, 0.2, 2.2        // Vertex 11
    ];

    var indices = [
        0, 1, 2,
        2, 1, 3,

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