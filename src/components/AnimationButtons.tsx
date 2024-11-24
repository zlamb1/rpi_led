import {useState} from "react";
import Button from "@mui/material/Button";
import {twMerge} from "tailwind-merge";
import {CircularProgress} from "@mui/material";

export default function AnimationButtons({className, currentAnimation = '', onSetAnimation}: {
  className?: string;
  currentAnimation?: string,
  onSetAnimation?: (anim: string) => Promise<void>
}) {
  const [loadingAnimation, setLoadingAnimation] = useState<string | undefined>();

  const animations: string[] = [
    'Solid', 'Blink', 'Chase', 'Comet', 'Pulse', 'Rainbow',
    'Sparkle', 'Rainbow_Chase', 'Rainbow_Comet', 'Rainbow_Sparkle', 'Sparkle_Pulse'
  ];

  async function _onSetAnimation(anim: string) {
    setLoadingAnimation(anim);
    await onSetAnimation?.(anim);
    setLoadingAnimation(undefined);
  }

  return animations.map(anim =>
    <Button key={anim}
            className={twMerge("min-w-[200px]", className)}
            variant={anim?.toLowerCase?.() === currentAnimation?.toLowerCase?.() ? "contained" : "outlined"}
            onClick={() => _onSetAnimation(anim)}
            disabled={!!loadingAnimation}
    >
      {loadingAnimation === anim ? <CircularProgress size={20}/> : anim?.replaceAll?.('_', ' ')}
    </Button>
  );
}