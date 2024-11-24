import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

export default function NetworkDialog({show = false, onCancel, onRetry}: {
  show?: boolean,
  onCancel?: () => void,
  onRetry?: () => void
}) {
  return (
    <Dialog open={show}>
      <DialogTitle style={{color: 'red'}}>Network Error</DialogTitle>
      <DialogContent style={{color: 'red'}}>
        An error occurred while trying to connect to raspberrypi.local.
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onRetry}>Retry</Button>
      </DialogActions>
    </Dialog>
  );
}