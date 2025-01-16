import type { Meta, StoryObj } from "storybook-solidjs";
import { DatePicker } from ".";
import { onMount } from "solid-js";

const ExampleStory = ({ selectLayout }: { selectLayout: boolean }) => {
	let inputRef: HTMLInputElement | undefined;

	onMount(() => {
		if (!inputRef) {
			return;
		}

		inputRef.defaultValue = "1766429594";
	});

	return (
		<form
			style={{ display: "flex", gap: "0.25em", "flex-direction": "column" }}>
			<DatePicker selectLayout={selectLayout} ref={inputRef} />
		</form>
	);
};

const meta = {
	title: "Example/Date Picker",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const SelectLayout: Story = {
	args: {
		selectLayout: true,
	},
};
