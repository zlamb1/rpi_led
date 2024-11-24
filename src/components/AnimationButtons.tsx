import {ReactNode, useState} from "react";
import Button from "@mui/material/Button";
import {twMerge} from "tailwind-merge";
import {CircularProgress} from "@mui/material";

interface AnimationButtonProps {
  label: string;
  value?: string;
  icon?: ReactNode;
}

export default function AnimationButtons({className, currentAnimation = '', onSetAnimation}: {
  className?: string;
  currentAnimation?: string,
  onSetAnimation?: (anim: string) => Promise<void>
}) {
  const [loadingAnimation, setLoadingAnimation] = useState<string | undefined>();

  const animations: AnimationButtonProps[] = [
    {label: 'Solid'},
    {label: 'Blink'},
    {label: 'Chase'},
    {label: 'Comet'},
    {label: 'Pulse'},
    {label: 'Rainbow'},
    {label: 'Sparkle'},
    {label: 'Rainbow_Chase', value: 'RainbowChase'},
    {label: 'Rainbow_Comet', value: 'RainbowComet'},
    {label: 'Rainbow_Sparkle', value: 'RainbowSparkle'},
    {label: 'Sparkle_Pulse', value: 'SparklePulse'},
    {label: 'Music'},
  ];

  function value(props: AnimationButtonProps) {
    return props.value ?? props.label;
  }

  async function _onSetAnimation(anim: string) {
    setLoadingAnimation(anim);
    await onSetAnimation?.(anim);
    setLoadingAnimation(undefined);
  }

  return animations.map(props =>
    <Button key={value(props)}
            className={twMerge("min-w-[200px]", className)}
            variant={value(props)?.toLowerCase() === currentAnimation?.toLowerCase?.() ? "contained" : "outlined"}
            onClick={() => _onSetAnimation(value(props))}
            disabled={!!loadingAnimation}
    >
      {loadingAnimation === value(props) ? <CircularProgress size={20}/> : props.label.replaceAll?.('_', ' ')}
    </Button>
  );
}