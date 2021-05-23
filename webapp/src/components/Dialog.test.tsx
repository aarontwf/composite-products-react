import { render, screen } from '@testing-library/react';
import Dialog from "./Dialog";

test('Renders content', () => {
  render(<Dialog>My dialog content</Dialog>);
  const message = screen.getByText(/my dialog content/i);
  expect(message).toBeInTheDocument();
});
