import type { JSX } from "solid-js";
import styles from "./index.module.css";

export type ToastOptions = {
	gap?: number;
	duration?: number;
};

const moveToastsUp = (gap?: number) => {
	const toasts: NodeListOf<HTMLDivElement> =
		document.querySelectorAll(".toast");

	for (const toast of toasts) {
		if (toast.classList.contains("newest")) {
			toast.style.bottom = "5px";
			toast.classList.remove("newest");
		} else {
			const prevValue = toast.style.bottom.replace("px", "");
			const toastHeight = toast.offsetHeight;
			const newValue =
				Number.parseInt(prevValue, 10) + toastHeight + (gap ?? 8);
			toast.style.bottom = `${newValue}px`;
		}
	}
};

export const makeToast = (el: string | JSX.Element, options?: ToastOptions) => {
	const popover = (
		<article popover='manual' class={`toast newest ${styles.toast}`}>
			{el}
		</article>
	) as HTMLElement;

	document.body.appendChild(popover);

	// Show the popover
	popover.showPopover();

	setTimeout(() => {
		popover.hidePopover();
		popover.remove();
	}, options?.duration ?? 2000);

	popover.addEventListener("toggle", (event) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if ((event as any)?.newState === "open") {
			moveToastsUp(options?.gap);
		}
	});
};
