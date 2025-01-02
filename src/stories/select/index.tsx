import {
	type Component,
	For,
	type JSX,
	createSignal,
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
};

export const Select: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["options", "value"]);
	const [selected, setSelected] = createSignal(
		local.value ?? local.options[0].value
	);

	return (
		<>
			<Listbox defaultOpen value={selected()} onSelectChange={setSelected}>
				<div class={styles.containerDiv}>
					<ListboxButton type='button' class={styles.triggerButton}>
						<>
							<span class='block truncate'>
								{local.options.find((x) => x.value === selected())?.label}
							</span>
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
			<select tabIndex={-1} aria-hidden class={styles.select} {...rest}>
				<For each={local.options}>
					{(option) => (
						<option selected={option.value === selected()} value={option.value}>
							{option.value}
						</option>
					)}
				</For>
			</select>
		</>
	);
};
