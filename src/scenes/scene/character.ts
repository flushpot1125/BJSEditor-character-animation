import {
    Mesh, KeyboardEventTypes, Vector3,
    AnimationGroup,PhysicsImpostor,PhysicsHelper,StandardMaterial,PhysicsRadialExplosionEventData, FreeCamera,TrailMesh,Color3,DefaultRenderingPipeline,GlowLayer, ParticleSystem
} from "@babylonjs/core";

import { visibleInInspector, onKeyboardEvent, fromScene, fromChildren } from "../tools";

import SceneManager from "./SceneManager";


export default class character extends Mesh {

    @visibleInInspector("number", "Ball Force Factor", 300000)
    private _impluseForceFactor: number;

    @fromChildren("Ball")
    private _ball: Mesh;

    @fromScene("Cube1")
    private _cube1:Mesh;

    @fromScene("New Free Camera")
    private _camera:FreeCamera;


    


    public _scene:SceneManager;

    private _physicsHelper:PhysicsHelper;

    private animForward : AnimationGroup;
    private animMmaKick : AnimationGroup;
    private animIdle : AnimationGroup;

    private _pressedForwardKey : boolean;
    private _pressedKickKey : boolean;
    private _trailMeshBall : TrailMesh;
    private _trailMaterialSource : StandardMaterial;
    private _glowLayer : GlowLayer;
   // private _scene:Scene;
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
        // ...

        this.animForward=this._scene.getAnimationGroupByName("RunningInPlace");
        this.animIdle = this._scene.getAnimationGroupByName("Idle");
        this.animMmaKick = this._scene.getAnimationGroupByName("MmaKick");

       this.animIdle.start(true,1.0,this.animIdle.from,this.animIdle.to, false);
        //this.animForward.start(true,1.0,this.animForward.from,this.animForward.to, false);
       this._physicsHelper = new PhysicsHelper(this._scene);

       //綺麗な見た目にするらしい
       /*
       var pipeline = new DefaultRenderingPipeline("default", true, this._scene, [camera]);
       scene.imageProcessingConfiguration.toneMappingEnabled = true;
       scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
       scene.imageProcessingConfiguration.exposure = 3;
       pipeline.glowLayerEnabled = true
       pipeline.glowLayer.intensity = 0.5
       */

    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
       // this._syncRotation(-this._camera.alpha - (Math.PI * 0.5));
       // this._syncRotation(-this._camera.rotation - (Math.PI * 0.5));
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }



    @onKeyboardEvent([84], KeyboardEventTypes.KEYDOWN)//T
    private _moveStraight():void{
       // let anim1=this._scene.getAnimationGroupByName("RunningWithSword");
       if ( this._pressedForwardKey == false){
            this.animIdle.stop();
            this._pressedForwardKey =true;
       }
       this.animForward.start(true, 1.0, this.animForward.from, this.animForward.to, false);
        this.translate(new Vector3(0,0,1),0.2);
    }

    @onKeyboardEvent([84], KeyboardEventTypes.KEYUP)//T
    private _moveStraightStop():void{
        this._pressedForwardKey = false;
       this.animForward.stop();
       this.animIdle.start(true,1.0,this.animIdle.from,this.animIdle.to, false);
       
    }


  
    @onKeyboardEvent([70], KeyboardEventTypes.KEYDOWN)//F
    private _mmaKick():void{
        if ( this._pressedKickKey == false){
            this.animIdle.stop();
            this._pressedKickKey =true;
       }
       this.animMmaKick.start(false,1.0,this.animMmaKick.from,this.animMmaKick.to, false);

     //  if (this.animMmaKick.targetedAnimations.animation.currentFrame ==73){ 
            this._impluseShot();
     //  }
    }

    @onKeyboardEvent([70], KeyboardEventTypes.KEYUP)//F
    private _mmaKickStop():void{
    //    this._pressedKickKey =false; 
   //    this.animMmaKick.stop();
    //    this.animIdle.start(true,1.0,this.animIdle.from,this.animIdle.to, false);
    }

    @onKeyboardEvent([75], KeyboardEventTypes.KEYUP)//K
    private _impluseShot():void{
        // Create a new ball instance
        console.log("pressed k");
        

        const ballInstance = this._ball.createInstance("ballInstance");
        ballInstance.position.copyFrom(this._ball.getAbsolutePosition());
        ballInstance.scaling = new Vector3(10,10,10);
        ballInstance.isVisible=false;

       this._trailMeshBall = new TrailMesh("shockhWave",ballInstance,this._scene,.1,30,true);
       this._trailMaterialSource = new StandardMaterial('sourceMat', this._scene);
      // this._trailMaterialSource.emissiveColor =  new Color3(1,0.63,0.14);
       this._trailMaterialSource.emissiveColor =  new Color3(1,0.63,1);
       this._trailMaterialSource.diffuseColor =  new Color3(1,1,1);
       this._trailMaterialSource.specularColor = new Color3(1,0,1);
       this._trailMaterialSource.ambientColor = new Color3(0,0,0);

       this._trailMeshBall.material = this._trailMaterialSource;



       this._glowLayer = new GlowLayer ("glow",this._scene);
       this._glowLayer.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
        if (mesh.name === "shockhWave") {
            result.set(1, 0.63, 0, 1);
        } else {
            result.set(1, 1, 0, 0);
        }
    }



        // Create physics impostor for the ball instance
    //    ballInstance.physicsImpostor = new PhysicsImpostor(ballInstance, PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0.2, restitution: 0.2 });
        ballInstance.physicsImpostor = new PhysicsImpostor(ballInstance, PhysicsImpostor.SphereImpostor, { mass: 1000, friction: 0.2, restitution: 0.2 });

        // Apply impulse　この処理は効く。ただし、物体の重心付近まで入らないと発動しない。Vector3の値を変えても変化なし
        const force = this.getDirection(new Vector3(0, 0, -1000)).multiplyByFloats(this._impluseForceFactor, this._impluseForceFactor, this._impluseForceFactor);
        
    //ballInstance.applyImpulse(force, ballInstance.getAbsolutePosition());

        var impulseMagnitude = 500000;//この値が大きいほど早く移動する
    //    var impulseMagnitude = 4000;
        var contactLocalRefPoint = ballInstance.position;

        var impulseDirection1 = new Vector3(0, 0, -1);        
        ballInstance.applyImpulse(impulseDirection1.scale(impulseMagnitude), ballInstance.getAbsolutePosition().add(contactLocalRefPoint));
        //ballInstance.dispose();//ボールが表示されるのですぐに消す

      //  var impulseDirection2 = new Vector3(-0.5, 0, -0.5);
      //  ballInstance.applyImpulse(impulseDirection2.scale(impulseMagnitude), ballInstance.getAbsolutePosition().add(contactLocalRefPoint));
      //  ballInstance.dispose();//ボールが表示されるのですぐに消す

      //  var impulseDirection3 = new Vector3(0.5, 0, -0.5);
      //  ballInstance.applyImpulse(impulseDirection3.scale(impulseMagnitude), ballInstance.getAbsolutePosition().add(contactLocalRefPoint));
      //  ballInstance.dispose();//ボールが表示されるのですぐに消す




      //  var event = this._physicsHelper.applyRadialExplosionImpulse( // or .applyRadialExplosionForce
      // this.position,8,8) // or BABYLON.PhysicsRadialImpulseFalloff.Constant
  //      console.log("ballInstance.position:"+ballInstance.position);
  //      console.log("this.position:"+this.position);
        //こっちは効いていなかった
 //      var event=  this._physicsHelper.applyRadialExplosionImpulse( // or .applyRadialExplosionForce
 //      this.position,100000,100000,PhysicsRadialImpulseFalloff.Constant, // or BABYLON.PhysicsRadialImpulseFalloff.Constant
 //        );
       //  var event = this._physicsHelper.applyRadialExplosionImpulse( // or .applyRadialExplosionForce
         //this.position,1000,1000,PhysicsRadialImpulseFalloff.Constant, // or BABYLON.PhysicsRadialImpulseFalloff.Constant
       //     );
      //   var eventData = event.getData();
      //   this._showExplosionDebug(eventData);
    
    }

    private _showExplosionDebug(data:PhysicsRadialExplosionEventData ) : void {
        this._addMaterialToMesh(data.sphere);
        data.sphere.isVisible = true;
    }

    private _addMaterialToMesh(sphere):void {
        var sphereMaterial = new StandardMaterial("sphereMaterial", this._scene);
        sphereMaterial.alpha = 0.5;
        sphere.material = sphereMaterial;
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
