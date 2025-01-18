import {
	createMemo,
	createSignal,
	mergeProps,
	onMount,
	splitProps,
	type Component,
	type JSX,
} from "solid-js";
import { IconCalendar } from "../icons/icon-calendar";
import styles from "./index.module.css";
import { Popover, PopoverButton, PopoverPanel, Transition } from "terracotta";
import { Calendar } from "../calendar";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
	selectLayout?: boolean;
	startYear?: number;
	endYear?: number;
};

export const DatePicker: Component<Props> = (props) => {
	let pannelRef: HTMLDivElement | undefined;
	let buttonRef: HTMLButtonElement | undefined;
	let inputRef: HTMLInputElement | undefined;

	// biome-ignore lint/style/noParameterAssign: <explanation>
	props = mergeProps({ selectLayout: true }, props);
	const [local, rest] = splitProps(props, [
		"ref",
		"startYear",
		"endYear",
		"selectLayout",
	]);

	const [selectedDay, setSelectedDay] = createSignal(new Date());

	onMount(() => {
		if (inputRef?.defaultValue) {
			setSelectedDay(new Date(Number.parseFloat(inputRef.defaultValue) * 1000));
		}
	});

	const currentDate = createMemo(() =>
		new Date(
			selectedDay().getTime() - selectedDay().getTimezoneOffset() * 60000
		)
			.toISOString()
			.substring(0, 10)
	);

	return (
		<Popover defaultOpen={false} as='div' class={styles.container}>
			{({ isOpen, close }) => {
				document.addEventListener("keyup", (e) => {
					if (e.code === "Escape") {
						close();
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
						<div class={styles.inputContainer}>
							<input
								type='date'
								class={styles.dateInput}
								value={currentDate()}
								onInput={(e) => {
									const dd = e.target.valueAsDate;
									if (dd) {
										setSelectedDay(dd);
									}
								}}
							/>
							<PopoverButton
								type='button'
								aria-label='Select Date'
								class={styles.pickerButton}
								ref={buttonRef}>
								<IconCalendar size={16} />
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
								unmount={false}
								class={styles.innerPannel}
								ref={pannelRef}>
								<Calendar
									selectedDay={selectedDay}
									setSelectedDay={setSelectedDay}
									selectLayout={local.selectLayout}
									startYear={local.startYear}
									endYear={local.endYear}
								/>
							</PopoverPanel>
						</Transition>
						<input
							aria-hidden={true}
							tabIndex={-1}
							style={{ display: "none" }}
							value={Math.floor(selectedDay().getTime() / 1000)}
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
			}}
		</Popover>
	);
};
