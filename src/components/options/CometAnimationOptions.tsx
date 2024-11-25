import {AnimationState, CometAnimationState} from "../../animation-state.ts";
import {ChangeEvent, Dispatch, Fragment, SetStateAction} from "react";
import {FormControl} from "@mui/base";
import {FormHelperText, FormLabel} from "@mui/material";
import Switch from "../Switch.tsx";
import {NumericFormControl, ReverseFormControl} from "./GenericAnimationOptions.tsx";

export default function CometAnimationOptions({state, setState}: {
  state?: CometAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <NumericFormControl property="tail_length" label="Tail Length" helperText="The length of the comet." state={state}
                          setState={setState}/>
      <ReverseFormControl state={state} setState={setState}/>
      <FormControl>
        <div className="flex items-center gap-1">
          <FormLabel>Bounce</FormLabel>
          <Switch checked={state?.bounce ?? false}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setState?.(prev => ({
                    ...prev,
                    bounce: evt.target.checked,
                    ring: false
                  } as AnimationState))}/>
        </div>
        <FormHelperText>Comet will bounce back and forth.</FormHelperText>
      </FormControl>
      <FormControl>
        <div className="flex items-center gap-1">
          <FormLabel>Ring</FormLabel>
          <Switch checked={state?.ring ?? false}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setState?.(prev => ({
                    ...prev,
                    bounce: false,
                    ring: evt.target.checked
                  } as AnimationState))}/>
        </div>
        <FormHelperText>Comet will use ring mode.</FormHelperText>
      </FormControl>
    </Fragment>
  );
}