import React from 'react';
import CompositeProductListPage from './pages/composite-product-list/CompositeProductListPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CompositeProductDialog from './pages/composite-product-dialog/CompositeProductDialog';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/composite-products">
            <CompositeProductListPage />
          </Route>

          <Redirect from="/" to="/composite-products" />
        </Switch>

        <Switch>
          <Route path="/composite-products/add">
            <CompositeProductDialog />
          </Route>

          <Route path="/composite-products/:uuid">
            <CompositeProductDialog />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
