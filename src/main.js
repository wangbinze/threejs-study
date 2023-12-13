import * as THREE from 'three';

console.log(THREE);

const scene = new THREE.Scene();
// three.js 里有几种不同的相机,这里使用的是PerspectiveCamera（透视摄像机）
// 视野角度(fov), 长宽比, 近截面(near), 远截面(far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// 添加立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

