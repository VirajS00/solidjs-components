import type { Meta, StoryObj } from "storybook-solidjs";

import { MultiString } from ".";
import { Label } from "../label";
import { onMount } from "solid-js";

const defaultVals = ["hello", "one", "two"];

const ExampleStory = () => {
	let inputRef: HTMLInputElement | undefined;

	onMount(() => {
		if (!inputRef) {
			return;
		}

		inputRef.defaultValue = defaultVals.toString();
	});

	return (
		<form>
			<div
				style={{
					display: "flex",
					"flex-direction": "column",
					gap: "0.25em",
				}}>
				<Label for='hello'>Values</Label>
				<MultiString name='hello' id='hello' ref={inputRef} />
			</div>
			<button type='reset'>reset</button>
		</form>
	);
};

const meta = {
	title: "Example/Multi String",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
