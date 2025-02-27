import { onMount, splitProps, type Component, type JSX } from "solid-js";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const setInitialValues = (form: HTMLFormElement, data: any) => {
	const formElements: NodeListOf<HTMLInputElement> | undefined =
		form.querySelectorAll("[name]");

	if (formElements && data) {
		for (const el of formElements) {
			if (typeof data[el.name] === "string" && el.type !== "radio") {
				el.defaultValue = data[el.name];
			}

			if (Array.isArray(data[el.name])) {
				if (el.getAttribute("data-type") === "array") {
					el.defaultValue = data[el.name].toString();
				}
			}

			if (data[el.name]?.from && data[el.name]?.to) {
				if (el.getAttribute("data-type") === "range-array") {
					el.defaultValue = `${data[el.name].from},${data[el.name].to}`;
				}
			}

			if (el.type === "radio" && typeof data[el.name] === "string") {
				if (data[el.name] === el.value) {
					el.defaultChecked = true;
				}
			}

			if (typeof data[el.name] === "boolean") {
				if (el.role === "switch") {
					el.defaultChecked = data[el.name];
				}
			}

			if (typeof data[el.name] === "number") {
				if (el.type === "range" || el.type === "number") {
					el.defaultValue = data[el.name].toString();
				}
			}

			if (Array.isArray(data[el.name]) && el.type === "checkbox") {
				if (data[el.name].includes(el.value)) {
					el.defaultChecked = true;
				}
			}
		}
	}
};

const getFormValues = (form: HTMLFormElement) => {
	const vals = Object.fromEntries(new FormData(form)) as Record<
		string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		any
	>;

	const arrayElements: NodeListOf<HTMLInputElement> = form.querySelectorAll(
		"[data-type='array']"
	);

	for (const el of arrayElements) {
		vals[el.name] = el.value.split(",");
	}

	const dualRangeElements: NodeListOf<HTMLInputElement> = form.querySelectorAll(
		"[data-type='range-array']"
	);

	for (const el of dualRangeElements) {
		const val = el.value.split(",");
		vals[el.name] = {
			from: Number.parseFloat(val[0]),
			to: Number.parseFloat(val[1]),
		};
	}

	const numberVals: NodeListOf<HTMLInputElement> = form.querySelectorAll(
		"[data-type='number']"
	);

	for (const el of numberVals) {
		vals[el.name] = Number.parseFloat(el.value);
	}

	const dateVals: NodeListOf<HTMLInputElement> =
		form.querySelectorAll("[data-type='date']");

	for (const el of dateVals) {
		let numVal: string | number = Number.parseInt(el.value, 10);
		if (Number.isNaN(numVal)) {
			numVal = el.value;
		}

		vals[el.name] = numVal;
	}

	const switchesVals: NodeListOf<HTMLInputElement> = form.querySelectorAll(
		"input[type='checkbox'][role='switch']"
	);

	for (const el of switchesVals) {
		vals[el.name] = el.checked;
	}

	const checkboxesVals: NodeListOf<HTMLInputElement> = form.querySelectorAll(
		"input[type='checkbox']:not([role='switch'])"
	);

	for (const el of checkboxesVals) {
		if (!Array.isArray(vals[el.name])) {
			vals[el.name] = [];
		}

		if (el.checked) {
			vals[el.name].push(el.value);
		}
	}

	return vals;
};

type Props = Omit<JSX.HTMLAttributes<HTMLFormElement>, "onSubmit"> & {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onSubit?: (data: any) => void | Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data?: { [key: string]: any };
};

export const Form: Component<Props> = (props) => {
	const [local, rest] = splitProps(props, ["onSubit", "data", "ref"]);
	let formRef: HTMLFormElement | undefined;

	onMount(() => {
		if (formRef && local.data) {
			setInitialValues(formRef, local.data);
		}
	});

	const handleSubmitForm: JSX.EventHandlerUnion<
		HTMLFormElement,
		SubmitEvent,
		JSX.EventHandler<HTMLFormElement, SubmitEvent>
	> = (e) => {
		e.preventDefault();
		const vals = getFormValues(e.currentTarget);

		local?.onSubit?.(vals);
		console.log(vals);
	};

	return (
		<form
			ref={(node) => {
				if (typeof local.ref === "function") {
					local.ref(node);
				} else {
					local.ref = node;
				}

				formRef = node;
			}}
			onSubmit={handleSubmitForm}
			{...rest}>
			{props.children}
		</form>
	);
};
