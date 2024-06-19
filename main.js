import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xDCF0FF); 

//controles

const controls = new OrbitControls(camera, renderer.domElement);

// materiales

const blanco = new THREE.MeshStandardMaterial({color: 0xDAD6BF}) 
const blanco2 = new THREE.MeshStandardMaterial({color: 0xFFFFFF}) 
const azul = new THREE.MeshStandardMaterial({color: 0x05214A}) 
const negro = new THREE.MeshStandardMaterial({color: 0x060606})
const amarillo = new THREE.MeshStandardMaterial({color: 0xDBBC1D})

// partes del cuerpo

const cuerpoPrincipal = new THREE.CapsuleGeometry( 1.2, 1.8, 32, 32);
const cuerpoSecundario = new THREE.CapsuleGeometry( 1.35, 1.8, 32, 32);
const ojos = new THREE.SphereGeometry(.45, 32, 32)
const pupilas = new THREE.SphereGeometry(.15, 32, 32)
const nariz = new THREE.ConeGeometry( .2, .5, 32 );
const alas = new THREE.CapsuleGeometry(.5, 1, 32, 2)
const pies = new THREE.CapsuleGeometry(.4, .4, 32, 32)

//creando cuerpo

const cuerpo = new THREE.Mesh(cuerpoPrincipal, blanco)
cuerpo.position.set(0, 0, 0)
scene.add(cuerpo)

const cuerpo2 = new THREE.Mesh(cuerpoSecundario, azul)
cuerpo2.position.set(0, .1, -.30)
scene.add(cuerpo2)

for(let i = 0; i < 2; i++){
    const ojo = new THREE.Mesh(ojos, negro)
    const pupila = new THREE.Mesh(pupilas, blanco2)

    ojo.position.set(i===0 ? .4: -.4, .7, .9);
    pupila.position.set(i===0 ? .4: -.4, .7, 1.3);

    const ala = new THREE.Mesh(alas, azul)
    ala.position.set(i === 0 ? 1.5: -1.5,-.5,0);
    ala.rotation.z = i === 0 ? Math.PI / 2 - 10: Math.PI / 2 + 10;

    const pie = new THREE.Mesh(pies, amarillo);
    pie.position.set(i === 0 ? -.6: .6,-1.7, .4)

    pie.rotation.x = Math.PI / 2;
    scene.add(ojo, pupila, ala, pie)
}

const narizCono = new THREE.Mesh(nariz, amarillo)
narizCono.position.set(0, .25, 1.3)
narizCono.rotation.x = Math.PI / 2; 
scene.add(narizCono)

//Luces


const light = new THREE.AmbientLight( 0xFEFEFE, 5 ); // soft white light
scene.add( light );

const directionalLight = new THREE.DirectionalLight(0xFFEEDD, 5);
directionalLight.position.set(-5, 5, 5);


scene.add(directionalLight);

// Posición inicial de la cámara
camera.position.z = 10;


function animate() {
    controls.update(); // Actualiza los controles de órbita
    renderer.render(scene, camera); // Renderiza la escena
}

