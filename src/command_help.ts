import { getCommands } from "./commands.js"

export async function commandHelp() {
  console.log("Welcome to the Pokedex!");
  console.log("Usage: \n\n")
  const commands = getCommands();
  for (let key in commands) {
    const typedKey = key as keyof typeof commands;
    console.log(`${typedKey}: ${commands[typedKey].description}`);
  }
}
