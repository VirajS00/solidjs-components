import type { Meta, StoryObj } from "storybook-solidjs";
import { Form } from ".";
import styles from "./story.module.css";
import { DummyFormData, formOptions } from "./dummy-form-data";
import { Label } from "../label";
import { Checkbox } from "../checkbox";
import { Select } from "../select";
import { DatePicker } from "../date-picker";
import { DualRangeInput } from "../dual-range-slider";
import { Input } from "../input";
import { MultiSelect } from "../multi-select";
import { MultiString } from "../multi-string";
import { MultiValueInput } from "../multi-value-input";
import { RadioButton } from "../radio-button";
import { For } from "solid-js";
import { RangeInput } from "../range-input";
import { Combobox } from "../combobox";
import { TextArea } from "../textarea";
import { Toggle } from "../toggle";
import { Button } from "../button";

const ExampleStory = () => {
	return (
		<Form class={styles.formContainer} data={DummyFormData}>
			<h2>Sample Form</h2>
			<div class={styles.inputContainer}>
				<Label for='firstName'>First Name</Label>
				<Input id='firstName' name='firstName' placeholder='Enter First Name' />
			</div>
			<div class={styles.inputContainer}>
				<Label for='bio'>Bio</Label>
				<TextArea name='bio' id='bio' style={{ height: "100px" }} />
			</div>
			<div class={styles.inputContainer}>
				<Label for='countrySelection'>Country</Label>
				<Select
					options={formOptions.countrySelection}
					id='countrySelection'
					name='countrySelection'
				/>
			</div>
			<div class={styles.inputContainer}>
				<Label for='birthDate'>Date of Birth</Label>
				<DatePicker id='birthDate' name='birthDate' />
			</div>
			<div class={styles.inputContainer}>
				<Label for='priceRange'>Price Range</Label>
				<DualRangeInput id='priceRange' name='priceRange' min={0} max={1000} />
			</div>
			<div class={styles.inputContainer}>
				<Label for='favoriteFruit'>Favourite Fruit</Label>
				<Combobox
					options={formOptions.favoriteFruit}
					label='Favourite Fruit'
					id='favoriteFruit'
					name='favoriteFruit'
					placeholder='Select your favourite fruit'
				/>
			</div>
			<div class={styles.inputContainer}>
				<Label for='skills'>Skills</Label>
				<MultiSelect options={formOptions.skills} id='skills' name='skills' />
			</div>
			<div class={styles.inputContainer}>
				<Label for='nicknames'>Nicknames</Label>
				<MultiString id='nicknames' name='nicknames' />
			</div>
			<div class={styles.inputContainer}>
				<Label for='favoriteWebsites'>Favourite Websites</Label>
				<MultiValueInput
					id='favoriteWebsites'
					name='favoriteWebsites'
					placeholder='Enter URL'
				/>
			</div>
			<div class={styles.inputContainer}>
				<Label>Select your prefered Contact Method</Label>
				<div class={styles.checkboxContainer}>
					<For each={formOptions.preferredContactMethod}>
						{(item, i) => (
							<div style={{ display: "flex", "align-items": "center" }}>
								<RadioButton
									id={`preferredContactMethod-${i()}`}
									name='preferredContactMethod'
									value={item.value}
								/>
								<Label
									for={`preferredContactMethod-${i()}`}
									style={{ "padding-left": "0.5em" }}>
									{item.label}
								</Label>
							</div>
						)}
					</For>
				</div>
			</div>
			<div class={styles.inputContainer}>
				<Label>Select your notification setting</Label>
				<div class={styles.inputContainer}>
					<For each={formOptions.notificationSettings}>
						{(item, i) => (
							<div style={{ display: "flex", "align-items": "center" }}>
								<Checkbox
									id={`notificationSettings-${i()}`}
									name='notificationSettings'
									value={item.value}
								/>
								<Label
									for={`notificationSettings-${i()}`}
									style={{ "padding-left": "0.5em" }}>
									{item.label}
								</Label>
							</div>
						)}
					</For>
				</div>
			</div>
			<div class={styles.inputContainer}>
				<Label>Select your Favourite animal</Label>
				<div class={styles.inputContainer}>
					<For each={formOptions.favoriteAnimal}>
						{(item, i) => (
							<div style={{ display: "flex", "align-items": "center" }}>
								<Checkbox
									id={`favoriteAnimal-${i()}`}
									name='favoriteAnimal'
									value={item.value}
								/>
								<Label
									for={`favoriteAnimal-${i()}`}
									style={{ "padding-left": "0.5em" }}>
									{item.label}
								</Label>
							</div>
						)}
					</For>
				</div>
			</div>
			<div class={styles.toggleContainer}>
				<Label for='subscribeToNewsletter'>Subscribe to newsletter</Label>
				<Toggle id='subscribeToNewsletter' name='subscribeToNewsletter' />
			</div>
			<div class={styles.inputContainer}>
				<Label for='volumeLevel'>Volume Level</Label>
				<RangeInput id='volumeLevel' name='volumeLevel' />
			</div>
			<div class={styles.buttonContainer}>
				<Button color='monochrome' variant='outline' type='reset'>
					Reset
				</Button>
				<Button type='submit'>Submit</Button>
			</div>
		</Form>
	);
};

const meta = {
	title: "Example/Form",
	component: ExampleStory,
	argTypes: {},
	args: {},
} satisfies Meta<typeof ExampleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
