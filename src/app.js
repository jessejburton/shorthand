import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetNotes } from './actions/notes';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
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

// setTimeout(renderApp, 3000); // test loading
store.dispatch(startSetNotes()).then(() => {
  renderApp();
});
