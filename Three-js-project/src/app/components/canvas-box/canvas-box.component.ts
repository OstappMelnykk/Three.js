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





    function twist(geometry: THREE.BufferGeometry, factor: number) {
      const q = new THREE.Quaternion()
      const up = new THREE.Vector3(0, 1, 0)
      const p = geometry.attributes['position'].array

      for (let i = 0; i < p.length; i += 3) {
        q.setFromAxisAngle(up, p[i + 1] * factor)

        let vec = new THREE.Vector3(p[i], p[i + 1], p[i + 2])
        vec.applyQuaternion(q)

        p[i] = vec.x
        p[i + 2] = vec.z
      }

      geometry.computeVertexNormals()
      geometry.attributes['position'].needsUpdate = true
    }

    let geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)

    twist(geometry, Math.PI / 2)

    const twistedCube = new THREE.Mesh(
      geometry,
      new THREE.MeshNormalMaterial({ wireframe: true })
    )

    scene.add(twistedCube)

    const data = {
      t: Math.PI / 2
    }

    const gui = new GUI()
    gui.add(data, 't', -Math.PI, Math.PI, 0.01).onChange((t) => {
      twistedCube.geometry.dispose()
      geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
      twist(geometry, t)
      twistedCube.geometry = geometry
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
