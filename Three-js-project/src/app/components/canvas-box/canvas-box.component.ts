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




    const loader = new GLTFLoader();
    loader.load(

      '/assets/GLTF_3D_Models/Lion guarding chinatown.glb',
      (gltf) => {
        scene.add(gltf.scene);

        // Manipulating the object after it's loaded
        const model = gltf.scene;

        model.position.set(0, 0, 0);
        model.scale.set(4, 4, 4);
        model.rotation.set(Math.PI / 8, 0, 0);


      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% завантажено');
      },
      (error) => {
        console.error('Сталася помилка при завантаженні GLTF:', error);
      }
    );





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
