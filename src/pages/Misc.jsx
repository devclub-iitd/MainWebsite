import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TreeView from '../components/TreeView';
import { fetchResources as fetchResourcesAction } from '../actions/allActions';
import CustomModal from '../components/CustomModal';

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
      if (processedData.archive[entry.directory_year][entry.sub_directory] === undefined) {
        processedData.archive[entry.directory_year][entry.sub_directory] = [];
      }

      processedData.archive[entry.directory_year][entry.sub_directory].push(entry);
    } else {
      if (processedData.new[entry.directory_year] === undefined) {
        processedData.new[entry.directory_year] = {};
      }
      if (processedData.new[entry.directory_year][entry.sub_directory] === undefined) {
        processedData.new[entry.directory_year][entry.sub_directory] = [];
      }

      processedData.new[entry.directory_year][entry.sub_directory].push(entry);
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
    const { data } = this.props;
    const processedData = processResourceData(data);
    return (
      <div>
        <CustomModal
          id="Misc"
        />
        <TreeView data={processedData.archive} />
        <TreeView data={processedData.new} />
      </div>
    );
  }
}

Misc.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  fetchResources: PropTypes.func.isRequired,
};

Misc.defaultProps = {
  data: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Misc);
