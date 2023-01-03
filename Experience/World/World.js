import { EventEmitter } from "events";
import * as THREE from "three";
import Experience from "../Experience";
import Constrols from "./Controls";
import Envioriment from "./Envioriment";
import Floor from "./Floor";
import Room from "./Room";
export default class World extends EventEmitter{ 
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready",() =>{
            this.envioriment = new Envioriment();
            this.room = new Room();
            this.floor = new Floor();
            this.emit("worldReady");
            this.constrols = new Constrols();
            
        });

        this.theme.on("switch", (theme)=>{
            this.switchTheme(theme);
        })
    }

    switchTheme(theme){
        if(this.envioriment){
            this.envioriment.switchTheme(theme);
        }
    }
    resize(){
    }
    
    update(){
        if(this.room){
            this.room.update();
        }
        if(this.constrols){
            this.constrols.update();
        }
    }
}