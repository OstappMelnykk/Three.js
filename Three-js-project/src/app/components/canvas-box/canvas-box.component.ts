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


export class CanvasBoxComponent implements OnInit
{
  ngOnInit(): void
  {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void
  {
    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5)

    const orbit = new OrbitControls( camera, renderer.domElement );

    const axesHelper = new THREE.AxesHelper(50)
    const gridHelper = new THREE.GridHelper(30, 30)
    gridHelper.position.set(0, -2, 0)
    scene.add(gridHelper, axesHelper)



    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
    })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    scene.add(box)



    const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
    scene.add(ambientLight);


    const gui = new dat.GUI();
    const cubeFolder = gui.addFolder('Cube')
    cubeFolder.add(box.rotation, 'x', 0, Math.PI * 2)
    cubeFolder.add(box.rotation, 'y', 0, Math.PI * 2)
    cubeFolder.add(box.rotation, 'z', 0, Math.PI * 2)
    cubeFolder.open()


/*
    const options = {
      angle: 0.2,
      penumbra: 0,
      intensity: 1,
    }

    gui.add(options, 'angle', 0, 1)
    gui.add(options, 'penumbra', 0, 1)
    gui.add(options, 'intensity', 0, 500)
*/



    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })



    function animate(){
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

  }
}
