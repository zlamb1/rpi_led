import {ReactNode, useState} from "react";
import Button from "@mui/material/Button";
import {twMerge} from "tailwind-merge";
import {CircularProgress} from "@mui/material";
import {AnimationProps, LED_ANIMATIONS} from "../animation-props.ts";

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

  const animations: AnimationButtonProps[] = LED_ANIMATIONS.map((props: AnimationProps) => ({
    label: props.label,
    value: props?.value
  }));

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