import { render, screen } from '@testing-library/react';
import CompositeProductCell from './CompositeProductCell';

test('Renders given name', () => {
  render(<CompositeProductCell name="My Composite" directComponentCount={5} />);
  const compositeName = screen.getByText(/my composite/i);
  expect(compositeName).toBeInTheDocument();
});

test('Renders given direct component count', () => {
  render(<CompositeProductCell name="My Composite" directComponentCount={5} />);
  const directComponentsLabel = screen.getByText(/5 direct components/i);
  expect(directComponentsLabel).toBeInTheDocument();
});
