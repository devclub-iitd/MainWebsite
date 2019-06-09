import React from 'react';
import Iframe from 'react-iframe';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import GoogleMaps from '../components/GoogleMaps';

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
      <Typography gutterBottom variant="h5" className={classes.centerText}>
        Contact Us
      </Typography>
      <GoogleMaps />
      <Container maxWidth="md">
        <Typography>
          Contact Details Here
        </Typography>
        <Typography>
          More contact details
        </Typography>
        <Iframe
          url="http://bit.ly/2U0uIOe"
          width="100%"
          height="700px"
        />
      </Container>
    </React.Fragment>
  );
};

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Contact);
