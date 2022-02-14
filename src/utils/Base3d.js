import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

//导入控制器 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Base3d{
    constructor(selector){
        this.container = document.querySelector(selector);
        this.camera;
        this.scene;
        this.renderer;
        this.controls;
        this.init();
        this.animate();
    }
    init(){
        //初始化场景
        this.initScene();
        //初始化相机
        this.initCamera();
        //初始化渲染器
        this.initRenderer();
        //初始化控制器
        this.initControls();
    }
    initScene(){
        this.scene = new THREE.Scene();
        this.setEnvMap("222");
    }
    initCamera(){
        this.camera = new THREE.PerspectiveCamera(45,
            window.innerWidth/window.innerHeight,0.25,200);
        this.camera.position.set(-1.8, 0.6, 2.7);
    }
    initRenderer(){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
    }

    initControls(){
        this.controls = new OrbitControls(this.camera,this.renderer.domElement);
    }

    setEnvMap(hdr){
        new RGBELoader().setPath('./files/hdr/').load(hdr+'.hdr',(texture)=>{
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;
        })
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    animate(){
        this.renderer.setAnimationLoop(this.render.bind(this));
    }
}

export default Base3d;