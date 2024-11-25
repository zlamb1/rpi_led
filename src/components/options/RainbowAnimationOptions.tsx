import {AnimationState, RainbowAnimationState} from "../../animation-state.ts";
import {Dispatch, Fragment, SetStateAction} from "react";
import {NumericFormControl} from "./GenericAnimationOptions.tsx";

export default function RainbowAnimationOptions({state, setState}: {
  state?: RainbowAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <NumericFormControl property="period" label="Period" helperText="Time period to cycle the rainbow in seconds."
                          state={state}
                          setState={setState}/>
      <NumericFormControl property="steo" label="Step" helperText="The color wheel step."
                          state={state} setState={setState}/>
    </Fragment>
  );
}