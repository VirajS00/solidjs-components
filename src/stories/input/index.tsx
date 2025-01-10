import { splitProps, type Component, type JSX } from "solid-js";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	name?: string;
	id?: string;
	placeholder?: string;
};

export const Input: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList"]);
	return (
		<input
			type='text'
			class={styles.input}
			classList={{ [local.class ?? ""]: !!local.class, ...local.classList }}
			{...rest}
		/>
	);
};
