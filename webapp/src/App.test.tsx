import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import App from './App';

jest.mock(
  './pages/composite-product-list/CompositeProductListPage',
  () => () => <div data-testid="composite-list-page" />
);

// TODO how to test initial route redirect to /composite-products

test("Composite products page route contains composite list page", () => {
  const history = createMemoryHistory();
  history.push('/composite-products')
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(history.location.pathname).toBe("/composite-products");

  const page = screen.getByTestId('composite-list-page');
  expect(page).toBeInTheDocument();
});
