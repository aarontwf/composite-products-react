import { render, screen } from '@testing-library/react';
import Button from './Button';

test('Renders given label', () => {
  render(<Button label="My Button" />);
  const labelText = screen.getByText(/my button/i);
  expect(labelText).toBeInTheDocument();
});
