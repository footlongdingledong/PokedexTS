import { State } from "./state.js"

export async function commandPokedex(state: State) {
  if (Object.keys(state.Pokedex).length == 0) {
    console.log("you have not caught any pokemon")
  }
  for (const pokemon in state.Pokedex) {
    console.log(`  - ${state.Pokedex[pokemon].name}`)
  }
}
