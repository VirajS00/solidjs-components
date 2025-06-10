import {
	createEffect,
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
	name?: string;
	id?: string;
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
	const [currentItem, setCurrentItem] = createSignal<{
		index: number;
		trigger?: "keyboard" | "mouse" | undefined;
	}>({ index: -1 });

	let inputRef: HTMLInputElement | undefined;
	let pannelRef: HTMLUListElement | undefined;
	let buttonRef: HTMLButtonElement | undefined;

	const random = generateRandomString(8);

	const options: IntersectionObserverInit = {
		root: pannelRef,
		rootMargin: "0px",
		threshold: 1.0,
	};

	const intersectionCallback: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				const target = entry.target as HTMLElement;
				if (pannelRef && target) {
					const panelRect = pannelRef.getBoundingClientRect();
					const targetRect = target.getBoundingClientRect();
					const offset = targetRect.top - panelRect.top + pannelRef.scrollTop;
					// Scroll so the target is just inside the panel, with a small margin
					const margin = 8; // px
					if (targetRect.top < panelRect.top) {
						// Target is above the visible area
						pannelRef.scrollTo({ top: offset - margin });
					} else if (targetRect.bottom > panelRect.bottom) {
						// Target is below the visible area
						pannelRef.scrollTo({
							top: offset - panelRect.height + targetRect.height + margin,
						});
					}
				}
			}
		});
	};

	const observer = new IntersectionObserver(intersectionCallback, options);

	createEffect(() => {
		const item = currentItem();
		observer.disconnect();

		const currentEl: HTMLLIElement | null | undefined =
			pannelRef?.querySelector(`#lb-option-${random}-${item.index}`);

		if (currentEl && item.trigger === "keyboard") {
			observer.observe(currentEl);
		}
	});

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
									aria-activedescendant={
										currentItem().index === -1
											? ""
											: `lb-option-${random}-${currentItem().index}`
									}
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
									onKeyDown={(e) => {
										if (e.code === "ArrowUp") {
											e.preventDefault();

											setCurrentItem((it) => {
												const opt = opts();
												if (it.index === 0) {
													return { index: opt.length - 1, trigger: "keyboard" };
												} else if (it.index > 0 && it.index <= opt.length - 1) {
													return { index: it.index - 1, trigger: "keyboard" };
												} else if (opt.length > 0) {
													return {
														index: opt.length - 1,
														trigger: "keyboard",
													};
												} else {
													return { index: opt.length - 1, trigger: "keyboard" };
												}
											});
										}

										if (e.code === "ArrowDown") {
											e.preventDefault();

											setCurrentItem((it) => {
												const opt = opts();
												if (opt.length === 0) {
													return { index: -1, trigger: "keyboard" };
												}
												if (it.index < 0 || it.index >= opt.length - 1) {
													return { index: 0, trigger: "keyboard" };
												}
												return { index: it.index + 1, trigger: "keyboard" };
											});
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
												aria-selected={option === inputRef?.value}
												data-focus={currentItem().index === i()}
												onMouseEnter={() => {
													setCurrentItem({ index: i(), trigger: "mouse" });
												}}
												onMouseLeave={() => {
													setCurrentItem({ index: -1, trigger: "mouse" });
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
