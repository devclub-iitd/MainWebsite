import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
      teamMembers: [],
      showcase: [],
      openProjects: [],
      about: [],

      errorShowcase: false,
      errorTeamMembers: false,
      errorOpenProjects: false,
      errorAbout: false,

      isLoadingShowcase: true,
      isLoadingTeamMembers: true,
      isLoadingOpenProjects: true,
      isLoadingAbout: true,
    };
  }

  componentDidMount() {
    let ref = firestore.collection('showcase');
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState(prevState => ({ showcase: [...prevState.showcase, doc.data()] }));
      });
      this.setState({ isLoadingShowcase: false });
    })
      .catch((error) => {
        this.setState({ errorShowcase: true, isLoadingShowcase: false });
        console.log('Error getting documents: ', error);
      });

    ref = firestore.collection('open-projects');
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState(prevState => ({ openProjects: [...prevState.openProjects, doc.data()] }));
      });
      this.setState({ isLoadingOpenProjects: false });
    })
      .catch((error) => {
        this.setState({ errorOpenProjects: true, isLoadingOpenProjects: false });
        console.log('Error getting documents: ', error);
      });

    ref = firestore.collection('members');
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState(prevState => ({ teamMembers: [...prevState.teamMembers, doc.data()] }));
      });
      this.setState({ isLoadingTeamMembers: false });
    })
      .catch((error) => {
        this.setState({ errorTeamMembers: true, isLoadingTeamMembers: false });
        console.log('Error getting documents: ', error);
      });

    ref = firestore.collection('about');
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({ about: doc.data() });
      });
      this.setState({ isLoadingAbout: false });
    })
      .catch((error) => {
        this.setState({ errorAbout: true, isLoadingAbout: false });
        console.log('Error getting documents: ', error);
      });

    // ref = firestore.collection('open-projects');
    // projects.forEach((mem) => { ref.add(mem); });
  }

  render() {
    const { showcase, isLoadingShowcase, errorShowcase } = this.state;
    const { teamMembers, isLoadingTeamMembers, errorTeamMembers } = this.state;
    const { openProjects, isLoadingOpenProjects, errorOpenProjects } = this.state;
    const { about, isLoadingAbout, errorAbout } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <Topbar />
              {/* <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li>
              Projects
              <ul>
                <li><Link to="/showcase">Showcase</Link></li>
                <li><Link to="/open-projects">Open Projects</Link></li>
              </ul>
            </li>
            <li><Link to="/team">Team</Link></li>
          </ul> */}

              <hr />

              <Route exact path="/" component={Home} />
              <Route exact path="/admin" component={Admin} />
              <Route
                path="/about"
                render={
              props => (
                <About
                  {...props}
                  data={about}
                  isLoading={isLoadingAbout}
                  error={errorAbout}
                />
              )}
              />
              <Route
                path="/showcase"
                render={
              props => (
                <Showcase
                  {...props}
                  data={showcase}
                  isLoading={isLoadingShowcase}
                  error={errorShowcase}
                />
              )}
              />
              <Route
                path="/open-projects"
                render={
              props => (
                <OpenProjects
                  {...props}
                  data={openProjects}
                  isLoading={isLoadingOpenProjects}
                  error={errorOpenProjects}
                />
              )}
              />
              <Route
                path="/team"
                render={
              props => (
                <Team
                  {...props}
                  data={teamMembers}
                  isLoading={isLoadingTeamMembers}
                  error={errorTeamMembers}
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
