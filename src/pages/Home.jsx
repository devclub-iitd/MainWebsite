/* eslint-disable no-await-in-loop */
import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { withStyles, Grid } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import { useTransition, animated } from 'react-spring';
import PropTypes from 'prop-types';

import css3 from '../images/css-3-pp.svg';
import html5 from '../images/html-5-freepik.svg';
import js from '../images/java-script-pp.svg';
import python from '../images/python-freepik.svg';
import bash from '../images/gnu-bash.svg';
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
  svgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30vh',
    margin: 'auto',
  },
  introContainer: {
    height: '60vh',
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
    margin: 'auto',
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

const Intro = (props) => {
  const { classes } = props;
  const ref = useRef([]);
  const [stateItems, set] = useState([]);
  const transitions = useTransition(stateItems, null, {
    from: {
      opacity: 0, height: 0, innerHeight: 0, color: '#8fa5b6',
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 60 },
    ],
    leave: [{ color: '#c23369' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#28b4d7' },
  });

  const typefont = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(setTimeout(() => set(['This is ', 'Software', 'Development', 'Club', 'IIT Delhi']), 1000));
    ref.current.push(setTimeout(() => set(['This is ', 'Development', 'Club', 'IIT Delhi']), 2000));
    ref.current.push(setTimeout(() => set(['This is ', 'Club', 'IIT Delhi']), 3000));
    ref.current.push(setTimeout(() => set(['This is ', 'DevClub', 'IIT Delhi']), 6000));
    ref.current.push(setTimeout(() => set(['This is ', 'DevClub']), 9000));
  }, []);

  useEffect(() => typefont(), []);

  return (
    <div className={classes.intro}>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div className={classes.transitionsItem} key={key} style={rest} onClick={typefont}>
          <animated.div className={classes.transitionsText}>{item}</animated.div>
        </animated.div>
      ))}
    </div>
  );
};

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

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container className={classes.landingContainer}>
          <Grid container item md={7} className={classes.svgContainer}>
            <div className={classes.devices} />
            {svgArray}
          </Grid>
          <Grid container item md={5} className={classes.introContainer}>
            <Intro classes={classes} />
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

Intro.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Home);
