import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandCatch } from "./command_catch.js";
import { commandExplore } from "./command_explore.js"
import { commandMap, commandMapb } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandInspect } from "./command_inspect.js"
import { CLICommand } from "./state.js";
import { commandSave, commandReset, commandLoad } from "./command_save.js";


export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "map back",
      description: "Displays previous 20 locations",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Displays location information",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect caught Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Lists caught Pokemon",
      callback: commandPokedex,
    },
    save: {
      name: "save",
      description: "Saves caught pokemon",
      callback: commandSave,
    },
    reset: {
      name: "reset",
      description: "Wipes save data",
      callback: commandReset,
    },
    load: {
      name: "load",
      description: "Loads save data",
      callback: commandLoad,
    },
    // can add more commands here
  };
}
