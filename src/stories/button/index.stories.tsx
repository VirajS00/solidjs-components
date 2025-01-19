import type { Meta, StoryObj } from "storybook-solidjs";
import { Button } from ".";

const meta = {
	title: "Example/Button",
	component: Button,
	argTypes: {
		color: {
			control: "select",
			options: [
				"default",
				"monochrome",
				"secondary",
				"warning",
				"success",
				"error",
				"ghost",
			],
		},
		variant: {
			control: "radio",
			options: ["filled", "outline", "link"],
		},
		children: {
			table: {
				disable: true,
			},
		},
	},
	args: {
		children: "Click Me",
		variant: "filled",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { color: "default" },
};

export const Monochrome: Story = {
	args: { color: "monochrome" },
};

export const Secondary: Story = {
	args: { color: "secondary" },
};

export const Warning: Story = {
	args: { color: "warning" },
};

export const Success: Story = {
	args: { color: "success" },
};

export const Errror: Story = {
	args: { color: "error" },
};

export const Ghost: Story = {
	args: { color: "ghost" },
};
