import { State } from "./state.js"

export function startREPL(state: State) {
  state.rl.prompt()
  state.rl.on("line", async (input) => {
    const words = cleanInput(input)
    if (words.length == 0) {
      state.rl.prompt()
      return
    } else {
      if (words[0] in state.commands && words[1]) {
        try {
          state.commands[words[0]].callback(state, words[1]);
          state.rl.prompt()
        } catch (e) {
          console.log(e);
        }
      } else if (words[0] in state.commands) {
        try {
          state.commands[words[0]].callback(state);
          state.rl.prompt()
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("Unknown Command")
        state.rl.prompt()
        return
      }

    }
  }),
  state.rl.on('SIGINT', () => {
      state.rl.close();
      process.exit(0);
    })
}


export function cleanInput(input: string): string[] {
  let cleaned: string = input.replace(/\s+/g, " ").trim().toLowerCase();
  const cleanedStrings: string[] = cleaned.split(" ",)
  return cleanedStrings
}
