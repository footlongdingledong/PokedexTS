import { State } from "./state.js"

export async function commandExplore(state: State, ...args: string[]){
  if (args[0] == undefined || args[0] == null || args[0] == "") {
    console.log("Command requires location name")
    return
  }
  const json = await state.pokeAPI.fetchLocation(args[0]);
  if (!json || "404" in json || !json.id) {
    console.log("invalid location")
    return
  }
  console.log(`Exploring ${json.name}`)
  console.log("Found Pokemon:")
  for (const pokemon of json.pokemon_encounters) {
    console.log(`${pokemon.pokemon.name}`)
  }
  return
}
