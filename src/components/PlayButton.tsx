import {Pause, PlayArrow} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {API_ENDPOINT, formatState} from "../api-helper.ts";
import {useContext} from "react";
import {
  ActiveAnimationState,
  AnimationState,
  AnimationStateSynced,
  isAnimationState,
  PossibleAnimationState
} from "../animation-state.ts";
import {setAnimation} from "../animation-api.ts";

export default function PlayButton() {
  const {state, setState} = useContext(ActiveAnimationState);
  const {state: possibleState} = useContext(PossibleAnimationState);
  const isSynced = useContext(AnimationStateSynced);

  const is_playing = possibleState?.is_playing;

  async function onClick() {
    try {
      if (isSynced) {
        const res = await fetch(`${API_ENDPOINT}/api/${state?.is_playing ? "pause" : "resume"}`, {
          method: "POST",
        });
        const newState = await res.json();
        if (isAnimationState(newState)) {
          formatState(newState);
          setState?.(newState as AnimationState);
        }
      } else {
        await setAnimation(possibleState, setState);
      }
    } catch (_) {
      /* empty */
    }
  }

  return (
    <IconButton className="bg-red-600" onClick={onClick}>
      {
        is_playing ? <Pause className="text-white"/> : <PlayArrow className="text-white"/>
      }
    </IconButton>
  );
}