import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import OpenProjects from './pages/OpenProjects';
import Showcase from './pages/Showcase';
import firestore from './helpers/firebase';
import Admin from './pages/Admin';
import Topbar from './components/Topbar';
import Resources from './pages/Resources';
import Events from './pages/Events';


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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errorFetching: {},
      isLoading: {},
    };
  }

  componentDidMount() {
    const sheetNames = ['showcase', 'open-projects', 'members', 'about', 'events', 'resources'];

    sheetNames.forEach((sheetName) => {
      const ref = firestore.collection(sheetName);

      ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState((prevState) => {
            const newStateData = JSON.parse(JSON.stringify(prevState.data));
            newStateData[sheetName] = newStateData[sheetName] === undefined ? [] : newStateData[sheetName];
            newStateData[sheetName] = [...newStateData[sheetName], doc.data()];
            return { data: newStateData };
          });
        });
        this.setState(prevState => ({ isLoading: { ...prevState.isLoading, [sheetName]: false } }));
      })
        .catch((error) => {
          this.setState(prevState => ({
            isLoading: { ...prevState.isLoading, [sheetName]: false },
            errorFetching: { ...prevState.errorFetching, [sheetName]: true },
          }));
          console.log(`Error fetching data for ${sheetName} : ${error}`);
        });
    });
  }

  render() {
    const { data, isLoading, errorFetching } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <Topbar />
              <hr />
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
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
