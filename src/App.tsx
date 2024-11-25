import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardHeader} from "@mui/material";
import NetworkDialog from "./components/NetworkDialog.tsx";
import AnimationButtons from "./components/AnimationButtons.tsx";
import AnimationOptions from "./components/AnimationOptions.tsx";
import {AnimationState, isAnimationState} from "./animation-state.ts";
import BottomAppBar from "./components/BottomAppBar.tsx";
import {AnimationProps, getAnimationValue, LED_ANIMATIONS} from "./animation-props.ts";
import {HexColorPicker} from "react-colorful";
import {API_ENDPOINT, formatState} from "./api-helper.ts";

async function api_animation(state?: AnimationState) {
  if (!state) return true;

  const formData = new FormData();

  for (const key of Object.keys(state)) {
    const value = state[key as keyof AnimationState];
    if (value) {
      if (typeof value === 'string') {
        formData.append(key, value);
      } else {
        const valueAsString = value.toString?.();
        if (valueAsString) {
          formData.append(key, valueAsString);
        }
      }
    }
  }

  const res = await fetch(`${API_ENDPOINT}/api/animation`, {
    body: formData,
    method: 'POST'
  });

  return res.json();
}

const defaultErrorMsg = 'A network error occurred while attempting to connect to the remote device.';

export default function App() {
  const [state, setAnimationState] = useState<AnimationState>();
  const [networkError, setNetworkError] = useState<string>('');
  const [counter, setCounter] = useState(1);

  // fetch active animation on load
  useEffect(() => {
    setNetworkError('');
    setTimeout(() => {
      fetch(`${API_ENDPOINT}/api/animation`, {method: 'GET'})
        .then(res => {
          res.json().then(data => {
            if (isAnimationState(data)) {
              formatState(data);
              setAnimationState(data as AnimationState);
            }
          }).catch(() => {
          });
        }).catch(() => setNetworkError(defaultErrorMsg));
    }, 250);
  }, [counter]);

  async function setAnimation() {
    try {
      const newState: unknown = await api_animation(state);
      if (isAnimationState(newState)) {
        formatState(newState);
        setAnimationState(newState as AnimationState);
      } else {
        setNetworkError('An internal server error occurred.');
      }
    } catch (err) {
      console.error(err);
      setNetworkError(defaultErrorMsg);
    }
  }

  const animationProps: AnimationProps | undefined = LED_ANIMATIONS.find(props => getAnimationValue(props)?.toLowerCase() === state?.animation_name?.toLowerCase());

  function renderColorPicker() {
    if (animationProps?.color) {
      return (
        <Card>
          <CardHeader title="Color" titleTypographyProps={{className: 'text-[1.25rem] font-bold'}}/>
          <CardContent>
            <HexColorPicker color={state?.color}
                            onChange={color => setAnimationState(prev => ({...prev, color} as AnimationState))}
            />
          </CardContent>
        </Card>
      )
    }
  }

  return (
    <Box className="flex flex-col items-center">
      <NetworkDialog msg={networkError}
                     show={!!networkError}
                     onCancel={() => setNetworkError('')}
                     onRetry={() => setCounter(prev => prev + 1)}/>
      <div className="w-full md:w-[90%] lg:w-[90%] flex flex-col gap-3 pb-16">
        <div className="w-full flex flex-col sm:flex-row justify-center gap-3">
          <Card className="p-3 w-[95%] sm:w-[50%] flex flex-col items-center lg:items-stretch">
            <CardHeader title="Animations" titleTypographyProps={{className: 'text-[1.25rem] font-bold'}}/>
            <CardContent className="pt-0 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1">
              <AnimationButtons className="flex-1"
                                state={state}
                                setState={setAnimationState}
              />
            </CardContent>
          </Card>
          <Card className="p-3 px-8 w-[95%] sm:w-[50%]">
            <CardHeader title={`Animation Options`}
                        titleTypographyProps={{className: 'text-[1.25rem] font-bold'}}/>
            <CardContent className="pt-0">
              <AnimationOptions state={state}
                                setState={setAnimationState}
                                onChangeSpeed={(speed: number) => setAnimationState(prev => ({
                                  ...prev,
                                  speed
                                } as AnimationState))}/>
            </CardContent>
          </Card>
        </div>
        {renderColorPicker()}
      </div>
      <BottomAppBar onSend={setAnimation}/>
    </Box>
  );
}