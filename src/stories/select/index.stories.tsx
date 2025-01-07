import type { Meta, StoryObj } from "storybook-solidjs";
import { Select, type SelectOption } from ".";
import { onMount } from "solid-js";

const fruits: SelectOption[] = [
	{ label: "Apple", value: "apple" },
	{ label: "Grape", value: "grape" },
	{ label: "Plum", value: "plum" },
	{ label: "Mango", value: "mango" },
];

const ExampleStory = () => {
	let selectRef: HTMLSelectElement | undefined;
	onMount(() => {
		const options = selectRef?.querySelectorAll("option");
		if (options) {
			const val = [...options].find((x) => x.value === "grape");

			if (val) {
				val.defaultSelected = true;
			}
		}
	});

	return (
		<form
			style={{ display: "flex", "flex-direction": "column", gap: "0.25em" }}>
			<label for='input-example'>Name</label>
			<Select options={fruits} name='name' id='input-example' ref={selectRef} />
			<button type='reset'>reset</button>
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
