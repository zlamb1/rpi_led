import {Dispatch, ReactNode, SetStateAction} from "react";
import Button from "@mui/material/Button";
import {AnimationProps, getAnimationValue, LED_ANIMATIONS} from "../animation-props.ts";
import {AnimationState, isAnimationState} from "../animation-state.ts";
import {API_ENDPOINT, formatState} from "../api-helper.ts";

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

  async function onSetAnimation(props: AnimationButtonProps) {
    const name = getAnimationValue(props);

    if (name.toLowerCase() !== state?.animation_name?.toLowerCase()) {
      setState?.(prev => ({...prev, animation_name: name} as AnimationState));
      // fetch default descriptor state
      if (name && setState) {
        fetch(`${API_ENDPOINT}/api/animation/descriptor/${name}`, {method: 'GET'})
          .then(res => {
            res.json().then(data => {
              if (isAnimationState(data)) {
                formatState(data);
                setState(data as AnimationState);
              }
            });
          });
      }
    }
  }

  return animations.map(props =>
    <Button key={getAnimationValue(props)}
            className={className}
            variant={getAnimationValue(props)?.toLowerCase() === state?.animation_name?.toLowerCase?.() ? "contained" : "outlined"}
            onClick={() => onSetAnimation(props)}
    >
      {props.label}
    </Button>
  );
}