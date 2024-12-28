import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

@Component({
  selector: 'app-canvas-box',
  standalone: true,
  imports: [],
  templateUrl: './canvas-box.component.html',
  styleUrl: './canvas-box.component.scss'
})
export class CanvasBoxComponent implements OnInit {
  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void
  {
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xe232222, 1);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const orbit = new OrbitControls( camera, renderer.domElement );
    camera.position.set(0, 2, 5)
    orbit.update();

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)


    const boxGeometry = new THREE.BoxGeometry()
    const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    scene.add(box)

    function animate(){
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
  }
}
