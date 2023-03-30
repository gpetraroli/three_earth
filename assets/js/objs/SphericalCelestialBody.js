import * as THREE from 'three';

class SphericalCelestialBody {

    #mesh;

    constructor(
        position,
        radius,
        mass,
        sideralDay,
        sideralYear,
        material,
    ) {
        this.position = position;
        this.radius = radius;
        this.mass = mass;
        this.sideralDay = sideralDay;
        this.sideralYear = sideralYear;
        this.texture = texture;

        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        this.#mesh = new THREE.Mesh(geometry, material);
    }

    getMesh() {
        return this.#mesh;
    }

    getPosition() {
        return this.position;
    }

    getRadius() {
        return this.radius;
    }

    getMass() {
        return this.mass;
    }

    getSideralDay() {
        return this.sideralDay;
    }

    getSideralYear() {
        return this.sideralYear;
    }

    rotate(x = null, y = null, z = null) {
        if (x) this.#mesh.rotation.x += x;
        if (y) this.#mesh.rotation.y += y;
        if (z) this.#mesh.rotation.z += z;
    }
}