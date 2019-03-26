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
      keys.forEach((key) => { openProjectData.push(`${key}: ${data[i][key]}`); openProjectData.push(<br key={`openProjectsBR${key}`} />); });
      const project = (
        <li key={`open-projects${i}`}>
          <div>
            {openProjectData}
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
          Open Projects
          <ul>
            {this.renderProjects()}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

Ideas.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchProjects: PropTypes.func.isRequired,
};

Ideas.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};
export default connect(mapStateToProps, mapDispatchToProps)(Ideas);
