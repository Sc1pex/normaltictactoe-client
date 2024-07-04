import { createSignal, For, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Board } from "../board";
import { botMove } from "../bot";
import { Button } from "../components/button";

type State = "playing" | "x" | "o" | "draw";
const [state, setState] = createSignal<State>("playing");

const [player, setPlayer] = createSignal<Player>("x");
const [bot, setBot] = createSignal<Player>("o");

const [board, setBoard] = createSignal(new Board());
const [interact, setInteract] = createSignal(true);

const cellOpt = {
  x: X,
  o: O,
  empty: ({}: { size: number }) => <></>,
};

function invertPlayer(p: Player): Player {
  return p === "x" ? "o" : "x";
}

export function resetGame(b: Player) {
  setState("playing");
  setPlayer("x");
  setBot(b);
  setBoard(new Board());
  setInteract(true);

  if (bot() === player()) makeBotMove();
}

function makeBotMove() {
  setInteract(false);

  setTimeout(() => {
    setBoard(board().move(botMove(board(), bot()), bot()));
    setPlayer(invertPlayer(bot()));
    setInteract(true);

    checkGameOver();
  }, 250);
}

function checkGameOver() {
  const result = board().checkWin();
  if (result != null) {
    setInteract(false);
    setState(result);
    return true;
  }
  if (board().emptyCells() === 0) {
    setInteract(false);
    setState("draw");
    return true;
  }
  return false;
}

export function Play() {
  return (
    <Switch>
      <Match when={state() == "playing"}>
        <GameBoard></GameBoard>
      </Match>
      <Match when={true}>
        <GameBoard></GameBoard>
        {/* @ts-ignore */}
        <GameOverComponent result={state()}></GameOverComponent>
      </Match>
    </Switch>
  );
}

function GameBoard() {
  const onCellClick = (idx: number) => {
    if (!interact()) return;
    if (board().cells[idx] !== "empty") return;

    setBoard(board().move(idx, player()));
    setPlayer(invertPlayer(player()));

    if (checkGameOver()) {
      return;
    }

    makeBotMove();
  };

  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="text-xl mb-4 flex items-center gap-2">
        <Dynamic component={cellOpt[player()]} size={20} />
        Turn ({player() === bot() ? "bot" : "you"})
      </div>
      <div class="grid grid-cols-4 gap-2 bg-text">
        <For each={board().cells}>
          {(cell, idx) => (
            <div
              class="w-20 h-20 m-0 p-3 bg-base"
              onclick={() => onCellClick(idx())}
            >
              <Dynamic component={cellOpt[cell]} />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function X({ size }: { size?: number }) {
  return (
    <svg
      class="fill-blue"
      viewBox="29.3768 16.7873 117.5085 117.5078"
      xmlns="http://www.w3.org/2000/svg"
      {...(size && {
        width: size,
        height: size,
      })}
    >
      <g transform="matrix(1, 0, 0, 1, -3.552713678800501e-15, -8.881784197001252e-15)">
        <g>
          <path d="M100,75.541l44.426-44.425c3.279-3.279,3.279-8.592,0-11.871c-3.275-3.277-8.594-3.277-11.869,0L88.131,63.671 L43.705,19.245c-3.275-3.277-8.594-3.277-11.869,0c-3.279,3.279-3.279,8.592,0,11.871l44.426,44.425l-44.426,44.425 c-3.279,3.279-3.279,8.592,0,11.871c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458l44.426-44.426l44.426,44.426 c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458c3.279-3.279,3.279-8.592,0-11.871L100,75.541z"></path>
        </g>
      </g>
    </svg>
  );
}

function O({ size }: { size?: number }) {
  return (
    <svg
      class="fill-red"
      viewBox="197.246 184.656 117.508 117.508"
      xmlns="http://www.w3.org/2000/svg"
      {...(size && {
        width: size,
        height: size,
      })}
    >
      <g transform="matrix(1, 0, 0, 0.9999999999999999, 0, 0)">
        <g>
          <path d="M256,184.656c-32.398,0-58.754,26.356-58.754,58.754s26.356,58.754,58.754,58.754s58.754-26.356,58.754-58.754 S288.398,184.656,256,184.656z M256,285.377c-23.141,0-41.967-18.827-41.967-41.967s18.826-41.967,41.967-41.967 s41.967,18.827,41.967,41.967S279.141,285.377,256,285.377z"></path>
        </g>
      </g>
    </svg>
  );
}

function GameOverComponent({ result }: { result: "x" | "o" | "draw" }) {
  return (
    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div class="bg-base p-5 rounded-lg text-center">
        <div class="text-xl mb-4">
          {result === "draw" ? <Draw></Draw> : <Win result={result}></Win>}
        </div>
        <Button onClick={() => resetGame(invertPlayer(bot()))}>
          Play again
        </Button>
      </div>
    </div>
  );
}

function Draw() {
  return (
    <div class="flex flex-col items-center">
      <div>Game over!</div>
      <div>It's a tie</div>
    </div>
  );
}

function Win({ result }: { result: "x" | "o" }) {
  return (
    <div class="flex flex-col items-center">
      <div>Game over!</div>
      <div class="text-xl flex items-center gap-2">
        <Dynamic component={cellOpt[result]} size={16} />
        wins
      </div>
    </div>
  );
}
