import {
	mergeProps,
	onMount,
	splitProps,
	type Component,
	type JSX,
} from "solid-js";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	name?: string;
	min?: number;
	max?: number;
	value?: number;
};

export const RangeInput: Component<Props> = (props) => {
	const p = mergeProps({ min: 0, max: 100 }, props);
	const [local, rest] = splitProps(p, ["ref"]);

	let inputRef: HTMLInputElement | undefined;

	onMount(() => {
		if (!inputRef) {
			return;
		}

		const inputValue = (inputRef.defaultValue ?? inputRef.value).trim();
		let numVal = rest.value ?? Number.parseFloat(inputValue);

		if (Number.isNaN(numVal)) {
			numVal = 50;
		}

		const percent = (numVal / (rest.max ?? 100)) * 100;

		inputRef.style.setProperty("--progress", `${percent}% `);

		const form = inputRef.closest("form");

		if (!form) {
			return;
		}

		form.addEventListener("reset", () => {
			if (!inputRef) {
				return;
			}

			const inputValue = inputRef.defaultValue.trim();
			let numVal = rest.value ?? Number.parseFloat(inputValue);

			if (Number.isNaN(numVal)) {
				numVal = 50;
			}

			const percent = (numVal / (rest.max ?? 0)) * 100;

			inputRef.style.setProperty("--progress", `${percent}% `);
		});
	});

	return (
		<input
			type='range'
			class={styles.rangeInput}
			data-type='number'
			ref={(node) => {
				if (typeof local.ref === "function") {
					local.ref(node);
				} else {
					local.ref = node;
				}

				inputRef = node;
			}}
			onInput={(e) => {
				const inputValue = e.target.value.trim();
				const numVal = Number.parseFloat(inputValue);

				if (Number.isNaN(numVal)) {
					console.log("Invalid input: not a number");
					return;
				}

				const percent = (numVal / (rest.max ?? 0)) * 100;

				e.currentTarget.style.setProperty("--progress", `${percent}% `);
			}}
			{...rest}
		/>
	);
};
