import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '90%',
    maxHeight: 450,
    marginTop: theme.spacing.unit,
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
    let numCols = 3;
    if (window.innerWidth >= 1280) {
      numCols = 6;
    } else if (window.innerWidth >= 480) {
      numCols = 4;
    }
    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={numCols}>
          {mediaList.map(tile => (
            <GridListTile key={tile} cols={1}>
              <img src={tile} alt="Event" />
            </GridListTile>
          ))}
        </GridList>
      </div>
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
