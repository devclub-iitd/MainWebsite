import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { VisibilityFilters, fetchProjects as fetchProjectsAction } from '../actions/allActions';
import IdeaViewPanel from '../components/IdeaViewPanel';
import IdeaFilter from '../components/IdeaFilter';
import Loading from '../components/Loading';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
  },
  list: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
  },
});

const getVisibleIdeas = (data, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return data;
    case VisibilityFilters.SHOW_LABEL1:
      return data.filter(d => d.labels.includes('label1'));
    case VisibilityFilters.SHOW_LABEL2:
      return data.filter(d => d.labels.includes('label2'));
    case VisibilityFilters.SHOW_LABEL3:
      return data.filter(d => d.labels.includes('label3'));
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = state => ({
  data: getVisibleIdeas(state.completeReducer.data.projects, state.visibilityFilter),
  isLoading: state.completeReducer.isLoading.projects,
  error: state.completeReducer.errorFetching.projects,
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjectsAction()),
});
class Ideas extends React.Component {
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

    let serialNo = 0;
    for (let i = 0; i < data.length; i += 1) {
      const openProjectData = [];
      keys.forEach((key) => { openProjectData[key] = data[i][key]; });
      if (openProjectData.showcase === false && openProjectData.display_on_website === true) {
        serialNo += 1;
        const project = (
          <div key={i}>
            <IdeaViewPanel
              openProjectData={openProjectData}
              isLoading={isLoading}
              serialNo={serialNo}
            />
          </div>
        );
        renders.push(project);
      }
    }

    return renders;
  }


  render() {
    const { classes, isLoading } = this.props;
    if (isLoading === false) {
      return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Typography gutterBottom variant="h5" className={classes.centerText}>
              Open Projects
            </Typography>
            <IdeaFilter />
            <Box boxShadow={2}>
              <div className={classes.list}>
                {this.renderProjects()}
              </div>
            </Box>
          </Container>
        </React.Fragment>
      );
    } return ( // isLoading === true
      <React.Fragment>
        <CssBaseline />
        <Typography gutterBottom variant="h5" className={classes.centerText}>
          Open Projects
        </Typography>
        {this.renderProjects()}
      </React.Fragment>
    );
  }
}

Ideas.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchProjects: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Ideas.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Ideas));
