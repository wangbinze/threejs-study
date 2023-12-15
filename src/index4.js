/**
 * 载入3D模型
 * @param {*} scene 场景
 * @param {*} camera 相机
 * @param {*} renderer 渲染器
 * @param {*} model 3D模型
 * @param {*} scale 缩放比例
 * @param {*} position 位置
 * @param {*} rotation 旋转
 * @param {*} color 颜色
 * @param {*} opacity 不透明度
 * @param {*} wireframe 是否为线框模式
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
// three.js 里有几种不同的相机,这里使用的是PerspectiveCamera（透视摄像机）
// 视野角度(fov), 长宽比, 近截面(near), 远截面(far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2, false);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);


// 场景
// const scene = new THREE.Scene();
const loader = new GLTFLoader();

loader.load( '../public/Cesium_Air.glb', function ( gltf ) {
    console.log(gltf)
    scene.add( gltf.scene );

}, undefined, function ( error ) {
    console.error( error );
} );