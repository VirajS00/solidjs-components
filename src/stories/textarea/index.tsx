import { splitProps, type Component, type JSX } from "solid-js";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLTextAreaElement> & {
	name?: string;
	id?: string;
	placeholder?: string;
};

export const TextArea: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList"]);

	return (
		<textarea
			class={styles.textarea}
			classList={{ [local.class ?? ""]: !!local.class, ...local.classList }}
			{...rest}
		/>
	);
};
