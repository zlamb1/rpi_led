import {useContext} from "react";
import Button from "@mui/material/Button";
import {AnimationProps, getAnimationValue, LED_ANIMATIONS} from "../animation-props.ts";
import {
  ActiveAnimationState,
  AnimationState,
  AnimationStateSynced,
  isAnimationState,
  PossibleAnimationState
} from "../animation-state.ts";
import {API_ENDPOINT, formatState} from "../api-helper.ts";
import {twMerge} from "tailwind-merge";

export default function AnimationButtons({className}: {
  className?: string,
}) {
  const {state, setState} = useContext(ActiveAnimationState);
  const {state: possibleState, setState: setPossibleState} = useContext(PossibleAnimationState);
  const isSynced = useContext(AnimationStateSynced);

  async function onSetAnimation(props: AnimationProps) {
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

  return LED_ANIMATIONS.map(props => {
    const value = getAnimationValue(props)?.toLowerCase();
    const isActive = value === state?.animation_name?.toLowerCase?.();
    const isPossible = value === possibleState?.animation_name?.toLowerCase?.();
    return (
      <Button key={getAnimationValue(props)}
              className={twMerge("flex justify-start items-center gap-1", className)}
              color={!isSynced && isPossible ? 'secondary' : undefined}
              variant={isActive || isPossible
                ? "contained" : "outlined"
              }
              onClick={() => onSetAnimation(props)}
      >
        {props?.icon && <props.icon/>}
        {props.label}
      </Button>
    )
  });
}