import {AppBar, Fab, styled, Toolbar} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar({onSend}: { onSend?: () => void }) {
  return (
    <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
      <Toolbar>
        <StyledFab color="secondary" aria-label="add" onClick={onSend}>
          <SendIcon/>
        </StyledFab>
      </Toolbar>
    </AppBar>
  );
}