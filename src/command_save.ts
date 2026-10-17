import { cleanInput } from "./repl.js";
import { State } from "./state.js"
import * as fsPromise from 'fs/promises';
import { Pokemon } from "./pokeapi.js";

export async function commandSave(state: State, ...args: string[]) {
  if (args[0] == undefined || args[0] == null || args[0] == "") {
    console.log("Command requires name for Save file")
    return
  }
  const default_location = `./Saves/${args[0]}`
  let pokemon = []
  for (const i in state.Pokedex) {
    pokemon.push(state.Pokedex[i].name)
  }
  const saveData = {
      pokemon: pokemon, // ensure this only holds the required fields
      nextUrl: state.nextLocationURL,
      prevUrl: state.prevLocationURL,
    };
  const save = JSON.stringify(saveData)
  await fsPromise.writeFile(default_location, save, `utf-8`)
  try {
      // F_OK flag checks if the file is visible to the process
      await fsPromise.access(default_location, fsPromise.constants.F_OK);
      console.log("Progress Saved!")
    } catch {
      console.log("Failed to Save")
    }
}

export async function commandReset(state: State, ...args: string[]) {
  if (args[0] == undefined || args[0] == null || args[0] == "") {
    console.log("Command requires name of Save file to delete")
    return
  }
  const default_location = `./Saves/${args[0]}`
  try {
    await fsPromise.unlink(default_location)
    console.log("Save deleted")
    } catch {
      console.log("Failed to delete Save")
    }

}

export async function commandLoad(state: State, ...args: string[]) {
  if (args[0] == undefined || args[0] == null || args[0] == "") {
    try {
        const files = await fsPromise.readdir("./Saves/")
      if (files.length == 0) {
        console.log("No save files found")
        return
      }
      console.log("Available Saves:")
      for (const file of files) {
        console.log(file)
      }

      return
    } catch (err) {
      console.log("Could not read Saves directory")
    }
  }
  try {
    const rawSave = await fsPromise.readFile(`./Saves/${args[0]}`, "utf-8")
    const save = JSON.parse(rawSave)
    console.log("Fetching Pokemon Data")
    const tempdex: Record<string, Pokemon> = {}
    for (const pokemon of save.pokemon) {
      tempdex[pokemon] = await state.pokeAPI.fetchPokemon(pokemon)
    }
    state.Pokedex = tempdex
    state.nextLocationURL = save.nextLocationURL
    state.prevLocationURL = save.prevLocationURL
    console.log("Loaded save data!")
  } catch (err) {
    console.log("Failed to load save data")
  }
}
