import {AnimationState, ChaseAnimationState} from "../../animation-state.ts";
import {Dispatch, Fragment, SetStateAction} from "react";
import {NumericFormControl, ReverseFormControl} from "./GenericAnimationOptions.tsx";

export default function ChaseAnimationOptions({state, setState}: {
  state?: ChaseAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <NumericFormControl property="size" label="Size" helperText="The number of pixels that turn on in a row" state={state} setState={setState} />
      <NumericFormControl property="spacing" label="Spacing" helperText="The number of pixels that turn off in a row" state={state} setState={setState} />
      <ReverseFormControl state={state} setState={setState}/>
    </Fragment>
  );
}