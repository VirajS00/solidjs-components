import type { Meta, StoryObj } from "storybook-solidjs";
import { Combobox } from ".";
import { Label } from "../label";
import { onMount } from "solid-js";

const options = [
	"Puns",
	"Riddles",
	"Observations",
	"Knock-knock",
	"One liners",
];

const ExampleStory = () => {
	let inputRef: HTMLInputElement | undefined;

	onMount(() => {
		if (!inputRef) return;

		inputRef.defaultValue = options[2];
	});

	return (
		<form
			style={{ display: "flex", gap: "0.25em", "flex-direction": "column" }}>
			<Label for='my-combobox' style={{ "padding-left": "0.5em" }}>
				Pick what type of jokes you like
			</Label>
			<Combobox
				options={options}
				label='jokes'
				id='my-combobox'
				placeholder='enter values to search'
				ref={inputRef}
			/>
			<input type='reset' />
		</form>
	);
};

const meta = {
	title: "Example/Combobox",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
