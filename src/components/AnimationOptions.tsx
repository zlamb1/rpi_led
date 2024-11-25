import {Slider} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

export interface AnimationOptionsProps {
  minSpeed?: number;
  maxSpeed?: number;
  speedStep?: number;
  speed: number;
  onChangeSpeed?: Dispatch<SetStateAction<number>> | ((speed: number) => void);
}

export default function AnimationOptions({
                                           minSpeed = 0.1,
                                           maxSpeed = 5,
                                           speedStep = minSpeed,
                                           speed = minSpeed,
                                           onChangeSpeed
                                         }: AnimationOptionsProps) {
  return (
    <div>
      <Slider aria-label="Speed"
              value={speed}
              onChange={(_evt, value) => onChangeSpeed?.(Array.isArray(value) ? value[0] : value)}
              marks={[{value: minSpeed, label: `${minSpeed} sec`}, {value: maxSpeed, label: `${maxSpeed} sec`}]}
              min={minSpeed}
              max={maxSpeed}
              step={speedStep}
      />
    </div>
  );
}