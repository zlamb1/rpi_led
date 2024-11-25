export interface AnimationState {
  animation_name: string;
  speed: number;
  color: string;
}

export function isAnimationState(state: unknown) {
  return state instanceof Object && "animation_name" in state && "speed" in state;
}

export interface MultipleColorAnimationState extends AnimationState {
  colors: string[];
  /* index into colors array */
  start_color: number;
}

export type BlinkAnimationState = AnimationState;
export type SolidAnimationState = AnimationState;

export interface ChaseAnimationState extends AnimationState {
  /* number of pixels to turn on in a row. */
  size: number;
  /* number of pixels to turn off in a row */
  spacing: number;
  /* reverse direction */
  reverse: boolean;
}

export interface CometAnimationState extends AnimationState {
  /* background color */
  bg_color: string;
  /* length of the comet */
  tail_length: number;
  /* reverse direction */
  reverse: boolean;
  /* comet will bounce back and forth */
  /* note: bounce and ring are mutually exclusive */
  bounce: boolean;
  /* ring mode */
  ring: boolean;
}

export interface PulseAnimationState extends AnimationState {
  /* period to pulse LEDs */
  period: number;
  /* lowest brightness level */
  min_intensity: number;
  /* highest brightness level */
  max_intensity: number;
}

export interface RainbowAnimationState extends AnimationState {
  /* period to cycle the rainbow in seconds */
  period: number;
  /* color wheel step */
  step: number;
}

export interface SparkleAnimationState extends AnimationState {
  /* number of sparkles to generate per animation cycle */
  num_sparkles: number;
}

export type RainbowChaseAnimationState = ChaseAnimationState;

export type RainbowCometAnimationState = Omit<CometAnimationState, "color"> & {
  /* colorwheel step */
  step: number
};

export interface RainbowSparkleAnimationState extends Omit<SparkleAnimationState, "color"> {
  /* period to cycle the rainbow in seconds */
  period: number;
  /* colorwheel step */
  step: number;
  /* brightness of the background rainbow: 0.0 - 1.0 */
  background_brightness: number;
}

export type SparklePulseAnimationState = PulseAnimationState;