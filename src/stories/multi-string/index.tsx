import {
	createSignal,
	For,
	type JSX,
	type Component,
	Show,
	splitProps,
	onMount,
} from "solid-js";
import styles from "./index.module.css";
import { IconClose } from "../../icons/icon-close";

export type MultiStringProps = Omit<
	JSX.HTMLAttributes<HTMLInputElement>,
	"value"
> & {
	name?: string;
	value?: string[];
};

export const MultiString: Component<MultiStringProps> = (props) => {
	const [local, rest] = splitProps(props, ["id", "value", "ref"]);
	const [val, setVal] = createSignal<string[]>([]);
	const [showTags, setShowTag] = createSignal(false);

	let inputRef: HTMLInputElement | undefined;

	onMount(() => {
		if (!inputRef) {
			return;
		}

		if (inputRef.defaultValue) {
			setShowTag(true);
			setVal(inputRef.defaultValue.split(","));
		} else if (local.value) {
			setShowTag(true);
			setVal(local.value);
		}

		const form = inputRef.closest("form");

		if (form && inputRef.defaultValue) {
			form.addEventListener("reset", () => {
				setVal(inputRef?.defaultValue.split(",") ?? []);
				setShowTag(true);
			});
		}
	});

	const handleKeyDown: JSX.EventHandlerUnion<
		HTMLInputElement,
		KeyboardEvent
	> = (e) => {
		if (e.code === "Enter") {
			setShowTag(true);
			e.preventDefault();
			setVal(Array.from(new Set([...val(), e.currentTarget.value])));
			e.currentTarget.value = "";
		}

		if (e.code === "Backspace" && e.currentTarget.value.length === 0) {
			const v = val();
			const newValue = [...v];
			newValue.pop();
			setVal(newValue);

			if (val().length === 0) {
				setShowTag(false);
			}
		}
	};

	const handleOnInput: JSX.InputEventHandlerUnion<
		HTMLInputElement,
		InputEvent
	> = (e) => {
		if ((val().length === 0 || val().length === 1) && !showTags()) {
			setVal([e.target.value]);
		}
	};

	const handleRemoveItem = (index: number) => {
		const v = val();
		const items = [...v];
		items.splice(index, 1);
		setVal(items);
	};

	return (
		<>
			<div class={styles.container}>
				<Show when={showTags()}>
					<For each={val()}>
						{(v, i) => (
							<span class={styles.tag}>
								{v}
								<button
									type='button'
									class={styles.removeButton}
									onClick={() => handleRemoveItem(i())}
									aria-label='remove item'>
									<IconClose size={12} />
								</button>
							</span>
						)}
					</For>
				</Show>
				<input
					class={styles.input}
					placeholder='Enter value'
					onInput={handleOnInput}
					onKeyDown={handleKeyDown}
					id={local.id}
				/>
			</div>
			<input
				tabIndex={-1}
				type='text'
				data-type='array'
				aria-hidden='true'
				style={{ display: "none" }}
				ref={(node) => {
					if (typeof local.ref === "function") {
						local.ref(node);
					} else {
						local.ref = node;
					}

					inputRef = node;
				}}
				value={val()}
				{...rest}
			/>
		</>
	);
};
