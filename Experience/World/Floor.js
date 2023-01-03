import * as THREE from "three";
import Experience from "../Experience";

export default class Floor{
  constructor (){
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.texture = this.experience.resources.textures.background;
    this.setFloor();
  }

  setFloor(){
    this.geometry = new THREE.PlaneGeometry(100,100);
    this.geometry.computeBoundingBox();

    // Calculate the number of times the texture should repeat
    const repeatX = (this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x) / this.texture.image.width;
    const repeatY = (this.geometry.boundingBox.max.y - this.geometry.boundingBox.min.y) / this.texture.image.height;

    // Set the repeat property of the texture
    this.texture.repeat.set(repeatX, repeatY);

    this.material = new THREE.MeshStandardMaterial({
        map : this.texture,
        side: THREE.BackSide, 
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y =  -0.3;
    this.plane.receiveShadow = true
    }
}