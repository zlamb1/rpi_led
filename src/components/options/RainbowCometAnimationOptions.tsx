import {AnimationState, CometAnimationState, RainbowCometAnimationState} from "../../animation-state.ts";
import {Dispatch, Fragment, SetStateAction} from "react";
import {NumericFormControl} from "./GenericAnimationOptions.tsx";
import CometAnimationOptions from "./CometAnimationOptions.tsx";

export default function RainbowCometAnimationOptions({state, setState}: {
  state?: RainbowCometAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <CometAnimationOptions state={state as unknown as CometAnimationState} setState={setState}/>
      <NumericFormControl property="step" label="Step" helperText="The color wheel step."
                          state={state}
                          setState={setState}/>
    </Fragment>
  );
}