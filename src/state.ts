import { createInterface, ReadLine, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string,
  description: string,
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: ReadLine,
  commands: Record<string, CLICommand>,
  pokeAPI: PokeAPI,
  Pokedex: Record<string, Pokemon>,
  nextLocationURL: string,
  prevLocationURL: string,
}

export function initState(cacheInterval: number): State {
  const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: 'Pokedex > ' })
  const commands = getCommands();
  const obj: State = {
    rl: rl,
    commands: commands,
    pokeAPI: new PokeAPI(cacheInterval),
    Pokedex: {},
    nextLocationURL: "https://pokeapi.co/api/v2/location-area/",
    prevLocationURL: ""
  }
  return obj;
}
