import React from 'react';
import CompositeProductListPage from './pages/composite-product-list/CompositeProductListPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CompositeProductDialog from './pages/composite-product-dialog/CompositeProductDialog';

// TODO Editable group name
// TODO Add new composite product
// TODO Editable composite name
// TODO Disable buttons while saving
// TODO Quantity validation
// TODO Button theming
// TODO i18n
// TODO Error state reload button

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
