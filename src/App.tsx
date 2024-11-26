import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {Fragment, useEffect, useState} from 'react';
import {Box, Card, CardContent, CardHeader, Divider, FormHelperText, InputLabel, TextField} from "@mui/material";
import NetworkDialog from "./components/NetworkDialog.tsx";
import AnimationButtons from "./components/AnimationButtons.tsx";
import AnimationOptions from "./components/AnimationOptions.tsx";
import {
  ActiveAnimationState,
  AnimationState,
  AnimationStateSynced,
  isAnimationState,
  PossibleAnimationState
} from "./animation-state.ts";
import BottomAppBar from "./components/BottomAppBar.tsx";
import {AnimationProps, getAnimationValue, LED_ANIMATIONS} from "./animation-props.ts";
import {API_ENDPOINT, formatState} from "./api-helper.ts";
import {HexColorPicker} from "react-colorful";
import * as _ from "lodash";
import {FormControl} from "@mui/base";

const defaultErrorMsg = 'A network error occurred while attempting to connect to the remote device.';

export default function App() {
  const [state, setAnimationState] = useState<AnimationState>();
  const [possibleState, setPossibleState] = useState<AnimationState>();
  const [networkError, setNetworkError] = useState<string>('');
  const [counter, setCounter] = useState(1);

  const isSynced = _.isEqual(state, possibleState);

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

  useEffect(() => {
    setPossibleState(state);
  }, [state]);

  useEffect(() => {
    if (!isSynced) {
      if (_.isEqual({...possibleState, is_playing: state?.is_playing}, state)) {
        setPossibleState(state);
        return;
      }

      if (possibleState?.is_playing) {
        setPossibleState(prev => ({...prev, is_playing: false} as AnimationState));
      }
    }
  }, [state, isSynced, possibleState]);

  const animationProps: AnimationProps | undefined = LED_ANIMATIONS.find(
    props => getAnimationValue(props)?.toLowerCase() === possibleState?.animation_name?.toLowerCase()
  );

  return (
    <ActiveAnimationState.Provider value={{state, setState: setAnimationState}}>
      <PossibleAnimationState.Provider value={{state: possibleState, setState: setPossibleState}}>
        <AnimationStateSynced.Provider value={isSynced}>
          <Box className="flex flex-col items-center">
            <NetworkDialog msg={networkError}
                           show={!!networkError}
                           onCancel={() => setNetworkError('')}
                           onRetry={() => setCounter(prev => prev + 1)}/>
            <div className="w-full md:w-[90%] lg:w-[90%] flex flex-col gap-3 pb-16">
              <div className="w-full flex flex-col sm:flex-row justify-center gap-3">
                <Card className="p-3 w-[95%] sm:w-[50%] flex flex-col items-center lg:items-stretch">
                  <CardHeader title="Animations" titleTypographyProps={{className: 'text-[1.25rem] font-bold'}}/>
                  <CardContent className="pt-0 flex flex-col gap-3 items-center">
                    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1">
                      <AnimationButtons className="flex-1"/>
                    </div>
                    {
                      animationProps?.color &&
                      <Fragment>
                        <Divider className="w-full"/>
                        <div className="flex gap-3">
                          <HexColorPicker color={possibleState?.color}
                                          onChange={color => setPossibleState(prev => ({
                                            ...prev,
                                            color
                                          } as AnimationState))}/>
                          <FormControl>
                            <InputLabel>Color</InputLabel>
                            <TextField value={possibleState?.color ?? ''}/>
                            <FormHelperText>The color of the animation.</FormHelperText>
                          </FormControl>
                        </div>
                      </Fragment>
                    }
                  </CardContent>
                </Card>
                <Card className="p-3 px-8 w-[95%] sm:w-[50%]">
                  <CardHeader title={`Animation Options`}
                              titleTypographyProps={{className: 'text-[1.25rem] font-bold'}}/>
                  <CardContent className="pt-0">
                    <AnimationOptions onChangeSpeed={(speed: number) => setAnimationState(prev => ({
                      ...prev,
                      speed
                    } as AnimationState))}/>
                  </CardContent>
                </Card>
              </div>
            </div>
            <BottomAppBar/>
          </Box>
        </AnimationStateSynced.Provider>
      </PossibleAnimationState.Provider>
    </ActiveAnimationState.Provider>
  );
}