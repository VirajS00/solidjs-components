import type { Meta, StoryObj } from "storybook-solidjs";
import { createSignal } from "solid-js";
import { Calendar } from ".";

const ExampleStory = ({ selectLayout }: { selectLayout: boolean }) => {
	const [selectedDay, setSelectedDay] = createSignal(new Date());

	return (
		<form
			style={{ display: "flex", gap: "0.25em", "flex-direction": "column" }}>
			<Calendar
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
				selectLayout={selectLayout}
			/>
		</form>
	);
};

const meta = {
	title: "Example/Calendar",
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
