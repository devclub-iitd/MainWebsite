import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import OpenProjects from './pages/OpenProjects';
import Showcase from './pages/Showcase';
import firestore from './helpers/firebase';
import Admin from './pages/Admin';
import Events from './pages/Events';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      showcase: [],
      openProjects: [],
      about: [],
      resources: {},
      events: [],

      errorShowcase: false,
      errorTeamMembers: false,
      errorOpenProjects: false,
      errorAbout: false,

      isLoadingShowcase: true,
      isLoadingTeamMembers: true,
      isLoadingOpenProjects: true,
      isLoadingAbout: true,
      isLoadingEvents: true,
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

    ref = firestore.collection('events');
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState(prevState => ({ events: [...prevState.events, doc.data()] }));
      });
      this.setState({ isLoadingEvents: false });
    })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });

    // Need to do this due to some error in firestore not allowing to call getCollections on a doc.
    const subCollections = ['assignments', 'lectures', 'orientation', 'recruitment'];
    ref = firestore.collection('resources');
    ref.get().then((collectionSnap) => {
      collectionSnap.forEach((directory) => {
        const data = directory.data();
        subCollections.forEach((subCollection) => {
          const subRef = firestore.collection(`${data.path}/${data.doc_name}/${subCollection}`);
          subRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const documentData = doc.data();

              this.setState((prevState) => {
                const dataRes = JSON.parse(JSON.stringify(prevState.resources));
                if (dataRes[data.doc_name] === undefined) {
                  dataRes[data.doc_name] = {};
                }
                if (dataRes[data.doc_name][subCollection] === undefined) {
                  dataRes[data.doc_name][subCollection] = {};
                }
                dataRes[data.doc_name][subCollection][documentData.doc_name] = documentData;
                console.log(dataRes);
                return { resources: dataRes };
              });
            });
          });
        });
      });
    })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  render() {
    const { showcase, isLoadingShowcase, errorShowcase } = this.state;
    const { teamMembers, isLoadingTeamMembers, errorTeamMembers } = this.state;
    const { openProjects, isLoadingOpenProjects, errorOpenProjects } = this.state;
    const { about, isLoadingAbout, errorAbout } = this.state;
    const { events, isLoadingEvents } = this.state;

    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li>
              Projects
              <ul>
                <li><Link to="/showcase">Showcase</Link></li>
                <li><Link to="/open-projects">Open Projects</Link></li>
              </ul>
            </li>
            <li><Link to="/team">Team</Link></li>
          </ul>

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
          <Route
            path="/events"
            render={
              props => (
                <Events
                  {...props}
                  data={events}
                  isLoading={isLoadingEvents}
                />
              )}
          />
        </div>
      </Router>
    );
  }
}
export default App;
