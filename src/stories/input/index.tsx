import { splitProps, type Component, type JSX } from "solid-js";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	name?: string;
	id?: string;
	placeholder?: string;
	type?: string;
	value?: string;
};

export const Input: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList", "type"]);
	return (
		<input
			type={local.type ?? "text"}
			class={styles.input}
			classList={{ [local.class ?? ""]: !!local.class, ...local.classList }}
			{...rest}
		/>
	);
};
