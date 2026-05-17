export interface Theme {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderFocus: string;
  accent: string;
  accentText: string;
  accentSubtle: string;
  accentBorder: string;
  text: string;
  textSub: string;
  textMuted: string;
  textDisabled: string;
  success: string;
  error: string;
  warning: string;
  badge1h: string;
  badge24h: string;
  badge7d: string;
  badgeNever: string;
  headerBg: string;
  inputBg: string;
  codeBg: string;
  codeChar: string;
  toggleIcon: string;
}

export const darkTheme: Theme = {
  bg:           "#09090f",
  surface:      "#0f0f1a",
  surfaceAlt:   "#13131e",
  border:       "#1c1c2e",
  borderFocus:  "#c8f542",
  accent:       "#c8f542",
  accentText:   "#09090f",
  accentSubtle: "#c8f54214",
  accentBorder: "#c8f54235",
  text:         "#e8e8f4",
  textSub:      "#888888",
  textMuted:    "#444444",
  textDisabled: "#2a2a3a",
  success:      "#69db7c",
  error:        "#ff6b6b",
  warning:      "#ffa94d",
  badge1h:      "#ff6b6b",
  badge24h:     "#ffa94d",
  badge7d:      "#69db7c",
  badgeNever:   "#74c0fc",
  headerBg:     "#09090fee",
  inputBg:      "#0f0f1a",
  codeBg:       "#13131e",
  codeChar:     "#c8f542",
  toggleIcon:   "🌙",
};

export const lightTheme: Theme = {
  bg:           "#faf6f1",   
  surface:      "#fff9f4",  
  surfaceAlt:   "#fdf3eb",  
  border:       "#e5d9ce",   
  borderFocus:  "#7aab5e",  
  accent:       "#7aab5e",  
  accentText:   "#ffffff",  
  accentSubtle: "#7aab5e18", 
  accentBorder: "#7aab5e35", 
  text:         "#2a1f16",   
  textSub:      "#7a6a5e",  
  textMuted:    "#b0a090", 
  textDisabled: "#d5c9be", 
  success:      "#4a9e5c",
  error:        "#c0392b",
  warning:      "#c67c2a",
  badge1h:      "#c0392b",
  badge24h:     "#c67c2a",
  badge7d:      "#4a9e5c",
  badgeNever:   "#3a7bbf",
  headerBg:     "#faf6f1ee",
  inputBg:      "#fff9f4",
  codeBg:       "#fdf3eb",
  codeChar:     "#4a7a38",
  toggleIcon:   "☀️",
};