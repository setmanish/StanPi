// Pastel color tokens used across the app
export const pastelTheme = {
  background: '#f3f4f6', // light gray background similar to Microsoft 365
  foreground: '#1f2937', // dark gray text color for good contrast
  accent: '#93c5fd' // soft blue accent color
};

// Helper that writes the theme values to CSS variables on the root element
export function applyTheme(theme: typeof pastelTheme): void {
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.background);
  root.style.setProperty('--fg', theme.foreground);
  root.style.setProperty('--accent', theme.accent);
}
