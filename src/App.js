import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {useEffect, useState} from 'react';

import Button from '@mui/material/Button';
import {Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography} from "@mui/material";

const API_ENDPOINT = 'http://raspberrypi.local:5000';

async function api_animation({ animation_name, color, speed }) {
  const formData = new FormData();
  formData.append('animation_name', animation_name);
  formData.append('color', color);
  formData.append('speed', speed);

  const res = await fetch(`${API_ENDPOINT}/api/animation`, {
    body: formData,
    method: 'POST'
  });

  return res.status === 200;
}

function App() {
  const [animationName, setAnimationName] = useState();
  const [speed, setSpeed] = useState(0.25);
  const [hasNetworkError, setNetworkError] = useState(false);
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
            }).catch(_ => {});
          }).catch(_ => setNetworkError(true));
    }, 250);
  }, [counter]);

  async function setAnimation(name) {
    try {
      const res = await api_animation({ animation_name: name?.toLowerCase?.() ?? 'solid', color: '#ffffff', speed });
      if (res.status >= 200 || res.status <= 299) {
        setAnimationName(name);
      }
    } catch (err) {
      console.error(err);
      setNetworkError(true);
    }
  }

  const animations = [
    'Solid', 'Blink', 'Chase', 'Comet', 'Pulse', 'Rainbow',
    'Sparkle', 'Rainbow_Chase', 'Rainbow_Comet', 'Rainbow_Sparkle', 'Sparkle_Pulse'
  ];

  return (
    <div className="App">
      <Dialog open={hasNetworkError}>
        <DialogTitle style={{ color: 'red' }}>Network Error</DialogTitle>
        <DialogContent style={{ color: 'red' }}>
          An error occurred while trying to connect to raspberrypi.local.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNetworkError(false)}>Cancel</Button>
          <Button onClick={() => setCounter(prev => prev + 1)}>Retry</Button>
        </DialogActions>
      </Dialog>
      <header className="App-header">
        <Typography>Speed</Typography>
        <Slider aria-label="Speed"
                style={{ width: 200 }}
                value={speed}
                onChange={(evt, value) => setSpeed(value)}
                valueLabelDisplay="on"
                min={0}
                max={5}
                step={0.01}
        />
        {
          animations.map(anim =>
              <Button key={anim}
                      className="Animation-btn"
                      variant={anim?.toLowerCase?.() === animationName?.toLowerCase?.() ? "contained" : "outlined"}
                      onClick={() => setAnimation(anim)}
              >
                {anim}
              </Button>
          )
        }
      </header>
    </div>
  );
}

export default App;
