import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MemberViewCard from '../components/MemberViewCard';
import { fetchMembers as fetchTeamAction } from '../actions/allActions';
import Loading from '../components/Loading';
import colors from '../components/Pallete';

import '../overrides.css';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
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

function renderSections(array, string, classes) {
  let color = colors.color4;
  if (string === 'Senior Undergraduates') {
    color = colors.color1;
  } if (string === 'Junior Undergraduates') {
    color = colors.color2;
  } if (string === 'Sophomores') {
    color = colors.color3;
  }

  const section = (
    <React.Fragment>
      <Typography gutterBottom variant="h5" className={classes.centerText}>
        <span style={{ background: `${color.main}`, color: `${color.text}` }}>
          {string}
        </span>
      </Typography>
      <Grid container>
        {array}
      </Grid>
    </React.Fragment>
  );
  return section;
}


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
    const {
      data, isLoading, error,
    } = this.props;

    if (isLoading !== false) {
      return (
        <Loading />
      );
    }
    if (error) {
      return 'Error';
    }

    let renders = {};
    const senior = []; const junior = []; const sopho = []; const alumni = [];

    const keys = Object.keys(data[0]);

    for (let i = 0; i < data.length; i += 1) {
      const memberData = {};
      keys.forEach((key) => { memberData[key] = data[i][key]; });

      if (memberData.display_on_website === true) {
        const col = (
          <Grid item key={`frag${i}`} xs={6} sm={4} md={3} xl={2}>
            <MemberViewCard memberData={memberData} isLoading={isLoading} />
          </Grid>
        );
        if (memberData.category === 'Senior Undergraduate') {
          senior.push(col);
        } else if (memberData.category === 'Junior Undergraduate') {
          junior.push(col);
        } else if (memberData.category === 'Sophomore') {
          sopho.push(col);
        } else {
          alumni.push(col);
        }
      }
    }

    renders = {
      senior,
      junior,
      sopho,
      alumni,
    };
    return renders;
  }

  render() {
    const { classes, isLoading } = this.props;
    const renders = this.renderMembers();
    let render = (
      <div className="section">
        Loading
      </div>
    );
    if (isLoading === false) {
      const seniorSection = renderSections(renders.senior, 'Senior Undergraduates', classes);
      const juniorSection = renderSections(renders.junior, 'Junior Undergraduates', classes);
      const sophoSection = renderSections(renders.sopho, 'Sophomores', classes);
      const alumniSection = renderSections(renders.alumni, 'Alumni', classes);
      render = (
        <React.Fragment>
          {seniorSection}
          {juniorSection}
          {sophoSection}
          {alumniSection}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container>
          <Grid container item md={1} />
          <Grid container item xs={12} md={10}>
            {render}
          </Grid>
          <Grid container item md={1} />
        </Grid>
      </React.Fragment>
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
