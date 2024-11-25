import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader} from "@mui/material";
import NetworkDialog from "./components/NetworkDialog.tsx";
import AnimationButtons from "./components/AnimationButtons.tsx";
import AnimationOptions from "./components/AnimationOptions.tsx";

const API_ENDPOINT = 'http://raspberrypi.local:5000';

interface AnimationProps {
  animationName: string;
  color: string;
  speed: number;
}

async function api_animation({animationName, color, speed}: AnimationProps) {
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

const defaultErrorMsg = 'A network error occurred while attempting to connect to the remote device.';

export default function App() {
  const [animationName, setAnimationName] = useState<string | undefined>();
  const [speed, setSpeed] = useState<number>(0.1);
  const [networkError, setNetworkError] = useState<string>('');
  const [counter, setCounter] = useState(1);

  // fetch active animation on load
  useEffect(() => {
    setNetworkError('');
    setTimeout(() => {
      fetch(`${API_ENDPOINT}/api/animation`, {method: 'GET'})
        .then(res => {
          res.json().then(data => {
            if (data.animation_name) {
              setAnimationName(data.animation_name);
              setSpeed(parseFloat(data.speed));
            }
          }).catch(() => {
          });
        }).catch(() => setNetworkError(defaultErrorMsg));
    }, 250);
  }, [counter]);

  async function setAnimation(name: string) {
    try {
      const res: boolean = await api_animation({
        animationName: name?.toLowerCase?.() ?? 'solid',
        color: '#ffffff',
        speed
      });
      if (res) {
        setAnimationName(name);
      } else {
        setNetworkError('An internal server error occurred.');
      }
    } catch (err) {
      console.error(err);
      setNetworkError(defaultErrorMsg);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 py-3">
      <NetworkDialog msg={networkError}
                     show={!!networkError}
                     onCancel={() => setNetworkError('')}
                     onRetry={() => setCounter(prev => prev + 1)}/>
      <div className="w-full sm:w-[90%] lg:w-[90%] flex flex-col sm:flex-row justify-center gap-5">
        <Card className="p-3 flex flex-col items-center lg:items-stretch">
          <CardHeader title="Animations" titleTypographyProps={{className: 'text-[1.25rem] font-bold'}}/>
          <CardContent className="pt-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-fit gap-1">
            <AnimationButtons className="flex-1 w-[175px]"
                              currentAnimation={animationName}
                              onSetAnimation={setAnimation}
            />
          </CardContent>
        </Card>
        <Card className="p-3 px-8">
          <CardHeader title={`Speed: ${speed} sec`} titleTypographyProps={{className: 'text-[1.25rem] font-bold'}}/>
          <CardContent className="pt-0">
            <AnimationOptions speed={speed} onChangeSpeed={setSpeed}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}