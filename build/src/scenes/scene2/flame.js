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
/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 *
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
var MyScript = /** @class */ (function (_super) {
    __extends(MyScript, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function MyScript() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    MyScript.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    MyScript.prototype.onStart = function () {
        console.log(this.Sword.position);
        // const shinyRainParticle ={"name":"CPU particle system","id":"default system","capacity":10000,"emitterId":"foutain","particleEmitterType":{"type":"BoxParticleEmitter","direction1":[0,1,0],"direction2":[0,1,0],"minEmitBox":[-0.5,-0.5,-0.5],"maxEmitBox":[0.5,0.5,0.5]},"texture":{"tags":null,"url":"data:octet/stream;base64,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","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"isBlocking":true,"uniqueId":6,"name":"https://www.babylonjs.com/assets/Flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":1,"maxSize":1,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":0,"maxEmitPower":0,"minLifeTime":0,"maxLifeTime":1,"emitRate":500,"gravity":[0,-9.8,0],"noiseStrength":[10,10,10],"color1":[0.30196078431372547,0.9137254901960784,0.615686274509804,1],"color2":[0.8196078431372549,0.5411764705882353,0.5411764705882353,1],"colorDead":[1,1,1,0],"updateSpeed":0.016666666666666666,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"velocityGradients":[],"emitRateGradients":[],"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false};
        var flameParticleJson = { "name": "CPU particle system", "id": "default system", "capacity": 10000, "disposeOnStop": false, "manualEmitCount": -1, "emitter": [0, 0, 0], "particleEmitterType": { "type": "SphereParticleEmitter", "radius": 1, "radiusRange": 0.5, "directionRandomizer": 0 }, "texture": { "tags": null, "url": "https://assets.babylonjs.com/textures/flare.png", "uOffset": 0, "vOffset": 0, "uScale": 1, "vScale": 1, "uAng": 0, "vAng": 0, "wAng": 0, "uRotationCenter": 0.5, "vRotationCenter": 0.5, "wRotationCenter": 0.5, "homogeneousRotationInUVTransform": false, "isBlocking": true, "name": "https://assets.babylonjs.com/textures/flare.png", "hasAlpha": false, "getAlphaFromRGB": false, "level": 1, "coordinatesIndex": 0, "coordinatesMode": 0, "wrapU": 1, "wrapV": 1, "wrapR": 1, "anisotropicFilteringLevel": 4, "isCube": false, "is3D": false, "is2DArray": false, "gammaSpace": true, "invertZ": false, "lodLevelInAlpha": false, "lodGenerationOffset": 0, "lodGenerationScale": 0, "linearSpecularLOD": false, "isRenderTarget": false, "animations": [], "invertY": true, "samplingMode": 3, "_useSRGBBuffer": false }, "isLocal": false, "animations": [], "beginAnimationOnStart": false, "beginAnimationFrom": 0, "beginAnimationTo": 60, "beginAnimationLoop": false, "startDelay": 0, "renderingGroupId": 0, "isBillboardBased": true, "billboardMode": 7, "minAngularSpeed": 0, "maxAngularSpeed": 0, "minSize": 5, "maxSize": 10, "minScaleX": 1, "maxScaleX": 1, "minScaleY": 1.01, "maxScaleY": 1, "minEmitPower": 0, "maxEmitPower": 0, "minLifeTime": 0.1, "maxLifeTime": 1.03, "emitRate": 100, "gravity": [0, 50, 0], "noiseStrength": [10, 10, 10], "color1": [0.9058823529411765, 0.12549019607843137, 0.12549019607843137, 1], "color2": [0.9529411764705882, 0.5137254901960784, 0.1803921568627451, 1], "colorDead": [1, 1, 1, 0], "updateSpeed": 0.016666666666666666, "targetStopDuration": 0, "blendMode": 0, "preWarmCycles": 0, "preWarmStepOffset": 1, "minInitialRotation": 0, "maxInitialRotation": 0, "startSpriteCellID": 0, "spriteCellLoop": true, "endSpriteCellID": 0, "spriteCellChangeSpeed": 1, "spriteCellWidth": 0, "spriteCellHeight": 0, "spriteRandomStartCell": false, "isAnimationSheetEnabled": false, "textureMask": [1, 1, 1, 1], "customShader": null, "preventAutoStart": false };
        this._flameParticle = core_1.ParticleSystem.Parse(flameParticleJson, this._scene, "", false);
        this._particleSource = new core_1.AbstractMesh("particleSource", this._scene);
        console.log(this.Sword);
        // this._particleSource.position = this.position;
        //console.log("particleSource.position:"+particleSource.position);
        // this._flameParticle.emitter = this._particleSource;
        // ...
    };
    /**
     * Called each frame.
     */
    MyScript.prototype.onUpdate = function () {
        this._particleSource.position = new core_1.Vector3(this.Sword.position.x, this.Sword.position.y - 14, this.Sword.position.z);
        this._particleSource.rotationQuaternion = this.Sword.rotationQuaternion;
        // console.log("particleSource.position:"+this._particleSource.position);
        this._flameParticle.emitter = this._particleSource;
        // ...
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    MyScript.prototype.onStop = function () {
        // ...
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    MyScript.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, tools_1.fromScene)("Sword")
    ], MyScript.prototype, "Sword", void 0);
    return MyScript;
}(core_1.Mesh));
exports.default = MyScript;
//# sourceMappingURL=flame.js.map