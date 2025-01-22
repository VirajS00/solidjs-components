import type { Component } from "solid-js";
import type { IconProps } from "./icon-props";

export const IconPlus: Component<IconProps> = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		style={{
			height: `${props.size ?? 24}px`,
			width: `${props.size ?? 24}px`,
			...props.style,
		}}
		classList={{
			[props.class ?? ""]: !!props.class,
			...props.classList,
		}}
		aria-hidden='true'>
		<path
			fill='currentColor'
			d='M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2'
		/>
	</svg>
);
