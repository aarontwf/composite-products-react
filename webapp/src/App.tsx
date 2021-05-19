import React from 'react';
import CompositeProductList from './components/CompositeProductList';
import NavBar from './components/NavBar';
import CompositeProduct from './domain/models/CompositeProduct';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
    const composites: CompositeProduct[] = [
      { id: '1', name: 'First 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }, { type: 'PRODUCT', quantity: 5, productId: '' }] },
      { id: '2', name: 'Second 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }] },
    ];

    return (
      <div>
        <NavBar title="Composite Products" />

        <main>
          <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
            <Router>
              <Switch>
                <Route path="/composite-products">
                  <CompositeProductList compositeProducts={composites} />
                </Route>

                <Redirect from="/" to="/composite-products" />
              </Switch>
            </Router>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
