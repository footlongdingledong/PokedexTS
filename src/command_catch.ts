import { State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]) {
  if (args[0] == undefined || args[0] == null || args[0] == "") {
    console.log("Command requires Pokemon name")
    return
  }
  const json = await state.pokeAPI.fetchPokemon(args[0]);
  if (!json || !json.id) {
    console.log("invalid Pokemon")
    return
  }
  const catchChance = ((610 - json.base_experience )/ 2)/ 610
  console.log(`Throwing a Pokeball at ${json.name}...`)
  if (Math.random() <= catchChance) {
    console.log(`${json.name} was caught!`)
    state.Pokedex[json.name] = json;
  } else {
    console.log(`${json.name} escaped!`)
  }
}
