/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-component';
import Grid from '@material-ui/core/Grid';
import Loading from './Loading';
import EventCarousel from './EventCarousel';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80vw',
    maxHeight: 450,
    marginTop: theme.spacing(1),
    overflowY: 'scroll',
  },
  imageElement: {
    width: '98%',
    margin: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

const EventAlbumList = (props) => {
  const { isLoading, classes, mediaList } = props;
  const [open, setOpen] = useState(false);

  if (isLoading !== false) {
    return (
      <Loading />
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const childElements = mediaList.map(tile => (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid item md={2} sm={4} xs={6} key={tile}>
        <img src={tile} alt="Event" className={classes.imageElement} onClick={handleClickOpen} />
      </Grid>
    </Suspense>
  ));

  return (
    <React.Fragment>
      <Grid container>
        <Masonry
          elementType="Grid" // default 'div'
          className={classes.gridList}
        >
          {childElements}
        </Masonry>
      </Grid>
      <EventCarousel open={open} onClose={handleClose} mediaList={mediaList} />
    </React.Fragment>
  );
};

EventAlbumList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  mediaList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(EventAlbumList);
