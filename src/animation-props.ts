export interface AnimationProps {
  label: string;
  value?: string;
}

export const LED_ANIMATIONS: AnimationProps[] = [
  {label: 'Solid'},
  {label: 'Blink'},
  {label: 'Chase'},
  {label: 'Comet'},
  {label: 'Pulse'},
  {label: 'Rainbow'},
  {label: 'Sparkle'},
  {label: 'Rainbow Chase', value: 'Rainbow_Chase'},
  {label: 'Rainbow Comet', value: 'Rainbow_Comet'},
  {label: 'Rainbow Sparkle', value: 'Rainbow_Sparkle'},
  {label: 'Sparkle Pulse', value: 'Sparkle_Pulse'},
  {label: 'Music'},
];