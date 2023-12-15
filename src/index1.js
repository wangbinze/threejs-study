/**
 * 创建第一个场景
 * 场景是场景的容器, 场景中包含了所有可见的对象
 * 场景中包含了相机, 相机是场景中可见的对象
 * 场景中包含了渲染器, 渲染器是场景中可见的对象
 * 场景中包含了光源, 光源是场景中可见的对象
 * 场景中包含了物体, 物体是场景中可见的对象
 */

import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

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
/**
 *
 * @type {BoxGeometry}
 * BoxGeometry（立方体）
 * MeshBasicMaterial（基础材质）
 * Mesh（网格）
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// 在这里我们创建了一个使渲染器能够在每次屏幕刷新时对场景进行绘制的循环（在大多数屏幕上，刷新率一般是60次/秒）
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
// 用于判断浏览器是否只是three.js   用的webgl检测
if ( WebGL.isWebGLAvailable() ) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}

