import { loadFont as loadDisplay } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

export const display = loadDisplay().fontFamily; // condensed, bold headlines / big numbers
export const body = loadBody().fontFamily; // clean UI text

export const theme = {
  bg: "#0B0E13",
  bgGlow: "#141A24",
  text: "#F5F7FA",
  textDim: "#8A97A8",
  edge: "#00E676", // the "good"/model color
  edgeSoft: "#0f3d2a",
  warn: "#FF5252", // break-even / the bar you must clear
  gold: "#FFC24B",
  line: "#26303D",
} as const;

export const fonts = { display, body };
