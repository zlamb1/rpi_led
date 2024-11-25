import {NumberInputProps, Unstable_NumberInput as BaseNumberInput} from '@mui/base/Unstable_NumberInput';
import {ForwardedRef, forwardRef} from "react";

export const NumberInput = forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      slotProps={{
        incrementButton: {
          children: '▴',
        },
        decrementButton: {
          children: '▾',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});