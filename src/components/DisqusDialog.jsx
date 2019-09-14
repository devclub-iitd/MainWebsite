import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import DisqusBoard from './DisqusBoard';

const styles = theme => ({
  paper: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

class DisqusDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes, url, id, title, body,
    } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <div>
          <Fab color="primary" onClick={this.handleOpen} variant="extended" className={classes.button}>Disqus This</Fab>
          <br />
          <Dialog
            open={open}
            onClose={this.handleClose}
            maxWidth="sm"
            TransitionComponent={Transition}
            fullWidth
          >
            <DialogTitle id="scroll-dialog-title">
              <Typography variant="body1">
                Any thoughts on
                {' '}
                {title}
              ? Let us know!
              </Typography>
              <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                <CloseIcon style={{ fontSize: 18 }} />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <div className={classes.paper}>
                <DisqusBoard
                  url={url}
                  id={id}
                  title={title}
                  body={body}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </React.Fragment>
    );
  }
}


DisqusDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  url: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
};

DisqusDialog.defaultProps = {
  url: '',
  id: 'default',
  title: 'DisQus DevClub',
  body: "Let's get the discussion started",
};

export default withStyles(styles)(DisqusDialog);
