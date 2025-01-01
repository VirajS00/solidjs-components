import type { Meta, StoryObj } from "storybook-solidjs";
import { Checkbox } from ".";

const ExampleStory = () => {
	return (
		<div style={{ display: "flex", gap: "0.25em", "align-items": "center" }}>
			<Checkbox id='my-checkbox' value='item-1' />
			<label for='my-checkbox'>Item 1</label>
		</div>
	);
};

const meta = {
	title: "Example/Checkbox",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
