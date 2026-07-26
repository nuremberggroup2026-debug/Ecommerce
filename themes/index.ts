import { basic } from "./basic/basic";
import { luxury } from "./luxury/luxury";

import { ACTIVE_THEME } from "@/configs/theme";


const themes = {
  basic,
  luxury,
};


export const theme = themes[ACTIVE_THEME];