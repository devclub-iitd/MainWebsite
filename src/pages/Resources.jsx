import React from 'react';
import TreeView from '../components/TreeView';

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

const Resources = (props) => {
  const { data } = props;
  const processedData = processResourceData(data);
  return (
    <div>
      <TreeView data={processedData.archive} />
      <TreeView data={processedData.new} />
    </div>
  );
};

export default Resources;
