import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';

import DisqusBoard from './DisqusBoard';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
});

class CustomModal extends React.Component {
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
          <Modal
            open={open}
            onClose={this.handleClose}
          >
            <div className={classes.paper}>
              <DisqusBoard
                url={url}
                id={id}
                title={title}
                body={body}
              />
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}


CustomModal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  url: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
};

CustomModal.defaultProps = {
  url: '',
  id: 'default',
  title: 'DisQus DevClub',
  body: "Let's get the discussion started",
};

export default withStyles(styles)(CustomModal);
