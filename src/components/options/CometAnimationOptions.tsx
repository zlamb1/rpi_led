import {AnimationState, CometAnimationState} from "../animation-state.ts";
import {NumberInput} from "../NumberInput.tsx";
import {ChangeEvent, Dispatch, Fragment, SetStateAction} from "react";
import {FormControl, Switch} from "@mui/base";
import {FormHelperText, FormLabel} from "@mui/material";

export default function CometAnimationOptions({state, setState}: {
  state: CometAnimationState,
  setState: Dispatch<SetStateAction<AnimationState>>
}) {
  return (
    <Fragment>
      <FormControl>
        <FormLabel>Tail Length</FormLabel>
        <NumberInput value={state?.tail_length}
                     onChange={(_evt, value) => setState(prev => ({...prev, tail_length: value}))}
                     placeholder="Enter tail length"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Reverse</FormLabel>
        <Switch checked={state?.reverse} onChange={(evt: ChangeEvent<HTMLInputElement>) => setState(prev => ({
          ...prev,
          reverse: evt.target.checked
        }))}/>
        <FormHelperText>Reverse animation direction.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Reverse</FormLabel>
        <Switch checked={state?.reverse} onChange={(evt: ChangeEvent<HTMLInputElement>) => setState(prev => ({
          ...prev,
          reverse: evt.target.checked
        }))}/>
        <FormHelperText>Reverse animation direction.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Bounce</FormLabel>
        <Switch checked={state?.bounce} onChange={(evt: ChangeEvent<HTMLInputElement>) => setState(prev => ({
          ...prev,
          bounce: evt.target.checked
        }))}/>
        <FormHelperText>Comet will bounce back and forth.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Ring</FormLabel>
        <Switch checked={state?.ring} onChange={(evt: ChangeEvent<HTMLInputElement>) => setState(prev => ({
          ...prev,
          bounce: evt.target.checked
        }))}/>
        <FormHelperText>Comet will use ring mode.</FormHelperText>
      </FormControl>
    </Fragment>
  );
}