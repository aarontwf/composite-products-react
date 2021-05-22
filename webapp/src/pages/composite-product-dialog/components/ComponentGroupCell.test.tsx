import { render, screen } from '@testing-library/react';
import ComponentGroup from '../../../domain/models/ComponentGroup';
import ComponentProduct from '../../../domain/models/ComponentProduct';
import ComponentGroupCell from './ComponentGroupCell';

jest.mock('./ComponentCell', () => () => <div data-testid="component-cell" />);

test('Renders group label', () => {
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group' };
  render(<ComponentGroupCell group={group} depth={5} path="" availableProducts={[]} />);

  const label = screen.getByText(/my group/i);
  expect(label).toBeInTheDocument();
});

test('Renders ComponentProductCell if product component given', async () => {
  const product1: ComponentProduct = { type: 'PRODUCT', quantity: 42, productId: '123' };
  const product2: ComponentProduct = { type: 'PRODUCT', quantity: 42, productId: '456' };
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group', components: [product1, product2] };
  render(<ComponentGroupCell group={group} depth={5} path="" availableProducts={[]} />);

  const subCells = await screen.findAllByTestId('component-cell');
  expect(subCells).toHaveLength(2);
});
