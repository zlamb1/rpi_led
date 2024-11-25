import {AnimationState, PulseAnimationState} from "../../animation-state.ts";
import {Dispatch, Fragment, SetStateAction} from "react";
import {NumericFormControl} from "./GenericAnimationOptions.tsx";

export default function PulseAnimationOptions({state, setState}: {
  state?: PulseAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <NumericFormControl property="period" label="Period" helperText="Time period to pulse LEDs." state={state}
                          setState={setState}/>
      <NumericFormControl property="min_intensity" label="Minimum Intensity" helperText="Lowest brightness level."
                          state={state} setState={setState}/>
      <NumericFormControl property="max_intensity" label="Maximum Intensity" helperText="Highest brightness level."
                          state={state} setState={setState}/>
    </Fragment>
  );
}