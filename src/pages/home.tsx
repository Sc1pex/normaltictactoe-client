import { Button } from "../components/button";
import { setRoute } from "../router";
import { resetGame } from "./play";

export function Home() {
  const startGame = (bot: "x" | "o" | "random") => {
    if (bot === "random") bot = Math.random() > 0.5 ? "x" : "o";
    resetGame(bot);
    setRoute("play");
  };

  let usernameRef: HTMLInputElement;
  let codeRef: HTMLInputElement;
  const startOnlineGame = () => {
    let username = usernameRef.value;
    if (username === "") {
      username = "anonymous";
    }
  };

  return (
    <div class="flex flex-col items-center justify-center gap-5 h-screen">
      <div class="text-2xl">This is a normal game of tic tac toe</div>

      <div class="text-center">
        <div class="text-xl">Play angains a bot:</div>
        <div class="flex gap-3 mt-2">
          <Button onClick={() => startGame("o")}>X</Button>
          <Button onClick={() => startGame("random")}>Random</Button>
          <Button onClick={() => startGame("x")}>O</Button>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center gap-2">
        <div class="text-xl">Play with a friend:</div>
        <div>
          <input
            class="w-32 bg-surface0 px-2 py-1 rounded mr-4"
            placeholder="Code"
            ref={codeRef}
          ></input>
          <Button
            onClick={async () => {
              await getCode();
              codeRef.value = Math.random().toString(36).substring(2, 8);
            }}
          >
            Generate code
          </Button>
        </div>

        <input
          class="w-32 bg-surface0 px-2 py-1 rounded"
          placeholder="Username"
          ref={usernameRef}
        ></input>
        <Button onClick={startOnlineGame}>Start game</Button>
      </div>
    </div>
  );
}

async function getCode() {
  console.log(import.meta.env.VITE_SERVER_URL);
  const res = await fetch(import.meta.env.VITE_SERVER_URL + "/get-code");
  const data = await res.json();
  console.log(data);
  return data["code"];
}
