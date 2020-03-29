import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fetchEvents as fetchEventsAction } from '../actions/allActions';
import Loading from '../components/Loading';
import EventAlbumList from '../components/EventAlbumList';
import HeadingLine from '../components/HeadingLine';

// const EventAlbumList = lazy(() => import('../components/EventAlbumList'));

const styles = theme => ({
  eventCardContainer: {
  },
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
    fontWeight: '700',
  },
  line: {
    width: '50px',
    height: '8px',
    borderRadius: '4px',
    marginTop: '20px',
    marginBottom: '20px',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  paper: {
    padding: theme.spacing(6),
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  eventTitle: {
    float: 'left',
    marginRight: theme.spacing(1),
  },
  eventText: {
    width: '90%',
  },
});

const mapStateToProps = state => ({
  data: state.completeReducer.data.events,
  isLoading: state.completeReducer.isLoading.events,
  error: state.completeReducer.errorFetching.events,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEventsAction()),
});

function parseEmbedCode(str) {
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(str, 'text/html');
  const { images } = parsedHtml;

  const imagesList = [];
  for (let i = 0; i < images.length; i += 1) {
    const url = images[i].dataset.src.replace(/\s/g, '');
    let thumbnailUrl = url.replace('1920', '720');
    thumbnailUrl = thumbnailUrl.replace('1080', '405');
    const obj = {};
    obj.thumbnail = thumbnailUrl;
    obj.fullurl = url;
    imagesList.push(obj);
  }

  return imagesList;
}

function trimTime(str) {
  return str.substring(0, str.indexOf('T'));
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    if (data === undefined || data.length === 0) {
      const { fetchEvents } = this.props;
      fetchEvents();
    }
  }

  renderEvents() {
    const {
      classes, data, isLoading, error,
    } = this.props;

    if (isLoading !== false) {
      return (
        <Loading />
      );
    }
    if (error) {
      return 'Error';
    }

    const renders = [];

    const keys = Object.keys(data[0]);

    for (let i = data.length - 1; i >= 0; i -= 1) {
      const eventData = {};
      keys.forEach((key) => { eventData[key] = data[i][key]; });
      if (eventData.display_on_website === true) {
        const project = (
          <Paper className={classes.paper} key={i}>
            <div className={classes.eventCardContainer}>
              <div className={classes.eventText}>
                <Typography variant="h5" component="h3" className={classes.eventTitle} display="inline">
                  {eventData.name}
                </Typography>
                <Typography variant="h6" component="h4" display="inline">
                  <span style={{ marginLeft: '5px' }}>
                    |
                  </span>
                  {' '}
                  <span style={{ fontWeight: '200' }}>
                    {trimTime(eventData.start_date)}
                  </span>
                </Typography>
              </div>
              <div className={classes.line} />
              {/* <Suspense fallback={<div>Loading...</div>}> */}
              <EventAlbumList
                name={eventData.name}
                isLoading={isLoading}
                mediaList={parseEmbedCode(eventData.embed_code)}
              />
              {/* </Suspense> */}
              <br />
            </div>
          </Paper>
        );
        renders.push(project);
      }
    }

    return renders;
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container justify="center">
          <Grid container item xs={12} md={11}>
            <Typography gutterBottom variant="h4" className={classes.centerText}>
            Events
            </Typography>
            <HeadingLine />
            <ul>
              {this.renderEvents()}
            </ul>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Events.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchEvents: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Events.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Events));
