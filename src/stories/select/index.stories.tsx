import type { Meta, StoryObj } from "storybook-solidjs";
import { Select, type SelectOption } from ".";

const fruits: SelectOption[] = [
	{ label: "Apple", value: "apple" },
	{ label: "Grape", value: "grape" },
	{ label: "Plum", value: "plum" },
	{ label: "Mango", value: "mango" },
];

const ExampleStory = () => {
	return (
		<form
			style={{ display: "flex", "flex-direction": "column", gap: "0.25em" }}>
			<label for='input-example'>Name</label>
			<Select options={fruits} name='name' id='input-example' />
		</form>
	);
};

const meta = {
	title: "Example/Select",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
