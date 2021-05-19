import { render, screen } from '@testing-library/react';
import CompositeProductListPage from './CompositeProductListPage';

jest.mock('../../components/CompositeProductList', () => () => <div data-testid="composite-list" />);

test('Renders composite product list', () => {
  render(<CompositeProductListPage />);
  const compositeList = screen.getByTestId('composite-list');
  expect(compositeList).toBeInTheDocument();
});
