import type { Component } from "solid-js";
import type { LogoProps } from "./logo-props";

export const IconClose: Component<LogoProps> = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={props.size}
		height={props.size}
		viewBox='0 0 16 16'
		aria-hidden='true'>
		<path
			fill='currentColor'
			d='m2.397 2.554l.073-.084a.75.75 0 0 1 .976-.073l.084.073L8 6.939l4.47-4.47a.75.75 0 1 1 1.06 1.061L9.061 8l4.47 4.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L8 9.061l-4.47 4.47a.75.75 0 0 1-1.06-1.061L6.939 8l-4.47-4.47a.75.75 0 0 1-.072-.976l.073-.084z'
		/>
	</svg>
);
