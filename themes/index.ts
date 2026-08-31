import { basic } from "./basic";
import { luxury } from "./luxury";
import { modern } from "./modern";
import { citrus } from "./citrus";
import { coral } from "./coral";
import { midnight } from "./midnight";





import { ACTIVE_THEME } from "@/configs/theme";


const themes = {
  basic,
  luxury,
  modern,
  citrus,
  coral,
  midnight
};


export const theme = themes[ACTIVE_THEME];