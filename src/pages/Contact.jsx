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
import CardContent from '@material-ui/core/CardContent';
import LocationMap from '../components/LocationMap';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
      color: grey[600],
    },
  },
  card: {
    minWidth: '100%',
    height: '100%',
  },
});

const renderPage = (classes) => {
  if (window.innerWidth <= 900) {
    return (
      <div>
        <Box
          position="absolute"
          left={0}
          right={0}
          top={170}
          height="40%"
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
          height="60%"
        >
          <LocationMap />
        </Box>
      </div>
    );
  }
  return (
    <div>
      <Grid container>
        <Grid item xs={4} />
        <Grid item xs={8}>
          <LocationMap />
        </Grid>
      </Grid>
      <Box
        bgcolor="background.paper"
        position="absolute"
        zIndex={2}
        left={0}
        right="60%"
        top={170}
        bottom={70}
        boxShadow={15}
      >
        <Card className={classes.card}>
          <CardHeader
            subheader="Contact Details"
          />
          <CardMedia
            component="iframe"
            src="http://bit.ly/2U0uIOe"
            height="90%"
            title="Project Request Form"
          />
          <CardContent>
            <Typography className={classes.bottomText} />
          </CardContent>
        </Card>
      </Box>
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
            <Box
              bgcolor="background.paper"
              position="absolute"
              top={0}
              left={0}
              right={0}
              zIndex={3}
              height={170}
              boxShadow={3}
            >
              <Typography gutterBottom variant="h5" className={classes.centerText}>
                Contact Us
              </Typography>
            </Box>
            {renderPage(classes)}
            <Box
              bgcolor="background.paper"
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              zIndex={3}
              boxShadow={24}
            >
              <div className={classes.social}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/tech.iitd/" className={classes.socialIcon}><FacebookBox style={{ fontSize: 45 }} /></a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/devclub-iitd" className={classes.socialIcon}><GithubCircle style={{ fontSize: 45 }} /></a>
                {/** mail link to be changed? */}
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
