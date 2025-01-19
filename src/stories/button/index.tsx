import {
	type ComponentProps,
	mergeProps,
	splitProps,
	type ValidComponent,
} from "solid-js";
import styles from "./index.module.css";
import { Dynamic } from "solid-js/web";

type Props<T extends ValidComponent, P = ComponentProps<T>> = {
	[K in keyof P]: P[K];
} & {
	color?:
		| "default"
		| "secondary"
		| "monochrome"
		| "warning"
		| "success"
		| "error"
		| "ghost";
	variant?: "filled" | "outline" | "link";
	as?: T;
};

export const Button = <T extends ValidComponent>(props: Props<T>) => {
	// biome-ignore lint/style/noParameterAssign: <explanation>
	props = mergeProps(
		{ color: "default", variant: "filled", as: "button" },
		props
	);

	const [local, rest] = splitProps(props, [
		"class",
		"color",
		"variant",
		"as",
	]) as [Pick<Props<T>, "color" | "class" | "as" | "variant">, Props<T>];

	return (
		<Dynamic
			component={local.as}
			class={styles.button}
			classList={{
				[local.class ?? ""]: !!local.class,
				[styles.filled]: local.variant === "filled",
				[styles.outline]: local.variant === "outline",
				[styles.link]: local.variant === "link",
				[styles.default]: local.color === "default",
				[styles.monochrome]: local.color === "monochrome",
				[styles.secondary]: local.color === "secondary",
				[styles.warning]: local.color === "warning",
				[styles.success]: local.color === "success",
				[styles.error]: local.color === "error",
				[styles.ghost]: local.color === "ghost",
			}}
			{...rest}
		/>
	);
};
