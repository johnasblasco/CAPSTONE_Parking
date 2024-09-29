/** @type {import('tailwindcss').Config} */
export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
            colors: {
            deepBlue: '#001858',
            pink: '#f582ae',
            offWhite: '#fef6e4',
            greenWich: '#22c55e',
            lightBlue: '#8BD3DD',
            blak: '#000814',
            darkBloe: '#001d3d',
            bloe: '#003566',
            darkYeelow: '#FFC300',
            yeelow: '#FFD60A',
            vanilla: '#FFEFBA',
          },

            screens: {
                  'h-max-700': { 'raw': '(max-height: 700px)' },
            },
            fontFamily: {
                  sans: ['Inter', 'sans-serif'], // Set Inter as the default sans font
            },

            textStrokeWidth: {
                  '2': '2px',
                  '4': '4px',
                },
                textStrokeColor: {
                  'deepBlue': '#001858',
                  'black': '#000000',
                },
        },
      },
      plugins: [],
    }
    