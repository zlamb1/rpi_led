export const API_ENDPOINT = 'http://raspberrypi.local:5000';

export function hexFromArray(array: unknown) {
  if (!Array.isArray(array) || array.length < 3) {
    throw new Error('Cannot parse hex value without three components.');
  }

  let str = '#';
  for (let i = 0; i < 3; i++) {
    const hex = array[i].toString(16);
    str += hex.length == 1 ? "0" + hex : hex;
  }

  return str;
}

export function formatState(state: unknown) {
  if (!state) return;

  const colorKeys = ['color'];

  for (const key of Object.keys(state)) {
    if (colorKeys.includes(key)) {
      const value = state[key as keyof unknown];
      if (Array.isArray(value)) {
        // parse RGB array into hex string
        // @ts-expect-error We already know key exists on object.
        state[key as keyof typeof state] = hexFromArray(value);
      }
    }
  }
}