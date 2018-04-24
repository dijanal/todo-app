import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAaX8I74Pu-5_zYkUAUzsQFf4BfIhrwXnE",
    authDomain: "todo-app-4545e.firebaseapp.com",
    databaseURL: "https://todo-app-4545e.firebaseio.com",
    projectId: "todo-app-4545e",
    storageBucket: "todo-app-4545e.appspot.com",
    messagingSenderId: "903343238776"
};
const fire = firebase.initializeApp(config);
export default fire
