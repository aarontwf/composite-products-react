import { render, screen } from '@testing-library/react';
import ErrorState from './ErrorState';

test('Renders given title', () => {
  render(<ErrorState title="Not Found" description="Composite product does not exist" />);
  const labelText = screen.getByText(/not found/i);
  expect(labelText).toBeInTheDocument();
});

test('Renders given description', () => {
  render(<ErrorState title="Not Found" description="Composite product does not exist" />);
  const labelText = screen.getByText(/composite product does not exist/i);
  expect(labelText).toBeInTheDocument();
});
