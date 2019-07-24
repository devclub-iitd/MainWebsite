import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(createStyles({
  loadingCircle: {
    color: '#6798e5',
    animationDuration: '600ms',
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
}));

export default function Process() {
  const classes = useStyles();

  return (
    <CircularProgress disableShrink size={50} className={classes.loadingCircle} />
  );
}
