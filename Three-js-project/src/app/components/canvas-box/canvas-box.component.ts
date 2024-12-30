import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {GUI} from 'dat.gui'

/*
    /addons/
    /examples/jsm/
*/

@Component({
  selector: 'app-canvas-box',
  standalone: true,
  imports: [],
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.scss'
})


export class CanvasBoxComponent implements OnInit
{
  ngOnInit(): void
  {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void
  {
    const scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(1, 2, 3)

    const renderer = new THREE.WebGLRenderer({ antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    new OrbitControls(camera, renderer.domElement)

    const stats = new Stats()
    document.body.appendChild(stats.dom)





    const vertices = new Float32Array([
      -1, -1, 0,
      1, -1, 0,
      1, 1, 0,
      1, 1, 1,
    ]);

    const indices = [
      0, 1,
      1, 2,
      2, 3,
    ];

    const geometry : THREE.BufferGeometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex( indices );

    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

    const lines = new THREE.Line(geometry, material);
    lines.position.set(0,0,-1);
    scene.add(lines);


    const gui = new GUI();

    let pointsFolders = [];

    for (let i = 0; i < vertices.length / 3; i++) {
      const point = {
        x: vertices[i * 3],
        y: vertices[i * 3 + 1],
        z: vertices[i * 3 + 2]
      };

      const folder = gui.addFolder(`Point ${i + 1}`);
      pointsFolders.push(folder);

      let position = geometry.attributes['position']

      folder.add(point, "x", -10, 10).onChange(() => { vertices[i * 3] = point.x; position.needsUpdate = true; });
      folder.add(point, "y", -10, 10).onChange(() => { vertices[i * 3 + 1] = point.y; position.needsUpdate = true;});
      folder.add(point, "z", -10, 10).onChange(() => { vertices[i * 3 + 2] = point.z; position.needsUpdate = true; });
      folder.open()
    }






    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
      stats.update()
    }
    animate()
  }
}
