import React from 'react';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import MemberViewCard from '../components/MemberViewCard';

class Team extends React.Component {
  renderMembers() {
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
      const memberData = {};
      keys.forEach((key) => { memberData[key] = data[i][key]; });
      // const project = (
      //   <li key={`member${i}`}>
      //     <div>
      //       {memberData.DisplayOnWebsite}
      //       {' '}
      //       <br />
      //     </div>
      //     <br />
      //   </li>
      // );
      if (memberData.DisplayOnWebsite === 'Y') {
        const col = (
          <React.Fragment key={`frag${i}`}>
            <MemberViewCard memberData={memberData} isLoading={isLoading} />
          </React.Fragment>
        );
        renders.push(col);
      }
    }

    return renders;
  }

  render() {
    return (
      <React.Fragment>
        <StackGrid columnWidth={400}>
          {this.renderMembers()}
        </StackGrid>
      </React.Fragment>
    );
  }
}

Team.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

Team.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};

export default Team;
