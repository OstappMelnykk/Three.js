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
    //scene.background = new THREE.Color(0xffffff);
    //scene.background = new THREE.TextureLoader().load('https://sbcode.net/img/grid.png');
    //scene.background = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
    //scene.backgroundBlurriness = 0.5

    scene.add(new THREE.GridHelper)


    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.0001,
      1000)
    camera.position.set(0, 2, 1)
    camera.lookAt(0, 0.5, 0)



    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    let controls = new OrbitControls(camera, renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial({ wireframe: true })

    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0.5, 0)
    scene.add(cube)

    const stats = new Stats()
    document.body.appendChild(stats.dom)

    const gui = new GUI()

    const cubeFolder = gui.addFolder("cube")
    cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2)
    cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2)
    cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2)
    cubeFolder.open()

    const cameraFolder = gui.addFolder("Camera")
    cameraFolder.add(camera.position, "x", -10, 10)
    cameraFolder.add(camera.position, "y", -10, 10)
    cameraFolder.add(camera.position, "z", -10, 10)
    cameraFolder.add(camera, "fov", 0, 180, 0.01).onChange(function () {
      camera.updateProjectionMatrix()
    })
    cameraFolder.add(camera, "aspect", 0.00001, 10).onChange(function () {
      camera.updateProjectionMatrix()
    })
    cameraFolder.add(camera, "near", 0.01, 10).onChange(function () {
      camera.updateProjectionMatrix()
    })
    cameraFolder.add(camera, "far", 0.01, 10).onChange(function () {
      camera.updateProjectionMatrix()
    })
    cameraFolder.open()


    function animate() {
      requestAnimationFrame(animate)

      //cube.rotation.x += 0.01
      //cube.rotation.y += 0.01

      camera.lookAt(0, 0.5, 0)
      renderer.render(scene, camera)

      stats.update()
    }

    animate()

  }
}
