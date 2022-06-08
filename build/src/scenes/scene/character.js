"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var tools_1 = require("../tools");
var character = /** @class */ (function (_super) {
    __extends(character, _super);
    // private _scene:Scene;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function character() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    character.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    character.prototype.onStart = function () {
        // ...
        this.animForward = this._scene.getAnimationGroupByName("RunningInPlace");
        this.animIdle = this._scene.getAnimationGroupByName("Idle");
        this.animMmaKick = this._scene.getAnimationGroupByName("MmaKick");
        this.animIdle.start(true, 1.0, this.animIdle.from, this.animIdle.to, false);
        //this.animForward.start(true,1.0,this.animForward.from,this.animForward.to, false);
        this._physicsHelper = new core_1.PhysicsHelper(this._scene);
        //綺麗な見た目にするらしい
        /*
        var pipeline = new DefaultRenderingPipeline("default", true, this._scene, [camera]);
        scene.imageProcessingConfiguration.toneMappingEnabled = true;
        scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
        scene.imageProcessingConfiguration.exposure = 3;
        pipeline.glowLayerEnabled = true
        pipeline.glowLayer.intensity = 0.5
        */
    };
    /**
     * Called each frame.
     */
    character.prototype.onUpdate = function () {
        // ...
        // this._syncRotation(-this._camera.alpha - (Math.PI * 0.5));
        // this._syncRotation(-this._camera.rotation - (Math.PI * 0.5));
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    character.prototype.onStop = function () {
        // ...
    };
    character.prototype._moveStraight = function () {
        // let anim1=this._scene.getAnimationGroupByName("RunningWithSword");
        if (this._pressedForwardKey == false) {
            this.animIdle.stop();
            this._pressedForwardKey = true;
        }
        this.animForward.start(true, 1.0, this.animForward.from, this.animForward.to, false);
        this.translate(new core_1.Vector3(0, 0, 1), 0.2);
    };
    character.prototype._moveStraightStop = function () {
        this._pressedForwardKey = false;
        this.animForward.stop();
        this.animIdle.start(true, 1.0, this.animIdle.from, this.animIdle.to, false);
    };
    character.prototype._mmaKick = function () {
        if (this._pressedKickKey == false) {
            this.animIdle.stop();
            this._pressedKickKey = true;
        }
        this.animMmaKick.start(false, 1.0, this.animMmaKick.from, this.animMmaKick.to, false);
        //  if (this.animMmaKick.targetedAnimations.animation.currentFrame ==73){ 
        this._impluseShot();
        //  }
    };
    character.prototype._mmaKickStop = function () {
        //    this._pressedKickKey =false; 
        //    this.animMmaKick.stop();
        //    this.animIdle.start(true,1.0,this.animIdle.from,this.animIdle.to, false);
    };
    character.prototype._impluseShot = function () {
        // Create a new ball instance
        console.log("pressed k");
        var ballInstance = this._ball.createInstance("ballInstance");
        ballInstance.position.copyFrom(this._ball.getAbsolutePosition());
        ballInstance.scaling = new core_1.Vector3(10, 10, 10);
        ballInstance.isVisible = false;
        this._trailMeshBall = new core_1.TrailMesh("shockhWave", ballInstance, this._scene, .1, 30, true);
        this._trailMaterialSource = new core_1.StandardMaterial('sourceMat', this._scene);
        // this._trailMaterialSource.emissiveColor =  new Color3(1,0.63,0.14);
        this._trailMaterialSource.emissiveColor = new core_1.Color3(1, 0.63, 1);
        this._trailMaterialSource.diffuseColor = new core_1.Color3(1, 1, 1);
        this._trailMaterialSource.specularColor = new core_1.Color3(1, 0, 1);
        this._trailMaterialSource.ambientColor = new core_1.Color3(0, 0, 0);
        this._trailMeshBall.material = this._trailMaterialSource;
        this._glowLayer = new core_1.GlowLayer("glow", this._scene);
        this._glowLayer.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
            if (mesh.name === "shockhWave") {
                result.set(1, 0.63, 0, 1);
            }
            else {
                result.set(1, 1, 0, 0);
            }
        };
        // Create physics impostor for the ball instance
        //    ballInstance.physicsImpostor = new PhysicsImpostor(ballInstance, PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0.2, restitution: 0.2 });
        ballInstance.physicsImpostor = new core_1.PhysicsImpostor(ballInstance, core_1.PhysicsImpostor.SphereImpostor, { mass: 1000, friction: 0.2, restitution: 0.2 });
        // Apply impulse　この処理は効く。ただし、物体の重心付近まで入らないと発動しない。Vector3の値を変えても変化なし
        var force = this.getDirection(new core_1.Vector3(0, 0, -1000)).multiplyByFloats(this._impluseForceFactor, this._impluseForceFactor, this._impluseForceFactor);
        //ballInstance.applyImpulse(force, ballInstance.getAbsolutePosition());
        var impulseMagnitude = 500000; //この値が大きいほど早く移動する
        //    var impulseMagnitude = 4000;
        var contactLocalRefPoint = ballInstance.position;
        var impulseDirection1 = new core_1.Vector3(0, 0, -1);
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
    };
    character.prototype._showExplosionDebug = function (data) {
        this._addMaterialToMesh(data.sphere);
        data.sphere.isVisible = true;
    };
    character.prototype._addMaterialToMesh = function (sphere) {
        var sphereMaterial = new core_1.StandardMaterial("sphereMaterial", this._scene);
        sphereMaterial.alpha = 0.5;
        sphere.material = sphereMaterial;
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    character.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, tools_1.visibleInInspector)("number", "Ball Force Factor", 300000)
    ], character.prototype, "_impluseForceFactor", void 0);
    __decorate([
        (0, tools_1.fromChildren)("Ball")
    ], character.prototype, "_ball", void 0);
    __decorate([
        (0, tools_1.fromScene)("Cube1")
    ], character.prototype, "_cube1", void 0);
    __decorate([
        (0, tools_1.fromScene)("New Free Camera")
    ], character.prototype, "_camera", void 0);
    __decorate([
        (0, tools_1.onKeyboardEvent)([84], core_1.KeyboardEventTypes.KEYDOWN) //T
    ], character.prototype, "_moveStraight", null);
    __decorate([
        (0, tools_1.onKeyboardEvent)([84], core_1.KeyboardEventTypes.KEYUP) //T
    ], character.prototype, "_moveStraightStop", null);
    __decorate([
        (0, tools_1.onKeyboardEvent)([70], core_1.KeyboardEventTypes.KEYDOWN) //F
    ], character.prototype, "_mmaKick", null);
    __decorate([
        (0, tools_1.onKeyboardEvent)([70], core_1.KeyboardEventTypes.KEYUP) //F
    ], character.prototype, "_mmaKickStop", null);
    __decorate([
        (0, tools_1.onKeyboardEvent)([75], core_1.KeyboardEventTypes.KEYUP) //K
    ], character.prototype, "_impluseShot", null);
    return character;
}(core_1.Mesh));
exports.default = character;
//# sourceMappingURL=character.js.map