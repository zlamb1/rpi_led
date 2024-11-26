import {Pause, PlayArrow} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {API_ENDPOINT, formatState} from "../api-helper.ts";
import {useContext} from "react";
import {
  ActiveAnimationState,
  AnimationState,
  isAnimationState,
  PossibleAnimationState
} from "../animation-state.ts";

export default function PlayButton() {
  const {setState} = useContext(ActiveAnimationState);
  const {state: possibleState} = useContext(PossibleAnimationState);

  const is_playing = possibleState?.is_playing;

  async function onClick() {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/${is_playing ? "pause" : "resume"}`, {
        method: "POST",
      });
      const newState = await res.json();
      if (isAnimationState(newState)) {
        formatState(newState);
        setState?.(newState as AnimationState);
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