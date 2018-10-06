import screenfull from 'screenfull';
// console.log(screenfull);
import * as THREE from 'three';
// console.log(THREE);

// trick to import other modules and merge to  THREE
window.THREE = THREE;

require('three/examples/js/controls/OrbitControls.js');

// const vertex = require("shaders/vertex.glsl");
// const frag = require("shaders/frag.glsl");

function init() {
    // init info div for debub
    var infoDiv = document.createElement('DIV');
    infoDiv.style.position = 'absolute';
    infoDiv.style.left = '0px';
    infoDiv.style.top = '20px';
    infoDiv.style.width = '100%';
    infoDiv.style.zIndex = '100';

    var infoText = "info div: ";
    infoText += " width : " + window.innerWidth;
    infoText += " height : " + window.innerHeight;
    infoText += " DPI : ";
    var infoNode = document.createTextNode(infoText);


    infoDiv.appendChild(infoNode);

    document.body.appendChild(infoDiv);

    // init screen full toggle button
    var btn = document.createElement('BUTTON');
    btn.innerHTML = "[sreen full]";
    btn.style.position = 'absolute';
    btn.style.left = '0px';
    btn.style.top = '0px';
    btn.addEventListener('click', function() {
        // screenfull.request();
        screenfull.toggle();
    });

    document.body.appendChild(btn);

}

window.onload = function() {
    init();

    const resize = function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.onresize = resize;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 20, 100);
    controls.update();

    // and a cube for test
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // prepare video texture for plane
    const video = document.getElementById('video');
    const texture = new THREE.VideoTexture(video);

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const planeGeometry = new THREE.PlaneGeometry(2,2);
    // const planeGeometry = new THREE.PlaneBufferGeometry(2,2); // TODO
    const glsl_material = new THREE.RawShaderMaterial({
        uniforms: {
            time: { type:"f",value: 1.0 },
            texture0:{value:texture}
        },
        // vertexShader:vertex,
        // fragmentShader:frag

        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
    });

    const plane = new THREE.Mesh(planeGeometry, glsl_material);
    scene.add(plane);

    camera.position.z = 5;

    function update() {
    	// planeGeometry.vertices[0].y = Math.sin(new Date());
    	// planeGeometry.verticesNeedUpdate = true;
        glsl_material.uniforms.time.value = Math.sin(new Date());
        texture.needsUpdate = true;

    };
    const animate = function() {
        requestAnimationFrame(animate);
        update();
        controls.update();

        renderer.render(scene, camera);
    };

    animate();
}();