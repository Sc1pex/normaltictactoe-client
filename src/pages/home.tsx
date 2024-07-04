import { Button } from "../components/button";
import { setRoute } from "../router";
import { resetGame } from "./play";

export function Home() {
  const startGame = (bot: "x" | "o" | "random") => {
    if (bot === "random") bot = Math.random() > 0.5 ? "x" : "o";
    resetGame(bot);
    setRoute("play");
  };

  return (
    <div class="flex flex-col items-center justify-center gap-5 h-screen">
      <div class="text-2xl">This is a normal game of tic tac toe</div>

      <div class="text-center">
        <div class="text-xl">Play as:</div>
        <div class="flex gap-3 mt-2">
          <Button onClick={() => startGame("o")}>X</Button>
          <Button onClick={() => startGame("random")}>Random</Button>
          <Button onClick={() => startGame("x")}>O</Button>
        </div>
      </div>
    </div>
  );
}
