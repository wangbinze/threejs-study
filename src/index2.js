/**
 * 画线
 */
import * as THREE from 'three';

// 渲染器
const renderer = new THREE.WebGLRenderer();

// 渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement);

// 相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// 相机的位置
camera.position.set(0, 0, 100);
// 相机的方向
camera.lookAt(0, 0, 0)


// 场景
const scene = new THREE.Scene();

// 定义线的材质；有  LineBasicMaterial 和 LineDashedMaterial 两种
const material = new THREE.LineBasicMaterial({
    color: 0x0000ff
});

// 三个点的位置
const positions = [];
positions.push(new THREE.Vector3(-10, 0, 0));
positions.push(new THREE.Vector3(0, 10, 0));
positions.push(new THREE.Vector3(10, 0, 0));
const geometry = new THREE.BufferGeometry().setFromPoints(positions);

const line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);