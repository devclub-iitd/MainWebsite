/* eslint-disable no-await-in-loop */
import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Typist from 'react-typist';

import css3 from '../images/css-3-pp.svg';
import html5 from '../images/html-5-freepik.svg';
import js from '../images/java-script-pp.svg';
import python from '../images/python-freepik.svg';
import bash from '../images/gnu-bash.svg';
import ts from '../images/typescript-freepik.svg';
import docker from '../images/docker-freepik.svg';
import react from '../images/react-freepik.svg';
import devices from '../images/devices-srip.svg';
import colors from '../components/Pallete';

const styles = () => ({
  root: {
    width: '90vw',
    height: '90vh',
    marginTop: '10vh',
    willChange: 'width, height, left, top',
    marginLeft: '5vw',
  },
  landingContainer: {
    position: 'relative',
    height: '80vh',
  },
  svgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  aboutContent: {
    position: 'relative',
    height: '30vh',
    marginTop: '25vh',
  },
  centerBody: {
    width: '75%',
    minWidth: 300,
    margin: 'auto',
  },
  devices: {
    position: 'absolute',
    width: '20vw',
    height: '20vw',
    minWidth: '25ch',
    minHeight: '25ch',
    maxWidth: '80ch',
    maxHeight: '80ch',
    backgroundImage: `url(${devices})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  scriptBox: {
    position: 'relative',
  },
  intro: {
    position: 'absolute',
    marginTop: '28vh',
    fontWeight: 800,
    fontSize: '2.5em',
    textAlign: 'center',
    fontFamily: '--apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    color: colors.heading.main,
  },
  transitionsItem: {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '3em',
    fontWeight: '800',
    willChange: 'opacity, height',
  },
  transitionsText: {
    margin: 'auto',
  },
  line1: {
    fontSize: '28px',
  },
});

const items = [css3, html5, js, python, bash, ts, docker, react];
const distanceX = [240, 240, 120, 120, -120, -120, -240, -240];
const distanceY = [120, -150, 160, -100, 100, -120, 140, -80];

const AnimatedSvg = styled.div`
  width: 2.5vw;
  height: 2.5vw;
  min-width: 4ch;
  min-height: 4ch;
  position: relative;
  right: ${props => props.theme.right}px;
  bottom: ${props => props.theme.bottom}px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  will-change: transform;
  background-image: url(${props => props.theme['background-image']});
  animation: ${props => props.theme.animation};
`;

function responsiveWidth(distance) {
  let ratio = window.innerWidth / 1920;
  ratio = ratio < 0.2 ? 0.2 : ratio;
  return ratio * distance;
}

function responsiveHeight(distance) {
  const ratio = window.innerHeight / 1920;
  return ratio * distance;
}

function responsiveDuration(duration) {
  let ratio = window.innerWidth / 1920;
  ratio = ratio < 0.4 ? 0.4 : ratio;
  return ratio * duration;
}

function svgTheme(index) {
  const radius = responsiveWidth(20 + Math.random() * 10);
  const direction = Math.random() > 0.5 ? -1 : 1;
  const startAngle = Math.random() * 360;
  const duration = responsiveDuration(2 + Math.random() * 3);
  const keyFrame = keyframes`
    0% {
      transform:  rotate(${startAngle}deg)
                  translate(${radius}px)
                  rotate(${-startAngle}deg);
    }
    100% {
      transform:  rotate(${startAngle - direction * 360}deg)
                  translateX(${radius}px)
                  rotate(${-startAngle + direction * 360}deg);
    }
  `;
  const svgStyle = {};
  svgStyle['background-image'] = items[index];
  svgStyle.animation = css`${keyFrame} ${duration}s linear infinite`;
  svgStyle.right = responsiveWidth(distanceX[index]);
  svgStyle.bottom = responsiveHeight(distanceY[index]);
  return svgStyle;
}

const Home = (props) => {
  const { classes } = props;
  // Generate animated SVG components using items array
  const svgArray = [];
  for (let index = 0; index < items.length; index += 1) {
    const svgItem = (
      <div key={index}>
        <AnimatedSvg theme={svgTheme(index)} />
      </div>
    );
    svgArray.push(svgItem);
  }

  const svgContainerHeight = window.innerWidth < 960 ? '30vh' : '50vh';
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container className={classes.landingContainer}>
          <Grid item md={8} className={classes.svgContainer} style={{ height: `${svgContainerHeight}` }}>
            <div className={classes.devices} />
            {svgArray}
            <Typist className={classes.intro} avgTypingDelay={200}>
              <span>Welcome to</span>
              <br />
              <span style={{ fontSize: '1.5em', color: colors.color1.main }}>DevClub</span>
            </Typist>
          </Grid>
          <Grid container item md={4}>
            <div className={classes.aboutContent}>
              <Typography variant="h5" className={classes.centerBody}>
                DevClub is a student group that develops cool stuff
                that benefits everyone in the campus.
              </Typography>
              <Typography variant="h6" gutterBottom className={classes.centerBody}>
                We are a community where students can apply their skills into
                developing applications which are actually useful, and enhancing
                their own skills in the process.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* <a href="http://bit.ly/2CGChyY"> Report bugs/Suggestions.</a> */}
    </React.Fragment>
  );
};

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Home);
