import {AnimationState} from "../../animation-state.ts";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {FormControl} from "@mui/base";
import {FormHelperText, FormLabel} from "@mui/material";
import Switch from "../Switch.tsx";
import {NumberInput} from "../NumberInput.tsx";

export function ReverseFormControl({state, setState}: {
  state?: AnimationState & { reverse?: boolean },
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <FormControl>
      <div className="flex items-center gap-1">
        <FormLabel>Reverse</FormLabel>
        <Switch checked={state?.reverse ?? false}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => setState?.(prev => ({
                  ...prev,
                  reverse: evt.target.checked,
                } as AnimationState))}/>
      </div>
      <FormHelperText>Reverses animation direction.</FormHelperText>
    </FormControl>
  );
}

export function NumericFormControl({property, label, helperText, state, setState}: {
  property: string;
  label?: string;
  helperText?: string;
  state?: AnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>,
}) {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <NumberInput value={state?.[property as keyof AnimationState] as number ?? 0}
                   onChange={(_evt, value) => setState?.(prev => ({...prev, [property]: value} as AnimationState))}
                   placeholder={label && `Enter ${label.toLowerCase()}`}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}