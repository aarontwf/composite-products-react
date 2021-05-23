import { render, screen } from '@testing-library/react';
import ComponentGroup from '../../../domain/models/ComponentGroup';
import ComponentProduct from '../../../domain/models/ComponentProduct';
import ComponentGroupCell from './ComponentGroupCell';

jest.mock('./ComponentCell', () => () => <div data-testid="component-cell" />);
jest.mock('./buttons/AddProductButton', () => () => <div data-testid="add-product-button" />);
jest.mock('./buttons/AddGroupButton', () => () => <div data-testid="add-group-button" />);
jest.mock('./buttons/DeleteComponentButton', () => () => <div data-testid="delete-component-button" />);

test('Renders group label', () => {
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group' };
  render(<ComponentGroupCell group={group} depth={0} path="test" availableProducts={[]} />);

  const label = screen.getByText(/my group/i);
  expect(label).toBeInTheDocument();
});

test('Renders ComponentCell if it has sub-components', async () => {
  const product1: ComponentProduct = { type: 'PRODUCT', quantity: 42, productId: '123' };
  const product2: ComponentProduct = { type: 'PRODUCT', quantity: 42, productId: '456' };
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group', components: [product1, product2] };
  render(<ComponentGroupCell group={group} depth={0} path="test" availableProducts={[]} />);

  const subCells = await screen.findAllByTestId('component-cell');
  expect(subCells).toHaveLength(2);
});

test('Renders add product button label', () => {
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group' };
  render(<ComponentGroupCell group={group} depth={0} path="test" availableProducts={[]} />);

  const button = screen.getByTestId('add-product-button');
  expect(button).toBeInTheDocument();
});

test('Renders add group button label', () => {
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group' };
  render(<ComponentGroupCell group={group} depth={0} path="test" availableProducts={[]} />);

  const button = screen.getByTestId('add-group-button');
  expect(button).toBeInTheDocument();
});

test('Renders delete component button when remove callback given', () => {
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group' };
  render(<ComponentGroupCell group={group} depth={0} path="test" availableProducts={[]} onRemovePressed={() => {}} />);

  const button = screen.getByTestId('delete-component-button');
  expect(button).toBeInTheDocument();
});

test('Does not render delete component button when remove callback ommitted', async () => {
  const group: ComponentGroup = { type: 'GROUP', label: 'My Group' };
  render(<ComponentGroupCell group={group} depth={0} path="test" availableProducts={[]} />);

  const buttons = await screen.queryAllByTestId('delete-component-button');
  expect(buttons).toHaveLength(0);
});
