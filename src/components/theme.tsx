import { createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

// TODO: Add a theme switcher
export function Themer({ children = "" }: { children?: JSX.Element }) {
  const [theme, _setTheme] = createSignal<"light" | "dark">("dark");

  return (
    <div class={theme() === "light" ? "latte" : "mocha"}>
      <div class="bg-base text-text">{children}</div>
    </div>
  );
}
