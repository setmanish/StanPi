/** @type {import('postcss-load-config').Config} */
// PostCSS config hooking Tailwind and autoprefixer into Next.js build pipeline
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
