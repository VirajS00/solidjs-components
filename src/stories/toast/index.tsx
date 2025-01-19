import { Show, type JSX } from "solid-js";
import styles from "./index.module.css";
import { IconClose } from "../icons/icon-close";

type Varaint = "success" | "error" | "warning" | "default";

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

export const makeToast = (el: string | JSX.Element, options?: ToastOptions) => {
	const color: Color = {
		default: { background: "#ffffff", text: "#000000", border: "#cccccc" },
		error: { background: "#FFEAEA", text: "#c80000", border: "#FFBABA" },
		success: { background: "#dbffdd", text: "#1e442d", border: "#A7E9C3" },
		warning: { background: "#fff5b3", text: "#AB6E1E", border: "#FFE480" },
	};

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
						popover.hidePopover();
						setTimeout(
							() => {
								popover.remove();
							},
							options?.transitionDuration ? options.transitionDuration : 250
						);
					}}>
					<IconClose size={14} />
				</button>
			</Show>
			<div>{el}</div>
		</article>
	) as HTMLElement;

	document.body.appendChild(popover);

	popover.showPopover();

	setTimeout(() => {
		popover.hidePopover();
	}, options?.duration ?? 2000);

	setTimeout(
		() => {
			popover.remove();
		},
		options?.duration
			? options.duration + (options?.transitionDuration ?? 250)
			: options?.transitionDuration
			? options.transitionDuration + 2000
			: 2250
	);

	popover.addEventListener("toggle", (event) => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if ((event as any)?.newState === "open") {
			moveToastsUp(options?.gap);
		}
	});
};
