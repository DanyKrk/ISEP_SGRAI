import * as THREE from "three";

/*
 * parameters = {
 *  color: Integer,
 *  side: String,
 *  size: Vector2,
 *  speed: Float,
 *  baseline: Float,
 *  keyCodes: { down: String, up: String }
 * }
 */

export default class Player extends THREE.Mesh {
    constructor(parameters, table) {
        super();

        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }
        this.halfSize = this.size.clone().divideScalar(2.0);
        this.baseline *= table.halfSize.x;
        /* To-do #7 - Compute the rackets' lower and upper boundaries
            - both the lower and upper boundaries depend on the table and racket dimensions
            - more specifically, the boundaries depend on parameters table.halfSize.y (the table's half Y-dimension) and this.halfSize.y (the racket's half Y-dimension)

        this.centerLower = ...;
        this.centerUpper = ...; */
        this.keyStates = { down: false, up: false };

        /* To-do #2 - Create the racket (a rectangle) with properties defined by the following parameters:
            - width: this.size.x
            - height: this.size.y
            - color: this.color

            - follow the instructions in this example to create the rectangle: https://threejs.org/docs/api/en/geometries/PlaneGeometry.html

        this.geometry = new THREE.PlaneGeometry(...);
        this.material = new THREE.MeshBasicMaterial(...); */

        this.initialize();
    }

    /* To-do #8 - Check the racket's lower and upper boundaries
        - lower boundary: this.centerLower
        - upper boundary: this.centerUpper

    checkLowerBoundary() {
        if (...) {
            ...;
        }
    }

    checkUpperBoundary() {
        if (...) {
            ...;
        }
    } */

    initialize() {
        this.center = new THREE.Vector2(this.baseline, 0.0);
        if (this.side == "left") { // Player 1 racket: the center's x-coordinate must be negative
            this.center.x = -this.center.x;
        }
        this.score = 0;
        /* To-do #3 - Set the racket's center position:
            - x: this.center.x
            - y: this.center.y

        this.position.set(...); */
    }

    update(deltaT) {
        /* To-do #6 - Update the racket's center position
            - current position: this.center.y
            - current speed: this.speed
            - elapsed time: deltaT

            - start by computing the covered distance:
                covered distance = racket speed * elapsed time
            - then compute the racket's new position:
                new position = current position ± covered distance (+ or - depending on which key the user is pressing)

        if (this.keyStates.down) {
            ... -= ...;
            this.checkLowerBoundary();
        }
        if (this.keyStates.up) {
            ... += ...;
            this.checkUpperBoundary();
        }
        this.position.set(...); */
    }
}