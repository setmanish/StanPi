/**
 * PostCSS configuration hooking Tailwind and autoprefixer into the build.
 * Using ESM export so it works with the project's "type": "module".
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
