import { Mesh } from "@babylonjs/core";
import SceneManager from "./SceneManager";
export default class character extends Mesh {
    private _impluseForceFactor;
    private _ball;
    private _cube1;
    private _camera;
    _scene: SceneManager;
    private _physicsHelper;
    private animForward;
    private animMmaKick;
    private animIdle;
    private _pressedForwardKey;
    private _pressedKickKey;
    private _trailMeshBall;
    private _trailMaterialSource;
    private _glowLayer;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    onInitialize(): void;
    /**
     * Called on the scene starts.
     */
    onStart(): void;
    /**
     * Called each frame.
     */
    onUpdate(): void;
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    onStop(): void;
    private _moveStraight;
    private _moveStraightStop;
    private _mmaKick;
    private _mmaKickStop;
    private _impluseShot;
    private _showExplosionDebug;
    private _addMaterialToMesh;
    /**
     * Called on a message has been received and sent from a graph.
     * @param message defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    onMessage(name: string, data: any, sender: any): void;
}
