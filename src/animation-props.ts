import {
  AutoAwesome,
  CleaningServices,
  Equalizer,
  Looks,
  RadioButtonUnchecked,
  Rectangle,
  Rocket,
  Schedule,
  Visibility,
  WaterDrop
} from "@mui/icons-material";
import {FunctionComponent} from "react";

export interface AnimationProps {
  label: string;
  value?: string;
  color?: boolean;
  icon?: FunctionComponent;
}

export function getAnimationValue(props: AnimationProps) {
  return props.value ?? props.label;
}

export const LED_ANIMATIONS: AnimationProps[] = [
  {label: 'Solid', color: true, icon: Rectangle},
  {label: 'Blink', color: true, icon: Visibility},
  {label: 'Chase', color: true, icon: RadioButtonUnchecked},
  {label: 'Comet', color: true, icon: Rocket},
  {label: 'Pulse', color: true, icon: Schedule},
  {label: 'Rainbow', icon: Looks},
  {label: 'Sparkle', color: true, icon: AutoAwesome},
  {label: 'Rainbow Chase', value: 'Rainbow_Chase', icon: RadioButtonUnchecked},
  {label: 'Rainbow Comet', value: 'Rainbow_Comet', icon: Rocket},
  {label: 'Rainbow Sparkle', value: 'Rainbow_Sparkle', icon: AutoAwesome},
  {label: 'Sparkle Pulse', value: 'Sparkle_Pulse', color: true, icon: AutoAwesome},
  {label: 'Grid Rain', value: 'Grid_Rain', color: true, icon: WaterDrop},
  {label: 'Sweep', color: true, icon: CleaningServices},
  {label: 'Music', icon: Equalizer},
];