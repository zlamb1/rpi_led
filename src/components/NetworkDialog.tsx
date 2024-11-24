import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";

export default function NetworkDialog({msg, show = false, onCancel, onRetry}: {
  msg: string;
  show?: boolean,
  onCancel?: () => void,
  onRetry?: () => void
}) {
  const [message, setMessage] = useState(msg);

  useEffect(() => {
    if (!msg) {
      // prevent error message from being removed before dialog closes
      setTimeout(() => setMessage(msg), 250);
    } else {
      setMessage(msg);
    }
  }, [msg]);

  return (
    <Dialog open={show}>
      <DialogTitle style={{color: 'red'}}>Network Error</DialogTitle>
      <DialogContent style={{color: 'red'}}>
        {message}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onRetry}>Retry</Button>
      </DialogActions>
    </Dialog>
  );
}