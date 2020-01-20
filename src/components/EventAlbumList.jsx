/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Masonry from 'react-masonry-component';
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

class EventAlbumList extends Component {
  state = {
    clickStartIndex: 0,
    open: false,
  };

  // class EventAlbumList extends Component {
  /**
   * renderData() requires data in the following format;
   *
   * const tileData = [
   *   {
   *     thumbnail: 'url',
   *     fullurl: 'url',
   *   },
   *   {
   *     etc...
   *   },
   * ];
   */
  // renderData() {
  //   const { classes, mediaList } = this.props;

  //   const childElements = mediaList.map(tile => (
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <Grid item md={2} sm={4}>
  //         <a target="_blank" rel="noopener noreferrer" href={tile.fullurl}>
  //          <img src={tile.thumbnail} alt="Event" className={classes.imageElement} />
  //         </a>
  //       </Grid>
  //     </Suspense>
  //   ));

  handleClickOpen = (index) => {
    this.setState(() => ({
      clickStartIndex: index,
      open: true,
    }));
  };

  handleClose = () => {
    this.setState(() => ({
      open: false,
    }));
  };

  render() {
    const { name, isLoading, classes, mediaList } = this.props;
    const { open, clickStartIndex } = this.state;

    if (isLoading !== false) {
      return (
        <Loading />
      );
    }

    const childElements = range(mediaList.length).map(index => (
      <Suspense fallback={<div>Loading...</div>}>
        <Grid item md={2} sm={4} xs={6} key={index}>
          <img
            src={mediaList[index].thumbnail}
            alt="Event"
            className={classes.imageElement}
            onClick={this.handleClickOpen.bind(this, index)}
          />
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
        <EventCarousel
          title={name}
          open={open}
          onClose={this.handleClose}
          mediaList={mediaList}
          startIndex={clickStartIndex}
        />
      </React.Fragment>
    );
  }
}

EventAlbumList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  mediaList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(EventAlbumList);
