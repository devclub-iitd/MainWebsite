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

class Showcase extends React.Component {
  renderProjects() {
    const { data, isLoading, error } = this.props;
    // let { data } = this.props;

    if (isLoading !== false) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    const renders = [];

    const keys = Object.keys(data[0]);

    for (let i = 0; i < data.length; i += 1) {
      const showcaseProjectData = [];
      keys.forEach((key) => { showcaseProjectData.push(`${key}: ${data[i][key]}`); showcaseProjectData.push(<br key={`showcaseBR${key}`} />); });
      const project = (
        <li key={`showcase${i}`}>
          <div>
            {showcaseProjectData}
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
            Showcase Projects
            <ul>
              {this.renderProjects()}
            </ul>
          </div>
      </React.Fragment>
    );
  }
}

Showcase.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Showcase);
