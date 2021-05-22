import { render, screen } from '@testing-library/react';
import ComponentGroup from '../../../domain/models/ComponentGroup';
import ComponentProduct from '../../../domain/models/ComponentProduct';
import ComponentCell from './ComponentCell';

jest.mock('./ComponentGroupCell', () => () => <div data-testid="group-cell" />);
jest.mock('./ComponentProductCell', () => () => <div data-testid="product-cell" />);

test('Renders ComponentGroupCell if group component given', () => {
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group' };
  render(<ComponentCell component={group} path="" availableProducts={[]} />);

  const subCell = screen.getByTestId('group-cell');
  expect(subCell).toBeInTheDocument();
});

test('Renders ComponentProductCell if product component given', () => {
  const product: ComponentProduct = { type: 'PRODUCT', quantity: 42, productId: '123' };
  render(<ComponentCell component={product} path="" availableProducts={[]} />);

  const subCell = screen.getByTestId('product-cell');
  expect(subCell).toBeInTheDocument();
});
