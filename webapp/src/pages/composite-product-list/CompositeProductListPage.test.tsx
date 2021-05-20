import { render, screen } from '@testing-library/react';
import CompositeProductListPage from './CompositeProductListPage';

jest.mock('../../components/NavBar', () => () => <div data-testid="nav-bar" />);
jest.mock('../../components/CompositeProductList', () => () => <div data-testid="composite-list" />);

test('Renders page title', () => {
  render(<CompositeProductListPage />);
  const titleLabel = screen.getByText(/composite products/i);
  expect(titleLabel).toBeInTheDocument();
});

test('Renders page subtitle', () => {
  render(<CompositeProductListPage />);
  const subtitleLabel = screen.getByText(/collections of products and groups/i);
  expect(subtitleLabel).toBeInTheDocument();
});

test('Renders add button', () => {
  render(<CompositeProductListPage />);
  const buttonLabel = screen.getByText(/add/i);
  expect(buttonLabel).toBeInTheDocument();
});

test('Renders composite product list', () => {
  render(<CompositeProductListPage />);
  const compositeList = screen.getByTestId('composite-list');
  expect(compositeList).toBeInTheDocument();
});
