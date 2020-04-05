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
    // opacity: '0.8',
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
    backdropFilter: 'blur(5px)',
    opacity: '0.8',
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
    padding: '10px',
    paddingLeft: '50px',
    paddingRight: '50px',
    borderRadius: '10px',
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    backdropFilter: 'blur(5px)',
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
  canvas: {
    position: 'absolute',
    left: 0,
    top: '65px',
  },
});

const items = [css3, html5, react, python, js, ts, docker, bash];
const distanceX = [180, 240, 140, 120, -140, -120, -240, -180];
const distanceY = [120, -150, 270, -140, 260, -120, 140, -80];

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
  let ratio = window.innerWidth / 1920;
  ratio = ratio < 0.4 ? 0.4 : ratio;
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

  const svgContainerHeight = window.innerWidth < 960 ? '50vh' : '70vh';
  const introTopHeight = window.innerWidth < 960 ? '42vh' : '62vh';
  // const backgroundWidth = window.innerWidth < 960 ? '100vw' : '50vw';

  /* To ensure single page UI on Mobile as well as Larger Screens */
  // const aboutMobile = window.innerWidth < 960 ? 'block' : 'none';
  // const aboutDesktop = window.innerWidth < 960 ? 'none' : 'block';
  const canvasRef = React.useRef(null);

  class Bubble {
    constructor(settings) {
      this.radius = settings.radius;
      this.x = settings.x;
      this.y = settings.y;
      this.speed = settings.speed;
      this.color = settings.color;
    }
  }
  const rand = (max, min, onlyInt) => (onlyInt) ? Math.round(min + Math.random() * (max - min)) : min + Math.random() * (max - min);

  window.bubbles = {
    canvas: null,
    ctx: null,
    colors: ['rgba(109, 0, 150, 0.75)', 'rgba(243, 0, 124, 0.75)', 'rgba(200, 0, 133, 0.75)', 'rgba(255, 0, 62, 0.75)'],
    // colors: ['rgba(39, 212, 150, 0.75)', 'rgba(53, 151, 255, 0.75)', 'rgba(255, 78, 79, 0.75)', 'rgba(112, 94, 255,0.75)'],
    bg: 'rgba(245, 245, 245, 0.8)',
    bubbles: [],
    speedRange: [-2, 2],
    radRange: [30, 80],
    num: 20,
    init: function () {
      window.bubbles.canvas = canvasRef.current;
      window.bubbles.ctx = window.bubbles.canvas.getContext('2d');
      window.bubbles.ctx.fillStyle = 'rgba(245, 245, 245, 0.8)';
      window.bubbles.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < window.bubbles.num; i++) {
        let rad = 0;
        if (window.innerWidth < 850) {
          rad = rand(window.bubbles.radRange[0] / 1.5, window.bubbles.radRange[1] / 1.5, true);
        } else {
          rad = rand(window.bubbles.radRange[0], window.bubbles.radRange[1], true);
        }
        window.bubbles.bubbles.push(new Bubble({
          radius: rad,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          speed: {
            x: rand(window.bubbles.speedRange[0], window.bubbles.speedRange[1]),
            y: rand(window.bubbles.speedRange[0], window.bubbles.speedRange[1]),
          },
          color: window.bubbles.colors[i % window.bubbles.colors.length],
        }));
      }
    },
    render: function () {
      window.bubbles.ctx.fillStyle = window.bubbles.bg;
      window.bubbles.ctx.fillRect(0, 0, window.bubbles.canvas.width, window.bubbles.canvas.height);
      for (let i = 0; i < window.bubbles.bubbles.length; i++) {
        const b = window.bubbles.bubbles[i];
        window.bubbles.ctx.beginPath();
        window.bubbles.ctx.fillStyle = b.color;
        window.bubbles.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        window.bubbles.ctx.closePath();
        window.bubbles.ctx.fill();

        if (b.x + b.radius >= window.bubbles.canvas.width) {
          window.bubbles.bubbles[i].speed.x *= -1;
          window.bubbles.bubbles[i].x = window.bubbles.canvas.width - window.bubbles.bubbles[i].radius - 1;
        } else if (b.x - b.radius <= 0) {
          window.bubbles.bubbles[i].speed.x *= -1;
          window.bubbles.bubbles[i].x = window.bubbles.bubbles[i].radius + 1;
        }

        if (b.y + b.radius >= window.bubbles.canvas.height) {
          window.bubbles.bubbles[i].speed.y *= -1;
          window.bubbles.bubbles[i].y = window.bubbles.canvas.height - window.bubbles.bubbles[i].radius - 1;
        } else if (b.y - b.radius <= 0) {
          window.bubbles.bubbles[i].speed.y *= -1;
          window.bubbles.bubbles[i].y = window.bubbles.bubbles[i].radius + 1;
        }
        window.bubbles.bubbles[i].x += window.bubbles.bubbles[i].speed.x;
        window.bubbles.bubbles[i].y += window.bubbles.bubbles[i].speed.y;
      }
      window.requestAnimationFrame(window.bubbles.render);
    },
  };


  React.useEffect(() => {
    window.bubbles.init();
    window.bubbles.render();
    // ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
  });
  return (
    <React.Fragment>
      <CssBaseline />
      <canvas ref={canvasRef} className={classes.canvas} width={window.innerWidth} height={window.innerHeight - 65} />
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
        </Grid>
      </div>
    </React.Fragment>
  );
};

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

// <div className={classes.background} style={{ width: `${backgroundWidth}` }} />
// <Grid container item md={4}>
//   {/* <div className={classes.aboutContent}> */}
//   {/* <div className={classes.aboutBackground}> */}
//
//   {/* Display on Laptop Devices */}
//   {/* <Typography variant="h5" className={classes.centerBody} style={{ display: `${aboutDesktop}` }}>
//         {aboutContent1}
//       </Typography> */}
//   {/* <Typography
//         variant="h6"
//         gutterBottom
//         className={classes.centerBody}
//         style={{ display: `${aboutDesktop}` }}
//       > */}
//   {/* {aboutContent2} */}
//   {/* </Typography> */}
//
//   {/* Display on Mobile Devices */}
//   {/* <Typography variant="h6" className={classes.centerBody} style={{ display: `${aboutMobile}` }}>
//         {aboutContent1}
//       </Typography> */}
//   {/* <Typography variant="body1" className={classes.centerBody} style={{ display: `${aboutMobile}` }}>
//         {aboutContent2}
//       </Typography> */}
//
//   {/* </div> */}
//   {/* {</div>} */}
// </Grid>

export default withStyles(styles)(Home);
