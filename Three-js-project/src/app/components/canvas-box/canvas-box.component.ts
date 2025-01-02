import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'

import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';

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

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)



    const renderer = new THREE.WebGLRenderer({ antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.target.set(0, 0, 0)
    orbitControls.update()

    const stats = new Stats()
    document.body.appendChild(stats.dom)


    scene.add(new THREE.AxesHelper(30))

    const gridHelper = new THREE.GridHelper(30, 50, 50)
    gridHelper.position.y = -4;
    scene.add(gridHelper)




    const material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      vertexColors: false   //!!!!!!!
    });



    ///////////////////////////////
    const boxParametrs = {
      boxWidth: 2,
      boxHeight: 2,
      boxDepth: 2,
    }
    const boxGeometry = new THREE.BoxGeometry(
      boxParametrs.boxWidth,
      boxParametrs.boxHeight,
      boxParametrs.boxDepth
    )
    const boxMesh = new THREE.Mesh(boxGeometry, material)
    boxMesh.position.set(0, 5, 0)

    scene.add(boxMesh)

    ///////////////////////////////
    const capsuleParametrs = {
      radius: 1,
      length: 1,
      capSegments: 4,
      radialSegments: 8
    }
    const capsuleGeometry = new THREE.CapsuleGeometry(
      capsuleParametrs.radius,
      capsuleParametrs.length,
      capsuleParametrs.capSegments,
      capsuleParametrs.radialSegments
    )
    const CapsuleMesh = new THREE.Mesh(capsuleGeometry, material)
    CapsuleMesh.position.set(3, 5, 0)
    scene.add(CapsuleMesh)


    ///////////////////////////////

    const dodecahedronParametrs = {
      radius: 1.35,
      detail: 0,
    }
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(
      dodecahedronParametrs.radius,
      dodecahedronParametrs.detail,
    )
    const DodecahedronMesh = new THREE.Mesh(dodecahedronGeometry, material)
    DodecahedronMesh.position.set(-3, 5, 0)
    scene.add(DodecahedronMesh)


    ///////////////////////////////


    const icosahedronParametrs = {
      radius: 1.35,
      detail: 0,
    }
    const icosahedronGeometry = new THREE.IcosahedronGeometry(
      icosahedronParametrs.radius,
      icosahedronParametrs.detail,
    )
    const IcosahedronMesh = new THREE.Mesh(icosahedronGeometry, material)
    IcosahedronMesh.position.set(-6, 5, 0)
    scene.add(IcosahedronMesh)


    ///////////////////////////////


    const edges = new THREE.EdgesGeometry(icosahedronGeometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));
    line.position.set(-9, 5, 0)


    scene.add(line);


    ///////////////////////////////


    const planeParametrs = {
      width: 2,
      height: 2,
    }
    const planeGeometry = new THREE.PlaneGeometry(
      planeParametrs.width,
      planeParametrs.height,
    )
    const PlaneMesh = new THREE.Mesh(planeGeometry, material)
    PlaneMesh.position.set(6, 5, 0)
    scene.add(PlaneMesh)


    ///////////////////////////////


    const ConvexGeometryPoints: THREE.Vector3[] = []
    const numberOfPoints: number = 20

    for (let i = 0; i < numberOfPoints; i++) {
      const x = Math.random() * 5 - 2.5; // Генерація випадкового x від -2.5 до 2.5
      const y = Math.random() * 5 - 2.5; // Генерація випадкового y від -2.5 до 2.5
      const z = Math.random() * 5 - 2.5; // Генерація випадкового z від -2.5 до 2.5
      ConvexGeometryPoints.push(new THREE.Vector3(x, y, z));
    }

    const convexParametrs = {
      points: ConvexGeometryPoints,
    }
    const convexGeometry = new ConvexGeometry(
      convexParametrs.points
    )
    const convexMesh = new THREE.Mesh(convexGeometry, material)
    convexMesh.position.set(10, 5, 0)
    scene.add(convexMesh)


    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////


    const vertices_1 = new Float32Array([
      0, 0, 0, // Вершина 1
      1, 0, 0, // Вершина 2
      0, 1, 0, // Вершина 3
    ]);

    const geometry_1 = new THREE.BufferGeometry();
    const position_1 = new THREE.BufferAttribute(vertices_1, 3);

    geometry_1.setAttribute('position', position_1);
    geometry_1.computeVertexNormals(); // Обчислення нормалей

    const Mesh_1 = new THREE.Mesh(geometry_1, material)
    Mesh_1.position.set(-6, 10, 0)
    scene.add(Mesh_1)


    ////////////////////////////////////////////////


    const vertices_2: THREE.Vector3[] = [
      new THREE.Vector3(0, 0, 0),  // Вершина 1
      new THREE.Vector3(1, 1, 1),  // Вершина 2
      new THREE.Vector3(2, 0, 1),  // Вершина 3
    ];
    const geometry_2 = new THREE.BufferGeometry()

    geometry_2.setFromPoints(vertices_2);
    geometry_2.computeVertexNormals(); // Обчислення нормалей

    const Mesh_2 = new THREE.Mesh(geometry_2, material)
    Mesh_2.position.set(-3, 10, 0)
    scene.add(Mesh_2)


    ////////////////////////////////////////////////


    const vertices_3: Float32Array = new Float32Array([
      0, 0, 0, // Вершина 1
      1, 0, 0, // Вершина 2
      0, 1, 0, // Вершина 3
      1, 1, 0, // Вершина 4
    ]);
    const indices_3: Uint16Array = new Uint16Array([
      0, 1, 2, // Трикутник 1
      2, 1, 3, // Трикутник 2
    ]);

    const geometry_3 = new THREE.BufferGeometry();
    const position_3 = new THREE.BufferAttribute(vertices_3, 3);

    geometry_3.setAttribute('position', position_3);
    //geometry_3.setAttribute('position', new THREE.BufferAttribute(vertices_3, 3));
    geometry_3.setIndex(new THREE.BufferAttribute(indices_3, 1));
    geometry_3.computeVertexNormals(); // Обчислення нормалей


    const Mesh_3 = new THREE.Mesh(geometry_3, material)
    Mesh_3.position.set(0, 10, 0)
    scene.add(Mesh_3)


    ////////////////////////////////////////////////


    const vertices_4: Float32Array = new Float32Array([
      0, 0, 0, // Вершина 1
      1, 0, 0, // Вершина 2
      0, 1, 0, // Вершина 3
      1, 1, 0, // Вершина 4
    ]);
    const indices_4: Uint16Array = new Uint16Array([
      0, 1, 2, // Трикутник 1
      2, 1, 3, // Трикутник 2
    ]);
    const colors_4 = new Float32Array([
      1, 0, 0,  // Червоний
      0, 1, 0,  // Зелений
      0, 0, 1,  // Синій
      0, 1, 1   // Синій
    ]);

    const geometry_4 = new THREE.BufferGeometry();
    const position_4 = new THREE.BufferAttribute(vertices_4, 3);
    const color_4 = new THREE.BufferAttribute(colors_4, 3);

    geometry_4.setAttribute('position', position_4);
    geometry_4.setAttribute('color', color_4);
    geometry_4.setIndex(new THREE.BufferAttribute(indices_4, 1));

    geometry_4.computeVertexNormals();


    const material_4 = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      vertexColors: true   //!!!!!!!
    });

    const Mesh_4 = new THREE.Mesh(geometry_4, material_4)
    Mesh_4.position.set(3, 10, 0)
    scene.add(Mesh_4)


    ////////////////////////////////////////////////


    const vertices_5: Float32Array = new Float32Array([
      0, 0, 0, // Вершина 1
      0, 1, 0, // Вершина 2
      1, 1, 0, // Вершина 3

      2, 1, 0, // Вершина 4
      3, 1, 0, // Вершина 5
      4, 1, 0, // Вершина 6
    ]);
    const indices_5: Uint16Array = new Uint16Array([
      0, 1, 2, // Трикутник 1
    ]);
    const colors_5 = new Float32Array([
      1, 0, 0,  // Червоний
      0, 1, 0,  // Зелений
      0, 0, 1,  // Синій

      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
    ]);

    const geometry_5 = new THREE.BufferGeometry();
    const position_5 = new THREE.BufferAttribute(vertices_5, 3);
    const color_5 = new THREE.BufferAttribute(colors_5, 3);

    geometry_5.setAttribute('position', position_5);
    geometry_5.setAttribute('color', color_5);
    geometry_5.setIndex(new THREE.BufferAttribute(indices_5, 1));

    geometry_5.computeVertexNormals();


    const material_5 = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      vertexColors: true   //!!!!!!!
    });

    const Mesh_5 = new THREE.Mesh(geometry_5, material_5)
    Mesh_5.position.set(6, 10, 0)
    scene.add(Mesh_5)


    const gui = new GUI()

    const indicesFolder = gui.addFolder("indices")
    const colorsFolder = gui.addFolder("colors")

    const data = { color: 0x00ff00, index: 2 }

    indicesFolder.add(data, "index", 2, (vertices_5.length / 3) - 1).step(1).onChange(() => {
      if (geometry_5.index && geometry_5.index.array){
        geometry_5.index.array[2] = data.index;

        geometry_5.index.needsUpdate = true;
        geometry_5.computeVertexNormals();
      }
    })


    for (let i = 0; i < vertices_5.length/3; i++){
      const colorsFolder_i = colorsFolder.addFolder(`colorsFolder_v${i}`)
      colorsFolder_i.addColor(data, 'color').onChange(() => {
        const r = ((data.color >> 16) & 0xff) / 255; // Red component
        const g = ((data.color >> 8) & 0xff) / 255;  // Green component
        const b = (data.color & 0xff) / 255;         // Blue component

        // geometry_5.attributes['color'].array[i * 3 + 0] = r;
        // geometry_5.attributes['color'].array[i * 3 + 1] = g;
        // geometry_5.attributes['color'].array[i * 3 + 2] = b;
        //geometry_5.attributes['color'].needsUpdate = true;


        const colorAttribute = geometry_5.getAttribute('color') as THREE.BufferAttribute;
        const colorArray = colorAttribute.array as Float32Array;
        colorArray.set([r, g, b], i * 3);
        colorAttribute.needsUpdate = true;

      })
    }

    gui.add(Mesh_5.material, 'wireframe')






    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////


    const lineBasicMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

    const vertices_6 = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1, 0.5, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(3, 0.5, 0),
    ];

    const geometry_6 = new THREE.BufferGeometry()
    geometry_6.setFromPoints(vertices_6);

    const Line_1 = new THREE.Line(geometry_6, lineBasicMaterial);
    Line_1.position.set(-6, 13, 1)
    scene.add(Line_1)


    ////////////////////////////////////////////////


    const vertices_7 = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1, 0.5, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(3, 0.5, 0),
    ];

    const geometry_7 = new THREE.BufferGeometry()
    geometry_7.setFromPoints(vertices_7);

    const Line_2 = new THREE.LineSegments(geometry_7, lineBasicMaterial);
    Line_2.position.set(-6, 14, 1)
    scene.add(Line_2)

    ////////////////////////////////////////////////

    const vertices_8 = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1, 0.5, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(3, 0.5, 0),
    ];

    const indices_6 :  Uint16Array = new Uint16Array([
      0, 2,
      1, 3
    ])


    const geometry_8 = new THREE.BufferGeometry()
    geometry_8.setFromPoints(vertices_8);
    geometry_8.setIndex(new THREE.BufferAttribute(indices_6, 1))

    const Line_3 = new THREE.Line(geometry_8, lineBasicMaterial);
    Line_3.position.set(-6, 15, 1)
    scene.add(Line_3)


    ////////////////////////////////////////////////



    const vertices_9 = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1, 0.5, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(3, 0.5, 0),
    ];

    const indices_7 :  Uint16Array = new Uint16Array([
      0, 2,
      1, 3
    ])


    const geometry_9 = new THREE.BufferGeometry()
    geometry_9.setFromPoints(vertices_9);
    geometry_9.setIndex(new THREE.BufferAttribute(indices_7, 1))

    const Line_4 = new THREE.LineSegments(geometry_9, lineBasicMaterial);
    Line_4.position.set(-6, 16, 1)
    scene.add(Line_4)



    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////


    const lineMaterial = new LineMaterial({
      color: 0xff0000,
      linewidth: 20.0
    });


    const vertices_10 = [
      -3, 0, 0,
      -1, 0.5, 0,
      1, 0, 0,
      3, 0.5, 0,
    ];

    const geometry_10 = new LineGeometry();
    geometry_10.setPositions(vertices_10);

    const Line2_1 = new Line2(geometry_10, lineMaterial);
    Line2_1.computeLineDistances(); // Necessary for wide lines (and dashed)
    Line2_1.position.set(6, 13, 1)
    scene.add(Line2_1);


    /////////////////////////////////////

    const vertices_11 = [
      -3, 0, 0,
      -1, 0.5, 0,

      1, 0, 0,
      3, 0.5, 0,
    ];

    const geometry_11 = new LineSegmentsGeometry();  //LineSegmentsGeometry
    geometry_11.setPositions(vertices_11);

    const Line2_2 = new LineSegments2(geometry_11, lineMaterial); // LineMaterial
    Line2_2.computeLineDistances();

    Line2_2.position.set(6, 14, 1);
    scene.add(Line2_2);




    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////



    const lineMaterial_wireframe = new LineMaterial({
      color: 0xffffff,
      linewidth: 5.0,
      dashed: true,       // Enable dashed lines
      dashScale: 2.0,     // Scale of the dashed pattern
      dashSize: 1.0,      // Size of each dash
      gapSize: 0.5,       // Gap between dashes
    });

    const geometryBox = new THREE.BoxGeometry(4, 4, 4);
    const wireframeGeometry = new WireframeGeometry2(geometryBox);

    const wireframe = new Wireframe(wireframeGeometry, lineMaterial_wireframe);
    wireframe.computeLineDistances();

    wireframe.position.set(0, 0, 0);
    scene.add(wireframe);







    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 0.75, 0.4);   // Яскравіший відтінок неба
    hemiLight.groundColor.setHSL(0.1, 0.7, 0.3); // Темніший відтінок землі

    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-1, 0.75, 1);
    dirLight.position.multiplyScalar(50);
    dirLight.name = "dirlight";

    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(10, 10, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);



    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
      stats.update()
    }
    animate()
  }
}

