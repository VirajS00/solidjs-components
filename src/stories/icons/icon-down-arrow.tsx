import type { Component } from "solid-js";
import type { IconProps } from "./icon-props";

export const IconChevronDown: Component<IconProps> = (props) => (
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
			d='M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z'
		/>
	</svg>
);
