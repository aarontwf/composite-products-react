import React from 'react';
import CompositeProductListPage from './pages/composite-product-list/CompositeProductListPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dialog from './components/Dialog';
import CompositeProductDialog from './pages/composite-product-dialog/CompositeProductDialog';

// TODO Add new product/group
// TODO Editable group name
// TODO Add new composite product
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
            <Dialog title="My new composite product">
              <p className="text-sm text-gray-500">
                Create the composite product
              </p>
            </Dialog>
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
