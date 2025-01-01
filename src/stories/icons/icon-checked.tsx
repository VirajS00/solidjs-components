import type { Component } from "solid-js";
import type { IconProps } from "./icon-props";

export const IconCheckmark: Component<IconProps> = (props) => (
	<svg
		style={{
			height: `${props.size ?? 24}px`,
			width: `${props.size ?? 24}px`,
			...props.style,
		}}
		classList={{
			[props.class ?? ""]: !!props.class,
			...props.classList,
		}}
		aria-hidden='true'
		viewBox='0 0 24 24'
		data-testid='CheckIcon'>
		<path
			d='M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
			fill='currentColor'
		/>
	</svg>
);
