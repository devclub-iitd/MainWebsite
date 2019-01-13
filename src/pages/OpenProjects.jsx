import React from 'react';
import PropTypes from 'prop-types';

class OpenProjects extends React.Component {
  renderProjects() {
    const { data, isLoading, error } = this.props;

    if (isLoading) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    const renders = [];

    for (let i = 0; i < data.length; i += 1) {
      const project = (
        <li key={`open-projects${i}`}>
          {data[i].name}
        </li>
      );
      renders.push(project);
    }

    return renders;
  }

  render() {
    return (
      <div>
        Open Projects
        <ul>
          {this.renderProjects()}
        </ul>
      </div>
    );
  }
}

OpenProjects.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default OpenProjects;
