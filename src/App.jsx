import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';

import './App.css';

import Home from './pages/Home';
import Team from './pages/Team';
import OpenProjects from './pages/OpenProjects';
import Showcase from './pages/Showcase';
import Admin from './pages/Admin';
import Resources from './pages/Resources';
import Events from './pages/Events';

import ScrollToTop from './components/ScrollTop';
import Topbar from './components/Topbar';

// const backgroundShape = require('./images/shape.svg');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[700],
    },
    secondary: {
      main: blue[900],
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    useNextVariants: true,
    fontFamily: [
      '"Lato"',
      'sans-serif',
    ].join(','),
  },
});

const styles = themeIn => ({
  root: {
    flexGrow: 1,
    backgroundColor: themeIn.palette.grey['100'],
    overflow: 'hidden',
    // background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200,
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [themeIn.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)',
    },
  },
  paper: {
    padding: themeIn.spacing.unit * 3,
    textAlign: 'left',
    color: themeIn.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: themeIn.spacing.unit * 2,
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: themeIn.spacing.unit,
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: themeIn.spacing.unit,
    width: 152,
  },
  blockCenter: {
    padding: themeIn.spacing.unit * 2,
    textAlign: 'center',
  },
  block: {
    padding: themeIn.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65,
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10,
  },
  buttonBar: {
    sdisplay: 'flex',
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  noBorder: {
    borderBottomStyle: 'hidden',
  },
  loadingState: {
    opacity: 0.05,
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
});
const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <ScrollToTop>
          <div>
            <Topbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/showcase" component={Showcase} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/open-projects" component={OpenProjects} />
            <Route exact path="/resources" component={Resources} />
          </div>
        </ScrollToTop>
      </HashRouter>
    </MuiThemeProvider>
  </div>
);

export default withStyles(styles)(App);
