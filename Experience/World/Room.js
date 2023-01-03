import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import GUI from "lil-gui";
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'
export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.time = this.experience.time;
        this.roomChildren = {}
        // this.gui = new GUI();
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    setModel(){
        this.actualRoom.children.forEach(child => {
            // console.log(child)
            child.castShadow = true;
            child.receiveShadow = true;
            this.configModels(child);
        });

        // const width = 1;
        // const height = 1;
        // const intensity = 1;
        // const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        // rectLight.position.set( 0.999951, 2.75684, -1.02712);
        // this.gui.add(rectLight.rotation, "y", 0, Math.PI * 2).onChange(()=>{
        // });
        
        // this.gui.add(rectLight.rotation, "z", 0, Math.PI * 2).onChange(()=>{
        // });
        // this.gui.add(rectLight.rotation, "x", 0, Math.PI * 2).onChange(()=>{
        // });

        // rectLight.rotation.y = 2.48185819633594
        // rectLight.visible = false;
        // rectLight.rotation.x = -Math.PI / 2;

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.42,0.42,0.42)
        // this.actualRoom.rotation.y = 180;
        // this.actualRoom.add( rectLight )

    
    }
    configModels(obj){
        // console.log(obj.children.length);
        if(obj.children.length > 0){
            obj.children.forEach(child => {
                this.configModels(child)
            });
        }else{
            obj.castShadow = true;
            obj.receiveShadow = true;
            obj.scale.set(0,0,0)
        
        }
        if(obj.name === "Cube"){
            obj.position.set(0, 1.5 ,0);
            obj.rotation.y = Math.PI / 4;
        }
        this.roomChildren[obj.name.toLowerCase()] = obj;
    }
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        // this.swim = this.mixer.clipAction(this.room.animations[0])
        // this.swim.play();
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.5;  
        })
    }
    resize(){
    }
    
    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current
        this.mixer.update(this.time.delta * 0.0009);
    }
}