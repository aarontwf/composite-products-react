import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './pages/store';
import ProductServiceFactory from './domain/service/ProductServiceFactory';

const delay = (millis: number) => new Promise((resolve) => {
  setTimeout(resolve, millis);
});

const service = ProductServiceFactory.online('/api');

delay(1000).then(() => {
  store.dispatch({
    type: 'LOADING'
  });

  service.getCompositeProducts()
    .then((composites) => {
      store.dispatch({type: 'LOAD_SUCCESS', compositeProducts: composites});
    })
    .catch((error) => {
      store.dispatch({type: 'LOAD_FAIL', error: error});
    });
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
