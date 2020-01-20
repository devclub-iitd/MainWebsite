import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';
// import AwesomeSlider from 'react-awesome-slider';
// import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import AutoPlayCarousel from './AutoPlayCarousel';

const styles = () => ({
  dialog: {
    height: '60vh',
  },
  paper: {
    height: '400px',
  },
});

function EventCarousel(props) {
  const { open, onClose } = props;
  const dialogSize = '80vw';
  // const items = [
  //   {
  //     name: 'Random Name #1',
  //     description: 'Probably the most random thing you have ever seen!',
  //   },
  //   {
  //     name: 'Random Name #2',
  //     description: 'Hello World!',
  //   },
  // ];
  return (
    <Dialog
      fullWidth
      maxWidth={dialogSize}
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
          {/* <Paper className={classes.paper} /> */}
          <AutoPlayCarousel />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
            Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EventCarousel.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
// mediaList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(EventCarousel);
