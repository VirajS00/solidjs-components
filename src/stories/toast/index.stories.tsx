import type { Meta, StoryObj } from "storybook-solidjs";
import { makeToast } from ".";

const ExampleStory = () => {
	return (
		<div>
			<button
				type='button'
				onClick={() =>
					makeToast(
						<div>
							<div>hello</div>
						</div>,
						{
							duration: 5000,
						}
					)
				}>
				Show Toast
			</button>
		</div>
	);
};

const meta = {
	title: "Example/Toast",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
