import { render, screen } from '@testing-library/react';
import EmptyCompositeMessage from './EmptyCompositeMessage';

test('Renders message', () => {
  render(<EmptyCompositeMessage />);
  const message = screen.getByText(/add a product or group above to get started/i);
  expect(message).toBeInTheDocument();
});
