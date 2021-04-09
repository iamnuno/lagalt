# lagalt
Lagalt is a web application built by Vue and powered by Spring boot. It provides a social environment where users can create projects and join other projects. By joining a project, the user will be able to track project progress, communicate with other collaborators, and contribute to the project.

The app uses Firebase authentication, thus, the user needs to create an account to participate. The users have the option to view available projects anonymously.

The back-end repository for this application is available at [lagalt-api](https://github.com/nightfrost/Lagalt-API)

## Firebase configuration

Create a firebase project and add the configuration in `firebase.js` as below:

```js
var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Deployment
The application is deployed on [Heroku](https://lagaltno.herokuapp.com/).

## Contributors
- [Ahmad](https://github.com/AHAB-HUB)
- [Nuno](https://github.com/iamnuno)
- [Lucas](https://github.com/nightfrost)
- [Vytas](https://github.com/Vytas87)
