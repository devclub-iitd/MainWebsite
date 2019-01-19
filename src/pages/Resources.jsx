import React from 'react';
import TreeView from '../components/TreeView';

function processResourceData(data) {
  if (data === undefined) {
    return {};
  }

  const processedData = {};

  data.forEach((entry) => {
    if (processedData[entry.directory_year] === undefined) {
      processedData[entry.directory_year] = {};
    }
    if (processedData[entry.directory_year][entry.sub_directory] === undefined) {
      processedData[entry.directory_year][entry.sub_directory] = [];
    }
    processedData[entry.directory_year][entry.sub_directory].push(entry);
  });

  return processedData;
}

const Resources = (props) => {
  const { data } = props;
  const processedData = processResourceData(data);
  return (
    <TreeView data={processedData} />
  );
};

// class Resources extends React.Component {
//   render() {
//     const { data } = this.props;
//     const processedData = processResourceData(data);
//     return (
//       <TreeView data={processedData} />
//     );
//   }
// }
export default Resources;
