import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {GUI} from 'dat.gui'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'


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



    // // Визначаємо набір точок для ConvexGeometry
    // const points = [
    //   new THREE.Vector3(-1, -1, 0),
    //   new THREE.Vector3(1, -1, 0),
    //   new THREE.Vector3(1, 1, 0),
    //   new THREE.Vector3(-1, 1, 0),
    //   new THREE.Vector3(0, 0, 2)
    // ];

    const points = [];
    const numberOfPoints = 100;  // кількість точок

    for (let i = 0; i < numberOfPoints; i++) {
      const x = Math.random() * 10 - 5;  // Генерація випадкового x від -5 до 5
      const y = Math.random() * 10 - 5;  // Генерація випадкового y від -5 до 5
      const z = Math.random() * 10 - 5;  // Генерація випадкового z від -5 до 5
      points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new ConvexGeometry( points );
    //const material = new THREE.MeshNormalMaterial({wireframe: true});
    const material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );






    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }
}
