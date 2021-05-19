import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

test('Renders given title text', () => {
  render(<NavBar title="My Title" />);
  const textElement = screen.getByText(/my title/i);
  expect(textElement).toBeInTheDocument();
});
