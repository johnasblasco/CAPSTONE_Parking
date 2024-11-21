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
            darkYellow: '#FFC300',
            yeelow: '#FFD60A',
            vanilla: '#FFEFBA',
          },
          transitionDuration: {
            '400': '400ms',
          },

          screens: {
            // Custom screen breakpoints
            'h-max-700': { 'raw': '(max-height: 700px)' },
            'cp': { 'raw': '(max-width: 480px)' },  // Custom breakpoint for small mobile (cell phone)
            'laptop': { 'raw': '(max-width: 1366px)' }, // Custom breakpoint for laptops (1366px width)
            // You can add more as needed
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

            // FOR  ANIMATION 
            keyframes: {
            scaleUp: {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.25)' },
            },
            colorChange: {
                  '0%': { color: '#FFD60A' },
                  '25%': { color: 'white' },
                  '50%': { color: '#ec4899' }, // Pink color
                  '75%': { color: 'ec4899' },
            '     100%': { color: '#FFD60A' },
            },
            },
            animation: {
            'scale-text': 'scaleUp 2s ease-in-out infinite',
            'color-change': 'colorChange 8s ease-in-out infinite ',
            }



            //     END OF EXTENDS
        },
      },
      plugins: [],
    }
    