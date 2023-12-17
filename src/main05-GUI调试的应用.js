// 导入three.js
import * as THREE from 'three';
// 导入轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// 导入lil.gui
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45, // 视角
    window.innerWidth / window.innerHeight, // 视窗比例
    0.1, // 近裁面
    1000 // 远裁面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});
const parentMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff
})

let parentCube = new THREE.Mesh(geometry, parentMaterial);
// 设置材质为线框模式
parentMaterial.wireframe = true;
// 创建网格
const cube = new THREE.Mesh(geometry, material);
parentCube.add(cube);
// 设置立方体位置
// cube.position.x = 2;
parentCube.position.set(-3, 0, 0)
// 位置相对于父元素的位置
// 有父元素相对于父元素坐标，没有则是世界坐标
cube.position.set(3, 0, 0)

// 设置cube 的放大  也会跟着父元素的放大而变化
// cube.scale.set(2, 2, 2);
// 添加网格到场景
scene.add(parentCube);

// 设置相机位置
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// const controls = new OrbitControls(camera, document.body);
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.1;
// 设置自动旋转
// controls.autoRotate = true;

// 动画循环,每一帧执行,渲染函数
function animate() {
    controls.update(); // 更新轨道控制器
    // 每一帧执行的函数
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// 监听窗口的变化
window.addEventListener('resize', () => {
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 重新计算相机的投影矩阵
    camera.updateProjectionMatrix();
})


let eventObj = {
    FullScreen: () => {
        // 全屏
        document.documentElement.requestFullscreen();
    }, ExitFullScreen: () => {
        // 退出全屏
        document.exitFullscreen();
    },
}

// 创建GUI
const gui = new GUI();
gui.add(eventObj, 'FullScreen').name('全屏');
gui.add(eventObj, 'ExitFullScreen');

// 控制立方体位置
let folder = gui.addFolder('立方体位置');
// gui.add(cube.position, 'x', -5, 5).name('x');
folder
    .add(cube.position, 'x')
    .min(-10)
    .max(10)
    .step(0.5)
    .name('立方体x轴位置')
    .onChange((val) => {
        console.log(val)
    });
folder
    .add(cube.position, 'y')
    .min(-10)
    .max(10)
    .step(0.5)
    .name('立方体y轴位置')
    .onFinishChange((val) => {
        console.log(val)
    });
folder.add(cube.position, 'z').min(-10).max(10).step(0.5).name('立方体z轴位置');
gui.add(parentMaterial, 'wireframe').name('立方体线框模式');
let colorParams = {
    cubeColor: 0x00ff00,
}
gui
    .addColor(colorParams, 'cubeColor')
    .name('立方体颜色')
    .onChange((val) => {
        cube.material.color.set(val)
    })
