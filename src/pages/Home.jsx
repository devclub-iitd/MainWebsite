/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import CssBaseline from '@material-ui/core/CssBaseline';

import css3 from '../images/css-3-pp.svg';
import html5 from '../images/html-5-freepik.svg';
import js from '../images/java-script-pp.svg';
import python from '../images/python-freepik.svg';
import bash from '../images/gnu-bash.svg';
import ts from '../images/typescript-freepik.svg';
import docker from '../images/docker-freepik.svg';
import react from '../images/react-freepik.svg';
import devices from '../images/devices2.svg';
import colors from '../components/Pallete';
import beam from '../images/beam.png';

const styles = () => ({
  background: {
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    backgroundImage: `url(${beam})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left contain',
    backgroundOrigin: 'border-box',
  },
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
  aboutBackground: {
    width: '80%',
    minWidth: 250,
    margin: 'auto',
    padding: 20,
    // backgroundColor: colors.color1.main,
  },
  devices: {
    position: 'absolute',
    width: '37.5vw',
    height: '25vw',
    minWidth: '45ch',
    minHeight: '30ch',
    maxWidth: '375ch',
    maxHeight: '250ch',
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
const distanceX = [180, 240, 280, 120, -120, -120, -240, -180];
const distanceY = [120, -150, 350, -140, 100, -120, 140, -80];

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
  const duration = responsiveDuration(3 + Math.random() * 2);
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

  // const aboutContent1 = 'DevClub is a student group at IIT Delhi, that develops cool stuff that benefits everyone in the campus.';
  // const aboutContent2 = 'We are a community where students can apply their skills into developing applications which are actually useful, and enhancing their own skills in the process.';

  const svgContainerHeight = window.innerWidth < 960 ? '30vh' : '70vh';
  const introTopHeight = window.innerWidth < 960 ? '32vh' : '62vh';
  const backgroundWidth = window.innerWidth < 960 ? '100vw' : '50vw';

  /* To ensure single page UI on Mobile as well as Larger Screens */
  // const aboutMobile = window.innerWidth < 960 ? 'block' : 'none';
  // const aboutDesktop = window.innerWidth < 960 ? 'none' : 'block';

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.background} style={{ width: `${backgroundWidth}` }} />
      <div className={classes.root}>
        <Grid container className={classes.landingContainer}>
          <Grid item md={8} className={classes.svgContainer} style={{ height: `${svgContainerHeight}` }}>
            <div className={classes.devices} />
            {svgArray}
            <div className={classes.intro} style={{ top: `${introTopHeight}` }}>
              <Typist avgTypingDelay={200}>
                <span>Welcome to</span>
                <br />
                <span style={{ fontSize: '1.5em', color: colors.color1.main }}>DevClub</span>
              </Typist>
            </div>
          </Grid>
          <Grid container item md={4}>
            <div className={classes.aboutContent}>
              <div className={classes.aboutBackground}>

                {/* Display on Laptop Devices */}
                {/* <Typography variant="h5" className={classes.centerBody} style={{ display: `${aboutDesktop}` }}>
                  {aboutContent1}
                </Typography> */}
                {/* <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.centerBody}
                  style={{ display: `${aboutDesktop}` }}
                > */}
                {/* {aboutContent2} */}
                {/* </Typography> */}

                {/* Display on Mobile Devices */}
                {/* <Typography variant="h6" className={classes.centerBody} style={{ display: `${aboutMobile}` }}>
                  {aboutContent1}
                </Typography> */}
                {/* <Typography variant="body1" className={classes.centerBody} style={{ display: `${aboutMobile}` }}>
                  {aboutContent2}
                </Typography> */}

              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Home);
