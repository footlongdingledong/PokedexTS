import { State } from "./state.js"

export async function commandMap(state: State) {
  const json = await state.pokeAPI.fetchLocations(state.nextLocationURL);
  state.nextLocationURL = json.next
  state.prevLocationURL = json.previous
  for (let result of json.results) {
    console.log(`${result.name}`)
  }
}

export async function commandMapb(state: State) {
  if (state.prevLocationURL == null || state.prevLocationURL == "") {
    console.log("you're on the first page")
    return
  }
    const json = await state.pokeAPI.fetchLocations(state.prevLocationURL);
    state.nextLocationURL = json.next
    state.prevLocationURL = json.previous

    for (let result of json.results) {
      console.log(`${result.name}`)
  }
}
