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

type Props = JSX.HTMLAttributes<HTMLSelectElement> & {
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
	let selectRef: HTMLSelectElement | undefined;

	onMount(() => {
		const form = selectRef?.closest("form");
		const options = selectRef?.querySelectorAll("option");

		if (!options || !form) {
			return;
		}

		for (const option of options) {
			if (option.defaultSelected) {
				setSelected(option.value);
			}
		}

		form?.addEventListener("reset", () => {
			const defaultValue = [...options]?.find((x) => x.defaultSelected)?.value;
			setSelected(defaultValue);
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
														{isSelected() ? (
															<span>
																<IconCheckmark size={16} aria-hidden='true' />
															</span>
														) : null}
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
			<select
				tabIndex={-1}
				aria-hidden
				class={styles.select}
				value={selected()}
				onChange={(e) => {
					setSelected(e.target.value);
				}}
				ref={(node) => {
					if (typeof local.ref === "function") {
						local.ref(node);
					} else {
						local.ref = node;
					}

					selectRef = node;
				}}
				{...rest}>
				<option selected={selectedVal()?.value === undefined} value='' />
				<For each={local.options}>
					{(option) => (
						<option
							selected={selectedVal()?.value === option.value}
							value={option.value}>
							{option.value}
						</option>
					)}
				</For>
			</select>
		</>
	);
};
