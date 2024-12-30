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
    scene.add(new THREE.AxesHelper(5))

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(1, 2, 3)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    new OrbitControls(camera, renderer.domElement)

//////////////////////////////////////////////////////////////////

    //build in geometry

    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(),
    //   new THREE.MeshNormalMaterial({ wireframe: true })
    // )
    //
    // scene.add(cube)

//////////////////////////////////////////////////////////////////

    //cusom line geometry

    /*const points = [
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(1, 0, 0),
    ]

    let geometry = new THREE.BufferGeometry().setFromPoints(points)

    let line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: 0x888888
      }))

    line.position.set(0, 1, 1)
    scene.add(line)
    */

//////////////////////////////////////////////////////////////////

    // const geometry = new THREE.BufferGeometry();
    //
    // const vertices = new Float32Array( [
    //   -1.0, -1.0,  1.0, // v0
    //   1.0, -1.0,  1.0, // v1
    //   1.0,  1.0,  1.0, // v2
    //
    //   1.0,  1.0,  1.0, // v3
    //   -1.0,  1.0,  1.0, // v4
    //   -1.0, -1.0,  1.0  // v5
    // ] );
    //
    // geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    //
    // const mesh = new THREE.Mesh(
    //   geometry,
    //   new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true }));


//////////////////////////////////////////////////////////////////


    // const geometry = new THREE.BufferGeometry();
    //
    // const vertices = new Float32Array( [
    //   -1.0, -1.0,  1.0, // v0
    //   1.0, -1.0,  1.0, // v1
    //   1.0,  1.0,  1.0, // v2
    //   -1.0,  1.0,  1.0, // v3
    // ] );
    //
    // const indices = [
    //   0, 1, 2,
    //   2, 3, 0,
    // ];
    //
    // geometry.setIndex( indices );
    // geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    //
    // const material = new THREE.MeshBasicMaterial( {
    //   color: 0xff0000,
    //   wireframe: true
    // });
    // const mesh = new THREE.Mesh( geometry, material );
    //
    //
    // scene.add( mesh );

//////////////////////////////////////////////////////////////////


//     //додавання кольорів до вершин
//
//
//     const vertices = new Float32Array([
//       0, 1, 0,   // Верхня вершина
//       -1, -1, 0,  // Ліва нижня вершина
//       1, -1, 0   // Права нижня вершина
//     ]);
//
// // Кольори
//     const colors = new Float32Array([
//       1, 0, 0,  // Червоний (для верхньої вершини)
//       0, 1, 0,  // Зелений (для лівої вершини)
//       0, 0, 1   // Синій (для правої вершини)
//     ]);
//
// // Геометрія
//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//     geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
//
// // Матеріал
//     const material = new THREE.MeshBasicMaterial({
//       vertexColors: true, // Використовувати кольори вершин
//       side: THREE.DoubleSide
//     });
//
// // Сітка
//     const triangle = new THREE.Mesh(geometry, material);
//     scene.add(triangle);



//////////////////////////////////////////////////////////////////




// Вершини п'ятикутника
    const vertices = new Float32Array([
      0, 1, 0,    // Верхня точка
      -0.95, 0.31, 0, // Ліва верхня точка
      -0.59, -0.81, 0, // Ліва нижня точка
      0.59, -0.81, 0,  // Права нижня точка
      0.95, 0.31, 0    // Права верхня точка
    ]);

// Індекси для створення трикутників
    const indices = [
      0, 1, 4, // Верхній трикутник
      1, 2, 4, // Лівий нижній трикутник
      2, 3, 4  // Правий нижній трикутник
    ];

// Геометрія
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);

// Матеріал
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide
    });

// Сітка
    const pentagon = new THREE.Mesh(geometry, material);
    scene.add(pentagon);









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
