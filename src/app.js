import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetNotes } from './actions/notes';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import firebase from 'firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/pages/LoadingPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faPlus, faLightbulb, faExclamation, faCheckSquare, faQuestion, faEdit, faSquare
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faPlus,
  faLightbulb,
  faExclamation,
  faCheckSquare,
  faQuestion,
  faEdit,
  faSquare
);

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Destructure the User
    const {
      uid,
      displayName = '',
      email = '',
      photoURL = ''
    } = user;

    // Log the user in and get the necessary data
    Promise.all([
      store.dispatch(login({ uid, displayName, email, photoURL })),
      store.dispatch(startSetNotes())
    ]).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/notes');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

