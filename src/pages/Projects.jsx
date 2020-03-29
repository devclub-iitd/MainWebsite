import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactFullpage from '@fullpage/react-fullpage';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fetchProjects as fetchProjectsAction } from '../actions/allActions';
import ProjectViewCard from '../components/ProjectViewCard';
import Loading from '../components/Loading';
import HeadingLine from '../components/HeadingLine';

import '../overrides.css';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
    fontWeight: '700'
  },
});

const mapStateToProps = state => ({
  data: state.completeReducer.data.projects,
  isLoading: state.completeReducer.isLoading.projects,
  error: state.completeReducer.errorFetching.projects,
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsAction()),
});

class Projects extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    if (data === undefined || data.length === 0) {
      const { fetchProjects } = this.props;
      fetchProjects();
    }
  }

  renderProjects() {
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

    const renders = [];
    const keys = Object.keys(data[0]);
    let arg = 0;
    let group = []; // Counter to make groups of projects to be shown on a single page
    let groupLength = 1;
    if (window.innerWidth >= 1280) {
      groupLength = 3;
    } else if (window.innerWidth >= 480) {
      groupLength = 2;
    }

    for (let i = 0; i < data.length; i += 1) {
      const projectData = {};
      keys.forEach((key) => { projectData[key] = data[i][key]; });
      if (projectData.display_on_website === true) {
        arg += 1;
        projectData.arg = `${arg}`;
        const project = (
          <Grid item key={`showcase${i}`} xs={12} md={6} lg={4}>
            <ProjectViewCard projectData={projectData} isLoading={isLoading} />
          </Grid>
        );
        group.push(project);
        if (group.length === groupLength) {
          // Number of projects to be displayed in a single FullPage Component
          const section = (
            <div className="section" key={i}>
              <Grid container>
                {group}
              </Grid>
            </div>
          );
          renders.push(section);
          group = [];
        }
      }
    }
    return renders;
  }

  render() {
    const { classes, isLoading } = this.props;
    const renderSection = this.renderProjects();
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container>
          <Grid container item md={1} />
          <Grid container item xs={12} md={10}>
            <Typography gutterBottom variant="h4" className={classes.centerText}>
              Showcase Projects
            </Typography>
            <HeadingLine />
            <ReactFullpage
              scrollBar
              render={({ state }) => {
                // eslint-disable-next-line no-console
                console.log(state);
                if (isLoading === false) {
                  return (
                    <ReactFullpage.Wrapper>
                      {renderSection}
                    </ReactFullpage.Wrapper>
                  );
                }
                return (
                  <ReactFullpage.Wrapper>
                    <div className="section">
                      <Box position="absolute" top="30%" left="50%">
                        <Loading />
                      </Box>
                    </div>
                  </ReactFullpage.Wrapper>
                );
              }}
            />
          </Grid>
          <Grid container item md={1} />
        </Grid>
      </React.Fragment>
    );
  }
}

Projects.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchProjects: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Projects.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Projects));
