import {Alert, Collapse, IconButton} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AnimationStateSynced} from "../../animation-state.ts";
import {Close} from "@mui/icons-material";

export function PlayAlert({className}: {className?: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const isSynced = useContext(AnimationStateSynced);

  useEffect(() => {
    setIsOpen(!isSynced);
  }, [isSynced]);

  function action() {
    return (
      <IconButton aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setIsOpen(false)}>
        <Close fontSize="inherit"/>
      </IconButton>
    );
  }

  return (
    <Collapse className={className} in={isOpen}>
      <Alert severity="info" action={action()}>
        You have made changes to the active animation. Press play to update the animation.
      </Alert>
    </Collapse>
  )
}