import {
	type Component,
	For,
	type JSX,
	Show,
	createMemo,
	createSignal,
	onMount,
	splitProps,
} from "solid-js";
import {
	DisclosureStateChild,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "terracotta";
import { IconChevronDown } from "../icons/icon-down-arrow";
import { IconCheckmark } from "../icons/icon-checked";
import styles from "./index.module.css";

export type SelectOption = {
	label: string;
	value: string;
};

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	options: SelectOption[];
	value?: string;
	name?: string;
	placeholder?: string;
};

export const Select: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, [
		"options",
		"value",
		"placeholder",
		"ref",
	]);
	const [selected, setSelected] = createSignal(local.value);
	let inputRef: HTMLInputElement | undefined;

	onMount(() => {
		const form = inputRef?.closest("form");

		if (!form) {
			return;
		}

		setSelected(inputRef?.defaultValue);

		form?.addEventListener("reset", () => {
			setSelected(inputRef?.defaultValue);
		});
	});

	const selectedVal = createMemo(() =>
		local.options.find((x) => x.value === selected())
	);

	return (
		<>
			<Listbox
				defaultOpen={false}
				value={selected() ?? ""}
				onSelectChange={setSelected}>
				<div class={styles.containerDiv}>
					<ListboxButton type='button' class={styles.triggerButton}>
						<>
							<Show
								when={selectedVal()}
								fallback={
									<span class={styles.placeholder}>
										{local.placeholder ?? "Select Option"}
									</span>
								}>
								<span class='block truncate'>{selectedVal()?.label}</span>
							</Show>
							<span class={styles.triggerIconContainer}>
								<IconChevronDown size={14} class='trigger-icon' />
							</span>
						</>
					</ListboxButton>
					<DisclosureStateChild>
						{({ isOpen }): JSX.Element => (
							<Transition
								show={isOpen()}
								enter={styles.transitionEnter}
								enterFrom={styles.transitionEnterFrom}
								enterTo={styles.transitionEnterTo}
								leave={styles.transitionEnter}
								leaveFrom={styles.transitionEnterTo}
								leaveTo={styles.transitionEnterFrom}>
								<ListboxOptions unmount={false} class={styles.listboxOptions}>
									<For each={local.options}>
										{(person): JSX.Element => (
											<ListboxOption
												class={styles.listboxItem}
												value={person.value}>
												{({ isSelected }): JSX.Element => (
													<>
														<span>{person.label}</span>
														<Show when={isSelected()}>
															<span>
																<IconCheckmark size={16} aria-hidden='true' />
															</span>
														</Show>
													</>
												)}
											</ListboxOption>
										)}
									</For>
								</ListboxOptions>
							</Transition>
						)}
					</DisclosureStateChild>
				</div>
			</Listbox>
			<input
				tabIndex={-1}
				type='text'
				aria-hidden='true'
				value={selected()}
				style={{ display: "none" }}
				onInput={(e) => {
					setSelected(e.target.value);

					if (rest.onInput && typeof rest.onInput === "function") {
						rest.onInput(e);
					}
				}}
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
		</>
	);
};
