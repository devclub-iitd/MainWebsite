import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import StepButton from '@material-ui/core/StepButton';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
  },
  centerBody: {
    textAlign: 'center',
    width: '80%',
    maxWidth: '900px',
    margin: 'auto',
  },
  root: {
    width: '100%',
    marginBottom: theme.spacing(10),
  },
  backButton: {
    color: grey[700],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  nextButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.light,
  },
  description: {
    color: grey[800],
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    paddingTop: 5,
  },
  caption: {
    color: grey[500],
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    fontSize: 15,
  },
  centerButton: {
    textAlign: 'center',
  },
  active: {
    color: theme.palette.primary.main,
    fontSize: 14,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.light,
  },
  paper: {
    backgroundColor: grey[100],
  },
});

function getSteps() {
  return ['Idea', 'Design', 'Code', 'Deploy'];
}

function getStepContent(step, classes) {
  switch (step) {
    case 0: {
      const list = <Link to="/ideas" className={classes.link}>list of ideas</Link>;
      const submit = <Link to="/contact" className={classes.link}>submit your own</Link>;
      return (
        <div>
          <Typography className={classes.caption}>IDEA</Typography>
          <Typography className={classes.description}>
            Everything begins with an idea! Check out our
            {' '}
            {list}
            {' '}
            or
            {' '}
            {submit}
            .
          </Typography>
        </div>
      );
    }
    case 1: {
      return (
        <div>
          <Typography className={classes.caption}>DESIGN</Typography>
          <Typography className={classes.description}>
            Design and Documentation, starting from UI design to the backend requirements,
            this is where the foundation of our projects lie.
          </Typography>
        </div>
      );
    }
    case 2: {
      const team = <Link to="/team" className={classes.link}>magicians</Link>;
      return (
        <div>
          <Typography className={classes.caption}>CODE</Typography>
          <Typography className={classes.description}>
            Where the magic happens! Meet our
            {' '}
            {team}
            .
          </Typography>
        </div>
      );
    }
    case 3: {
      const projects = <Link to="/projects" className={classes.link}>projects</Link>;
      return (
        <div>
          <Typography className={classes.caption}>DEPLOY</Typography>
          <Typography className={classes.description}>
            Deploy projects using our own DeployBot. Try out our live
            {' '}
            {projects}
            .
          </Typography>
        </div>
      );
    }
    default:
      return 'Unknown step';
  }
}

const Process = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { classes } = props;
  const steps = getSteps();

  let orientation = 'vertical';
  if (window.innerWidth >= 480) {
    orientation = 'horizontal';
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = step => () => {
    setActiveStep(step);
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <Paper elevation={2} className={classes.paper}>
          <Stepper nonLinear activeStep={activeStep} orientation={orientation}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={handleStep(index)}>
                  {index === activeStep ? (
                    <StepLabel>
                      <Typography className={classes.active}>{label}</Typography>
                    </StepLabel>
                  ) : (
                    <StepLabel>{label}</StepLabel>
                  )}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length - 1 ? (
              <div>
                {getStepContent(activeStep, classes)}
                <div className={classes.centerButton}>
                  <Button
                    size="small"
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    <KeyboardArrowLeft style={{ fontSize: 20 }} />
                    Back
                  </Button>
                  <Button size="small" disabled className={classes.nextButton}>
                    Next
                    <KeyboardArrowRight style={{ fontSize: 20 }} />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep, classes)}
                <div>
                  <div className={classes.centerButton}>
                    <Button
                      size="small"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      <KeyboardArrowLeft style={{ fontSize: 20 }} />
                      Back
                    </Button>
                    <Button size="small" onClick={handleNext} className={classes.nextButton}>
                      Next
                      <KeyboardArrowRight style={{ fontSize: 20 }} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Paper>
      </div>
    </Container>
  );
};

const AboutUs = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom className={classes.centerText}>Inception</Typography>
      <Typography variant="body1" gutterBottom className={classes.centerBody}>
        DevClub is a student group that tries to innovate and foster technical activities,
        and create a coding culture which is somewhat missing.
        And we develop cool stuff that benefits everyone in the campus.
      </Typography>
      <Typography variant="body1" gutterBottom className={classes.centerBody}>
        A couple of our seniors realized that there is no such community in our college
        where students can apply their skills into developing something actually useful
        and that this must be fixed as soon as possible.
        Hence, they came up with the idea of this club - Our own
        {' '}
        <strong>DevClub</strong>
        .
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.centerText}>Discover Our Process</Typography>
      <Process classes={classes} />
    </React.Fragment>
  );
};

AboutUs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Process.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AboutUs);
