import {ChangeEvent, ComponentProps, Dispatch, SetStateAction} from "react";
import {TextField} from "@mui/material";

export type NumericInputProps = {
  value?: number;
  onChange?: Dispatch<SetStateAction<number>> | ((value: number) => void);
} & Omit<ComponentProps<typeof TextField>, "type">;

export default function NumericInput({value, onChange, ...props}: NumericInputProps) {
  function _onChange(evt: ChangeEvent<HTMLInputElement>) {
    const regex = /^(.*)$/;
    const _value = evt.target.value;
    if (regex.test(_value)) {
      onChange?.(Number(_value));
    }
  }

  return (
    <TextField {...props} value={value} onChange={_onChange} type="number"/>
  );
}