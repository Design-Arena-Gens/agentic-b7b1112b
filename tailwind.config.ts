import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#dbeefe',
          200: '#bfdffd',
          300: '#93c9fb',
          400: '#60aef8',
          500: '#3a8def',
          600: '#286fe1',
          700: '#225bc0',
          800: '#214a99',
          900: '#203f7c'
        }
      }
    }
  },
  plugins: [],
}
export default config
