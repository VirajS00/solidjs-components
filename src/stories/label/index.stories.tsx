import type { Meta, StoryObj } from "storybook-solidjs";

import { Label } from ".";
import { Input } from "../input";

const ExampleStory = () => {
	return (
		<form
			style={{ display: "flex", "flex-direction": "column", gap: "0.25em" }}>
			<Label for='input-example'>Name</Label>
			<Input name='name' id='input-example' />
		</form>
	);
};

const meta = {
	title: "Example/Label",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
