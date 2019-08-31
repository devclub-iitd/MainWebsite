import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactFullpage from '@fullpage/react-fullpage';
import MemberViewCard from '../components/MemberViewCard';
import { fetchMembers as fetchTeamAction } from '../actions/allActions';
import Loading from '../components/Loading';

import '../overrides.css';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing.unit * 10,
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
  let arrayLength = 2;
  if (window.innerWidth >= 960) {
    arrayLength = 6;
  } else if (window.innerWidth >= 600) {
    arrayLength = 4;
  }

  if (array.length <= arrayLength) {
    const section = (
      <React.Fragment>
        <Typography gutterBottom variant="h5" className={classes.centerText}>
          {string}
        </Typography>
        <Grid container>
          {array}
        </Grid>
      </React.Fragment>
    );
    return section;
  }
  const slides = [];
  for (let i = 0; i < array.length; i += arrayLength) {
    const slide = (
      <div className="slide">
        <Typography gutterBottom variant="h5" className={classes.centerText}>
          {string}
        </Typography>
        <Grid container>
          {array.slice(i, i + arrayLength)}
        </Grid>
      </div>
    );
    slides.push(slide);
  }
  return slides;
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
    const senior = []; const junior = []; const sopho = [];

    const keys = Object.keys(data[0]);

    for (let i = 0; i < data.length; i += 1) {
      const memberData = {};
      keys.forEach((key) => { memberData[key] = data[i][key]; });

      if (memberData.DisplayOnWebsite === 'Y') {
        const col = (
          <Grid item key={`frag${i}`} xs={12} sm={6} md={4}>
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
    const { classes, isLoading } = this.props;
    const renders = this.renderMembers();
    return (
      <Grid container>
        <Grid container item md={1} />
        <Grid container item xs={12} md={10}>
          <ReactFullpage
            slidesNavigation
            controlArrows={false}
            render={() => {
              if (isLoading === false) {
                const seniorSection = renderSections(renders.senior, 'Senior Undergraduates', classes);
                const juniorSection = renderSections(renders.junior, 'Junior Undergraduates', classes);
                const sophoSection = renderSections(renders.sopho, 'Sophomores', classes);
                return (
                  <ReactFullpage.Wrapper>
                    <div className="section">
                      {seniorSection}
                    </div>
                    <div className="section">
                      {juniorSection}
                    </div>
                    <div className="section">
                      {sophoSection}
                    </div>
                  </ReactFullpage.Wrapper>
                );
              }
              return (
                <ReactFullpage.Wrapper>
                  <div className="section">
                    Loading
                  </div>
                </ReactFullpage.Wrapper>
              );
            }}
          />
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
