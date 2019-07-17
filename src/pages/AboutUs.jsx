import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';

import Process from '../components/Process';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
  },
});

const AboutUs = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom className={classes.centerText}>Discover our process.</Typography>
      <Process />
    </React.Fragment>
  );
};

AboutUs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AboutUs);
