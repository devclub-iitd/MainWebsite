import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import { FacebookBox, GithubCircle, Email } from 'mdi-material-ui';
import LocationMap from '../components/LocationMap';
import Form from '../components/Form';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
  },
  footer: {
    marginTop: theme.spacing(10),
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: grey[800],
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    '&:hover': {
      color: grey[600],
    },
  },
});


const Contact = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography gutterBottom variant="h5" className={classes.centerText}>
        Contact Us
      </Typography>
      <LocationMap />
      <Box
        bgcolor={grey[100]}
        position="absolute"
        top={540}
        zIndex={2}
        maxWidth="100%"
        minWidth="100%"
        minHeight="100%"
        maxHeight="100%"
      />
      <Box
        position="absolute"
        top={480}
        zIndex={3}
        maxWidth="92%"
        minWidth="92%"
        left="4%"
        right="4%"
      >
        <Paper elevation={24}>
          <Container maxWidth="md">
            <Box p={7}>
              Contact Details Here
            </Box>
            <Form />
            <div className={classes.social}>
              <a href="https://www.facebook.com/tech.iitd/" className={classes.socialIcon}><FacebookBox style={{ fontSize: 45 }} /></a>
              <a href="https://github.com/devclub-iitd" className={classes.socialIcon}><GithubCircle style={{ fontSize: 45 }} /></a>
              {/** mail link to be changed? */}
              <a href="mailto:devclub.iitd@gmail.com" className={classes.socialIcon}><Email style={{ fontSize: 45 }} /></a>
            </div>
          </Container>
        </Paper>
      </Box>

    </React.Fragment>
  );
};

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Contact);
