import type { Component } from "solid-js";
import type { IconProps } from "./icon-props";

export const IconCalendar: Component<IconProps> = (props) => (
	<svg
		viewBox='0 0 16 16'
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
			fill-rule='evenodd'
			d='M5.25 5.497a.75.75 0 0 1-.75-.75V4A1.5 1.5 0 0 0 3 5.5v1h10v-1A1.5 1.5 0 0 0 11.5 4v.75a.75.75 0 0 1-1.5 0V4H6v.747a.75.75 0 0 1-.75.75M10 2.5H6v-.752a.75.75 0 1 0-1.5 0V2.5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3v-.75a.75.75 0 0 0-1.5 0zM3 8v3.5A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5V8z'
			clip-rule='evenodd'
		/>
	</svg>
);
