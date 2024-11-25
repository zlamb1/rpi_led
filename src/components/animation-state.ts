export interface AnimationState {
  animation_name: string;
  speed: number;
}

export interface SingleColorAnimationState extends AnimationState {
  color: string;
}

export interface MultipleColorAnimationState extends AnimationState {
  colors: string[];
  /* index into colors array */
  start_color: number;
}

export type BlinkAnimationState = SingleColorAnimationState;
export type SolidAnimationState = SingleColorAnimationState;

export interface ChaseAnimationState extends SingleColorAnimationState {
  /* number of pixels to turn on in a row. */
  size: number;
  /* number of pixels to turn off in a row */
  spacing: number;
  /* reverse direction */
  reverse: boolean;
}

export interface CometAnimationState extends SingleColorAnimationState {
  /* background color */
  bg_color: string;
  /* length of the comet */
  tail_length: number;
  /* reverse direction */
  reverse: boolean;
  /* comet will bounce back and forth */
  bounce: boolean;
  /* ring mode */
  ring: boolean;
}

export interface PulseAnimationState extends SingleColorAnimationState {
  /* period to pulse LEDs */
  period: number;
  /* duration to hold min/max intensity */
  breath: number;
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

export interface SparkleAnimationState extends SingleColorAnimationState {
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