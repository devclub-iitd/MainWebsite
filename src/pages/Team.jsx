import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
          <Col xs={12} md={6} lg={4}>
            <MemberViewCard memberData={memberData} isLoading={isLoading} />
          </Col>
        );
        renders.push(col);
      }
    }

    return renders;
  }

  render() {
    return (
      <React.Fragment>
        <Grid auto>
          <Row>
            {this.renderMembers()}
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

Team.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default Team;
