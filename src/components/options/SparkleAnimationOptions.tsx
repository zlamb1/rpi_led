import {AnimationState, SparkleAnimationState} from "../../animation-state.ts";
import {Dispatch, Fragment, SetStateAction} from "react";
import {NumericFormControl} from "./GenericAnimationOptions.tsx";

export default function SparkleAnimationOptions({state, setState}: {
  state?: SparkleAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <NumericFormControl property="num_sparkles" label="Number of Sparkles"
                          helperText="The number of sparkles to generate per animation cycle."
                          state={state}
                          setState={setState}/>
    </Fragment>
  );
}