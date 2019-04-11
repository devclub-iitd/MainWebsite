import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography, withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import MemberViewCard from '../components/MemberViewCard';
import { fetchMembers as fetchTeamAction } from '../actions/allActions';

const styles = () => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  data: state.completeReducer.data.members,
  isLoading: state.completeReducer.isLoading.members,
  error: state.completeReducer.errorFetching.members,
});

const mapDispatchToProps = dispatch => ({
  fetchMembers: () => dispatch(fetchTeamAction()),
});

class Team extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    if (data === undefined || data.length === 0) {
      const { fetchMembers } = this.props;
      fetchMembers();
    }
  }

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
    const { classes } = this.props;
    const renders = this.renderMembers();
    return (
      <Grid container>
        <Grid container item md={1} />
        <Grid container item xs={12} md={10}>
          <Typography gutterBottom variant="h5" className={classes.centerText}>
            Senior Undergraduates
          </Typography>
          <Grid container>
            {renders.senior}
          </Grid>
          <Divider />
          <Typography gutterBottom variant="h5" className={classes.centerText}>
            Junior Undergraduates
          </Typography>
          <Divider />
          <Grid container>
            {renders.junior}
          </Grid>
          <Divider />
          <Typography gutterBottom variant="h5" className={classes.centerText}>
            Sophomores
          </Typography>
          <Divider />
          <Grid container>
            {renders.sopho}
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
  fetchMembers: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Team.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Team));
