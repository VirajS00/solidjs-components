import type { Meta, StoryObj } from "storybook-solidjs";
import { Toggle } from ".";

const ExampleStory = () => {
	return (
		<form style={{ display: "flex", gap: "0.5em" }}>
			<Toggle name='name' id='input-example' />
			<label for='input-example'>Enabled</label>
		</form>
	);
};

const meta = {
	title: "Example/Toggle",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
