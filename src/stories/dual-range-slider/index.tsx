import {
	createMemo,
	createSignal,
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
	value?: [number, number];
};

export const DualRangeInput: Component<Props> = (props) => {
	const defaultProps = { min: 0, max: 100 };
	const p = mergeProps(defaultProps, props);
	const [local, rest] = splitProps(p, ["ref", "min", "max", "value", "name"]);
	const [fromVal, setFromVal] = createSignal(local.value?.[0] ?? 0);
	const [toVal, setToVal] = createSignal(local.value?.[1] ?? 0);

	let inputRef: HTMLInputElement | undefined;
	let fromSliderRef: HTMLInputElement | undefined;
	let toSliderRef: HTMLInputElement | undefined;

	onMount(() => {
		if (!inputRef) {
			return;
		}

		if (inputRef.defaultValue) {
			const val = inputRef.defaultValue
				.split(",")
				.map((x) => Number.parseFloat(x)) as [number, number];

			if (fromSliderRef && toSliderRef) {
				setFromVal(val[0]);
				setToVal(val[1]);

				fromSliderRef.value = val[0].toString();
				toSliderRef.value = val[1].toString();
			}
		}

		if (fromSliderRef && toSliderRef && local.value) {
			setFromVal(local.value[0]);
			setToVal(local.value[1]);

			fromSliderRef.value = local.value[0].toString();
			toSliderRef.value = local.value[1].toString();
		}

		const form = inputRef.closest("form");

		if (form) {
			form.addEventListener("reset", () => {
				if (local.value) {
					setFromVal(local.value[0]);
					setToVal(local.value[1]);
				}

				if (inputRef) {
					const val = inputRef.defaultValue
						.split(",")
						.map((x) => Number.parseFloat(x)) as [number, number];

					setFromVal(val[0]);
					setToVal(val[1]);

					if (fromSliderRef && toSliderRef) {
						fromSliderRef.defaultValue = val[0].toString();
						toSliderRef.defaultValue = val[1].toString();
					}
				}
			});
		}
	});

	const handleFromInput: JSX.InputEventHandlerUnion<
		HTMLInputElement,
		InputEvent
	> = (e) => {
		const value = Math.min(+e.target.value, toVal() - 1);
		setFromVal(value);
		e.target.value = value.toString();
	};

	const handleToInput: JSX.InputEventHandlerUnion<
		HTMLInputElement,
		InputEvent
	> = (e) => {
		const value = Math.max(+e.target.value, fromVal() + 1);
		setToVal(value);
		e.target.value = value.toString();
	};

	const fromPercent = createMemo(() => (fromVal() / local.max) * 100);
	const toPercent = createMemo(() => (toVal() / local.max) * 100);

	return (
		<div
			class={styles.sliderContainer}
			style={{
				"--from-value": `${fromPercent()}%`,
				"--to-value": `${toPercent()}%`,
			}}>
			<input
				type='range'
				onInput={handleFromInput}
				class={`${styles.rangeInput} ${styles.fromSlider}`}
				ref={fromSliderRef}
				min={local.min}
				max={local.max}
				{...rest}
			/>
			<input
				type='range'
				class={`${styles.rangeInput} ${styles.toSlider}`}
				ref={toSliderRef}
				onInput={handleToInput}
				min={local.min}
				max={local.max}
				{...rest}
			/>
			<input
				type='text'
				aria-hidden='true'
				value={`${fromVal()},${toVal()}`}
				style={{ display: "none" }}
				data-type='range-array'
				name={local.name}
				tabIndex={-1}
				ref={(node) => {
					if (typeof local.ref === "function") {
						local.ref(node);
					} else {
						local.ref = node;
					}

					inputRef = node;
				}}
			/>
		</div>
	);
};
