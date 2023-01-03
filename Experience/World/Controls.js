import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
export default class Constrols{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
    }

   

    // setPath(){
    //     this.curve =  new THREE.CatmullRomCurve3([
    //         new THREE.Vector3(-5, 0, 0),
    //         new THREE.Vector3(0, 0, -5),
    //         new THREE.Vector3(5, 0, 0),
    //         new THREE.Vector3(0, 0, 5),
    //     ], true);

    //     const points = this.curve.getPoints(50);
    //     const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //     const material = new THREE.LineBasicMaterial({color: 0xffffff});

    //     const curveObj = new THREE.Line(geometry, material);
    //     this.scene.add(curveObj);
    // }

    // onWheel(){
    //     window.addEventListener("wheel",(e)=>{
    //         if(e.deltaY > 0){
    //             this.lerp.target += 0.01;
    //             this.back = false;
    //         }else{

    //             this.lerp.target -= 0.01;
    //             this.back = true;
    //         }
    //     })
    // }

    resize(){
    }
    
    update(){

    }
}