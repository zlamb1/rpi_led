import {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import {styled} from "@mui/material";
import {numberInputClasses} from "@mui/base/Unstable_NumberInput";
import {blue, grey} from "@mui/material/colors";
import usePrevious from "./usePrevious.ts";

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

const StyledButton = styled('button')(
  ({theme}) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  }

  &:hover {
    cursor: pointer;
    color: #FFF;
    background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`,
);

function getDecimalPlaces(value?: string | number) {
  if (value == null) {
    return 0;
  }

  if (typeof value === 'string') {
    value = Number(value);
    if (isNaN(value)) {
      return 0;
    }
  }

  const asString = value.toString();
  const index = asString.indexOf('.');

  if (index > -1) {
    return asString.length - index - 1;
  }

  return 0;
}

export type NumericInputProps = {
  value?: number;
  onChange?: Dispatch<SetStateAction<number | undefined>> | ((value?: number) => void);
  min?: number;
  max?: number;
  step?: number | string;
  stepOnScroll?: boolean;
} & Omit<Omit<ComponentProps<'input'>, "type">, "onChange">;

// TODO: implement step="any" behavior
export default function NumericInput({
                                       value,
                                       onChange,
                                       min = -Infinity,
                                       max = Infinity,
                                       stepOnScroll = true,
                                       ...props
                                     }: NumericInputProps) {
  const precision = getDecimalPlaces(props?.step);
  const step = typeof props?.step === 'string' ?
    (props?.step === 'any' ? props?.step : 1) : (props?.step ?? 1);
  const [text, setText] = useState(value?.toFixed?.(precision) ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const textAsNumber = Number(text);

  // previous state
  const previousText = usePrevious(text);
  const previousValue = usePrevious(value);
  const previousPrecision = usePrevious(precision);

  const isNear = useCallback((x1: number, x2: number) => {
    if (step === 'any') {
      return x1 === x2;
    }

    const epsilon = 0.0000001;
    return Math.abs(x1 - x2) < step - epsilon;
  }, [step]);

  const setValue = useCallback((_value?: number | string) => {
    if (_value == null || _value === '') {
      return onChange?.(undefined);
    }

    if (_value === '.') {
      return onChange?.(0);
    }

    if (typeof _value === 'string') {
      _value = Number(_value);
    }

    _value = Math.max(Math.min(_value, max), min);

    if (value == null) {
      return onChange?.(_value);
    }

    if (!isNear(value, _value)) {
      onChange?.(_value);
    }
  }, [value, onChange, min, max, isNear]);

  useEffect(() => {
    if (previousValue !== value || previousPrecision !== precision) {
      if (value == null) {
        setText('');
        return;
      }

      if (!isNear(textAsNumber, value)) {
        setText(value?.toFixed?.(precision) ?? '');
      }
    }
  }, [precision, value, isNear, textAsNumber, previousValue, previousPrecision]);

  useEffect(() => {
    if (text !== previousText) {
      const debounce = 250;
      const id = setTimeout(() => setValue(text), debounce);
      return () => clearTimeout(id);
    }
  }, [text, previousText, setValue]);

  function onTextChange(evt: ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    const occurrences = step === 'any' ? '+' : `{0,${precision}}`
    const regex = new RegExp(`^([0-9]+)?(.([0-9]${occurrences})?)?$`, 'g');
    if (!value || regex.test(value)) {
      setText(value);
    }
  }

  const onWheel = useCallback((evt: WheelEvent) => {
    if (typeof step == 'number') {
      evt.preventDefault();
      setValue(value == null ? step : value + (evt.deltaY > 0 ? -step : step))
    }
  }, [setValue, step, value]);

  const onPaste = useCallback((evt: ClipboardEvent) => {
    const input = inputRef.current;
    if (evt?.clipboardData && input) {
      evt.preventDefault();
      const data = evt.clipboardData.getData('text');
      const start = input.selectionStart, end = input.selectionEnd, len = text.length;
      const newText = text?.substring(0, start!) + data + text?.substring(end! + 1, len);

      if (/^([0-9]+(.[0-9]+)?)?$/.test(newText)) {
        const indexOf = newText.indexOf('.');
        if (indexOf > -1) {
          setText(newText.substring(0, indexOf + precision + 1));
        } else {
          setText(newText);
        }
      }
    }
  }, [text, precision]);

  useEffect(() => {
    if (divRef.current && stepOnScroll) {
      const div = divRef.current;
      div.addEventListener('wheel', onWheel);
      return () => div.removeEventListener('wheel', onWheel);
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      input.addEventListener('paste', onPaste);
      return () => input.removeEventListener('paste', onPaste);
    }
  });

  return (
    <StyledInputRoot ref={divRef}>
      {
        step !== 'any' &&
        <Fragment>
          <StyledButton onClick={() => setValue(value == null ? step : value + step)}>
            ▴
          </StyledButton>
          <StyledButton onClick={() => setValue(value == null ? step : value - step)}>
            ▾
          </StyledButton>
        </Fragment>
      }
      <StyledInputElement {...props} value={text} onChange={onTextChange} inputMode="decimal" ref={inputRef}
                          type="text"/>
    </StyledInputRoot>
  );
}