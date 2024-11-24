import logo from './logo.svg';
import './App.css';

const API_ENDPOINT = '';

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
  function onClick() {
    api_animation({ animation_name: 'solid', color: '#ffffff', speed: 1 });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClick}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
