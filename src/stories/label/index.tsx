import { type Component, type JSX, splitProps } from "solid-js";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLLabelElement> & {
  for?: string;
};

export const Label: Component<Props> = (props) => {
  const [local, rest] = splitProps(props, ["class", "classList"]);
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: form control in props
    // biome-ignore lint/a11y/useKeyWithClickEvents: Click for select component focus
    <label
      class={styles.label}
      classList={{ [local.class ?? ""]: !!local.class, ...local.classList }}
      onClick={(e) => {
        const closesSelect: HTMLDivElement | null =
          (e.target.nextSibling as HTMLDivElement) ||
          (e.target.previousSibling as HTMLDivElement) ||
          e.target.querySelector("[tc-type='listbox']");

        if (closesSelect && closesSelect instanceof HTMLDivElement) {
          const btn: HTMLButtonElement | null = closesSelect.querySelector('[tc-type="button"]');
          btn?.focus();
        }
      }}
      {...rest}
    />
  );
};
