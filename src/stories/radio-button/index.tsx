import { splitProps, type Component, type JSX } from "solid-js";
import { generateRandomString } from "../../utils/random-string";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	value?: string | number | string[];
	name?: string;
};

export const RadioButton: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList", "id"]);
	const random = generateRandomString(24);

	return (
		<div class={styles.checkContainer}>
			<input
				type='radio'
				id={local?.id ?? `checkbox-${random}`}
				class={styles.checkInput}
				{...rest}
			/>
			<label
				for={local?.id ?? `checkbox-${random}`}
				class={styles.checkboxLabel}
				classList={{
					...local.classList,
					[local.class ?? ""]: !!local.class,
				}}>
				<div class={styles.radioCircle} />
			</label>
		</div>
	);
};
