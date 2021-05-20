import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compositeProductListStore } from './pages/composite-product-list/compositeProductListStore';
import ProductServiceFactory from './domain/service/ProductServiceFactory';
import { AsyncState } from './presentation/AsyncState';

const service = ProductServiceFactory.online('/api');

function loadCompositeProducts(): void {
  compositeProductListStore.dispatch({
    type: 'UPDATE_REQUEST',
    compositeProductsRequest: AsyncState.loading()
  });

  service.getCompositeProducts()
    .then((composites) => {
      compositeProductListStore.dispatch({
        type: 'UPDATE_REQUEST',
        compositeProductsRequest: AsyncState.success(composites)
      });
    })
    .catch((error) => {
      compositeProductListStore.dispatch({
        type: 'UPDATE_REQUEST',
        compositeProductsRequest: AsyncState.fail(error)
      });
    });
}

loadCompositeProducts();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={compositeProductListStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
