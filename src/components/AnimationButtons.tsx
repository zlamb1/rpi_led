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
    {label: 'Rainbow Chase', value: 'Rainbow_Chase'},
    {label: 'Rainbow Comet', value: 'Rainbow_Comet'},
    {label: 'Rainbow Sparkle', value: 'Rainbow_Sparkle'},
    {label: 'Sparkle Pulse', value: 'Sparkle_Pulse'},
    {label: 'Music'},
  ];

  function value(props: AnimationButtonProps) {
    return props.value ?? props.label;
  }

  async function _onSetAnimation(props: AnimationButtonProps) {
    setLoadingAnimation(props.label);
    await onSetAnimation?.(value(props));
    setLoadingAnimation(undefined);
  }

  return animations.map(props =>
    <Button key={value(props)}
            className={twMerge("min-w-[200px]", className)}
            variant={value(props)?.toLowerCase() === currentAnimation?.toLowerCase?.() ? "contained" : "outlined"}
            onClick={() => _onSetAnimation(props)}
            disabled={!!loadingAnimation}
    >
      {loadingAnimation === props.label ? <CircularProgress size={20}/> : props.label}
    </Button>
  );
}