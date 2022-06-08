import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/scene/block.ts": ScriptMap;
	"src/scenes/scene/Camera.ts": ScriptMap;
	"src/scenes/scene/character.ts": ScriptMap;
	"src/scenes/scene/flame.ts": ScriptMap;
	"src/scenes/scene/player.ts": ScriptMap;
	"src/scenes/scene/playerCamera.ts": ScriptMap;
	"src/scenes/scene/SceneManager.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scene/block.ts": require("./scene/block"),
	"src/scenes/scene/Camera.ts": require("./scene/Camera"),
	"src/scenes/scene/character.ts": require("./scene/character"),
	"src/scenes/scene/flame.ts": require("./scene/flame"),
	"src/scenes/scene/player.ts": require("./scene/player"),
	"src/scenes/scene/playerCamera.ts": require("./scene/playerCamera"),
	"src/scenes/scene/SceneManager.ts": require("./scene/SceneManager"),
}
