import React from 'react';
import CompositeProductListPage from './pages/composite-product-list/CompositeProductListPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

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
      </Router>
    );
  }
}

export default App;
