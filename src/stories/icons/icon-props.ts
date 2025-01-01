import type { JSX } from "solid-js";

export type IconProps = {
	class?: string;
	size?: number;
	style?: JSX.CSSProperties;
	classList?: { [k: string]: boolean | undefined };
};
