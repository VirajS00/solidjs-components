import { onMount } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { TextArea } from ".";

const ExampleStory = () => {
  let textareaRef: HTMLTextAreaElement | undefined;

  onMount(() => {
    if (textareaRef) {
      textareaRef.defaultValue = "This is a textarea";
    }
  });

  return (
    <form style={{ display: "flex", "flex-direction": "column", gap: "0.25em" }}>
      <label for="input-example">Name</label>
      <TextArea name="name" id="input-example" placeholder="Enter Name" ref={textareaRef} />
      <input type="reset" />
    </form>
  );
};

const meta = {
  title: "Example/TextArea",
  component: ExampleStory,
  argTypes: {},
  args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
