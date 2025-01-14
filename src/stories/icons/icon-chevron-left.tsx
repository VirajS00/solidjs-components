import type { Component } from "solid-js";
import type { IconProps } from "./icon-props";

export const IconChevronLeft: Component<IconProps> = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		classList={{
			[props.class ?? ""]: !!props.class,
			...props.classList,
		}}
		aria-hidden='true'
		viewBox='0 0 24 24'
		style={{
			height: `${props.size ?? 24}px`,
			width: `${props.size ?? 24}px`,
			...props.style,
		}}>
		<path
			fill='currentColor'
			d='M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'
		/>
	</svg>
);
