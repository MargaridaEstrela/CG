const grassSize = window.innerWidth * 1.3;
const minCircleSize = window.innerWidth * 0.001;
const maxCircleSize = window.innerWidth * 0.003;
const minFlowersNumber = 500;
const maxFlowersNumber = 750;

//              white,    yellow,   lillac,   light blue
const colors = [0xfaf9f0, 0xedda4c, 0xda82ed, 0x34d2eb];

var grassTexture, grassPlane;
var skyTexture, skySphere;

function createCircle(circleSize, color) {
    
    var geometry = new THREE.CircleGeometry( circleSize, 32 );
    var material = new THREE.MeshBasicMaterial( { color: color } );
    var circle = new THREE.Mesh( geometry, material );

    var minX = -grassSize/2 + circleSize;
    var maxX = grassSize/2 - circleSize;
    var minY = -grassSize/2 + circleSize;
    var maxY = grassSize/2 - circleSize;

    var x = Math.random() * (maxX - minX) + minX;
    var y = Math.random() * (maxY - minY) + minY;
    circle.position.set(x, y, 1);

    return circle;

}

function createGrassPlane() {

    scene.remove(grassPlane);
    scene.remove(skySphere);

    var planeSize = grassSize / 2;

    var geometry = new THREE.CircleGeometry( planeSize, 256 );
    var material = new THREE.MeshBasicMaterial( {color: "oliveDrab"} );
    var plane = new THREE.Mesh( geometry, material );

    plane.rotation.y = Math.PI;
    plane.position.z = 500;

    var circlesNumber = Math.floor(Math.random() * (maxFlowersNumber - minFlowersNumber) + minFlowersNumber);
    for (var i = 0; i < circlesNumber; i++) {
        var circleSize = Math.random() * (maxCircleSize - minCircleSize) + minCircleSize;
        var color = colors[Math.floor(Math.random() * colors.length)];
        plane.add(createCircle(circleSize, color));
    }

    grassPlane = plane;

    scene.add(grassPlane);

}

function createGrassTexture() {

    createGrassPlane();

    var renderTarget = new THREE.WebGLRenderTarget(grassSize, grassSize);

    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, cameras.grass);
    renderer.setRenderTarget(null);

    grassTexture = renderTarget.texture;

}

function createSkyPlane() {

    scene.remove(grassPlane);
    scene.remove(skySphere);

    var geometry = new THREE.PlaneGeometry( grassSize, grassSize );
    var material = new THREE.MeshBasicMaterial( {map: createGradientTexture() } );
    var plane = new THREE.Mesh( geometry, material );

    plane.rotation.y = Math.PI;
    plane.position.z = 500;

    var circlesNumber = Math.floor(Math.random() * (maxFlowersNumber - minFlowersNumber) + minFlowersNumber);
    for (var i = 0; i < circlesNumber; i++) {
        var circleSize = Math.random() * (maxCircleSize - minCircleSize) + minCircleSize;
        var color = "white";
        plane.add(createCircle(circleSize, color));
    }

    skySphere = plane;

    scene.add(skySphere);
}

function createSkyTexture() {
    
    createSkyPlane();

    var renderTarget = new THREE.WebGLRenderTarget(grassSize, grassSize);

    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, cameras.grass);
    renderer.setRenderTarget(null);

    skyTexture = renderTarget.texture;
    
}

function createGradientTexture() {
    
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    var context = canvas.getContext('2d');

    var gradient = context.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, "#2a4180");
    gradient.addColorStop(1, "#511663");

    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
    
}

function loadHeightMap() {
    
    var loader = new THREE.TextureLoader();    
    heightMap = loader.load('assets/heightmap.png');
    
}
