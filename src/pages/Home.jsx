import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
  },
});

const Home = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div>
        <Typography gutterBottom variant="h5" className={classes.centerText}>
          Home
        </Typography>
        <br />
      </div>
      <a href="http://bit.ly/2CGChyY"> Report bugs/Suggestions.</a>
    </React.Fragment>
  );
};

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Home);
