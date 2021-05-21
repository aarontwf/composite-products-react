import { render, screen } from '@testing-library/react';
import { AsyncState } from '../../presentation/AsyncState';
import CompositeProductListScreen from './CompositeProductListScreen';

jest.mock('../../components/NavBar', () => () => <div data-testid="nav-bar" />);
jest.mock('../../components/ErrorState', () => () => <div data-testid="error-state" />);
jest.mock('./components/CompositeProductList', () => () => <div data-testid="composite-list" />);
jest.mock('./components/CompositeListLoadingMask', () => () => <div data-testid="loading-mask" />);

test('Renders page title', () => {
  render(<CompositeProductListScreen request={AsyncState.uninitialized()} />);
  const titleLabel = screen.getByText(/composite products/i);
  expect(titleLabel).toBeInTheDocument();
});

test('Renders page subtitle', () => {
  render(<CompositeProductListScreen request={AsyncState.uninitialized()} />);
  const subtitleLabel = screen.getByText(/collections of products and groups/i);
  expect(subtitleLabel).toBeInTheDocument();
});

test('Renders add button', () => {
  render(<CompositeProductListScreen request={AsyncState.uninitialized()} />);
  const buttonLabel = screen.getByText(/add/i);
  expect(buttonLabel).toBeInTheDocument();
});

test('Renders loading mask when loading', () => {
  render(<CompositeProductListScreen request={AsyncState.loading()} />);
  const loadMask = screen.getByTestId('loading-mask');
  expect(loadMask).toBeInTheDocument();
});

test('Renders composite product list when loaded', () => {
  render(<CompositeProductListScreen request={AsyncState.success([])} />);
  const compositeList = screen.getByTestId('composite-list');
  expect(compositeList).toBeInTheDocument();
});

test('Renders composite product list when failed', () => {
  render(<CompositeProductListScreen request={AsyncState.fail('Example Error')} />);
  const errorState = screen.getByTestId('error-state');
  expect(errorState).toBeInTheDocument();
});
