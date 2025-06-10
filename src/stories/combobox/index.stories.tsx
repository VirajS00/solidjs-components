import type { Meta, StoryObj } from "storybook-solidjs";
import { Combobox } from ".";
import { Label } from "../label";
import { onMount } from "solid-js";

const options = [
	"Chon",
	"Toto",
	"Sara Watkins",
	"Chris Thile",
	"Vulfpeck",
	"Jizue",
	"Elephant Gym",
	"Sungazers",
	"Pineapple Express",
	"Toe",
	"Yuvette Young",
	"Maddison Cunningham",
	"Scary Pockets",
	"Animals As Leaders",
	"Victor Wooten",
	"American Football",
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
				Favorite Music Artist
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
