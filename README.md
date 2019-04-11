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
* Using ~~firestore database~~ DynamoDB to fetch data dynamically.

## Instructions

* Fill in API links in src/config/API.js before using.

## Design Practices

* A common theme for the Website has been used. The theme colors can be set in the file **components/Pallete.js**. Each color has its own variants.
Colors can be accessed in other files in the following manner:  

```javascript
import colors from '<path_to_components_folder>/Pallete';
...

...
// Use the color here
colors.color1.main
```
