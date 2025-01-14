import {
	type Accessor,
	type Component,
	createEffect,
	createMemo,
	createSignal,
	For,
	Index,
	onMount,
	type Setter,
	Show,
} from "solid-js";
import { Select } from "../select";
import { months, weekdays } from "./data";
import { IconChevronLeft } from "../icons/icon-chevron-left";
import { IconChevronRight } from "../icons/icon-chevron-right";
import styles from "./index.module.css";

export type CalendarValue = { month: string; year: number };

type Props = {
	selectedDay: Accessor<Date>;
	setSelectedDay: Setter<Date>;
	class?: string;
	selectLayout?: boolean;
	onCalendarChange?: (e: CalendarValue) => void;
	eventDates?: Accessor<Set<string> | undefined>;
	showTodayButton?: boolean;
};

const findItem = (
	items: NodeListOf<HTMLButtonElement>,
	target: HTMLButtonElement
) => {
	for (let i = 0; i < items.length; i += 1) {
		if (items[i] === target) {
			return i;
		}
	}
	return -1;
};

const findClosestDay = (
	buttons: NodeListOf<HTMLButtonElement>,
	day: number
): HTMLButtonElement | null =>
	Array.from(buttons).find(
		(button) => Number(button.getAttribute("data-day")) === day
	) ||
	Array.from(buttons).reduce((closest, button) => {
		const buttonDay = Number(button.getAttribute("data-day"));
		return Math.abs(buttonDay - day) <
			Math.abs(Number(closest.getAttribute("data-day")))
			? button
			: closest;
	}, buttons[0]);

// TODO: Add multiple date select

export const Calendar: Component<Props> = (props) => {
	const [currentDay, setCurrentDay] = createSignal(new Date());

	const startYear = 2000;
	const endYear = 2035;

	const years = [];
	for (let i = startYear; i <= endYear; i += 1) {
		years.push(i);
	}

	const month = createMemo(() => currentDay().getMonth());
	const year = createMemo(() => currentDay().getFullYear());

	const today = new Date();

	const monthDays = createMemo(() => {
		const firstDay = new Date(
			currentDay().getFullYear(),
			currentDay().getMonth(),
			1
		);
		const weekdayOfFirstDay = firstDay.getDay();
		const currentDays = [];

		for (let day = 0; day < 42; day += 1) {
			if (day === 0 && weekdayOfFirstDay === 0) {
				firstDay.setDate(firstDay.getDate() - 7);
			} else if (day === 0) {
				firstDay.setDate(firstDay.getDate() + (day - weekdayOfFirstDay));
			} else {
				firstDay.setDate(firstDay.getDate() + 1);
			}

			const calendarDay = {
				currentMonth: firstDay.getMonth() === currentDay().getMonth(),
				prevMonth: firstDay.getMonth() === currentDay().getMonth() - 1,
				nextMonth: firstDay.getMonth() === currentDay().getMonth() + 1,
				date: new Date(firstDay),
				month: firstDay.getMonth(),
				selected:
					firstDay.toDateString() === props.selectedDay().toDateString(),
				number: firstDay.getDate(),
				today:
					firstDay.getFullYear() === today.getFullYear() &&
					firstDay.getMonth() === today.getMonth() &&
					firstDay.getDate() === today.getDate(),
			};

			currentDays.push(calendarDay);
		}

		return currentDays;
	});

	let buttonsContainerRef: HTMLDivElement | undefined;

	const keys = {
		up: "ArrowUp",
		down: "ArrowDown",
		left: "ArrowLeft",
		right: "ArrowRight",
	};

	onMount(() => {
		const buttons: NodeListOf<HTMLButtonElement> | undefined =
			buttonsContainerRef?.querySelectorAll(".calendar-day");

		buttonsContainerRef?.addEventListener("keydown", (e) => {
			if (!buttons || !buttons.length) {
				return;
			}

			const { code } = e;
			const width = 7;
			let increment: number | undefined;

			switch (code) {
				case keys.up:
					increment = -width;
					break;
				case keys.down:
					increment = width;
					break;
				case keys.left:
					increment = -1;
					break;
				case keys.right:
					increment = 1;
					break;
				default:
					increment = 0;
					break;
			}

			if (increment !== 0) {
				const active: HTMLButtonElement | null =
					buttonsContainerRef?.querySelector(
						'.calendar-day[data-focused="true"]'
					);

				if (!active) {
					return;
				}

				const index = findItem(buttons, active);
				const newIndex = index + increment;

				if (newIndex >= 0 && newIndex < buttons.length) {
					const selectedDay = Number(active.getAttribute("data-day"));

					// Remove focus from the currently active element
					active.setAttribute("data-focused", "false");
					active.setAttribute("tabindex", "-1");
					active.blur();

					// Handle month navigation first
					if (buttons[newIndex].getAttribute("data-next-month") === "true") {
						const nextMonthDate = new Date(
							new Date(
								currentDay().getFullYear(),
								currentDay().getMonth() + 1,
								currentDay().getDate()
							)
						);
						setCurrentDay(nextMonthDate);

						setTimeout(() => {
							const newMonthButtons: NodeListOf<HTMLButtonElement> | undefined =
								buttonsContainerRef?.querySelectorAll(".calendar-day");

							if (!newMonthButtons) return;

							const newDayButton = findClosestDay(newMonthButtons, selectedDay);

							if (newDayButton) {
								newDayButton.setAttribute("data-focused", "true");
								newDayButton.setAttribute("tabindex", "0");
								newDayButton.focus();
							}
						}, 0);

						return;
					}

					if (buttons[newIndex].getAttribute("data-prev-month") === "true") {
						setCurrentDay(
							new Date(
								currentDay().getFullYear(),
								currentDay().getMonth() - 1,
								currentDay().getDate()
							)
						);

						setTimeout(() => {
							const newMonthButtons: NodeListOf<HTMLButtonElement> | undefined =
								buttonsContainerRef?.querySelectorAll(".calendar-day");

							if (!newMonthButtons) return;

							const newDayButton = findClosestDay(newMonthButtons, selectedDay);

							if (newDayButton) {
								newDayButton.setAttribute("data-focused", "true");
								newDayButton.setAttribute("tabindex", "0");
								newDayButton.focus();
							}
						}, 0);

						return; // Exit the function since we're waiting for a new month
					}

					// If no month change, just update the focus within the current month
					buttons[newIndex].setAttribute("data-focused", "true");
					buttons[newIndex].setAttribute("tabindex", "0");
					buttons[newIndex].focus();

					// eslint-disable-next-line consistent-return
					return false;
				}
			}
		});
	});

	createEffect(() => {
		const currentMonth = month();
		const currentYear = year();

		if (props.onCalendarChange) {
			props.onCalendarChange({
				month: months[currentMonth].value.toLowerCase(),
				year: currentYear,
			});
		}
	});

	createEffect(() => {
		setCurrentDay(props.selectedDay());
	});

	return (
		<div
			class={styles.container}
			classList={{
				[props.class ?? ""]: !!props.class,
			}}>
			<div class={styles.buttonsContainer}>
				<button
					type='button'
					onClick={() => {
						setCurrentDay(
							new Date(
								currentDay().getFullYear(),
								currentDay().getMonth() - 1,
								currentDay().getDate()
							)
						);
					}}
					aria-label='Go to previous month'
					class={styles.monthChangeButton}>
					<IconChevronLeft size={24} />
				</button>
				<Show when={!props.selectLayout}>
					<h1 class={styles.monthLabel}>
						{months[currentDay().getMonth()].label} {currentDay().getFullYear()}
					</h1>
				</Show>
				<Show when={props.selectLayout}>
					<div class={styles.selectContainer}>
						<Select
							options={months}
							class={styles.select}
							optionClass={styles.selectOption}
							optionsContainerClass={styles.optionsContainer}
							value={months[currentDay().getMonth()].value}
							onChange={(val) => {
								setCurrentDay(
									new Date(
										currentDay().getFullYear(),
										Number.parseInt(val as unknown as string, 10),
										currentDay().getDate()
									)
								);
							}}
						/>
						<Select
							options={years.map((x) => ({
								label: x.toString(),
								value: x.toString(),
							}))}
							class={styles.select}
							optionClass={styles.selectOption}
							optionsContainerClass={styles.optionsContainer}
							value={currentDay().getFullYear().toString()}
							onChange={(val) => {
								setCurrentDay(
									new Date(
										Number.parseInt(val as unknown as string, 10),
										currentDay().getMonth(),
										currentDay().getDate()
									)
								);
							}}
						/>
						<Show when={props.showTodayButton}>
							<button
								type='button'
								class={`${styles.todayButton} ${styles.monthChangeButton}`}
								onClick={() => {
									setCurrentDay(today);
									props.setSelectedDay(currentDay());
								}}>
								Today
							</button>
						</Show>
					</div>
				</Show>
				<button
					type='button'
					onClick={() => {
						setCurrentDay(
							new Date(
								currentDay().getFullYear(),
								currentDay().getMonth() + 1,
								currentDay().getDate()
							)
						);
					}}
					aria-label='Go to next month'
					class={styles.monthChangeButton}>
					<IconChevronRight size={24} />
				</button>
			</div>
			<div class={styles.daysGrid}>
				<For each={weekdays}>{(day) => <div>{day}</div>}</For>
			</div>
			<div
				class={styles.monthGrid}
				style={{ position: "relative" }}
				ref={buttonsContainerRef}>
				<Index each={monthDays()}>
					{(day) => (
						<button
							type='button'
							onClick={() => {
								setCurrentDay(day().date);
								props.setSelectedDay(currentDay());
							}}
							class={`${styles.monthChangeButton} ${styles.dayButton} calendar-day`}
							classList={{
								[styles.selected]: day().selected && day().currentMonth,
								[styles.selectedOtherMonth]:
									day().selected && !day().currentMonth,
								[styles.otherMonth]: !day().currentMonth,
								"font-black": day().today,
							}}
							aria-selected={day().selected && day().currentMonth}
							aria-label={Intl.DateTimeFormat(undefined, {
								dateStyle: "full",
								timeStyle: undefined,
							}).format(day().date)}
							data-focused={day().selected && day().currentMonth}
							data-next-month={day().nextMonth}
							data-prev-month={day().prevMonth}
							data-day={day().number}
							tabIndex={day().selected && day().currentMonth ? 0 : -1}>
							{day().number}
						</button>
					)}
				</Index>
			</div>
		</div>
	);
};
