import screenfull from "screenfull";
// console.log(screenfull);
import * as THREE from "three";
// console.log(THREE);


// trick to import other modules and merge to  THREE
window.THREE = THREE;

// import orbit controls
require("three/examples/js/controls/OrbitControls.js");

// import stats
import Stats from "three/examples/js/libs/stats.min.js";
var stats = new Stats();


// user worker loader to load webworker from file ============ TODO
import WebsocketWorker from "./ws.worker.js";
var wsWorker = new WebsocketWorker();


var glsl = require("glslify");
var vertexContent = require("./shaders/vertex.glsl");
var vertex = glsl(vertexContent);

var fragContent = require("./shaders/frag.glsl");
var frag = glsl(fragContent);


// init global data
var globalData = require("./data.js");
// console.log(globalData);

var Utils = require("./utils.js");

var vertex1 = glsl(require("./shaders/shadertoy_vert.glsl"));
var frag1 = glsl(require("./shaders/shadertoy_frag.glsl"));
// why import and const not working ? TODO ================
// import * as glsl from "glslify";
// const vertexContent = require("./shaders/vertex.glsl");
// const vertex = glsl(vertexContent);

// const fragContent = require("./shaders/frag.glsl");
// const frag = glsl(fragContent);
function makePlanes(id) {
    // for shader toy glsl ====================
    var uniforms = {
        id: { type: "i", value: id },
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
            value: globalData.texture
        }

    };
    var planeGeometry = new THREE.PlaneBufferGeometry(8, 9);
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex1,
        fragmentShader: frag1
    });


    var mesh = new THREE.Mesh(planeGeometry, material);
    var obj = { "id": id, "mesh": mesh };

    globalData.scene.add(mesh);
    globalData.planes.push(obj);
    console.log("add plane:", obj);
    // console.log(globalData.planes[0].mesh.geometry.attributes.position.array);    

}

// function setClientID(that) {
//     // console.log(that);
//     that.id =  window.location.href.split("=")[1];

// }



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

function initScene() {


    globalData.scene = new THREE.Scene();
    globalData.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    globalData.renderer = new THREE.WebGLRenderer({ antialias: true });
    globalData.renderer.setPixelRatio(window.devicePixelRatio);
    globalData.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(globalData.renderer.domElement);

    globalData.controls = new THREE.OrbitControls(globalData.camera, globalData.renderer.domElement);

    //controls.update() must be called after any manual changes to the camera"s transform
    globalData.camera.position.set(0, 0, 10);
    globalData.controls.update();


    const resize = function() {
        globalData.camera.aspect = window.innerWidth / window.innerHeight;
        globalData.camera.updateProjectionMatrix();

        globalData.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.onresize = resize;


}

function loadVideoTexture() {
    // and a cube for test
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    globalData.scene.add(cube);

    // prepare video texture for plane
    const video = document.getElementById("video");
    globalData.texture = new THREE.VideoTexture(video);

    globalData.texture.minFilter = THREE.LinearFilter;
    globalData.texture.magFilter = THREE.LinearFilter;
    globalData.texture.format = THREE.RGBFormat;
}

function initKeyEvent() {
    window.document.onkeydown = function(ent) {
        var event = ent || window.event;
        switch (event.keyCode) {
            case 37: //left
                break;
            case 38: //up
                globalData.planes[0].mesh.position.x += 1;
                break;
            case 39: //right
                break;
            case 40: //down
                globalData.planes[0].mesh.position.x -= 1;
                break;

        }

    };
}

window.onload = function() {
    init();
    Utils.setClientID(globalData);
    console.log(globalData);


    initScene();

    loadVideoTexture();

    initKeyEvent();

    makePlanes("1");
    makePlanes("2");

    globalData.planes[1].mesh.position.x -= 8;
    // globalData.planes[1].mesh.position.z -= 0.1;

    // globalData.planes[0].mesh.rotation.y = Math.PI / 2;
    function update() {
        // planeGeometry.vertices[0].y = Math.sin(new Date());
        // planeGeometry.verticesNeedUpdate = true;
        // glsl_material.uniforms.time.value = Math.sin(new Date());
        globalData.texture.needsUpdate = true;

        // uniforms.iTime.value += 0.04;

        // if (globalData.planes[0].mesh.geometry.attributes.position.array[0] == 0) {
        //     globalData.planes[0].mesh.geometry.attributes.position.array[0] = -8;

        // } else {
        //     globalData.planes[0].mesh.geometry.attributes.position.array[0] += 1;
        // }

        // globalData.planes[0].mesh.geometry.attributes.position.needsUpdate = true;
        // planeGeometry.verticesNeedUpdate = true;

    }



    const animate = function() {
        requestAnimationFrame(animate);
        stats.begin();
        update();
        globalData.controls.update();
        globalData.renderer.render(globalData.scene, globalData.camera);
        stats.end();

    };

    animate();
}();