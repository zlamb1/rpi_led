export interface AnimationProps {
  label: string;
  value?: string;
  color?: boolean;
}

export function getAnimationValue(props: AnimationProps) {
  return props.value ?? props.label;
}

export const LED_ANIMATIONS: AnimationProps[] = [
  {label: 'Solid', color: true},
  {label: 'Blink', color: true},
  {label: 'Chase', color: true},
  {label: 'Comet', color: true},
  {label: 'Pulse', color: true},
  {label: 'Rainbow'},
  {label: 'Sparkle', color: true},
  {label: 'Rainbow Chase', value: 'Rainbow_Chase'},
  {label: 'Rainbow Comet', value: 'Rainbow_Comet'},
  {label: 'Rainbow Sparkle', value: 'Rainbow_Sparkle'},
  {label: 'Sparkle Pulse', value: 'Sparkle_Pulse', color: true},
  {label: 'Grid Rain', value: 'Grid_Rain', color: true},
  {label: 'Music'},
];