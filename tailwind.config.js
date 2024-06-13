/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#095EE2',
      white: '#ffffff',
      'my-black': '#030711D9',
      'my-gray': '#030711',
      'my-gray-45': '#292C3473',
      'my-gray-85': '#292C34D9',
      'my-gray-10': '#dae1ef',
      "primary-45": "#004DEC73"
    }
  },
  plugins: [],
}

