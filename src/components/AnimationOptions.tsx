import {FormHelperText, FormLabel, Slider} from "@mui/material";
import {Dispatch, FunctionComponent, SetStateAction, useContext} from "react";
import CometAnimationOptions from "./options/CometAnimationOptions.tsx";
import {AnimationState, PossibleAnimationStateProvider} from "../animation-state.ts";
import ChaseAnimationOptions from "./options/ChaseAnimationOptions.tsx";
import {FormControl} from "@mui/base";
import Expand from "../Expand.tsx";
import PulseAnimationOptions from "./options/PulseAnimationOptions.tsx";
import RainbowAnimationOptions from "./options/RainbowAnimationOptions.tsx";
import SparkleAnimationOptions from "./options/SparkleAnimationOptions.tsx";
import RainbowCometAnimationOptions from "./options/RainbowCometAnimationOptions.tsx";
import RainbowSparkleAnimationOptions from "./options/RainbowSparkleAnimationOptions.tsx";
import GridRainAnimationOptions from "./options/GridRainAnimationOptions.tsx";

export interface AnimationOptionsProps {
  minSpeed?: number;
  maxSpeed?: number;
  speedStep?: number;
  onChangeSpeed?: Dispatch<SetStateAction<number>> | ((speed: number) => void);
}

export default function AnimationOptions({
                                           minSpeed = 0.01,
                                           maxSpeed = 5,
                                           speedStep = minSpeed,
                                         }: AnimationOptionsProps) {
  const {state, setState} = useContext(PossibleAnimationStateProvider);

  type OptionComponents = { [key: string]: FunctionComponent };
  const optionComponents: OptionComponents = {
    'chase': ChaseAnimationOptions,
    'comet': CometAnimationOptions,
    'pulse': PulseAnimationOptions,
    'rainbow': RainbowAnimationOptions,
    'sparkle': SparkleAnimationOptions,
    'rainbow_chase': ChaseAnimationOptions,
    'rainbow_comet': RainbowCometAnimationOptions,
    'rainbow_sparkle': RainbowSparkleAnimationOptions,
    'sparkle_pulse': SparkleAnimationOptions,
    'grid_rain': GridRainAnimationOptions,
  }

  return (
    <div className="flex flex-col gap-3">
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
      <Expand className="flex flex-col gap-5" initial={false}>
        {optionComponents[(state?.animation_name?.toLowerCase() ?? '') as keyof OptionComponents]?.({state, setState})}
      </Expand>
    </div>
  );
}