import { Node } from "@babylonjs/core/node";
import { Mesh,ArcRotateCamera,PointerEventTypes, KeyboardEventTypes} from "@babylonjs/core";

import { fromScene } from "../tools";

import { onPointerEvent, onKeyboardEvent } from "../tools";

export default class MyScript extends ArcRotateCamera {

    @fromScene("Armature")
    private _armature: Mesh;
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
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
     //   this.position.x = this._armature.position.x;
     //   this.position.y = this._armature.position.y+3;
     //   this.position.z = this._armature.position.z -5;
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }



        /**
     * Request pointer lock.
     */
    @onPointerEvent(PointerEventTypes.POINTERDOWN, false)
    private _onPointerEvent(): void {
        const engine = this.getEngine();
        if (!engine.isPointerLock) {
            engine.enterPointerlock();
        }
    }

    /**
     * Exit pointer lock.
     */
    @onKeyboardEvent(27, KeyboardEventTypes.KEYUP)
    private _onKeyboardEvent(): void {
        const engine = this.getEngine();
        if (engine.isPointerLock) {
            engine.exitPointerlock();
        }
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
