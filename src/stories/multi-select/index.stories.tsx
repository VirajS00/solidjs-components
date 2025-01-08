import type { Meta, StoryObj } from "storybook-solidjs";
import { MultipleExample } from ".";
import type { SelectOption } from "../select";
import { onMount } from "solid-js";

const fruits: SelectOption[] = [
	{ label: "Apple", value: "apple" },
	{ label: "Grape", value: "grape" },
	{ label: "Plum", value: "plum" },
	{ label: "Mango", value: "mango" },
	{ label: "Pineapple", value: "pineapple" },
	{ label: "Orange", value: "orange" },
	{ label: "Watermelon", value: "watermelon" },
	{ label: "Grapefruit", value: "grapefruit" },
];

const defaultVal = ["apple", "mango"];

const ExampleStory = () => {
	let ref: HTMLInputElement | undefined;
	onMount(() => {
		if (!ref) {
			return;
		}

		ref.defaultValue = defaultVal.toString();
	});

	return (
		<form>
			<MultipleExample options={fruits} ref={ref} />
			<input type='reset' />
		</form>
	);
};

const meta = {
	title: "Example/Multi Select",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
