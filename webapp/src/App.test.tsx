import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/NavBar', () => () => <div data-testid="nav-bar" />);
jest.mock('./components/CompositeProductList', () => () => <div data-testid="composite-list" />);

test('Renders nav bar', () => {
  render(<App />);
  const navBar = screen.getByTestId('nav-bar');
  expect(navBar).toBeInTheDocument();
});

test('Renders composite product list', () => {
  render(<App />);
  const navBar = screen.getByTestId('composite-list');
  expect(navBar).toBeInTheDocument();
});
