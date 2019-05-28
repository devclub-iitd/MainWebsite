import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchEvents as fetchEventsAction } from '../actions/allActions';
import CustomModal from '../components/CustomModal';
import EventAlbumList from '../components/EventAlbumList';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    margin: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 100,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  eventTitle: {
    marginRight: theme.spacing.unit,
  },
  eventText: {
    width: '90%',
    margin: 'auto',
  }
});

const mapStateToProps = state => ({
  data: state.completeReducer.data.events,
  isLoading: state.completeReducer.isLoading.events,
  error: state.completeReducer.errorFetching.events,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEventsAction()),
});
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
    const { classes, data, isLoading, error } = this.props;

    if (isLoading !== false) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    const renders = [];

    const keys = Object.keys(data[0]);

    for (let i = 0; i < data.length; i += 1) {
      const eventData = {};
      keys.forEach((key) => { eventData[key] = data[i][key]; });
      if (eventData['DisplayOnWebsite'] === 'Y') {
        const project = (
          <Paper className={classes.paper}>
            <div className={classes.eventText}>
              <Typography variant="h5" component="h3" className={classes.eventTitle} inline>
                {eventData['Name']}
              </Typography>
              <Typography variant="h6" component="h4" inline>
                | {eventData['Date']}
              </Typography>
            </div>
            <EventAlbumList isLoading={isLoading} />
            <br />
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
      <Grid container>
        <Grid container item md={1} />
        <Grid container item xs={12} md={10}>
          <Typography gutterBottom variant="h5" className={classes.centerText}>
            Events
          </Typography>
          <ul>
            {this.renderEvents()}
          </ul>
        </Grid>
        <Grid container item md={1} />
      </Grid>
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
