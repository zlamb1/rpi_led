import {Dispatch, ReactNode, SetStateAction} from "react";
import Button from "@mui/material/Button";
import {twMerge} from "tailwind-merge";
import {AnimationProps, LED_ANIMATIONS} from "../animation-props.ts";
import {AnimationState} from "./animation-state.ts";

interface AnimationButtonProps {
  label: string;
  value?: string;
  icon?: ReactNode;
}

export default function AnimationButtons({className, state, setState}: {
  className?: string,
  state?: AnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>,
}) {
  const animations: AnimationButtonProps[] = LED_ANIMATIONS.map((props: AnimationProps) => ({
    label: props.label,
    value: props?.value
  }));

  function value(props: AnimationButtonProps) {
    return props.value ?? props.label;
  }

  async function _onSetAnimation(props: AnimationButtonProps) {
    setState?.(prev => ({...prev, animation_name: value(props)} as AnimationState));
  }

  return animations.map(props =>
    <Button key={value(props)}
            className={twMerge("min-w-[200px]", className)}
            variant={value(props)?.toLowerCase() === state?.animation_name?.toLowerCase?.() ? "contained" : "outlined"}
            onClick={() => _onSetAnimation(props)}
    >
      {props.label}
    </Button>
  );
}