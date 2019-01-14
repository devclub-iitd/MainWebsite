const fs = require('fs');
const readline = require('readline');
const {
  google,
} = require('googleapis');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error) => {
        if (error) console.error(error);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {
    client_secret,
    client_id,
    redirect_uris,
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function onFetch(sheetName, data) {
  const ref = firestore.collection(sheetName);

  for (let i = 0; i < data.length; i += 1) {
    ref.add(data[i]).then(() => {
      console.log(`Added data row ${i + 1} (out of ${data.length})`);
    });
  }
}

function fetchData(auth, sheetName, onFetchCallback) {
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1q0-Za7Ct-iu25LGCEZ8yDQkq6d-jx-0UJeXtLthjNgQ',
    range: sheetName,
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const rows = res.data.values;

    const data = [];

    for (let i = 1; i < rows.length; i += 1) {
      const dataRow = {};
      for (let j = 0; j < rows[0].length; j += 1) {
        dataRow[rows[0][j]] = rows[i][j];
      }
      data.push(dataRow);
    }
    console.log('Data Fetched');
    onFetchCallback(sheetName, data);
  });
}

function transferData(auth) {
  // const sheets = ['open-projects', 'showcase', 'about', 'members'];
  // for(let i=0;)
  fetchData(auth, process.argv[2], onFetch);
  console.log('Fetching Data');
}

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), transferData);
});
