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

/* eslint-disable */
const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
    fontWeight: '700',
  },
  line: {
    width: '50px',
    height: '10px',
    borderRadius: '4px',
    margin: 'auto',
    marginBottom: '25px',
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
  let color = colors.color5;
  if (string === 'Overall Coordinators') {
    color = colors.color1;
  } else if (string === 'Executives') {
    color = colors.color2;
  } else if (string === 'Developers') {
    color = colors.color3;
  } else if (string === 'Event Coordinators') {
    color = colors.color4;
  }

  const section = (
    <React.Fragment>
      <Typography gutterBottom variant="h4" className={classes.centerText}>
        <span>
          {string}
        </span>
      </Typography>
      <div className={classes.line} style={{ background: `${color.main}` }} />
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
    const overall = []; const exec = []; const dev = []; const event = []; const alumni = [];

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
        if (memberData.category === 'Overall Coordinator') {
          overall.push(col);
        } else if (memberData.category === 'Executive') {
          exec.push(col);
        } else if (memberData.category === 'Developer') {
          dev.push(col);
        } else if (memberData.category === 'Event Coordinator') {
          event.push(col);
        } else {
          alumni.push(col);
        }
      }
    }

    renders = {
      overall,
      exec,
      dev,
      event,
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
      const overallSection = renderSections(renders.overall, 'Overall Coordinators', classes);
      const execSection = renderSections(renders.exec, 'Executives', classes);
      const devSection = renderSections(renders.dev, 'Developers', classes);
      const eventSection = renderSections(renders.event, 'Event Coordinators', classes);
      const alumniSection = renderSections(renders.alumni, 'Alumni', classes);
      render = (
        <React.Fragment>
          {overallSection}
          {execSection}
          {devSection}
          {eventSection}
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
