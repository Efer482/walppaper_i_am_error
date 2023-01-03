import * as THREE from "three";

import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm//loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm//loaders/DRACOLoader"
import Experience from "../../Experience/Experience";

export default class Resouces extends EventEmitter {
    constructor(assets) {
        super();
        this.experiences = new Experience();
        this.renderer = this.experiences.renderer;

        this.assets = assets;

        this.items = {};
        this.textures = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }
    startLoading(){
        for(const asset of this.assets){
            if(asset.type==="glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    this.singleAssetLoadedModels(asset, file);
                })
            }
            if(asset.type==="jpgTexture"){
                this.loaders.textureLoader.load(asset.path, (file)=>{
                    this.singleAssetLoadedTextures(asset, file);
                })
            }
        }
    }

    singleAssetLoadedModels(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;

        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
    singleAssetLoadedTextures(asset, file) {
        this.textures[asset.name] = file;
        this.loaded++;

        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}