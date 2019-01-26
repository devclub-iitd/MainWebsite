import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import OpenProjects from './pages/OpenProjects';
import Showcase from './pages/Showcase';
import Admin from './pages/Admin';
import Resources from './pages/Resources';
import Events from './pages/Events';
import ScrollToTop from './components/ScrollTop';
import Topbar from './components/Topbar';
import fetchSheetsData from './database/database';

// const backgroundShape = require('./images/shape.svg');

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900],
    },
    primary: {
      main: indigo[700],
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif',
    ].join(','),
  },
});

const styles = themeLocal => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    // background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    sdisplay: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  },
});

class App extends React.Component {
  state = {
    data: {},
    errorFetching: {},
    isLoading: {},
  };

  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    fetchSheetsData(this.setData);
  }

  setData(sheetName, dataPackage) {
    console.log(sheetName, dataPackage);
    this.setState(prevState => ({
      data: { ...prevState.data, [sheetName]: dataPackage.data },
      isLoading: { ...prevState.isLoading, [sheetName]: dataPackage.isLoading },
      errorFetching: { ...prevState.errorFetching, [sheetName]: dataPackage.errorFetching },
    }));
  }

  render() {
    const { data, isLoading, errorFetching } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <HashRouter>
            <ScrollToTop>
              <div>
                <Topbar />
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={Admin} />
                <Route
                  path="/about"
                  render={
                    props => (
                      <About
                        {...props}
                        data={data.about}
                        isLoading={isLoading.about}
                        error={errorFetching.about}
                      />
                    )}
                />
                <Route
                  path="/showcase"
                  render={
                    props => (
                      <Showcase
                        {...props}
                        data={data.showcase}
                        isLoading={isLoading.showcase}
                        error={errorFetching.showcase}
                      />
                    )}
                />
                <Route
                  path="/open-projects"
                  render={
                    props => (
                      <OpenProjects
                        {...props}
                        data={data['open-projects']}
                        isLoading={isLoading['open-projects']}
                        error={errorFetching['open-projects']}
                      />
                    )}
                />
                <Route
                  path="/team"
                  render={
                    props => (
                      <Team
                        {...props}
                        data={data.members}
                        isLoading={isLoading.members}
                        error={errorFetching.members}
                      />
                    )}
                />
                <Route
                  path="/events"
                  render={
                    props => (
                      <Events
                        {...props}
                        data={data.events}
                        isLoading={isLoading.events}
                        error={errorFetching.events}
                      />
                    )}
                />
                <Route
                  path="/resources"
                  render={
                    props => (
                      <Resources
                        {...props}
                        data={data.resources}
                        isLoading={isLoading.resources}
                        error={errorFetching.resources}
                      />
                    )}
                />
              </div>
            </ScrollToTop>
          </HashRouter>
        </MuiThemeProvider>
      </div>

    );
  }
}
export default withStyles(styles)(App);
