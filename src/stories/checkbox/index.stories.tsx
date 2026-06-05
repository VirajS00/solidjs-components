import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Label } from "../label";
import { Checkbox } from ".";

const ExampleStory = () => {
  return (
    <div>
      <Checkbox id="my-checkbox" value="item-1" />
      <Label for="my-checkbox" style={{ "padding-left": "0.5em" }}>
        Item 1
      </Label>
    </div>
  );
};

const meta = {
  title: "Example/Checkbox",
  component: ExampleStory,
  argTypes: {},
  args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
