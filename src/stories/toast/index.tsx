import { createRoot, Show, type JSX } from "solid-js";
import styles from "./index.module.css";
import { IconClose } from "../icons/icon-close";
import { render } from "solid-js/web";

export type Varaint = "success" | "error" | "warning" | "default";

export type ToastOptions = {
	gap?: number;
	duration?: number;
	transitionDuration?: number;
	dismissible?: boolean;
	variant?: Varaint;
};

type Color = Record<
	Varaint,
	{ background: string; text: string; border: string }
>;

const moveToastsUp = (gap?: number) => {
	const toasts: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(".toast");

	for (const toast of toasts) {
		if (toast.classList.contains("newest")) {
			toast.style.bottom = "16px";
			toast.classList.remove("newest");
		} else {
			const prevValue = toast.style.bottom.replace("px", "");
			const toastHeight = toast.offsetHeight;
			const newValue =
				Number.parseInt(prevValue, 10) + toastHeight + (gap ?? 16);
			toast.style.bottom = `${newValue}px`;
		}
	}
};

const moveToastsDown = (closingToast: HTMLElement, gap?: number) => {
	const toasts: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(".toast");

	const closingToastHeight = closingToast.offsetHeight;
	const closingToastBottom = Number.parseInt(
		closingToast.style.bottom.replace("px", ""),
		10
	);

	for (const toast of toasts) {
		if (toast === closingToast) continue;

		const toastBottom = Number.parseInt(
			toast.style.bottom.replace("px", ""),
			10
		);

		if (toastBottom > closingToastBottom) {
			const newBottom = toastBottom - closingToastHeight - (gap ?? 16);
			toast.style.bottom = `${newBottom}px`;
		}
	}
};

const animateToastExit = (popover: HTMLElement, options?: ToastOptions) => {
	popover.classList.add("exiting");

	const transitionDuration = options?.transitionDuration
		? options.transitionDuration
		: 250;

	requestAnimationFrame(() => {
		moveToastsDown(popover, options?.gap);

		setTimeout(() => {
			popover.hidePopover();

			setTimeout(() => {
				popover.remove();
			}, transitionDuration);
		}, 50);
	});
};

export const makeToast = (el: string | JSX.Element, options?: ToastOptions) => {
	const color: Color = {
		default: { background: "#ffffff", text: "#000000", border: "#cccccc" },
		error: { background: "#FFEAEA", text: "#c80000", border: "#FFBABA" },
		success: { background: "#dbffdd", text: "#1e442d", border: "#A7E9C3" },
		warning: { background: "#fff5b3", text: "#AB6E1E", border: "#FFE480" },
	};

	const popoverContainer = document.createElement("div");
	document.body.appendChild(popoverContainer);

	let dispose: () => void;

	createRoot((disposer) => {
		dispose = disposer;

		const popover = (
			<article
				popover='manual'
				class={`toast newest ${styles.toast}`}
				style={{
					"--transition-duration": options?.transitionDuration
						? `${options?.transitionDuration}ms`
						: "250ms",
					"--background": color[options?.variant ?? "default"].background,
					"--text": color[options?.variant ?? "default"].text,
					"--border": color[options?.variant ?? "default"].border,
				}}>
				<Show when={options?.dismissible ? options.dismissible : true}>
					<button
						type='button'
						aria-label='Close Toast'
						class={styles.closeButton}
						onClick={() => {
							animateToastExit(popover, options);
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							clearTimeout((popover as any)._hideTimeout);
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							clearTimeout((popover as any)._removeTimeout);
							dispose();
						}}>
						<IconClose size={14} />
					</button>
				</Show>
				<div>{el}</div>
			</article>
		) as HTMLElement;

		render(() => popover, popoverContainer);

		popover.showPopover();

		const hideTimeout = setTimeout(() => {
			animateToastExit(popover, options);
		}, options?.duration ?? 2000);

		const removeTimeout = setTimeout(
			() => {
				if (document.body.contains(popoverContainer)) {
					popoverContainer.remove();
					dispose();
				}
			},
			options?.duration
				? options.duration + (options?.transitionDuration ?? 250) * 3
				: (options?.transitionDuration ?? 250) * 3 + 2000
		);

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(popover as any)._hideTimeout = hideTimeout;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(popover as any)._removeTimeout = removeTimeout;

		popover.addEventListener("toggle", (event) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			if ((event as any)?.newState === "open") {
				moveToastsUp(options?.gap);
			}
		});
	});
	return popoverContainer;
};
