import { splitProps, type Component, type JSX } from "solid-js";
import { generateRandomString } from "../../utils/random-string";
import { IconCheckmark } from "../icons/icon-checked";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	value?: string | number | string[];
};

export const Checkbox: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList", "id"]);
	const random = generateRandomString(24);

	return (
		<div class={styles.checkContainer}>
			<input
				type='checkbox'
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
				<IconCheckmark size={13} class={styles.checkboxIcon} />
			</label>
		</div>
	);
};
