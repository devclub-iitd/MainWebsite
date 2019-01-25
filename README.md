# MainWebsite

Repo for the Main website of DevClub built on React using NodeJS

## Development Instructions

* `npm start` - Start development server
* `npm run build` - Build website for deployment
* `npm test` - Run test scripts (No tests written currently)

## Information

* Used NodeJS 11.x
* Install ESlint extension in VS Code to see instructions from style guide.
* Used airbnb's styleguide.
* Using firestore database to fetch data dynamically.

## Instructions

* Visit <https://console.firebase.google.com/project/main-website-38951/overview> and click on HTML icon (adjacent to Android icon) and copy config credentials.
* Paste these credentials into a copy of src/config/firebase_config.jsx.example at the appropriate location and rename this new file as firebase_config.jsx at the same location (src/config/firebase_config.jsx).