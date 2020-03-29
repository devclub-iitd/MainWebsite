import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { grey } from '@material-ui/core/colors';
import { FacebookBox, GithubCircle, Email } from 'mdi-material-ui';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import LocationMap from '../components/LocationMap';
import HeadingLine from '../components/HeadingLine';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'borderBox',
    overflowY: 'scroll',
  },
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: theme.spacing(10),
    // marginBottom: theme.spacing(3),
    fontWeight: '700',
  },
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    // '&:hover': {
    //   color: grey[800],
    // },
  },
  cards: {
    marginBottom: theme.spacing(10),
  },
  card: {
    minWidth: '100%',
    height: '100%',
  },
  appBar: {
    top: 'auto',
    bottom: 15,
    width: '300px',
    left: '50%',
    borderRadius: '10px',
    transform: 'translate(-50%, 0)',
    backdropFilter: 'blur(3px)',
  },
  formFooter: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
});

const renderPage = (classes) => {
  if (window.innerWidth <= 700) {
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
            <CardActions>
              <Typography className={classes.formFooter}>
                <Link target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSdYed8ND9ocBWKoO6nK-OZP70aYVcdx7MmI6_qjp0ncktHhSA/viewform" color="textSecondary">
                  Fill this form
                </Link>
                {'  '}
                    or
                {'  '}
                <Link target="_blank" rel="noopener noreferrer" href="mailto:devclub.iitd@gmail.com" color="textSecondary">
                  mail us here
                </Link>
              </Typography>
            </CardActions>
            <CardMedia
              component="iframe"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdYed8ND9ocBWKoO6nK-OZP70aYVcdx7MmI6_qjp0ncktHhSA/viewform"
              height="75%"
              title="Project Request Form"
            />
          </Card>
        </Box>
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={100}
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
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Card elevation={4} className={classes.card}>
              <div className={classes.centerAlign}>
                <Box p={2} fontSize={20} color={grey[700]}>Contact Details</Box>
              </div>
              <CardMedia
                component="iframe"
                src="https://docs.google.com/forms/d/e/1FAIpQLSdYed8ND9ocBWKoO6nK-OZP70aYVcdx7MmI6_qjp0ncktHhSA/viewform"
                height="82%"
                title="Project Request Form"
              />
              <CardActions>
                <Typography className={classes.formFooter}>
                  <Link target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSdYed8ND9ocBWKoO6nK-OZP70aYVcdx7MmI6_qjp0ncktHhSA/viewform" color="textSecondary">
                  Fill this form
                  </Link>
                  {'  '}
                    or
                  {'  '}
                  <Link target="_blank" rel="noopener noreferrer" href="mailto:devclub.iitd@gmail.com" color="textSecondary">
                  mail us here
                  </Link>
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={4}>
              <div className={classes.centerAlign}>
                <Box p={2} fontSize={20} color={grey[700]}>Find us here</Box>
              </div>
              <LocationMap />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Card elevation={4} className={classes.card}>
            <div className={classes.centerAlign}>
              <Box p={2} fontSize={20} color={grey[700]}>Contact Details</Box>
            </div>
            <CardMedia
              component="iframe"
              src="https://docs.google.com/forms/d/e/1FAIpQLSdYed8ND9ocBWKoO6nK-OZP70aYVcdx7MmI6_qjp0ncktHhSA/viewform"
              height="82%"
              title="Project Request Form"
            />
            <CardActions>
              <Typography className={classes.formFooter}>
                <Link target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSdYed8ND9ocBWKoO6nK-OZP70aYVcdx7MmI6_qjp0ncktHhSA/viewform" color="textSecondary">
                Fill this form
                </Link>
                {'  '}
                  or
                {'  '}
                <Link target="_blank" rel="noopener noreferrer" href="mailto:devclub.iitd@gmail.com" color="textSecondary">
                mail us here
                </Link>
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={4}>
            <div className={classes.centerAlign}>
              <Box p={2} fontSize={20} color={grey[700]}>Find us here</Box>
            </div>
            <LocationMap />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const renderBottom = (classes) => {
  if (window.innerWidth <= 700) {
    return (
      <div>
        <AppBar color="inherit" position="fixed" className={classes.appBar}>
          <Toolbar className={classes.centerAlign}>
            <IconButton edge="start" color="default" aria-label="open drawer" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/tech.iitd/" className={classes.socialIcon}>
              <FacebookBox style={{ fontSize: 43 }} />
            </IconButton>
            <IconButton edge="start" color="default" aria-label="open drawer" target="_blank" rel="noopener noreferrer" href="https://github.com/devclub-iitd" className={classes.socialIcon}>
              <GithubCircle style={{ fontSize: 43 }} />
            </IconButton>
            <IconButton edge="start" color="default" aria-label="open drawer" target="_blank" rel="noopener noreferrer" href="mailto:devclub.iitd@gmail.com" className={classes.socialIcon}>
              <Email style={{ fontSize: 43 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  return (
    <div>
      <AppBar color="inherit" position="fixed" className={classes.appBar} style={{ background: 'rgba(248,248,248,0.8)', boxShadow: 'none' }}>
        <Toolbar className={classes.centerAlign}>
          <IconButton edge="start" color="default" aria-label="open drawer" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/tech.iitd/" className={classes.socialIcon}>
            <FacebookBox style={{ fontSize: 43 }} />
          </IconButton>
          <IconButton edge="start" color="default" aria-label="open drawer" target="_blank" rel="noopener noreferrer" href="https://github.com/devclub-iitd" className={classes.socialIcon}>
            <GithubCircle style={{ fontSize: 43 }} />
          </IconButton>
          <IconButton edge="start" color="default" aria-label="open drawer" target="_blank" rel="noopener noreferrer" href="mailto:devclub.iitd@gmail.com" className={classes.socialIcon}>
            <Email style={{ fontSize: 43 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const Contact = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h4" className={classes.centerText}>
                Contact Us
        </Typography>
        <HeadingLine />
        <br />
        <div className={classes.cards}>
          {renderPage(classes)}
        </div>
      </Container>
      <div className={classes.cards}>
        {renderBottom(classes)}
      </div>
    </React.Fragment>
  );
};

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Contact);
