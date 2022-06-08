import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/materials";
import "@babylonjs/core/Particles/particleSystemComponent";
export declare class Game {
    /**
     * Defines the engine used to draw the game using Babylon.JS and WebGL
     */
    engine: Engine;
    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
    scene: Scene;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Loads the first scene.
     */
    private _load;
    /**
     * Binds the required events for a full experience.
     */
    private _bindEvents;
}
