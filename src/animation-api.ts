import {AnimationState, isAnimationState} from "./animation-state.ts";
import {API_ENDPOINT, formatState} from "./api-helper.ts";
import {Dispatch, SetStateAction} from "react";

async function api_animation(state?: AnimationState) {
  if (!state) return true;

  const formData = new FormData();

  for (const key of Object.keys(state)) {
    const value = state[key as keyof AnimationState];
    if (value) {
      if (typeof value === 'string') {
        formData.append(key, value);
      } else {
        const valueAsString = value.toString?.();
        if (valueAsString) {
          formData.append(key, valueAsString);
        }
      }
    }
  }

  const res = await fetch(`${API_ENDPOINT}/api/animation`, {
    body: formData,
    method: 'POST'
  });

  return res.json();
}

export async function setAnimation(state?: AnimationState, setState?: Dispatch<SetStateAction<AnimationState | undefined>>) {
  try {
    const newState: unknown = await api_animation(state);
    if (isAnimationState(newState)) {
      formatState(newState);
      setState?.(newState as AnimationState);
    }
  } catch (err) {
    console.error(err);
  }
}