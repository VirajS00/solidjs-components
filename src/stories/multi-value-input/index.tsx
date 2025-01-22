import {
	type Component,
	createSignal,
	For,
	type JSX,
	onMount,
	splitProps,
} from "solid-js";
import { IconClose } from "../icons/icon-close";
import styles from "./index.module.css";
import { IconPlus } from "../icons/icon-plus";
import { Input } from "../input";
import { Button } from "../button";

type Props = Omit<JSX.HTMLAttributes<HTMLInputElement>, "value"> & {
	value?: string[];
	name?: string;
};

export const MultiValueInput: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["class", "value", "ref"]);
	const [items, setItems] = createSignal<string[]>([""]);

	let inputRef: HTMLInputElement | undefined;
	let inputContainerRef: HTMLDivElement | undefined;

	onMount(() => {
		if (!inputRef) {
			return;
		}

		if (props.value) {
			inputRef.defaultValue = local.value?.toString() ?? "";
		}

		if (inputRef.defaultValue) {
			setItems(inputRef.defaultValue.split(","));
		}

		const form = inputRef.closest("form");

		if (form) {
			form.addEventListener("reset", () => {
				if (!inputRef) {
					return;
				}

				if (local.value) {
					setItems(local.value);
				}

				if (inputRef.defaultValue) {
					setItems(inputRef.defaultValue.split(","));

					const inputs = inputContainerRef?.querySelectorAll("input");

					if (inputs) {
						for (let i = 0; i < inputs.length; i++) {
							inputs[i].defaultValue = items()[i];
						}
					}
				}
			});
		}
	});

	return (
		<div>
			<div class={styles.inputsContainer} ref={inputContainerRef}>
				<For each={items()}>
					{(item, i) => (
						<div class={styles.inputContainer}>
							<Input
								type='text'
								value={item}
								onInput={(e) => {
									const newItems = [...items()];
									newItems[i()] = e.target.value;
									setItems(newItems);
								}}
							/>
							<Button
								type='button'
								variant='outline'
								color='monochrome'
								aria-label='Remove Item'
								onClick={() => {
									setItems((it) => {
										const ii = [...it];

										if (i() === 0 && ii.length === 1) {
											return [""];
										}

										if (i() > -1) {
											ii.splice(i(), 1);
										}

										return ii;
									});
								}}>
								<IconClose size={16} />
							</Button>
						</div>
					)}
				</For>
			</div>
			<Button
				as='button'
				type='button'
				variant='outline'
				color='monochrome'
				class={styles.addBtn}
				onClick={() => {
					const ii = [...items()];
					ii.push("");
					setItems(ii);
				}}>
				<IconPlus /> Add Item
			</Button>
			<input
				type='text'
				aria-hidden='true'
				data-type='array'
				tabIndex={-1}
				style={{ display: "none" }}
				value={items().filter((x) => x !== "")}
				ref={(node) => {
					if (typeof local.ref === "function") {
						local.ref(node);
					} else {
						local.ref = node;
					}

					inputRef = node;
				}}
				{...rest}
			/>
		</div>
	);
};
