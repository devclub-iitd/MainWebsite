import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-component';
import Grid from '@material-ui/core/Grid';

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
    marginTop: theme.spacing.unit,
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
  /**
   * renderData() requires data in the following format;
   *
   * const tileData = [
   *   {
   *     thumbnailUrl: 'url',
   *     fullUrl: 'url',
   *   },
   *   {
   *     etc...
   *   },
   * ];
   */
  renderData() {
    const { classes, mediaList } = this.props;

    const childElements = mediaList.map(tile => (
      <Grid item md={2} sm={4}>
        <img src={tile} alt="Event" className={classes.imageElement} />
      </Grid>
    ));

    return (
      <Grid container>
        <Masonry
          elementType="Grid" // default 'div'
          className={classes.gridList}
        >
          {childElements}
        </Masonry>
      </Grid>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {this.renderData()}
        </div>
      </React.Fragment>
    );
  }
}

EventAlbumList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mediaList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(EventAlbumList);
