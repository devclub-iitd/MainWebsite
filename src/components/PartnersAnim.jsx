import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
/* eslint-disable */
const style = () => ({
  canvas: {
    position: 'fixed',
    left: '0px',
    top: '65px',
    bottom: '0px',
    zIndex: '-100',
  },
});

const PartnersAnim = (props) => {
  const { classes } = props;
  const canvasRef = React.useRef(null);
  class Dot {
    constructor(param) {
      this.size = param.size;
      this.radius = param.radius;
      this.xc = param.x;
      this.yc = param.y;
      this.theta = param.theta;
      this.x = this.xc + this.radius * Math.cos(this.theta);
      this.y = this.yc + this.radius * Math.sin(this.theta);
      this.speed = param.speed;
      this.opacity = param.opacity;
      this.out = false;
    }

    updateLoc(grad) {
      this.theta += grad;
      this.x = this.xc + this.radius * Math.cos(this.theta);
      this.y = this.yc + this.radius * Math.sin(this.theta);
    }
  }
  window.dotCont = {
    el: null,
    can: null,
    ctx: null,
    // bg: '#251749',
    bg: 'white',
    dotNo: 400,
    xcor: [0, window.innerWidth],
    ycor: [0, window.innerHeight],
    dotSize: [1, 2],
    dotColOp: [0, 1],
    dots: [],
    dotSpeed: [2, 2],
    dotRadius: [2, 5],
    theta: [0, 2 * Math.PI],
    mouseX: 0,
    mouseY: 0,
    hoverRad: 80,
    genRand: function (i) {
      return i[0] + Math.random() * i[1];
    },
    genRandCo: function (xarr, yarr) {
      const x = Math.floor(xarr[0] + Math.random() * xarr[1]);
      const y = Math.floor(yarr[0] + Math.random() * yarr[1]);
      return [x, y];
    },
    setSize: function () {
      window.dotCont.can.width = window.innerWidth;
      window.dotCont.can.height = window.innerHeight;
    },
    setBg: function () {
      window.dotCont.ctx.fillStyle = window.dotCont.bg;
      window.dotCont.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    },
    init: function () {
      window.dotCont.can = canvasRef.current;
      window.dotCont.ctx = window.dotCont.can.getContext('2d');
      window.dotCont.setSize();
      window.dotCont.setBg();
    },
    drawDot: function (x, y, rad, col) {
      window.dotCont.ctx.beginPath();
      window.dotCont.ctx.fillStyle = col;
      window.dotCont.ctx.arc(x, y, rad, 0, 2 * Math.PI);
      window.dotCont.ctx.fill();
    },
    initDots: function () {
      for (let i = 0; i < window.dotCont.dotNo; i++) {
        const [xt, yt] = window.dotCont.genRandCo(
          window.dotCont.xcor,
          window.dotCont.ycor
        );
        const param = {
          x: xt,
          y: yt,
          size: window.dotCont.genRand(window.dotCont.dotSize),
          radius: window.dotCont.genRand(window.dotCont.dotRadius),
          opacity: window.dotCont.genRand(window.dotCont.dotColOp),
          speed: Math.floor(
            window.dotCont.genRand(window.dotCont.dotSpeed) + 1
          ),
          theta: window.dotCont.genRand(window.dotCont.theta),
        };
        window.dotCont.dots.push(new Dot(param));
      }
    },
    renderDots: function () {
      for (let i = 0; i < window.dotCont.dotNo; i++) {
        const { x } = window.dotCont.dots[i];
        const { y } = window.dotCont.dots[i];
        const { size } = window.dotCont.dots[i];
        const op = window.dotCont.dots[i].opacity;
        window.dotCont.drawDot(x, y, size, 'rgba(0,0,0, ' + op + ')');
        // -------------- for debugging purpose ----------------------
        // xc = window.dotCont.dots[i].xc
        // yc = window.dotCont.dots[i].yc
        // window.dotCont.drawDot(xc, yc, size, 'rgba(255, 0, 0, ' + op + ')');
      }
    },
    trackCursor: function (event) {
      //     $( document ).on( "mousemove", function( event ) {
      window.dotCont.mouseX = event.pageX;
      window.dotCont.mouseY = event.pageY;
      //     });
    },
    animDots: function () {
      window.dotCont.setBg();
      for (let i = 0; i < window.dotCont.dotNo; i++) {
        // window.dotCont.trackCursor();
        const grad = Math.PI / 180;
        const { speed } = window.dotCont.dots[i];
        window.dotCont.dots[i].updateLoc(speed * grad);
        const { x } = window.dotCont.dots[i];
        const { y } = window.dotCont.dots[i];
        let { size } = window.dotCont.dots[i];
        const xc = window.dotCont.mouseX;
        const yc = window.dotCont.mouseY;
        let op = window.dotCont.dots[i].opacity;
        if ((x - xc) ** 2 + (y - yc) ** 2 <= window.dotCont.hoverRad ** 2) {
          size /= 1.2;
          op /= 6;
        }
        window.dotCont.drawDot(x, y, size, 'rgba(0,0,0, ' + op + ')');
        // radius = 5;
        // ------------------ draw the cursor position --------------------
        // console.log(window.dotCont.dots[i].xc)
        // window.dotCont.drawDot(window.dotCont.mouseX, window.dotCont.mouseY, radius, 'red');
      }
      window.requestAnimationFrame(window.dotCont.animDots);
    },
  };

  React.useEffect(() => {
    window.dotCont.init();
    window.dotCont.initDots();
    window.dotCont.renderDots();
    window.dotCont.animDots();
    // ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
  });

  return (
    <div>
      <canvas
        ref={canvasRef}
        className={classes.canvas}
        width={window.innerWidth}
        height={window.innerHeight - 500}
        onMouseMove={window.dotCont.trackCursor}
      />
    </div>
  );
};

PartnersAnim.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(style)(PartnersAnim);
