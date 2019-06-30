import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';

import '../index.css';
import css3 from '../images/css-3-pp.svg';
import html5 from '../images/html-5-freepik.svg';
import js from '../images/java-script-pp.svg';
import python from '../images/python-freepik.svg';
import bash from '../images/gnu-bash-freepik.svg';
import ts from '../images/typescript-freepik.svg';
import docker from '../images/docker-freepik.svg';
import react from '../images/react-freepik.svg';

const styles = () => ({
  root: {
    width: '90vw',
    height: '55vh',
    marginTop: '10vh',
    willChange: 'width, height, left, top',
    marginLeft: '5vw',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scriptBox: {
    position: 'relative',
  },
  typing: {
    position: 'relative',
    fontSize: '36px',
    textAlign: 'center',
  },
  line1: {
    fontSize: '28px',
  },
});

const items = [css3, html5, js, python, bash, ts, docker, react];
const distanceX = [120, 120, 120, 120, -120, -120, -120, -120];
const distanceY = [40, -40, 80, -80, 40, -40, 80, -80];

const AnimatedSvg = styled.div`
  width: 3.5vw;
  height: 3.5vw;
  min-width: 5ch;
  min-height: 5ch;
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  will-change: transform;
  background-image: url(${props => props.theme['background-image']});
  animation: ${props => props.theme.animation};
`;

function responsiveDistance(distance) {
  let ratio = window.innerWidth / 1920;
  ratio = ratio < 0.6 ? 0.6 : ratio;
  return ratio * distance;
}

function svgTheme(index) {
  const svgStyle = {};
  svgStyle['background-image'] = items[index];
  const keyFrame = keyframes`
    0% {
      transform: translate3d(0,0,0);
    }
    100% {
      transform: translate3d(${responsiveDistance(distanceX[index])}px,${responsiveDistance(distanceY[index])}px,0);
    }
  `;
  svgStyle.animation = css`
      ${keyFrame} 2s infinite
    `;
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
        <Grid container>
          <Grid container item md={7} className={classes.container}>
            {svgArray}
          </Grid>
          <Grid container item md={5} className={classes.typingContainer}>
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
