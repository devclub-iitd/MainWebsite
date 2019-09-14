import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { grey } from '@material-ui/core/colors';
import { FacebookBox, GithubCircle, Email } from 'mdi-material-ui';
import Grid from '@material-ui/core/Grid';
import ReactFullpage from '@fullpage/react-fullpage';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import LocationMap from '../components/LocationMap';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
  },
  bottomText: {
    textAlign: 'center',
    width: '100%',
    marginBottom: theme.spacing(5),
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: grey[800],
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    '&:hover': {
      color: grey[600],
    },
  },
  card: {
    minWidth: '100%',
    height: '100%',
  },
  mapHeading: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: 10,
  },
});

const renderPage = (classes) => {
  if (window.innerWidth <= 800) {
    return (
      <div>
        <Box
          position="absolute"
          left={0}
          right={0}
          top={170}
          height="45%"
          zIndex={2}
        >
          <Card className={classes.card}>
            <CardHeader
              subheader="Contact Details"
            />
            <CardMedia
              component="iframe"
              src="http://bit.ly/2U0uIOe"
              height="80%"
              title="Project Request Form"
            />
          </Card>
        </Box>
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={150}
          height="40%"
        >
          <LocationMap />
        </Box>
      </div>
    );
  }
  if (window.innerWidth <= 1000) {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <Card elevation={4} className={classes.card}>
              <Box p={2} fontSize={20} color={grey[700]}>Contact Details</Box>
              <CardMedia
                component="iframe"
                src="http://bit.ly/2U0uIOe"
                height="90%"
                title="Project Request Form"
              />
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={4}>
              <Box p={2} fontSize={20} color={grey[700]}>Find us here</Box>
              <LocationMap />
            </Paper>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Card elevation={4} className={classes.card}>
            <div className={classes.social}>
              <Box p={2} fontSize={20} color={grey[700]}>Contact Details</Box>
            </div>
            <CardMedia
              component="iframe"
              src="http://bit.ly/2U0uIOe"
              height="90%"
              title="Project Request Form"
            />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={4}>
            <div className={classes.social}>
              <Box p={2} fontSize={20} color={grey[700]}>Find us here</Box>
            </div>
            <LocationMap />
          </Paper>
          <Grid item xs={2} />
        </Grid>
      </Grid>
    </div>
  );
};

const Contact = (props) => {
  const { classes } = props;
  return (
    <ReactFullpage
      render={() => (
        <ReactFullpage.Wrapper>
          <div className="section">
            <Typography gutterBottom variant="h5" className={classes.centerText}>
                Contact Us
            </Typography>
            {renderPage(classes)}

            <Box
              bgcolor="background.paper"
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              zIndex={2}
            >
              <div className={classes.social}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/tech.iitd/" className={classes.socialIcon}><FacebookBox style={{ fontSize: 45 }} /></a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/devclub-iitd" className={classes.socialIcon}><GithubCircle style={{ fontSize: 45 }} /></a>
                <a target="_blank" rel="noopener noreferrer" href="mailto:devclub.iitd@gmail.com" className={classes.socialIcon}><Email style={{ fontSize: 45 }} /></a>
              </div>
            </Box>
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  );
};

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Contact);
