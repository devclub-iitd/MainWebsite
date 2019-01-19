import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        About Club
        <ul>
          {this.renderProjects()}
        </ul>
      </div>
    );
  }
}

About.propTypes = {
  data: PropTypes.objectOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default About;
