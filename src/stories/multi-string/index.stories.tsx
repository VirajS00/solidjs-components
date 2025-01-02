import type { Meta, StoryObj } from "storybook-solidjs";

import { MultiString } from ".";
import { createSignal, type JSX } from "solid-js";
import { Label } from "../label";

const ExampleStory = () => {
	const [vals, setVals] = createSignal<object | undefined>(undefined);

	const submitForm: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent> = (
		e
	) => {
		e.preventDefault();
		const formData: Record<string, unknown> = Object.fromEntries(
			new FormData(e.currentTarget)
		);
		const arrayInps: NodeListOf<HTMLInputElement> =
			e.currentTarget.querySelectorAll('[data-type="array"][name]');

		if (arrayInps) {
			for (const arrInp of arrayInps) {
				formData[arrInp.name as string] = arrInp.value.split(",");
			}
		}

		setVals(formData);
	};

	return (
		<>
			<form onSubmit={submitForm}>
				<div
					style={{
						display: "flex",
						"flex-direction": "column",
						gap: "0.25em",
					}}>
					<Label for='hello'>Values</Label>
					<MultiString name='hello' id='hello' />
				</div>
				<button type='submit'>submit</button>
			</form>
			<div>{JSON.stringify(vals(), undefined, 2)}</div>
		</>
	);
};

const meta = {
	title: "Example/Multi String",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
