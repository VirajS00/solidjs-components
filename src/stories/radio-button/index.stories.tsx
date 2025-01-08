import type { Meta, StoryObj } from "storybook-solidjs";
import { RadioButton } from ".";
import { Label } from "../label";
import { onMount } from "solid-js";

const defaultVal = "item-2";

const ExampleStory = () => {
	let formRef: HTMLFormElement | undefined;

	onMount(() => {
		const inputs: NodeListOf<HTMLInputElement> | undefined =
			formRef?.querySelectorAll('input[type="radio"][name="my-item"]');

		if (!inputs) {
			return;
		}

		for (const inp of inputs) {
			if (inp.value === defaultVal) {
				inp.defaultChecked = true;
			}
		}
	});

	return (
		<form
			style={{ display: "flex", "flex-direction": "column", gap: "0.5rem" }}
			ref={formRef}>
			<div style={{ display: "flex", "align-items": "center" }}>
				<RadioButton id='my-radio-1' name='my-item' value='item-1' />
				<Label for='my-radio-1' style={{ "padding-left": "0.5em" }}>
					Item 1
				</Label>
			</div>
			<div style={{ display: "flex", "align-items": "center" }}>
				<RadioButton id='my-radio-2' name='my-item' value='item-2' />
				<Label for='my-radio-2' style={{ "padding-left": "0.5em" }}>
					Item 2
				</Label>
			</div>
			<div style={{ display: "flex", "align-items": "center" }}>
				<RadioButton id='my-radio-3' name='my-item' value='item-3' />
				<Label for='my-radio-3' style={{ "padding-left": "0.5em" }}>
					Item 3
				</Label>
			</div>
			<input type='reset' />
		</form>
	);
};

const meta = {
	title: "Example/Radio Button",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
