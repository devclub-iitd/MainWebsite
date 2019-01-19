import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from '../components/Topbar';

const styles = theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  }
});

class Events extends React.Component {
  renderEvents() {
    const { data, isLoading, error } = this.props;

    if (isLoading !== false) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    const renders = [];

    const keys = Object.keys(data[0]);

    for (let i = 0; i < data.length; i += 1) {
      const eventsData = [];
      keys.forEach((key) => { eventsData.push(`${key}: ${data[i][key]}`); eventsData.push(<br key={`eventsBR${key}`} />); });
      const project = (
        <li key={`events${i}`}>
          <div>
            {eventsData}
          </div>
          <br />
        </li>
      );
      renders.push(project);
    }

    return renders;
  }


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div>
                  Events
          <ul>
            {this.renderProjects()}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

Events.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Events);
