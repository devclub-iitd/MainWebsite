Please read the following instructions carefully to run the script :-

* To activate firebase functions download service account credentials from https://console.firebase.google.com/project/main-website-38951/settings/serviceaccounts/adminsdk by clicking generate new private key.
(Note:- do not do this too many times.)
* Rename downloaded file as serviceAccountKey.json and put it in same directory as script.
* Clear the collection in firestore which you are going to migrate.
* Run script using `node index.js <SHEET-NAME>` where <SHEET-NAME> is the name of the sheet you want to transfer from spreadsheet to firestore.
* An auth page will be displayed if no Sheets API token is found. Login using the google account which has access to the sheet you are migrating from.