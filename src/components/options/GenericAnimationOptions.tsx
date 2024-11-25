import {AnimationState} from "../animation-state.ts";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {FormControl} from "@mui/base";
import {FormHelperText, FormLabel} from "@mui/material";
import Switch from "../Switch.tsx";

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