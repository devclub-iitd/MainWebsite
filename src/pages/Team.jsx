import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import MemberViewCard from '../components/MemberViewCard';

const centerText = {
  justifyContent: 'center',
};

class Team extends React.Component {
  renderMembers() {
    const { data, isLoading, error } = this.props;

    if (isLoading !== false) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    let renders = {};
    const senior = []; const junior = []; const sopho = [];

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
          <Grid item key={`frag${i}`} xs={12} md={6} lg={3}>
            <MemberViewCard memberData={memberData} isLoading={isLoading} />
          </Grid>
        );
        if (memberData.Category === 'Senior Undergraduate') {
          senior.push(col);
        } else if (memberData.Category === 'Junior Undergraduate') {
          junior.push(col);
        } else {
          sopho.push(col);
        }
      }
    }

    renders = {
      senior,
      junior,
      sopho,
    };
    return renders;
  }

  render() {
    const rendered = this.renderMembers();
    return (
      <Grid container>
        <Grid container item md={1} />
        <Grid container item xs={12} md={10}>
          <Typography gutterBottom variant="h5" style={centerText}>
            Senior Undergraduates
          </Typography>
          <Grid container>
            {rendered.senior}
          </Grid>
          <Divider />
          <Typography gutterBottom variant="h5" style={centerText}>
            Junior Undergraduates
          </Typography>
          <Divider />
          <Grid container>
            {rendered.junior}
          </Grid>
          <Divider />
          <Typography gutterBottom variant="h5" style={centerText}>
            Sophomores
          </Typography>
          <Divider />
          <Grid container>
            {rendered.sopho}
          </Grid>
        </Grid>
        <Grid container item md={1} />
      </Grid>
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
