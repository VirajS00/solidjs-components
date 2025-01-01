import type { Meta, StoryObj } from "storybook-solidjs";

import { Input } from ".";

const ExampleStory = () => {
	return (
		<form
			style={{ display: "flex", "flex-direction": "column", gap: "0.25em" }}>
			<label for='input-example'>Name</label>
			<Input name='name' id='input-example' />
		</form>
	);
};

const meta = {
	title: "Example/Input",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
