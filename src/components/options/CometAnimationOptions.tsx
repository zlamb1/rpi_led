import {AnimationState, CometAnimationState} from "../animation-state.ts";
import {NumberInput} from "../NumberInput.tsx";
import {ChangeEvent, Dispatch, Fragment, SetStateAction} from "react";
import {FormControl} from "@mui/base";
import {FormHelperText, FormLabel} from "@mui/material";
import Switch from "../Switch.tsx";

export default function CometAnimationOptions({state, setState}: {
  state?: CometAnimationState,
  setState?: Dispatch<SetStateAction<AnimationState | undefined>>
}) {
  return (
    <Fragment>
      <FormControl>
        <FormLabel>Tail Length</FormLabel>
        <NumberInput value={state?.tail_length}
                     onChange={(_evt, value) => setState?.(prev => ({...prev, tail_length: value} as AnimationState))}
                     placeholder="Enter tail length"
        />
      </FormControl>
      <FormControl>
        <div className="flex items-center gap-1">
          <FormLabel>Reverse</FormLabel>
          <Switch checked={state?.reverse ?? false}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setState?.(prev => ({
                    ...prev,
                    reverse: evt.target.checked
                  } as AnimationState))}/>
        </div>
        <FormHelperText>Reverse animation direction.</FormHelperText>
      </FormControl>
      <FormControl>
        <div className="flex items-center gap-1">
          <FormLabel>Bounce</FormLabel>
          <Switch checked={state?.bounce ?? false}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setState?.(prev => ({
                    ...prev,
                    bounce: evt.target.checked,
                    ring: false
                  } as AnimationState))}/>
        </div>
        <FormHelperText>Comet will bounce back and forth.</FormHelperText>
      </FormControl>
      <FormControl>
        <div className="flex items-center gap-1">
          <FormLabel>Ring</FormLabel>
          <Switch checked={state?.ring ?? false}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => setState?.(prev => ({
                    ...prev,
                    bounce: false,
                    ring: evt.target.checked
                  } as AnimationState))}/>
        </div>
        <FormHelperText>Comet will use ring mode.</FormHelperText>
      </FormControl>
    </Fragment>
  );
}