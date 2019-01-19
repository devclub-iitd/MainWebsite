import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from '../components/Topbar';

const styles = theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  }
});

const Home = () => (
  <React.Fragment>
    <CssBaseline />
    <Topbar />
    <div>
              Home
    </div>
  </React.Fragment>
);


export default withStyles(styles)(Home);
