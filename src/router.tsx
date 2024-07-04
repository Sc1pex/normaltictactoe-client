import { createSignal, Match, Switch } from "solid-js";
import { Home } from "./pages/home";
import { Play } from "./pages/play";

export type Page = "home" | "play";
export const [route, setRoute] = createSignal<Page>("home");

export function Router() {
  return (
    <Switch>
      <Match when={route() === "home"}>
        <Home></Home>
      </Match>
      <Match when={route() === "play"}>
        <Play></Play>
      </Match>
    </Switch>
  );
}
