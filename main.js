import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

import { d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13 } from './dane.js';


let scene, camera, renderer, controls;
function findHoleCenter(data) {
    var minI = data.length;
    var maxI = 0;
    var minJ = data[0].length;
    var maxJ = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            var currentVal = data[i][j];

            if (currentVal !== 1) {
                if (i < minI) minI = i;
                if (i > maxI) maxI = i;
                if (j < minJ) minJ = j;
                if (j > maxJ) maxJ = j;
            }
        }
    }

    var centerI = (minI + maxI) / 2;
    var centerJ = (minJ + maxJ) / 2;

    return { x: centerI, y: centerJ };
}

function addDataToScene(data, level) {
    var normalizedLevel = level / 13.0; 
    var holeCenter = findHoleCenter(data);
        var zz;
    var points = [];
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            var x = i * 0.1 - holeCenter.x * 0.1;
            var y = j * 0.1 - holeCenter.y * 0.1;
            var z = data[i][j];
            
            if (z <= 0.75) {
                z += 0.5* level;
                if(level==4) z-=0.2;
                if(level==1) z-=0.2;
                points.push(new THREE.Vector3(x, y, z));
                zz= z;
            }
        }
    }
    
  var geometry = new THREE.BufferGeometry().setFromPoints(points);

  var color = new THREE.Color();
  color.setRGB(1, normalizedLevel, 0);  

  var material = new THREE.PointsMaterial({ color: color, size: 0.03 });

  var points = new THREE.Points(geometry, material);


    scene.add(points);


    //hole debug
        // var sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);  
        // var sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        // var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
        // sphere.position.set(holeCenter.x * 0.1, holeCenter.y * 0.1, zz);  
    
        // scene.add(sphere);
    
    
}

function init() {



    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

 
    addDataToScene(d1, 12); 
    addDataToScene(d2, 11);
    addDataToScene(d3, 10); 
    addDataToScene(d4, 9);
    addDataToScene(d5, 8); 
    addDataToScene(d6, 7);
    addDataToScene(d7, 6); 
    addDataToScene(d8, 5);
    addDataToScene(d9, 4); 
    addDataToScene(d10, 3); 
    addDataToScene(d11, 2); 
    addDataToScene(d12, 1); 
   addDataToScene(d13, 0); 
   
    camera.position.z = 5;

    controls = new OrbitControls(camera, renderer.domElement);
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
