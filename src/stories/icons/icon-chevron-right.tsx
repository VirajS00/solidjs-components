import type { Component } from "solid-js";
import type { IconProps } from "./icon-props";

export const IconChevronRight: Component<IconProps> = (props) => (
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
			d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z'
		/>
	</svg>
);
