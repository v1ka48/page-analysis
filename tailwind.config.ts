import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1C7EFC',
        'secondary-green': '#7CE58D',
        'light-blue': '#56CCF2',
        'dark-green' : '#3AB981',
        'neutral-grey': '#33333',
        'dark-navy-background': '#00193B',
      }
    }
  },
  plugins: [],
}

export default config
