import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


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












    // Create lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);  // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Main directional light (e.g., sunlight)
    directionalLight.position.set(5, 10, 7);  // Adjust position for better illumination
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff0000, 1, 10);  // Red point light
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);




    // Створення форми (наприклад, серце)
    const heartShape = new THREE.Shape();
    heartShape.moveTo(5, 5);
    heartShape.bezierCurveTo(5, 5, 4, 0, 0, 0);
    heartShape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
    heartShape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
    heartShape.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
    heartShape.bezierCurveTo(16, 7, 16, 0, 10, 0);
    heartShape.bezierCurveTo(7, 0, 5, 5, 5, 5);

// Створення геометрії з форми
    const geometry = new THREE.ShapeGeometry(heartShape);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);





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
