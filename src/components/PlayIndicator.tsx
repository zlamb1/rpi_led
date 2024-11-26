import {Pause, PlayArrow} from "@mui/icons-material";
import {Fragment, useContext} from "react";
import {PossibleAnimationState} from "../animation-state.ts";

export default function PlayIndicator() {
  const {state: possibleState} = useContext(PossibleAnimationState);
  const is_playing = possibleState?.is_playing;

  return (
    <Fragment>
      {is_playing ? <Pause className="text-white"/> : <PlayArrow className="text-white"/>}
    </Fragment>
  );
}