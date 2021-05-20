import React from 'react';
import CompositeProductListPage from './pages/composite-product-list/CompositeProductListPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dialog from './components/Dialog';

// TODO Routing
// TODO Redux
// TODO Add/Edit dialog
// TODO Button theming
// TODO i18n
// TODO List paging?

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
            <Dialog title="My composite product">
              <p className="text-sm text-gray-500">
                Edit the composite product
              </p>
            </Dialog>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
