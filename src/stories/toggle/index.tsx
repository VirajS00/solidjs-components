import { generateRandomString } from "../../utils/random-string";
import { splitProps, type Component, type JSX } from "solid-js";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	value?: string | number | string[];
	name?: string;
	checked?: boolean;
};

export const Toggle: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList", "id"]);
	const random = generateRandomString(24);

	return (
		<div class={styles.checkContainer}>
			<input
				type='checkbox'
				// biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
				role='switch'
				id={local.id ?? `switch-${random}`}
				class={styles.checkInput}
				{...rest}
			/>
			<label
				for={local.id ?? `switch-${random}`}
				class={styles.switchLabel}
				classList={{ ...local.classList, [local.class ?? ""]: !!local.class }}>
				<span class={styles.switchIndicator} />
			</label>
		</div>
	);
};
