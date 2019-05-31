import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Typography, withStyles } from '@material-ui/core';
import { fetchProjects as fetchProjectsAction } from '../actions/allActions';
import IdeaViewPanel from '../components/IdeaViewPanel';

const styles = theme => ({
  backgroundPaper: {
    padding: theme.spacing(8, 11),
  },
});

const mapStateToProps = state => ({
  data: state.completeReducer.data.projects,
  isLoading: state.completeReducer.isLoading.projects,
  error: state.completeReducer.errorFetching.projects,
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsAction()),
});
class Ideas extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    if (data === undefined || data.length === 0) {
      const { fetchProjects } = this.props;
      fetchProjects();
    }
  }

  renderProjects() {
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
      const openProjectData = [];
      //  keys.forEach((key) => { openProjectData.push(`${key}: ${data[i][key]}`); openProjectData.push(<br key={`openProjectsBR${key}`} />); });
      keys.forEach((key) => { openProjectData[key] = data[i][key]; });
      const project = (
        <div>
          <IdeaViewPanel openProjectData={openProjectData} isLoading={isLoading} />
        </div>
      );
      renders.push(project);
    }

    return renders;
  }


  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.backgroundPaper}>
          <Typography>
            Open Projects
          </Typography>
          {this.renderProjects()}
        </Paper>
      </React.Fragment>
    );
  }
}

Ideas.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchProjects: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Ideas.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Ideas));
