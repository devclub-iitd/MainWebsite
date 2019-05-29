import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import MemberViewCard from '../components/MemberViewCard';
import { fetchMembers as fetchTeamAction } from '../actions/allActions';
import ReactFullpage from '@fullpage/react-fullpage';

import "../overrides.css";

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

      if (memberData.DisplayOnWebsite === 'Y') {
        const col = (
          <Grid item key={`frag${i}`} xs={12} md={4} lg={3}>
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

  renderSections(array) {
    let arrayLength = 2;
    if (window.innerWidth >= 1280) {
      arrayLength = 8;
    } else if (window.innerWidth >= 480) {
      arrayLength = 6;
    }
    console.log(arrayLength);

    if (array.length <= arrayLength) {
      const section = (
        <Grid container>
          {array}
        </Grid>
      );
      return section;
    } else {
      let slides = [];
      for (let i = 0; i < array.length; i += arrayLength) {
        const slide = (
          <div className="slide">
            <Grid container>
              {array.slice(i, i+arrayLength)}
            </Grid>
          </div>
        );
        slides.push(slide);
      }
      return slides;
    }
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
            render={({ state, fullpageApi }) => {
              if (isLoading === false) {
                let seniorSection = this.renderSections(renders.senior);
                let juniorSection = this.renderSections(renders.junior);
                let sophoSection = this.renderSections(renders.sopho);
                return (                                                                                                                                                                                                                                                        
                  <ReactFullpage.Wrapper>
                    <div className="section">
                      <Typography gutterBottom variant="h5" className={classes.centerText}>
                        Senior Undergraduates
                      </Typography>
                      {seniorSection}
                    </div>
                    <div className="section">
                      <Typography gutterBottom variant="h5" className={classes.centerText}>
                        Junior Undergraduates
                      </Typography>
                      {juniorSection}
                    </div>
                    <div className="section">
                      <Typography gutterBottom variant="h5" className={classes.centerText}>
                        Sophomores
                      </Typography>
                      {sophoSection}
                    </div>
                  </ReactFullpage.Wrapper>
                );
              } else {
                return (
                  <ReactFullpage.Wrapper>
                    <div className="section">
                      Loading
                    </div>
                  </ReactFullpage.Wrapper>
                );
              }
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
