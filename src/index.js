import screenfull from "screenfull";
// console.log(screenfull);
import * as THREE from "three";
// console.log(THREE);

// trick to import other modules and merge to  THREE
window.THREE = THREE;

import Stats from "three/examples/js/libs/stats.min.js";
var stats = new Stats();

// user worker loader to load webworker from file
import WsWorker from "worker-loader!./ws.worker.js";
var wsWorker = new WsWorker();

require("three/examples/js/controls/OrbitControls.js");

var glsl = require("glslify");
var vertexContent = require("./shaders/vertex.glsl");
var vertex = glsl(vertexContent);

var fragContent = require("./shaders/frag.glsl");
var frag = glsl(fragContent);


var vertex1 = glsl(require("./shaders/shadertoy_vert.glsl"));
var frag1 = glsl(require("./shaders/shadertoy_frag.glsl"));
// why import and const not working ? TODO ================
// import * as glsl from "glslify";
// const vertexContent = require("./shaders/vertex.glsl");
// const vertex = glsl(vertexContent);

// const fragContent = require("./shaders/frag.glsl");
// const frag = glsl(fragContent);

function init() {
    // init info div for debub
    var infoDiv = document.createElement("DIV");
    infoDiv.style.position = "absolute";
    infoDiv.style.left = "0px";
    infoDiv.style.top = "20px";
    infoDiv.style.width = "100%";
    infoDiv.style.zIndex = "100";

    var infoText = "info div: ";
    infoText += " width : " + window.innerWidth;
    infoText += " height : " + window.innerHeight;
    infoText += " DPI : ";
    var infoNode = document.createTextNode(infoText);


    infoDiv.appendChild(infoNode);

    document.body.appendChild(infoDiv);

    // init screen full toggle button
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "[sreen full]";
    btn.style.position = "absolute";
    btn.style.right = "0px";
    btn.style.top = "0px";
    btn.addEventListener("click", function() {
        // screenfull.request();
        screenfull.toggle();
    });

    document.body.appendChild(btn);

    stats.showPanel(0);
    document.body.appendChild(stats.dom);


}

window.onload = function() {
    init();

    const resize = function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.onresize = resize;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    //controls.update() must be called after any manual changes to the camera"s transform
    camera.position.set(0, 20, 100);
    controls.update();

    // and a cube for test
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // prepare video texture for plane
    const video = document.getElementById("video");
    const texture = new THREE.VideoTexture(video);

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    // for shader toy glsl ====================
    var uniforms_shadertoy = {
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iTime: {
            type: "f",
            value: 1.0
        },
        iResolution: {
            type: "v2",
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        iMouse: {
            type: "v2",
            value: new THREE.Vector2()
        },
        texture: {
            value: texture
        }

    };
    var planeGeometry1 = new THREE.PlaneBufferGeometry(16, 9);
    var material1 = new THREE.ShaderMaterial({
        uniforms: uniforms_shadertoy,
        vertexShader: vertex1,
        fragmentShader: frag1
    });


    var mesh = new THREE.Mesh(planeGeometry1, material1);
    scene.add(mesh);



    // uniforms_shadertoy.iResolution.value = THREE.Vector2(window.innerWidth,window.innerHeight);


    camera.position.z = 5;

    function update() {
        // planeGeometry.vertices[0].y = Math.sin(new Date());
        // planeGeometry.verticesNeedUpdate = true;
        // glsl_material.uniforms.time.value = Math.sin(new Date());
        texture.needsUpdate = true;

        uniforms_shadertoy.iTime.value += 0.04;
        // planeGeometry1.attributes.position.array[1] = 0;

        planeGeometry1.verticesNeedUpdate = true;

    }



    const animate = function() {
        requestAnimationFrame(animate);
        stats.begin();
        update();
        controls.update();
        renderer.render(scene, camera);
        stats.end();

    };

    animate();
}();