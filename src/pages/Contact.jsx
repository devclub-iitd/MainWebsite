import React from 'react';
import Iframe from 'react-iframe';
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

const Contact = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div>
        <Typography gutterBottom variant="h5" className={classes.centerText}>
          Contact Us
        </Typography>
        <br />
        Contact Details Here
        <br />
        More contact details
        <br />
        Give Iframe a class so that it scales accordingly.
        <br />
        <Iframe
          url="http://bit.ly/2U0uIOe"
        />
      </div>
    </React.Fragment>
  );
};

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Contact);
