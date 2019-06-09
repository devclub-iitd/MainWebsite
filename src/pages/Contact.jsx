import React from 'react';
import Iframe from 'react-iframe';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import LocationMap from '../components/LocationMap';

const githubLogo = require('../media/github.png');
const fbLogo = require('../media/facebook.png');
const mailLogo = require('../media/mail.png');

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
  },
  footer: {
    textAlign: 'center',
    paddingBottom: 20,
    marginTop: theme.spacing(5),
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
          <Box p={7}>
              Contact Details Here
          </Box>
          <Container maxWidth="md">
            <Iframe
              url="http://bit.ly/2U0uIOe"
              width="100%"
              height="700px"
            />
            <div className={classes.footer}>
              <ButtonBase href="https://github.com/devclub-iitd">
                <img src={githubLogo} alt="" />
              </ButtonBase>
              <ButtonBase href="https://www.facebook.com/tech.iitd/">
                <img src={fbLogo} alt="" />
              </ButtonBase>
              <ButtonBase href="mailto: devclub.iitd@gmail.com">
                <img src={mailLogo} alt="" />
              </ButtonBase>
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
