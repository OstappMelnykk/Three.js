import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import {GUI} from 'dat.gui'


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

    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)


    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 1.5

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    })

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener("change", function(event: any) {
      renderer.render(scene, camera)
    })
    const stats = new Stats()
    document.body.appendChild(stats.dom)


    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial({ wireframe: true })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)


    function animate(){
      requestAnimationFrame(animate)
      stats.update()
    }

    animate()
    renderer.render(scene, camera)
  }
}
