import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 1);
    shape.lineTo(1, 1);
    shape.lineTo(1, 0);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    const materialSettings = {
      wireframe: true, // Значення для GUI
    };

    const material = new THREE.MeshNormalMaterial({wireframe:true});

    function createExtrudedGeometry() {
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }

    let mesh = createExtrudedGeometry();
    scene.add(mesh);

    const gui = new GUI();

    gui.add(extrudeSettings, 'steps', 1, 10).step(1).onChange(updateGeometry);
    gui.add(extrudeSettings, 'depth', 0, 10).onChange(updateGeometry);
    gui.add(extrudeSettings, 'bevelEnabled').onChange(updateGeometry);
    gui.add(extrudeSettings, 'bevelThickness', -1, 3).onChange(updateGeometry);
    gui.add(extrudeSettings, 'bevelSize', 0, 1).onChange(updateGeometry);
    gui.add(extrudeSettings, 'bevelOffset', 0, 3).onChange(updateGeometry);
    gui.add(extrudeSettings, 'bevelSegments', 1, 30).step(1).onChange(updateGeometry);

    gui.add(materialSettings, 'wireframe').onChange(updateMaterial);

    function updateGeometry() {
      const newGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      mesh.geometry.dispose(); // Очистіть стару геометрію
      mesh.geometry = newGeometry;
    }

    function updateMaterial() {
      mesh.material.wireframe = materialSettings.wireframe; // Оновлюємо властивість material
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
