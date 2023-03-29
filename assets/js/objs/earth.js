import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

const Earth = (diameter) => {

    const textureLoader = new THREE.TextureLoader();

    const earthGeometry = new THREE.SphereGeometry(diameter, 32, 32);
    const earthMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('../assets/images/earth.jpg'),
    });

    const cloudsGeometry = new THREE.SphereGeometry(diameter + 0.1, 32, 32);
    const cloudsMaterial = new THREE.MeshLambertMaterial({
        alphaMap: textureLoader.load('../assets/images/earth_clouds.jpg'),
        transparent: true,
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);

    const atmosphereGeometry = new THREE.SphereGeometry(diameter + 0.3, 32, 32);
    const atmosphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        opacity: 0.15,
        transparent: true,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.add(clouds);
    earth.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));
    earth.rotation.y = 23.5 * Math.PI / 180;

    return {earth, clouds};
};

export default Earth;