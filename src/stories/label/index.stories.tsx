import { Show } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Input } from "../input";
import { Select, type SelectOption } from "../select";
import { Label } from ".";

const fruits: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Grape", value: "grape" },
  { label: "Plum", value: "plum" },
  { label: "Mango", value: "mango" },
];

const ExampleStory = (props: { withSelect?: boolean }) => {
  return (
    <form style={{ display: "flex", "flex-direction": "column", gap: "0.25em" }}>
      <Label for="input-example">Name</Label>
      <Show when={props.withSelect} fallback={<Input name="name" id="input-example" />}>
        <Select options={fruits} />
      </Show>
    </form>
  );
};

const meta = {
  title: "Example/Label",
  component: ExampleStory,
  argTypes: {},
  args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSelect: Story = {
  args: {
    withSelect: true,
  },
};
