import { onMount } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { RangeInput } from ".";

const ExampleStory = () => {
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    if (!inputRef) {
      return;
    }

    inputRef.defaultValue = "25";
  });

  return (
    <form style={{ display: "flex", "flex-direction": "column", gap: "0.85em" }}>
      <label for="input-example">Name</label>
      <RangeInput name="name" id="input-example" ref={inputRef} />
      <input type="reset" />
    </form>
  );
};

const meta = {
  title: "Example/Range Input",
  component: ExampleStory,
  argTypes: {},
  args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
