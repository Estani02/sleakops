import {extendTheme} from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    primary: {
      500: '#171923',
      light: '#1A202C',
    },
    secondary: {
      500: '#90CDF4',
    },
  },
  styles: {
    global: {
      ':root': {
        '--color-primary': '#171923',
        '--color-primary-light': '#1A202C',
        '--color-secondary': '#90CDF4',
      },
    },
  },
});

export default customTheme;
