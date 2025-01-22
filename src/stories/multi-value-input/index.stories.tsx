import type { Meta, StoryObj } from "storybook-solidjs";
import { Label } from "../label";
import { MultiValueInput } from ".";
import { onMount } from "solid-js";

const values = ["http://localhost:6001", "https://helloworld.com/callback"];

const ExampleStory = () => {
	let inputRef: HTMLInputElement | undefined;

	onMount(() => {
		if (!inputRef) return;

		inputRef.defaultValue = values.toString();
	});

	return (
		<form
			style={{ display: "flex", "flex-direction": "column", gap: "0.25em" }}>
			<Label for='input-example'>URLs</Label>
			<MultiValueInput name='name' id='input-example' ref={inputRef} />
			<input type='reset' />
		</form>
	);
};

const meta = {
	title: "Example/Multi Value Input",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
