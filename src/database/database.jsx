import firestore from '../helpers/firebase';

function fetchSheetsData(callback) {
  const sheetNames = ['showcase', 'open-projects', 'members', 'about', 'events', 'resources'];

  sheetNames.forEach((sheetName) => {
    console.log(sheetName);
    const resultObj = { data: [], isLoading: true, errorFetching: false };
    const ref = firestore.collection(sheetName);

    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        resultObj.data.push(doc.data());
        // this.setState((prevState) => {
        //   const newStateData = JSON.parse(JSON.stringify(prevState.data));
        //   newStateData[sheetName] = newStateData[sheetName] === undefined
        //     ? []
        //     : newStateData[sheetName];
        //   newStateData[sheetName] = [...newStateData[sheetName], doc.data()];
        //   return { data: newStateData };
        // });
      });
      resultObj.isLoading = false;
      callback(sheetName, resultObj);

      // this.setState(prevState => ({ isLoading: { ...prevState.isLoading, [sheetName]: false } }));
    })
      .catch((error) => {
        resultObj.errorFetching = true;
        // this.setState(prevState => ({
        //   isLoading: { ...prevState.isLoading, [sheetName]: false },
        //   errorFetchingFetching: { ...prevState.errorFetchingFetching, [sheetName]: true },
        // }));
        console.log(`Error fetching data for ${sheetName} : ${error}`);
        callback(sheetName, resultObj);

      });
  });
}

export default fetchSheetsData;
