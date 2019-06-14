import React from 'react';
import { withStyles } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';

import '../index.css';

const styles = () => ({
  root: {
    width: '90vw',
    height: '55vh',
    marginTop: '10vh',
    marginLeft: '5vw',
  },
  scriptBox: {
    position: 'relative',
    willChange: 'width, height, left, top',
  },
});

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 40}px,${y / 40}px,0)`; // Desktop
const trans2 = (x, y) => `translate3d(${x / 16 + 5}px,${y / 16 - 140}px,0)`; // CSS3 
const trans3 = (x, y) => `translate3d(${x / 12 - 150}px,${y / 12 - 120}px,0)`; // HTML5
const trans4 = (x, y) => `translate3d(${x / 14}px,${y / 14}px,0)`; // JS

function Card() {
  console.log('In Card');
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  const { xy } = props;
  return (
    <div className="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.div class="card1" style={{ transform: xy.interpolate(trans1) }} />
      <animated.div class="card2" style={{ transform: xy.interpolate(trans2) }} />
      <animated.div class="card3" style={{ transform: xy.interpolate(trans3) }} />
      <animated.div class="card4" style={{ transform: xy.interpolate(trans4) }} />
    </div>
  );
}

const Home = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Card />
      </div>
      <a href="http://bit.ly/2CGChyY"> Report bugs/Suggestions.</a>
    </React.Fragment>
  );
};

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Card.propTypes = {
  xy: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default withStyles(styles)(Home);
