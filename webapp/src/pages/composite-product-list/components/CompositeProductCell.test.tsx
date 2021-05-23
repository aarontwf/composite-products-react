import { render, screen } from '@testing-library/react';
import CompositeProductCell from './CompositeProductCell';

test('Renders given name', () => {
  render(<CompositeProductCell id="1" name="My Composite" directComponentCount={5} />);
  const compositeName = screen.getByText(/my composite/i);
  expect(compositeName).toBeInTheDocument();
});

test('Renders given direct component count when not empty', () => {
  render(<CompositeProductCell id="1" name="My Composite" directComponentCount={5} />);
  const directComponentsLabel = screen.getByText(/5 direct components/i);
  expect(directComponentsLabel).toBeInTheDocument();
});

test('Renders given direct component count when empty', () => {
  render(<CompositeProductCell id="1" name="My Composite" directComponentCount={0} />);
  const directComponentsLabel = screen.getByText(/No components/i);
  expect(directComponentsLabel).toBeInTheDocument();
});
