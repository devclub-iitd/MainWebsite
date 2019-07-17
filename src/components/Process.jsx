import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles(theme => createStyles({
  root: {
    width: '100%',
    marginBottom: theme.spacing(10),
  },
  backButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  nextButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  description: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  active: {
    color: theme.palette.primary.main,
    fontSize: 14,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

function getSteps() {
  return ['Idea', 'Design', 'Code', 'Deploy'];
}

function getStepContent(step, classes) {
  switch (step) {
    case 0: {
      const list = <Link to="/ideas" className={classes.link}>list of ideas</Link>;
      const submit = <Link to="/contact" className={classes.link}>submit your own</Link>;
      return (
        <Typography>
          Everything begins with an idea! Check out our
          {' '}
          {list}
          {' '}
          or
          {' '}
          {submit}
          .
        </Typography>
      );
    }
    case 1: {
      return (
        <Typography>
          Design and Documentation.
        </Typography>
      );
    }
    case 2: {
      const team = <Link to="/team" className={classes.link}>Meet the team</Link>;
      return (
        <Typography>
          Where the magic happens!
          {' '}
          {team}
          .
        </Typography>
      );
    }
    case 3: {
      const projects = <Link to="/projects" className={classes.link}>projects</Link>;
      return (
        <Typography>
          Deploy projects using our own DeployBot. Try out our live
          {' '}
          {projects}
          .
        </Typography>
      );
    }
    default:
      return 'Unknown step';
  }
}

export default function Process() {
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();
  const steps = getSteps();

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
        <Typography variant="h5" gutterBottom className={classes.centerText}>Discover Our Process</Typography>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={handleStep(index)}>
                {index === activeStep ? (
                  <StepLabel><Typography className={classes.active}>{label}</Typography></StepLabel>
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
              <Typography
                className={classes.description}
              >
                {getStepContent(activeStep, classes)}
              </Typography>
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
          ) : (
            <div>
              <Typography
                className={classes.description}
              >
                {getStepContent(activeStep, classes)}
              </Typography>
              <div>
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
          )}
        </div>
      </div>
    </Container>
  );
}
