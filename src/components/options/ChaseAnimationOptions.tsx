import {AnimationState, ChaseAnimationState} from "../animation-state.ts";
import {NumberInput} from "../NumberInput.tsx";
import {Dispatch, Fragment, SetStateAction} from "react";
import {FormControl} from "@mui/base";
import {FormHelperText, FormLabel} from "@mui/material";
import {ReverseFormControl} from "./GenericAnimationOptions.tsx";

export default function ChaseAnimationOptions({state, setState}: {
  state?: ChaseAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <FormControl>
        <FormLabel>Size</FormLabel>
        <NumberInput value={state?.size ?? 0}
                     onChange={(_evt, value) => setState?.(prev => ({...prev, size: value} as AnimationState))}
                     placeholder="Enter size"
        />
        <FormHelperText>Number of pixels that turn on in a row.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Spacing</FormLabel>
        <NumberInput value={state?.spacing ?? 0}
                     onChange={(_evt, value) => setState?.(prev => ({...prev, spacing: value} as AnimationState))}
                     placeholder="Enter spacing"
        />
        <FormHelperText>Number of pixels that turn off in a row.</FormHelperText>
      </FormControl>
      <ReverseFormControl state={state} setState={setState}/>
    </Fragment>
  );
}