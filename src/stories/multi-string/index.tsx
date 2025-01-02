import {
	createSignal,
	For,
	type JSX,
	type Component,
	Show,
	splitProps,
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
	const [local, rest] = splitProps(props, ["id", "value"]);
	const [val, setVal] = createSignal<string[]>(local.value ?? []);
	const [showTags, setShowTag] = createSignal(false);

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
			<input type='hidden' data-type='array' value={val()} {...rest} />
		</>
	);
};
