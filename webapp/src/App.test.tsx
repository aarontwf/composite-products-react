import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders composite products title', () => {
  render(<App />);
  const textElement = screen.getByText(/composite products/i);
  expect(textElement).toBeInTheDocument();
});

