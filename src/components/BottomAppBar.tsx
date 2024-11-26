import {AppBar, Fab, styled, Toolbar} from "@mui/material";
import PlayIndicator from "./PlayIndicator.tsx";
import {red} from "@mui/material/colors";
import {useContext} from "react";
import {
  ActiveAnimationState,
  AnimationState,
  AnimationStateSynced,
  isAnimationState,
  PossibleAnimationState
} from "../animation-state.ts";
import {API_ENDPOINT, formatState} from "../api-helper.ts";
import {setAnimation} from "../animation-api.ts";

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
  background: red[500],
  '&:hover': {
    background: red[600],
  },
});

export default function BottomAppBar() {
  const {state, setState} = useContext(ActiveAnimationState);
  const {state: possibleState} = useContext(PossibleAnimationState);
  const isSynced = useContext(AnimationStateSynced);

  async function onPlay() {
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
    <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
      <Toolbar>
        <StyledFab aria-label="play" onClick={onPlay}>
          <PlayIndicator/>
        </StyledFab>
      </Toolbar>
    </AppBar>
  );
}