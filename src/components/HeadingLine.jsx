import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  headingLine: () => ({
    width: '40px',
    height: '8px',
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.main,
    margin: 'auto',
    marginBottom: theme.spacing(2),
  }),
}));

const HeadingLine = () => {
  const classes = useStyles();
  return (
    <div className={classes.headingLine} />
  );
};

export default HeadingLine;
