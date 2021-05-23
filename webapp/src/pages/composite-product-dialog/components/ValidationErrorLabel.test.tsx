import { render, screen } from '@testing-library/react';
import ValidationErrorLabel from './ValidationErrorLabel';

test('Renders content', () => {
  render(<ValidationErrorLabel>My validation content</ValidationErrorLabel>);
  const message = screen.getByText(/my validation content/i);
  expect(message).toBeInTheDocument();
});
