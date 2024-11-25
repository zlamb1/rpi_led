import {AnimationState, GridRainAnimationState} from "../../animation-state.ts";
import {Dispatch, Fragment, SetStateAction} from "react";
import {NumericFormControl} from "./GenericAnimationOptions.tsx";

export default function GridRainAnimationOptions({state, setState}: {
  state?: GridRainAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <NumericFormControl property="count" label="Count"
                          helperText="Number of sparkles to generate per animation cycle."
                          state={state}
                          setState={setState}/>
      <NumericFormControl property="length" label="Length" helperText="The number of pixels per rain drop."
                          state={state} setState={setState}/>
    </Fragment>
  );
}