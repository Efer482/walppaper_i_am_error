import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import GUI from "lil-gui";
export default class Envioriment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        // this.gui = new GUI();
        this.obj ={
            colorObj: {
                r: 0,
                g: 0,
                b: 0
            },
            intencity: 3,
        }
        this.setSunLight();
        // this.setGUI();
        this.switchTheme("ligth")
    }
    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLigth.color.copy(this.obj.colorObj);
            this.ambientalLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj)
        });
        this.gui.add(this.obj, "intencity", 0, 10).onChange(()=>{
            this.sunLigth.intensity = this.obj.intensity
            this.ambientalLight.intensity = this.obj.intensity
        });
    }
    setSunLight(){
        this.sunLigth = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLigth.castShadow = true;
        this.sunLigth.shadow.camera.far = 20;
        this.sunLigth.shadow.mapSize.set(2048, 2048);
        this.sunLigth.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper( this.sunLigth.shadow.camera );
        // this.scene.add(helper);
        this.sunLigth.position.set(1.5, 7, 3);
        this.scene.add(this.sunLigth);

        this.ambientalLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientalLight);
    }
    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLigth.color,{
                b: 0.00784313725490196,
                g: 0.00784313725490196,
                r: 0.011764705882352941,
            });
            GSAP.to(this.ambientalLight.color,{
                b: 0.00784313725490196,
                g: 0.00784313725490196,
                r: 0.011764705882352941,
            });
            GSAP.to(this.sunLigth,{
                intencity: 0.78,
            });
            GSAP.to(this.ambientalLight,{
                intencity: 0.78,
            });
        }else{
            GSAP.to(this.sunLigth.color,{
                b: 0.00784313725490196,
                g: 0.00784313725490196,
                r: 0.011764705882352941,
            });
            GSAP.to(this.ambientalLight.color,{
                b: 0.054901960784313725,
                g: 0.054901960784313725,
                r: 0.5450980392156862,
            });
            GSAP.to(this.sunLigth,{
                intencity: 1,
            });
            GSAP.to(this.ambientalLight,{
                intencity: 1,
            });
        }
    }
    resize(){
    }
    
    update(){
    }
}