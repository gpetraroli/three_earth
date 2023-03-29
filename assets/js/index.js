import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Earth from "./objs/earth";
import Sun from "./objs/sun";
import ISS from "./objs/iss";
import Moon from "./objs/moon";

const earthDiameter = 10;
const earthSideralDay = 0.00005;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const sphereGeometry = new THREE.SphereGeometry(1000, 32, 32);
const sphereMaterial = new THREE.MeshLambertMaterial({
    map: textureLoader.load('../assets/images/stars.jpg'),
    side: THREE.BackSide
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const {earth, clouds} = Earth(earthDiameter);
scene.add(earth);

const sun = Sun(20, {x: 1000, y: 0, z: 0});
scene.add(sun);

const iss = ISS();
scene.add(iss);

const moon = Moon(earthDiameter / 4);
scene.add(moon);

renderer.setAnimationLoop(() => {
    setTimeout(() => {
        renderer.render(scene, camera);

        earth.rotation.y += earthSideralDay;
        clouds.rotation.y += earthSideralDay * 1.5;
        iss.rotation.x += earthSideralDay * 15.5;
        moon.rotation.y += earthSideralDay / 14;

    }, 1000 / 60);
});

document.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});