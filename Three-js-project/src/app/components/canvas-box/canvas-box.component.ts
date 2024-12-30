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



    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
    const geometry = new THREE.BufferGeometry()
    const points = [
      new THREE.Vector3(-1, 1, -1), //c
      new THREE.Vector3(-1, -1, 1), //b
      new THREE.Vector3(1, 1, 1), //a

      new THREE.Vector3(1, 1, 1), //a
      new THREE.Vector3(1, -1, -1), //d
      new THREE.Vector3(-1, 1, -1), //c

      new THREE.Vector3(-1, -1, 1), //b
      new THREE.Vector3(1, -1, -1), //d
      new THREE.Vector3(1, 1, 1), //a

      new THREE.Vector3(-1, 1, -1), //c
      new THREE.Vector3(1, -1, -1), //d
      new THREE.Vector3(-1, -1, 1) //b
    ]

    geometry.setFromPoints(points)
    geometry.computeVertexNormals()

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)



    const data = {
      x: 1
    }

    const gui = new GUI()
    gui.add(data, 'x', -5, -1, 0.01).onChange(() => {
      geometry.attributes['position'].array[3] = data.x
      geometry.attributes['position'].needsUpdate = true
    })
    gui.open()




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
