import { State } from "./state.js"

export async function commandInspect(state: State, ...args: string[]) {
  if (args[0] == undefined || args[0] == null || args[0] == "") {
    console.log("Command requires Pokemon name")
    return
  }
  if (!state.Pokedex[args[0]]) {
    console.log("you have not caught that Pokemon")
  }
  const pokemon = state.Pokedex[args[0]]
  console.log(`Name: ${pokemon.name}\n Height: ${pokemon.height}\n Weight: ${pokemon.weight}\n Stats:`)
  for (const stat in pokemon.stats) {
    console.log(`   -${pokemon.stats[stat].stat.name}: ${pokemon.stats[stat].base_stat}`)
  }
  if (pokemon.types[1]) {
      console.log(`Types:\n   - ${pokemon.types[0].type.name}\n   - ${pokemon.types[1].type.name}`)
    } else {
      console.log(`Type:\n   - ${pokemon.types[0].type.name}`)
    }
}
