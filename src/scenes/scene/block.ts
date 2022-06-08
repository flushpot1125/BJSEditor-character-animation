import { Node } from "@babylonjs/core/node";

import {
    Mesh, AnimationRange, Animatable, ArcRotateCamera, Animation, Vector3,
    Space, Bone, KeyboardInfo, KeyboardEventTypes, Epsilon, Quaternion, Scalar, AnimationGroup,MeshBuilder,PhysicsImpostor,PhysicsViewer
} from "@babylonjs/core";

import SceneManager from "./SceneManager";

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
export default class MyScript extends Mesh {

    public _scene:SceneManager;
    private _towerMeshes : Mesh[]
    private _physicsViewer : PhysicsViewer;
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
        const towerMeshes = [];
       
        for (var x = 0; x < 7; x++) {
            for (var z = 0; z < 7; z++) {
                var box1 = MeshBuilder.CreateBox("towerBox",
                    { width: 30, height: 30, depth: 30 }, this._scene);
                box1.position.x = (x - 4) * 30;
                box1.position.y = 3+z * 30;
                box1.position.z = -20;
                box1.physicsImpostor = new PhysicsImpostor(box1,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 1, friction: 1, restitution: 0 }, this._scene);
                box1.checkCollisions=true;

               
                //this._physicsViewer.showImpostor(box1.physicsImpostor,box1);//showImpostorがundefined
                //this._towerMeshes.push(box1);//これだとpushがundefinedになった
                towerMeshes.push(box1);
            }
        }
        // ...
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
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
