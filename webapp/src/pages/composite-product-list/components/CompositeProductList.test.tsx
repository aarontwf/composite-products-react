import { render, screen } from '@testing-library/react';
import CompositeProduct from '../../../domain/models/CompositeProduct';
import CompositeProductList from './CompositeProductList';

const mockComposites: CompositeProduct[] = [
  { id: '1', name: 'First 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }, { type: 'PRODUCT', quantity: 5, productId: '' }] },
  { id: '2', name: 'Second 1800mm Desk Box Set', components: [{ type: 'PRODUCT', quantity: 5, productId: '' }] },
];

jest.mock('./CompositeProductCell', () => () => <div data-testid="composite-cell" />);

test('Renders 0 composites when empty list given', () => {
  render(<CompositeProductList compositeProducts={[]} />);
  const compositeCountLabel = screen.getByText(/composites/i);
  const compositeCountValue = screen.getByText('0');
  expect(compositeCountLabel).toBeInTheDocument();
  expect(compositeCountValue).toBeInTheDocument();
});

test('Renders correct composite count when non-empty list given', () => {
  render(<CompositeProductList compositeProducts={mockComposites} />);
  const compositeCountLabel = screen.getByText(/composites/i);
  const compositeCountValue = screen.getByText('2');
  expect(compositeCountLabel).toBeInTheDocument();
  expect(compositeCountValue).toBeInTheDocument();
});

test('Renders no cells when empty list given', () => {
  render(<CompositeProductList compositeProducts={[]} />);
  const cells = screen.queryByTestId('composite-cell');
  expect(cells).toBeNull();
});

test('Renders correct number of cells when non-empty list given', async () => {
  render(<CompositeProductList compositeProducts={mockComposites} />);
  const cells = await screen.findAllByTestId('composite-cell');
  expect(cells).toHaveLength(2);
});
