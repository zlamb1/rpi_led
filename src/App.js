import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';

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
  function setAnimation(name) {
    api_animation({ animation_name: name?.toLowerCase?.() ?? 'solid', color: '#ffffff', speed: 1 });
  }

  const animations = [
    'Solid', 'Blink', 'Chase', 'Comet', 'Pulse', 'Rainbow',
    'Sparkle', 'Rainbow_Chase', 'Rainbow_Comet', 'Rainbow_Sparkle', 'Sparkle_Pulse'
  ];

  return (
    <div className="App">
      <header className="App-header">
        {
          animations.map(anim => <Button key={anim} className="Animation-btn" variant="contained" onClick={() => setAnimation(anim)}>{anim}</Button>)
        }
      </header>
    </div>
  );
}

export default App;
