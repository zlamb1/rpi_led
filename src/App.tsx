import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {useEffect, useState} from 'react';

import Button from '@mui/material/Button';
import {CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography} from "@mui/material";

const API_ENDPOINT = 'http://raspberrypi.local:5000';

interface AnimationProps {
  animationName: string;
  color: string;
  speed: number;
}

async function api_animation({ animationName, color, speed }: AnimationProps) {
  const formData = new FormData();
  formData.append('animation_name', animationName);
  formData.append('color', color);
  formData.append('speed', speed?.toString?.());

  const res = await fetch(`${API_ENDPOINT}/api/animation`, {
    body: formData,
    method: 'POST'
  });

  return res.status === 200;
}

export function NetworkDialog({ show = false, onCancel, onRetry }: { show?: boolean, onCancel?: () => void, onRetry?: () => void }) {
  return (
      <Dialog open={show}>
        <DialogTitle style={{ color: 'red' }}>Network Error</DialogTitle>
        <DialogContent style={{ color: 'red' }}>
          An error occurred while trying to connect to raspberrypi.local.
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onRetry}>Retry</Button>
        </DialogActions>
      </Dialog>
  );
}

export function AnimationButtons({ currentAnimation = '', onSetAnimation }: { currentAnimation?: string, onSetAnimation?: (anim: string) => Promise<void> }) {
  const [loadingAnimation, setLoadingAnimation] = useState<string | undefined>();

  const animations: string[] = [
    'Solid', 'Blink', 'Chase', 'Comet', 'Pulse', 'Rainbow',
    'Sparkle', 'Rainbow_Chase', 'Rainbow_Comet', 'Rainbow_Sparkle', 'Sparkle_Pulse'
  ];

  async function _onSetAnimation(anim: string) {
    setLoadingAnimation(anim);
    await onSetAnimation?.(anim);
    setLoadingAnimation(undefined);
  }

  return animations.map(anim =>
      <Button key={anim}
              className="min-w-[200px]"
              variant={anim?.toLowerCase?.() === currentAnimation?.toLowerCase?.() ? "contained" : "outlined"}
              onClick={() => _onSetAnimation(anim)}
              disabled={!!loadingAnimation}
      >
        {loadingAnimation === anim ? <CircularProgress size={20} /> : anim}
      </Button>
  );
}

function App() {
  const [animationName, setAnimationName] = useState<string | undefined>();
  const [speed, setSpeed] = useState(0.25);
  const [hasNetworkError, setNetworkError] = useState<boolean>(false);
  const [counter, setCounter] = useState(1);

  // fetch active animation on load
  useEffect(() => {
    setNetworkError(false);
    setTimeout(() => {
      fetch(`${API_ENDPOINT}/api/animation`, { method: 'GET' })
          .then(res => {
            res.json().then(data => {
              if (data.animation_name) {
                setAnimationName(data.animation_name);
              }
            }).catch(() => {});
          }).catch(() => setNetworkError(true));
    }, 250);
  }, [counter]);

  async function setAnimation(name: string) {
    try {
      const res: boolean = await api_animation({ animationName: name?.toLowerCase?.() ?? 'solid', color: '#ffffff', speed });
      if (res) {
        setAnimationName(name);
      }
    } catch (err) {
      console.error(err);
      setNetworkError(true);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <NetworkDialog show={hasNetworkError} onCancel={() => setNetworkError(false)} onRetry={() => setCounter(prev => prev + 1)} />
      <Typography>Speed</Typography>
      <Slider aria-label="Speed"
              style={{ width: 200 }}
              value={speed}
              onChange={(_evt, value) => setSpeed(Array.isArray(value) ? value[0] : value)}
              valueLabelDisplay="on"
              min={0}
              max={5}
              step={0.01}
      />
      <AnimationButtons currentAnimation={animationName} onSetAnimation={setAnimation} />
    </div>
  );
}

export default App;
