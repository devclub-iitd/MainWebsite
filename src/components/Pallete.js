import {
  cyan,
  brown,
  amber,
  green,
  blueGrey,
  deepPurple,
} from '@material-ui/core/colors';

const colors = {
  heading: {
    main: blueGrey[500],
    sub: deepPurple[400],
  },
  color1: {
    main: cyan[500],
    light: cyan[200],
    text: cyan[50],
  },
  color2: {
    main: green[500],
    light: green[200],
    text: green[50],
  },
  color3: {
    main: amber[400],
    light: amber[200],
    text: amber[50],
  },
  color4: { // FIXME: Pick some different color scheme
    main: amber[400],
    light: amber[200],
    text: amber[50],
  },
  color5: {
    main: brown[400],
    light: brown[200],
    text: brown[50],
  },
};

export default colors;
