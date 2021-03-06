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
var tools_2 = require("../tools");
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
        this.parent = this._armature;
        //   this.position.x = this._armature.position.x;
        //   this.position.y = this._armature.position.y+5;
        //  this.position.z = this._armature.position.z -5;
        //  this.radius = 4;
        //  this.heightOffset = 10;
        //  this.lockedTarget = this._armature;
        //  this.parent = this._armature;
        //   this.target.copyFrom(this._armature.position);
        //  this.
        // this.panningAxis = Vector3.Zero();
        // ...
    };
    /**
     * Called each frame.
     */
    MyScript.prototype.onUpdate = function () {
        // ...
        //   this.position.x = this._armature.position.x;
        //   this.position.y = this._armature.position.y+3;
        //   this.position.z = this._armature.position.z -5;
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    MyScript.prototype.onStop = function () {
        // ...
    };
    /**
 * Request pointer lock.
 */
    MyScript.prototype._onPointerEvent = function () {
        var engine = this.getEngine();
        if (!engine.isPointerLock) {
            engine.enterPointerlock();
        }
    };
    /**
     * Exit pointer lock.
     */
    MyScript.prototype._onKeyboardEvent = function () {
        var engine = this.getEngine();
        if (engine.isPointerLock) {
            engine.exitPointerlock();
        }
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
        (0, tools_1.fromScene)("Armature")
    ], MyScript.prototype, "_armature", void 0);
    __decorate([
        (0, tools_2.onPointerEvent)(core_1.PointerEventTypes.POINTERDOWN, false)
    ], MyScript.prototype, "_onPointerEvent", null);
    __decorate([
        (0, tools_2.onKeyboardEvent)(27, core_1.KeyboardEventTypes.KEYUP)
    ], MyScript.prototype, "_onKeyboardEvent", null);
    return MyScript;
}(core_1.ArcRotateCamera));
exports.default = MyScript;
//# sourceMappingURL=Camera.js.map