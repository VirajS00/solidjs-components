import type { Component, JSX } from "solid-js";
import { For, createSignal, onMount, splitProps } from "solid-js";
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
import type { SelectOption } from "../select";
import styles from "./index.module.css";
import { IconClose } from "../icons/icon-close";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	value?: string[];
	options: SelectOption[];
	placeholder?: string;
};

// TODO: Fix propogation on inside button
export const MultipleExample: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, [
		"value",
		"options",
		"placeholder",
		"class",
		"classList",
		"style",
		"ref",
	]);

	let inputRef: HTMLInputElement | undefined;
	const [selected, setSelected] = createSignal<SelectOption[]>([]);

	onMount(() => {
		if (local.value && local.value.length > 0) {
			setSelected(local.options.filter((x) => local.value?.includes(x.value)));
		} else if (inputRef && inputRef.defaultValue) {
			setSelected(
				local.options.filter((x) =>
					inputRef?.defaultValue.split(",").includes(x.value)
				)
			);
		}

		const form = inputRef?.closest("form");

		if (form) {
			form.addEventListener("reset", () => {
				setSelected(
					local.options.filter((x) =>
						inputRef?.defaultValue.split(",").includes(x.value)
					)
				);
			});
		}
	});

	return (
		<>
			<Listbox
				multiple
				toggleable
				defaultOpen={false}
				value={selected()}
				onSelectChange={setSelected}>
				<div class={styles.containerDiv}>
					<ListboxButton
						type='button'
						class={styles.triggerButton}
						classList={{
							[local.class ?? ""]: !!local.class,
							...local.classList,
						}}
						style={local.style}>
						<div class={styles.tagsContainer}>
							<For
								each={selected()}
								fallback={
									<span class={styles.placeholder}>
										{local.placeholder ?? "Select Values"}
									</span>
								}>
								{(item): JSX.Element => (
									<span class={styles.tag}>
										<span>{item.label}</span>
										<span
											tabIndex={0}
											aria-label={`remove ${item.label}`}
											class={styles.removeItemBtn}
											onMouseUp={(e) => {
												e.preventDefault();
												e.stopPropagation();
												e.stopImmediatePropagation();

												let items = selected();
												items = items.filter((x) => x.value !== item.value);
												setSelected(items);
											}}
											onKeyDown={(e) => {
												e.stopPropagation();
												e.stopImmediatePropagation();

												if (e.code === "Enter" || e.code === "Space") {
													let items = selected();
													items = items.filter((x) => x.value !== item.value);
													setSelected(items);
												}
											}}>
											<IconClose size={12} />
										</span>
									</span>
								)}
							</For>
						</div>
						<span class={styles.triggerIconContainer}>
							<IconChevronDown size={14} aria-hidden='true' />
						</span>
					</ListboxButton>
					<DisclosureStateChild>
						{({ isOpen }): JSX.Element => (
							<Transition
								unmount
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
											<ListboxOption class={styles.listboxItem} value={person}>
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
			<input
				type='text'
				aria-hidden='true'
				style={{ display: "none" }}
				data-type='array'
				ref={(node) => {
					if (typeof local.ref === "function") {
						local.ref(node);
					} else {
						local.ref = node;
					}

					inputRef = node;
				}}
				value={selected().map((x) => x.value)}
				{...rest}
			/>
		</>
	);
};
