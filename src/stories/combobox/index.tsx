import {
	createSignal,
	For,
	Show,
	splitProps,
	type Component,
	type JSX,
} from "solid-js";
import styles from "./index.module.css";
import { IconChevronDown } from "../icons/icon-down-arrow";
import { Popover, PopoverButton, PopoverPanel, Transition } from "terracotta";
import { IconCheckmark } from "../icons/icon-checked";
import { generateRandomString } from "../../utils/random-string";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	options: string[];
	label: string;
	placeholder?: string;
};

export const Combobox: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, [
		"id",
		"options",
		"ref",
		"onInput",
		"label",
	]);
	const [pannelId, setPannelId] = createSignal("");
	const [opts, setOpts] = createSignal<string[]>(local.options);

	let inputRef: HTMLInputElement | undefined;
	let pannelRef: HTMLUListElement | undefined;
	let buttonRef: HTMLButtonElement | undefined;

	const random = generateRandomString(8);

	return (
		<>
			<Popover as='div' defaultOpen={false} class={styles.comboWrap}>
				{({ isOpen, close, open }): JSX.Element => {
					document.addEventListener("keyup", (e) => {
						if (!inputRef) {
							return;
						}

						if (e.code === "Escape") {
							inputRef.value = "";
							close();
							setTimeout(() => {
								setOpts(local.options);
							}, 100);
						}
					});

					document.addEventListener("click", (e) => {
						const target = e.target as HTMLElement;

						const isOutsidePanel =
							target !== pannelRef && !pannelRef?.contains(target);

						const isButtonOrInsideButton = buttonRef?.contains(target);

						if (isOutsidePanel && !isButtonOrInsideButton) {
							close();
						}
					});

					return (
						<>
							<div class={styles.inputWrap}>
								<input
									type='text'
									id={local.id}
									role='combobox'
									autocomplete='off'
									class={styles.input}
									classList={{
										[props.class ?? ""]: !!props.class,
										...props.classList,
									}}
									aria-owns={pannelId()}
									aria-controls={pannelId()}
									aria-autocomplete='list'
									aria-expanded={isOpen()}
									// biome-ignore lint/a11y/useValidAriaValues: <explanation>
									aria-activedescendant=''
									onInput={(e) => {
										const inputValue = e.currentTarget.value.trim();

										open();

										if (inputValue !== "") {
											const els =
												pannelRef?.querySelectorAll<HTMLLIElement>("li");

											if (els) {
												for (const el of els) {
													el.setAttribute("data-focus", "false");
													e.target?.setAttribute("aria-activedescendant", "");
												}

												if (els[0]) {
													els[0].setAttribute("data-focus", "true");
													e.target?.setAttribute(
														"aria-activedescendant",
														els[0]?.id ?? ""
													);
												}
											}
										}

										const newOpt = local.options.filter((o) =>
											o.toLowerCase().includes(inputValue.toLowerCase())
										);

										setOpts(newOpt);

										if (local.onInput && typeof local.onInput === "function") {
											local.onInput(e);
										}
									}}
									onKeyUp={(e) => {
										if (e.code === "ArrowUp") {
											e.preventDefault();

											const els =
												pannelRef?.querySelectorAll<HTMLLIElement>("li");
											if (!els || els.length === 0) return;

											const elArr = [...els];

											const currentFocused = elArr.find(
												(el) => el.getAttribute("data-focus") === "true"
											);

											for (const el of elArr) {
												el.setAttribute("data-focus", "false");
											}

											if (currentFocused) {
												const currentIndex = elArr.indexOf(currentFocused);
												const prevIndex =
													(currentIndex - 1 + elArr.length) % elArr.length;
												elArr[prevIndex].setAttribute("data-focus", "true");
												e.target?.setAttribute(
													"aria-activedescendant",
													elArr[prevIndex]?.id ?? ""
												);
											} else {
												elArr[elArr.length - 1].setAttribute(
													"data-focus",
													"true"
												);
												e.target?.setAttribute(
													"aria-activedescendant",
													elArr[elArr.length - 1]?.id ?? ""
												);
											}
										}

										if (e.code === "ArrowDown") {
											e.preventDefault();

											const els =
												pannelRef?.querySelectorAll<HTMLLIElement>("li");
											if (!els || els.length === 0) return;

											const elArr = [...els];

											const currentFocused = elArr.find(
												(el) => el.getAttribute("data-focus") === "true"
											);

											for (const el of elArr) {
												el.setAttribute("data-focus", "false");
											}

											if (currentFocused) {
												const nextIndex =
													(elArr.indexOf(currentFocused) + 1) % elArr.length;
												elArr[nextIndex]?.setAttribute("data-focus", "true");
												e.target?.setAttribute(
													"aria-activedescendant",
													elArr[nextIndex]?.id ?? ""
												);
											} else {
												elArr[0].setAttribute("data-focus", "true");
												e.target?.setAttribute(
													"aria-activedescendant",
													elArr[0]?.id ?? ""
												);
											}
										}
									}}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											const currentFocused =
												pannelRef?.querySelector<HTMLLIElement>(
													"li[data-focus='true']"
												);

											if (inputRef) {
												inputRef.value = currentFocused?.textContent ?? "";
												e.target?.setAttribute("aria-activedescendant", "");
												close();
											}
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
								<PopoverButton
									type='button'
									ref={buttonRef}
									onClick={() => {
										setOpts(local.options);
										inputRef?.focus();
									}}
									tabIndex={-1}
									aria-label='Open Combobox'
									class={styles.comboboxButton}>
									<IconChevronDown size={14} />
								</PopoverButton>
							</div>
							<Transition
								show={isOpen()}
								class={styles.marginTop}
								enter={styles.transitionEnter}
								enterFrom={styles.transitionEnterFrom}
								enterTo={styles.transitionEnterTo}
								leave={styles.transitionEnter}
								leaveFrom={styles.transitionEnterTo}
								leaveTo={styles.transitionEnterFrom}>
								<PopoverPanel
									as='ul'
									unmount={false}
									class={styles.innerPannel}
									// biome-ignore lint/a11y/useSemanticElements: <explanation>
									role='listbox'
									aria-label={local.label}
									ref={(node) => {
										setPannelId(node?.id);
										pannelRef = node;
									}}
									tabIndex={0}>
									<For
										each={opts()}
										fallback={
											<span
												class={`${styles.placeholder} ${styles.addPadding}`}>
												No results found.
											</span>
										}>
										{(option, i) => (
											// biome-ignore lint/a11y/useFocusableInteractive: <explanation>
											// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
											<li
												class={`${styles.option} lb-option`}
												// biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
												// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
												// biome-ignore lint/a11y/useSemanticElements: <explanation>
												role='option'
												id={`lb-option-${random}-${i()}`}
												data-focus='false'
												aria-selected={option === inputRef?.value}
												onMouseEnter={(e) => {
													const els =
														pannelRef?.querySelectorAll<HTMLLIElement>("li");

													if (els) {
														for (const el of els) {
															el.setAttribute("data-focus", "false");
														}
													}
													e.currentTarget.setAttribute("data-focus", "true");
													inputRef?.setAttribute(
														"aria-activedescendant",
														e.target?.id ?? ""
													);
												}}
												onMouseLeave={(e) => {
													const els =
														pannelRef?.querySelectorAll<HTMLLIElement>("li");

													if (els) {
														for (const el of els) {
															el.setAttribute("data-focus", "false");
														}
													}
													e.currentTarget.setAttribute("data-focus", "false");
													inputRef?.setAttribute("aria-activedescendant", "");
												}}
												onClick={() => {
													if (!inputRef) {
														return;
													}

													inputRef.value = option;
													close();
												}}>
												{option}
												<Show when={option === inputRef?.value}>
													<IconCheckmark size={16} aria-hidden='true' />
												</Show>
											</li>
										)}
									</For>
								</PopoverPanel>
							</Transition>
						</>
					);
				}}
			</Popover>
		</>
	);
};
