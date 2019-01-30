import firestore from '../helpers/firebase';

function fetchSheetsData(callback) {
  const sheetNames = ['showcase', 'open-projects', 'members', 'about', 'events', 'resources'];

  sheetNames.forEach((sheetName) => {
    const resultObj = { data: [], isLoading: true, errorFetching: false };
    const ref = firestore.collection(sheetName);

    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        resultObj.data.push(doc.data());
      });
      resultObj.isLoading = false;
      callback(sheetName, resultObj);
    })
      .catch((error) => {
        resultObj.errorFetching = true;
        console.log(`Error fetching data for ${sheetName} : ${error}`);
        callback(sheetName, resultObj);
      });
  });
}

export default fetchSheetsData;
