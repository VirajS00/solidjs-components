import type { Meta, StoryObj } from "storybook-solidjs";
import { makeToast, type Varaint } from ".";

const ExampleStory = () => {
	const clickBtn = (variant: Varaint) => {
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
				transitionDuration: 500,
				variant: variant ?? "default",
			}
		);
	};

	return (
		<div
			style={{
				display: "flex",
				gap: "0.5rem",
			}}>
			<button
				type='button'
				onClick={() => {
					clickBtn("default");
				}}>
				Show Default Toast
			</button>
			<button
				type='button'
				onClick={() => {
					clickBtn("error");
				}}>
				Show Error Toast
			</button>
			<button
				type='button'
				onClick={() => {
					clickBtn("success");
				}}>
				Show Success Toast
			</button>
			<button
				type='button'
				onClick={() => {
					clickBtn("warning");
				}}>
				Show Warning Toast
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
