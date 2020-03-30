import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TreeView from '../components/TreeView';
import { fetchResources as fetchResourcesAction } from '../actions/allActions';
import DisqusDialog from '../components/DisqusDialog';
import Loading from '../components/Loading';
import HeadingLine from '../components/HeadingLine';
import Anim from '../components/ResourceAnim';

const styles = theme => ({
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: theme.spacing(10),
    fontWeight: '700',
  },
  list: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
  },
  bottomButton: {
    position: 'absolute',
    bottom: '0px',
    display: 'flex',
    height: '80px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function processResourceData(data) {
  if (data === undefined) {
    return { archive: {}, new: {} };
  }

  const processedData = { archive: {}, new: {} };

  data.forEach((entry) => {
    if (entry.archive === 'Y') {
      if (processedData.archive[entry.directory_year] === undefined) {
        processedData.archive[entry.directory_year] = {};
      }
      if (processedData.archive[entry.directory_year][entry.subdirectory] === undefined) {
        processedData.archive[entry.directory_year][entry.subdirectory] = [];
      }

      processedData.archive[entry.directory_year][entry.subdirectory].push(entry);
    } else {
      if (processedData.new[entry.directory_year] === undefined) {
        processedData.new[entry.directory_year] = {};
      }
      if (processedData.new[entry.directory_year][entry.subdirectory] === undefined) {
        processedData.new[entry.directory_year][entry.subdirectory] = [];
      }

      processedData.new[entry.directory_year][entry.subdirectory].push(entry);
    }
  });

  return processedData;
}

const mapStateToProps = state => ({
  data: state.completeReducer.data.resources,
  isLoading: state.completeReducer.isLoading.resources,
  error: state.completeReducer.errorFetching.resources,
});

const mapDispatchToProps = dispatch => ({
  fetchResources: () => dispatch(fetchResourcesAction()),
});

class Misc extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    if (data === undefined || data.length === 0) {
      const { fetchResources } = this.props;
      fetchResources();
    }
  }

  render() {
    const { data, classes, isLoading } = this.props;

    if (isLoading !== false) {
      return (
        <Loading />
      );
    }
    const processedData = processResourceData(data);

    return (
      <React.Fragment>
        <CssBaseline />
        <Anim />
        <Typography gutterBottom variant="h4" className={classes.centerText}>
          Resources
        </Typography>
        <HeadingLine />
        <Container maxWidth="sm">
          <div className={classes.list}>
            <TreeView data={processedData.archive} isLoading={isLoading} />
            <TreeView data={processedData.new} isLoading={isLoading} />
          </div>
        </Container>
        <div className={classes.bottomButton}>
          <DisqusDialog
            url="Resources"
            id="Resources"
            title="Resources"
          />
        </div>
      </React.Fragment>
    );
  }
}

Misc.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  fetchResources: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

Misc.defaultProps = {
  data: [],
  isLoading: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Misc));
