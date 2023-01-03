import { EventEmitter } from "events";
import Experience from "./Experience";
import * as THREE from "three";
import convert from "./Utils/covertDivsToSpans.js";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        this.sizes.on("switchdevice",(device)=>{
            this.device = device;
        })
        this.world.on("worldReady",()=>{
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        convert(document.querySelector(".intro-text"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren)
    }

    firstIntro(){
        return new Promise((resolve, reject) => {
        this.timeline = new GSAP.timeline();
        if (this.device === "desktop") {
            this.timeline.to(this.roomChildren.cube.scale,{
                x:0.3,
                y:0.3,
                z:0.3,
                ease:"back.out(2.5)",
                duration:2,
            }).to(this.room.position,{
                x: -0.7,
                ease: "power1.out",
                duration: 0.7
            })
        }else{
            this.timeline.to(this.roomChildren.cube.scale, {
                x:0.3,
                y:0.3,
                z:0.3,
                ease: "back.out(2.5)",
                duration: 0.7,
            }).to(this.room.position, {
                z: -1,
                ease: "power1.out",
                duration: 0.7
            });
        }
    });
    }
    onClick(e){
        window.removeEventListener("click", this.clickOnceEvent);
        this.secondInto();
    }

    playIntro() {
        this.firstIntro()
          this.clickOnceEvent = this.onClick.bind(this);
          window.addEventListener("click", this.clickOnceEvent);
      }

    secondInto() {
        const screenWidth = window.innerWidth;
        const xPos = screenWidth / 3;
        const scale = 2 * this.camera.orthographicCamera.top / window.innerHeight;
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
            .to(
                ".intro-text",
                {
                    yPercent: 100,
                    stagger: 0.05,
                    scale: 0,
                    ease: "back.in(1.7)",
                },
                "fadeout"
            ).to(
                    this.roomChildren.cube.rotation,
                    {
                        y: 2 * Math.PI + Math.PI / 4,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 2,
                        y: 2,
                        z: 2,
                    },
                    "same"
                )
                .to(
                    this.camera.orthographicCamera.position,
                    {
                        // y: 5.5,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.cube.position,
                    {

                    },
                    "introtext"
                )
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 1,
                    },
                )
                .to(
                    this.roomChildren.object_4.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(1.2)",
                        duration: 3.5,
                    },
                    "introtext"
                )
                .to(

                    this.room.position,
                    {
                        x   :  -xPos * scale,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.object_4.rotation,
                    {
                        y: 4 * Math.PI + Math.PI / 4,
                        ease: "power2.out",
                        duration: 1,
                    },
                    "chair"
                )
        });
    }
}