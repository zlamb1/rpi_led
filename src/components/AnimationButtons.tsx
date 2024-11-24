import {ReactNode, useContext} from "react";
import Button from "@mui/material/Button";
import {AnimationProps, getAnimationValue, LED_ANIMATIONS} from "../animation-props.ts";
import {
  ActiveAnimationStateProvider,
  AnimationState,
  isAnimationState,
  PossibleAnimationStateProvider
} from "../animation-state.ts";
import {API_ENDPOINT, formatState} from "../api-helper.ts";

interface AnimationButtonProps {
  label: string;
  value?: string;
  icon?: ReactNode;
}

export default function AnimationButtons({className}: {
  className?: string,
}) {
  const {state, setState} = useContext(ActiveAnimationStateProvider);
  const {state: possibleState, setState: setPossibleState} = useContext(PossibleAnimationStateProvider);

  const animations: AnimationButtonProps[] = LED_ANIMATIONS.map((props: AnimationProps) => ({
    label: props.label,
    value: props?.value
  }));

  async function onSetAnimation(props: AnimationButtonProps) {
    const name = getAnimationValue(props);

    if (name.toLowerCase() === state?.animation_name?.toLowerCase() || name.toLowerCase() === possibleState?.animation_name?.toLowerCase()) {
      return setPossibleState?.(state);
    }

    setPossibleState?.(prev => ({...prev, animation_name: name} as AnimationState));
    // fetch default descriptor state
    if (name && setState) {
      fetch(`${API_ENDPOINT}/api/animation/descriptor/${name}`, {method: 'GET'})
        .then(res => {
          res.json().then(data => {
            if (isAnimationState(data)) {
              formatState(data);
              setPossibleState?.(data as AnimationState);
            }
          });
        });
    }
  }

  return animations.map(props => {
    const value = getAnimationValue(props)?.toLowerCase();
    const isActive = value === state?.animation_name?.toLowerCase?.();
    const isPossible = value === possibleState?.animation_name?.toLowerCase?.();
    return (
      <Button key={getAnimationValue(props)}
              className={className}
              color={!isActive && isPossible ? 'secondary' : undefined}
              variant={isActive || isPossible
                ? "contained" : "outlined"
              }
              onClick={() => onSetAnimation(props)}
      >
        {props.label}
      </Button>
    )
  });
}