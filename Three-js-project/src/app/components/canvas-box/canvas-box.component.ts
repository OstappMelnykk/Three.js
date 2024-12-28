import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'

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
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const orbit = new OrbitControls( camera, renderer.domElement );
    camera.position.set(-5, 15, 15)
    orbit.update();

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)


    const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
    const boxMaterial = new THREE.MeshBasicMaterial({
      color: 0x00FF00,
      //wireframe: true
    })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    scene.add(box)

    const planeGeometry = new THREE.PlaneGeometry(30, 30)
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: THREE.DoubleSide
    })

    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    scene.add(plane)
    plane.rotation.x = -Math.PI / 2;

    const gridHelper = new THREE.GridHelper(30, 10)
    scene.add(gridHelper)

    const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000FF,
      wireframe: true
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphere)

    sphere.position.set(-10, 10, 0)

    const gui = new dat.GUI();

    const options = {
      sphereColor: "#ffea00",
      wireframe: true,
      speed: 0.01
    }

    gui.addColor(options, 'sphereColor')
      .onChange(function (e){
        sphere.material.color.set(e)
      })

    gui.add(options, 'wireframe').onChange(function (e){
      sphere.material.wireframe = e
    })

    gui.add(options, 'speed', 0, 0.1)


    let step = 0
    let speed = 0.01;





    function animate(){
      box.rotation.x += 0.01;

      step += options.speed
      sphere.position.y = 10 * Math.abs(Math.sin(step))
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
  }
}
