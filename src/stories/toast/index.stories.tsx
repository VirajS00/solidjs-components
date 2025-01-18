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
							<h1
								style={{
									"font-size": "1.2rem",
									"margin-top": 0,
									"margin-bottom": "0.25em",
								}}>
								Toast title
							</h1>
							<p style={{ "font-size": "0.875rem", margin: 0 }}>
								This is the toast description
							</p>
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
