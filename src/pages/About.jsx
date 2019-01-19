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

class About extends React.Component {
  renderProjects() {
    const { isLoading, error } = this.props;
    let { data } = this.props;

    if (isLoading !== false) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    [data] = data;

    const keys = Object.keys(data);

    const aboutFields = [];
    keys.forEach((key) => {
      const listItem = (
        <li key={`aboutListItem${key}`}>
          {`${key}: ${data[key]}`}
        </li>
      );
      aboutFields.push(listItem);
    });
    return aboutFields;
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div>
                  About Club
          <ul>
            {this.renderProjects()}
          </ul>
        </div>
      </React.Fragment>

    );
  }
}

About.propTypes = {
  data: PropTypes.objectOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(About);
