import {AnimationState, RainbowSparkleAnimationState, SparkleAnimationState} from "../../animation-state.ts";
import {Dispatch, Fragment, SetStateAction} from "react";
import {NumericFormControl} from "./GenericAnimationOptions.tsx";
import SparkleAnimationOptions from "./SparkleAnimationOptions.tsx";

export default function RainbowSparkleAnimationOptions({state, setState}: {
  state?: RainbowSparkleAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <SparkleAnimationOptions state={state as unknown as SparkleAnimationState} setState={setState}/>
      <NumericFormControl property="period" label="Period" helperText="The period to cycle the rainbow in seconds."
                          state={state}
                          setState={setState}/>
      <NumericFormControl property="step" label="Step" helperText="The color wheel step."
                          state={state}
                          setState={setState}/>
      <NumericFormControl property="background_brightness" label="Background Brightness"
                          helperText="The brightness of the background rainbow."
                          state={state}
                          setState={setState}/>
    </Fragment>
  );
}