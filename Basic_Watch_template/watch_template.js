// Basic Watch - 2021, 2022 JPP
// 2D modeling
// Basic animation
// Transformations

import * as THREE from "three";

export default class Watch extends THREE.Group {
    constructor(cityName, center = new THREE.Vector2(0.0, 0.0), radius = 0.75, nameBackgroundColor = 0xffffff, nameForegroundColor = 0x000000, dialColor = 0x000000, markersColor = 0xffffff, handsHMColor = 0xffffff, handSColor = 0xff0000) {
        super();

        this.cities = [
            { name: "Oporto", timeZone: 0 },
            { name: "Paris", timeZone: 1 },
            { name: "Helsinki", timeZone: 2 },
            { name: "Beijing", timeZone: 7 },
            { name: "Tokyo", timeZone: 8 },
            { name: "Sydney", timeZone: 9 },
            { name: "Los Angeles", timeZone: -8 },
            { name: "New York", timeZone: -5 },
            { name: "Rio de Janeiro", timeZone: -4 },
            { name: "Reykjavik", timeZone: -1 }
        ]

        this.cityIndex = 0;
        const numberOfCities = this.cities.length;
        while (this.cityIndex < numberOfCities && cityName != this.cities[this.cityIndex].name) {
            this.cityIndex++;
        }
        if (this.cityIndex == numberOfCities) {
            this.cityIndex = 0;
        }


        let geometry = new THREE.CircleGeometry(radius, 60);
        let material = new THREE.MeshBasicMaterial(dialColor);
        this.dial = new THREE.Mesh(geometry, material);
        this.add(this.dial);

        const radius0 = 0.85 * radius;
        const radius1 = 0.90 * radius;
        const radius2 = 0.95 * radius; 

        let points = [];
        const curve0 = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            radius0, radius0,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );
        const curve1 = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            radius1, radius1,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );
        const curve2 = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            radius2, radius2,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );
        
        let points0 = curve0.getPoints(12);
        let points1 = curve1.getPoints(60);
        let points2 = curve2.getPoints(60);

        let points_merged = [];

        for(let i = 0, c0 = 0, c1 = 0, c2 = 0; i < 60; i++){
            if(i % 5 == 0){
                points_merged.push(points0[c0]);
                c0++;
                points_merged.push(points2[c2]);

                c2++;
                c1++;
            }
            else{
                points_merged.push(points1[c1]);
                c1++;
                points_merged.push(points2[c2]);
                c2++;
            }
        }
        geometry = new THREE.BufferGeometry().setFromPoints(points_merged);
        material = new THREE.LineBasicMaterial({
            color: markersColor
        });
        this.markers = new THREE.LineSegments(geometry, material);
        this.add(this.markers); 

        /* To-do #3: Create the hour hand (a line segment) with length 0.5 * radius, pointing at 0.0 radians (the positive X-semiaxis) and color handsHMColor*/
        // points = [];
        // points.push(new THREE.Vector3(0, 0.025 * radius, 0));
        // points.push(new THREE.Vector3(-0.1 * radius, 0, 0));
        // points.push(new THREE.Vector3(0, -0.025 * radius, 0));
        // points.push(new THREE.Vector3(0.5 * radius, 0, 0));
        geometry = new THREE.BufferGeometry();
        let vertices = new Float32Array( [
            0.0, 0.025 * radius,  0.0,
            -0.1 * radius, 0.0,  0.0,
            0.0, -0.025 * radius,  0.0,
            0.0, -0.025 * radius,  0.0,
            0.5 * radius, 0.0, 0.0,
            0.0, 0.025 * radius,  0.0,
        ] );
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3) );
        material = new THREE.MeshBasicMaterial({color: 0xaaaaaa});
        let mesh = new THREE.Mesh( geometry, material );
        this.handH = mesh
        this.add(this.handH);

        /* To-do #4: Create the minute hand (a line segment) with length 0.7 * radius, pointing at 0.0 radians (the positive X-semiaxis) and color handsHMColor*/
        geometry = new THREE.BufferGeometry();
        vertices = new Float32Array( [
            0.0, 0.035 * radius,  0.0,
            -0.14 * radius, 0.0,  0.0,
            0.0, -0.035 * radius,  0.0,
            0.0, -0.035 * radius,  0.0,
            0.7 * radius, 0.0, 0.0,
            0.0, 0.035 * radius,  0.0,
        ] );
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3) );
        material = new THREE.MeshBasicMaterial({color: 0xaaaaaa});
        mesh = new THREE.Mesh( geometry, material );
        this.handM = mesh
        this.add(this.handM);

        // Create the second hand (a line segment and a circle) pointing at 0.0 radians (the positive X-semiaxis)
        this.handS = new THREE.Group();

        // Create the line segment
        points = [new THREE.Vector2(0.0, 0.0), new THREE.Vector2(0.8 * radius, 0.0)];
        geometry = new THREE.BufferGeometry().setFromPoints(points);
        material = new THREE.LineBasicMaterial({ color: handSColor });
        let handS = new THREE.LineSegments(geometry, material);
        this.handS.add(handS);

        // Create the circle
        geometry = new THREE.CircleGeometry(0.03 * radius, 16);
        material = new THREE.MeshBasicMaterial({ color: handSColor });
        handS = new THREE.Mesh(geometry, material);
        this.handS.add(handS);

        this.add(this.handS);

        // Set the watch position
        this.position.set(center.x, center.y);

        // Create one HTML <div> element

        // Start by getting a "container" <div> element with the top-left corner at the center of the viewport (the origin of the coordinate system)
        const container = document.getElementById("container");

        // Then create a "label" <div> element and append it as a child of "container"
        this.label = document.createElement("div");
        this.label.style.position = "absolute";
        this.label.style.left = (50.0 * center.x - 30.0 * radius).toString() + "vmin";
        this.label.style.top = (-50.0 * center.y + 54.0 * radius).toString() + "vmin";
        this.label.style.width = (60.0 * radius).toString() + "vmin";
        this.label.style.fontSize = (8.0 * radius).toString() + "vmin";
        this.label.style.backgroundColor = "#" + new THREE.Color(nameBackgroundColor).getHexString();
        this.label.style.color = "#" + new THREE.Color(nameForegroundColor).getHexString();
        this.label.innerHTML = this.cities[this.cityIndex].name;
        container.appendChild(this.label);
    }

    update() {
        const time = Date().split(" ")[4].split(":").map(Number); // Hours: time[0]; minutes: time[1]; seconds: time[2]
        time[0] = (time[0] + this.cities[this.cityIndex].timeZone) % 12;
        // Compute the second hand angle
        let angle = Math.PI / 2.0 - 2.0 * Math.PI * time[2] / 60.0;
        this.handS.rotation.z = angle;

        /* To-do #5 - Compute the minute hand angle. It depends mostly on the current minutes value (time[1]), but you will get a more accurate result if you make it depend on the seconds value (time[2]) as well.*/
        angle = Math.PI / 2.0 - 2.0 * Math.PI * time[1] / 60.0 - 2.0 * Math.PI * time[2] / 3600.0;
        this.handM.rotation.z = angle; 

        /* To-do #6 - Compute the hour hand angle. It depends mainly on the current hours value (time[0]). Nevertheless, you will get a much better result if you make it also depend on the minutes and seconds values (time[1] and time[2] respectively). */
        angle = Math.PI / 2.0 - (2.0 * Math.PI * time[0] / 60.0) - (2.0 * Math.PI * time[1] / (60.0 * 60.0)) - (2.0 * Math.PI * time[1] / (60.0 * 60.0 * 60.0));
        this.handH.rotation.z = angle;
    }
}