import { JSX } from "solid-js/jsx-runtime";

export function Button({
  onClick = () => {},
  children = "",
  style = "",
}: {
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  children?: JSX.Element;
  style?: string;
}) {
  return (
    <button
      class={`bg-surface0 font-bold py-2 px-4 rounded hover:bg-surface1 ${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
