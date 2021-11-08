import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { initStore } from "../state";
import '../styles/main.css';

const MyApp = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  store: PropTypes.any.isRequired,
};

export default withRedux(initStore)(MyApp);
