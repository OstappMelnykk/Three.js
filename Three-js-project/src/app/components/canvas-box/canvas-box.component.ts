import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {GUI} from 'dat.gui'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
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





    const positions =  new Float32Array([
      -1, -1, 0,  // Нижній лівий
      1, -1, 0,  // Нижній правий
      1,  1, 0,  // Верхній правий
      -1,  1, 0,  // Верхній лівий
    ]);

    const geometry = new LineGeometry();

   // (p1 p2) -> (p2 p3) -> (p3 p4)
    geometry.setPositions(positions);

    const material = new LineMaterial({
      color: 0xff0000, // Червоний колір
      linewidth: 20,    // Товщина ліній
    });

// Задаємо роздільну здатність (обов’язково для LineMaterial)
    material.resolution.set(window.innerWidth, window.innerHeight);

// Створюємо об'єкт Line2 і додаємо до сцени
    const line = new Line2(geometry, material);
    scene.add(line);



    const gui = new GUI()
    gui.add(material, "linewidth", 0.01, 100)
    gui.addColor({ color: material.color.getHex() }, "color");
    // gui.addColor({ color: material.color.getHex() }, "color").onChange((value) => {
    //   material.color.set(value);
    // });




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
