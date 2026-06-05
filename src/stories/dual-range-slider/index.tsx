import { type Component, createMemo, createSignal, type JSX, mergeProps, onMount, splitProps } from "solid-js";
import styles from "./index.module.css";

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  name?: string;
  min?: number;
  max?: number;
  value?: [number, number];
};

export const DualRangeInput: Component<Props> = (props) => {
  const defaultProps = { min: 0, max: 100 };
  const p = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(p, ["ref", "min", "max", "value", "name"]);

  // Treat these as independent Slider A and Slider B
  const [valA, setValA] = createSignal(local.value?.[0] ?? 0);
  const [valB, setValB] = createSignal(local.value?.[1] ?? 0);

  let inputRef: HTMLInputElement | undefined;
  let fromSliderRef: HTMLInputElement | undefined;
  let toSliderRef: HTMLInputElement | undefined;

  onMount(() => {
    if (!inputRef) {
      return;
    }

    if (inputRef.defaultValue) {
      const val = inputRef.defaultValue.split(",").map((x) => Number.parseFloat(x)) as [number, number];

      if (fromSliderRef && toSliderRef) {
        setValA(val[0]);
        setValB(val[1]);
        fromSliderRef.value = val[0].toString();
        toSliderRef.value = val[1].toString();
      }
    } else if (fromSliderRef && toSliderRef && local.value) {
      setValA(local.value[0]);
      setValB(local.value[1]);
      fromSliderRef.value = local.value[0].toString();
      toSliderRef.value = local.value[1].toString();
    }

    const form = inputRef.closest("form");

    if (form) {
      form.addEventListener("reset", () => {
        if (local.value) {
          setValA(local.value[0]);
          setValB(local.value[1]);
        }

        if (inputRef) {
          const val = inputRef.defaultValue.split(",").map((x) => Number.parseFloat(x)) as [number, number];
          setValA(val[0]);
          setValB(val[1]);

          if (fromSliderRef && toSliderRef) {
            fromSliderRef.defaultValue = val[0].toString();
            toSliderRef.defaultValue = val[1].toString();
          }
        }
      });
    }
  });

  const handleFromInput: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent> = (e) => {
    setValA(+e.target.value);
  };

  const handleToInput: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent> = (e) => {
    setValB(+e.target.value);
  };

  const actualFrom = createMemo(() => Math.min(valA(), valB()));
  const actualTo = createMemo(() => Math.max(valA(), valB()));

  const fromPercent = createMemo(() => (actualFrom() / local.max) * 100);
  const toPercent = createMemo(() => (actualTo() / local.max) * 100);

  return (
    <div
      class={styles.sliderContainer}
      style={{
        "--from-value": `${fromPercent()}%`,
        "--to-value": `${toPercent()}%`,
      }}
    >
      <input
        type="range"
        onInput={handleFromInput}
        class={`${styles.rangeInput} ${styles.fromSlider}`}
        ref={fromSliderRef}
        min={local.min}
        max={local.max}
        {...rest}
      />
      <input
        type="range"
        class={`${styles.rangeInput} ${styles.toSlider}`}
        ref={toSliderRef}
        onInput={handleToInput}
        min={local.min}
        max={local.max}
        {...rest}
      />
      <input
        type="text"
        aria-hidden="true"
        value={`${actualFrom()},${actualTo()}`}
        style={{ display: "none" }}
        data-type="range-array"
        name={local.name}
        tabIndex={-1}
        ref={(node) => {
          if (typeof local.ref === "function") {
            local.ref(node);
          } else {
            local.ref = node;
          }
          inputRef = node;
        }}
      />
    </div>
  );
};
