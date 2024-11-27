import {ChangeEvent, ComponentProps, Dispatch, SetStateAction, useState} from "react";
import {styled} from "@mui/material";
import {numberInputClasses} from "@mui/base/Unstable_NumberInput";
import {blue, grey} from "@mui/material/colors";

const StyledInputRoot = styled('div')(
  ({theme}) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
  ({theme}) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

export type NumericInputProps = {
  value?: number;
  onChange?: Dispatch<SetStateAction<number | undefined>> | ((value?: number) => void);
  min?: number;
  max?: number;
  step?: number;
} & Omit<Omit<ComponentProps<'input'>, "type">, "onChange">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NumericInput({value, onChange, min, max, ...props}: NumericInputProps) {
  const [text, setText] = useState<string>('');

  function _onChange(evt: ChangeEvent<HTMLInputElement>) {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    let _value = evt.target.value;
    if (_value?.substring?.(_value?.length - 1) === '.') {
      _value += '0';
    }
    if (regex.test(_value)) {
      setText(_value);
      let asNumber = parseFloat(_value);
      if (min != null) asNumber = Math.max(asNumber, min);
      if (max != null) asNumber = Math.min(asNumber, max);
      onChange?.(asNumber);
    }
    if (!_value) {
      onChange?.(undefined);
    }
  }

  return (
    <StyledInputRoot>
      <StyledInputElement {...props} value={text ?? ''} onChange={_onChange} type="text" inputMode="decimal"/>
    </StyledInputRoot>
  );
}