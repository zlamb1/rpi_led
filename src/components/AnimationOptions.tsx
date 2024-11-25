import {FormHelperText, FormLabel, Slider} from "@mui/material";
import {Dispatch, ReactNode, SetStateAction} from "react";
import CometAnimationOptions from "./options/CometAnimationOptions.tsx";
import {AnimationState, ChaseAnimationState, CometAnimationState} from "../animation-state.ts";
import ChaseAnimationOptions from "./options/ChaseAnimationOptions.tsx";
import {FormControl} from "@mui/base";
import Expand from "../Expand.tsx";

export interface AnimationOptionsProps {
  state?: AnimationState;
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>;
  minSpeed?: number;
  maxSpeed?: number;
  speedStep?: number;
  onChangeSpeed?: Dispatch<SetStateAction<number>> | ((speed: number) => void);
}

export default function AnimationOptions({
                                           state,
                                           setState,
                                           minSpeed = 0.1,
                                           maxSpeed = 5,
                                           speedStep = minSpeed,
                                         }: AnimationOptionsProps) {
  let optionsComponent: ReactNode;

  switch (state?.animation_name?.toLowerCase()) {
    case 'chase':
      optionsComponent = ChaseAnimationOptions({state: state as ChaseAnimationState, setState});
      break;
    case 'comet':
      optionsComponent = CometAnimationOptions({state: state as CometAnimationState, setState});
      break;
  }

  return (
    <div className="flex flex-col gap-5">
      <FormControl>
        <FormLabel>Speed</FormLabel>
        <Slider aria-label="Speed"
                value={state?.speed ?? minSpeed}
                onChange={(_evt, value) => setState?.(prev => ({
                  ...prev,
                  speed: Array.isArray(value) ? value[0] : value
                } as AnimationState))}
                marks={[{value: minSpeed, label: `${minSpeed} sec`}, {value: maxSpeed, label: `${maxSpeed} sec`}]}
                min={minSpeed}
                max={maxSpeed}
                step={speedStep}
        />
        <FormHelperText>The speed in seconds of the animation.</FormHelperText>
      </FormControl>
      <Expand initial={false}>
        {optionsComponent}
      </Expand>
    </div>
  );
}