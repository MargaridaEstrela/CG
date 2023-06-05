const textureSize = 50;
const minCircleSize = 1;
const maxCircleSize = 5;
const minCirclesNumber = 10;
const maxCirclesNumber = 25;

var grassPlane;

function createGrassPlane() {

    scene.remove(grassPlane);

    var geometry = new THREE.PlaneGeometry( textureSize, textureSize );
    var material = new THREE.MeshBasicMaterial( {color: "oliveDrab"} );
    var plane = new THREE.Mesh( geometry, material );

    plane.rotation.y = Math.PI;
    plane.position.z = 200;

    var circlesNumber = Math.floor(Math.random() * (maxCirclesNumber - minCirclesNumber) + minCirclesNumber);
    for (var i = 0; i < circlesNumber; i++) {
        plane.add(createCircle());
    }

    grassPlane = plane;
    scene.add(grassPlane);

}

//        white,    yellow,   lillac,   light blue
colors = [0xfaf9f0, 0xedda4c, 0xda82ed, 0x34d2eb];

// create a circle of random size and color
function createCircle() {
    // size between 1 and 5
    var circleSize = Math.random() * (maxCircleSize - minCircleSize) + minCircleSize;
    var geometry = new THREE.CircleGeometry( circleSize, 32 );
    var material = new THREE.MeshBasicMaterial( { color: colors[Math.floor(Math.random() * colors.length)] } );
    var circle = new THREE.Mesh( geometry, material );

    var minX = -textureSize/2 + circleSize;
    var maxX = textureSize/2 - circleSize;
    var minY = -textureSize/2 + circleSize;
    var maxY = textureSize/2 - circleSize;

    var x = Math.random() * (maxX - minX) + minX;
    var y = Math.random() * (maxY - minY) + minY;
    circle.position.set(x, y, 0);

    return circle;
}

function createGrassTexture() {
    const renderTarget = new THREE.WebGLRenderTarget(textureSize, textureSize);

    // create a new scene
    const scene = new THREE.Scene();

    // create a 

    // render plane to texture
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, cameras.grass);
    renderer.setRenderTarget(null);

    // create texture from renderTarget
    const texture = renderTarget.texture;
    
    // set it to repeatwrapping
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return texture;
}
