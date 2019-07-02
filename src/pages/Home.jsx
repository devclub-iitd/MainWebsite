/* eslint-disable no-await-in-loop */
import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';

import css3 from '../images/css-3-pp.svg';
import html5 from '../images/html-5-freepik.svg';
import js from '../images/java-script-pp.svg';
import python from '../images/python-freepik.svg';
import bash from '../images/gnu-bash-freepik.svg';
import ts from '../images/typescript-freepik.svg';
import docker from '../images/docker-freepik.svg';
import react from '../images/react-freepik.svg';
import devices from '../images/devices-srip.svg';

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
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devices: {
    position: 'absolute',
    width: '20vw',
    height: '20vw',
    minWidth: '30ch',
    minHeight: '30ch',
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
  typing: {
    fontSize: '36px',
    textAlign: 'center',
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
  min-width: 5ch;
  min-height: 5ch;
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

function responsiveDistance(distance) {
  let ratio = window.innerWidth / 1920;
  ratio = ratio < 0.3 ? 0.3 : ratio;
  return ratio * distance;
}

function svgTheme(index) {
  const radius = 20 + Math.random() * 10;
  const direction = Math.random() > 0.5 ? -1 : 1;
  const startAngle = Math.random() * 360;
  const duration = 2 + Math.random() * 3;
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
  svgStyle.right = responsiveDistance(distanceX[index]);
  svgStyle.bottom = responsiveDistance(distanceY[index]);
  return svgStyle;
}

const Home = (props) => {
  const { classes } = props;
  // Generate animated SVG components using items array
  const svgArray = [];
  for (let index = 0; index < items.length; index += 1) {
    const svgItem = (
      <AnimatedSvg theme={svgTheme(index)} />
    );
    svgArray.push(svgItem);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container className={classes.landingContainer}>
          <Grid container item md={7} className={classes.container}>
            <div className={classes.devices} />
            {svgArray}
          </Grid>
          <Grid container item md={5}>
            <Typing className={classes.typing}>
              <Typing.Speed ms={60} />
              <span className={classes.line1}>This is</span>
              <Typing.Delay ms={200} />
              <br />
              <Typing.Speed ms={5} />
              <span>The Software Development Club, IIT Delhi</span>
              <Typing.Reset count={1} delay={800} />
              <Typing.Speed ms={20} />
              DevClub
            </Typing>
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
