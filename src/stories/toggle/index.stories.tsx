import type { Meta, StoryObj } from "storybook-solidjs";
import { Toggle } from ".";

const meta = {
	title: "Example/Toggle",
	component: Toggle,
	argTypes: {},
	args: {},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
