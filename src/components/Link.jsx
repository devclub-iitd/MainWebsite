import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: theme.spacing(0.5),
  },
});

const Link = ({ classes, children, onClick }) => (
  <Chip
    label={children}
    onClick={onClick}
    clickable
    variant="outlined"
    className={classes.chip}
  />
);

Link.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Link);
