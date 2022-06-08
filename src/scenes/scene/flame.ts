import {
    Mesh, Vector3,ParticleSystem,AbstractMesh,TransformNode,KeyboardEventTypes
} from "@babylonjs/core";

import { visibleInInspector, onKeyboardEvent, fromScene, fromParticleSystems } from "../tools";

import SceneManager from "./SceneManager";

export default class MyScript extends Mesh {

    //@fromScene("__root__")
    @fromScene("Sword")//刃部分
   // public _Sword : TransformNode;
    public _Sword:Mesh;

    public _scene:SceneManager;
    private _flameParticle : ParticleSystem;
    private _particleSource : AbstractMesh;
    private _flameParticleFlag : boolean;

    @fromParticleSystems("test")
    private _ps:ParticleSystem;

    
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        //const flameParticleJson = {"name":"CPU particle system","id":"default system","capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"SphereParticleEmitter","radius":1,"radiusRange":0.5,"directionRandomizer":0},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":5,"maxSize":10,"minScaleX":1,"maxScaleX":1,"minScaleY":1.01,"maxScaleY":1,"minEmitPower":0,"maxEmitPower":0,"minLifeTime":0.1,"maxLifeTime":1.03,"emitRate":100,"gravity":[0,50,0],"noiseStrength":[10,10,10],"color1":[0.9058823529411765,0.12549019607843137,0.12549019607843137,1],"color2":[0.9529411764705882,0.5137254901960784,0.1803921568627451,1],"colorDead":[1,1,1,0],"updateSpeed":0.016666666666666666,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false};
        const flameParticleJson = {"name":"CPU particle system","id":"default system","capacity":1000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"SphereParticleEmitter","radius":1,"radiusRange":0.5,"directionRandomizer":0},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":true,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":0.05,"maxSize":0.2,"minScaleX":1,"maxScaleX":1,"minScaleY":1.01,"maxScaleY":1,"minEmitPower":0,"maxEmitPower":0,"minLifeTime":0.1,"maxLifeTime":0.7,"emitRate":1000,"gravity":[0,0,-50],"noiseStrength":[10,10,10],"color1":[0.9058823529411765,0.12549019607843137,0.12549019607843137,1],"color2":[0.9529411764705882,0.5137254901960784,0.1803921568627451,1],"colorDead":[1,1,1,0],"updateSpeed":0.016666666666666666,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false};
       
        this._flameParticle=ParticleSystem.Parse(flameParticleJson, this._scene, "",false);
        this._particleSource = new AbstractMesh("particleSource", this._scene);
       // this._flameParticle.isLocal = true;


      // this._ps = ParticleSystem.
   
        // ...
    }

    @onKeyboardEvent([76], KeyboardEventTypes.KEYUP)//L
    private startstopFlame():void{
      this._flameParticleFlag = this._flameParticle.isStarted();

      if(this._flameParticleFlag == true){
          this._flameParticle.stop();
      }else{
        this._flameParticle.start();
      }

     
  
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        
        this._particleSource.position = this._Sword.absolutePosition;
        this._particleSource.rotationQuaternion = this._Sword.rotationQuaternion;
        this._flameParticle.emitter = this._particleSource;
        
        // ...
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
