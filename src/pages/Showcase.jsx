import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProjects as fetchProjectsAction } from '../actions/allActions';

const mapStateToProps = state => ({
  data: state.completeReducer.data.projects,
  isLoading: state.completeReducer.isLoading.projects,
  error: state.completeReducer.errorFetching.projects,
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsAction()),
});

class Showcase extends React.Component {
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
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchProjects: PropTypes.func.isRequired,
};

Showcase.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Showcase);
