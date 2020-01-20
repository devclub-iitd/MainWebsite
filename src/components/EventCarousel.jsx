import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';
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
  const {
    title, open, onClose, mediaList, startIndex,
  } = props;
  const dialogSize = window.innerWidth > 1200 ? '1000' : 0.8 * window.innerWidth;

  return (
    <Dialog
      maxWidth={dialogSize}
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <AutoPlayCarousel mediaList={mediaList} startIndex={startIndex} />
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
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mediaList: PropTypes.arrayOf(PropTypes.string).isRequired,
  startIndex: PropTypes.number.isRequired,
};

export default withStyles(styles)(EventCarousel);
