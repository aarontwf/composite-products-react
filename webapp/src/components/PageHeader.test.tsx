import { render, screen } from '@testing-library/react';
import PageHeader from "./PageHeader";

test('Renders given title', () => {
  render(<PageHeader title="My Title" subtitle="My subtitle" />);
  const labelText = screen.getByText(/my title/i);
  expect(labelText).toBeInTheDocument();
});

test('Renders given subtitle', () => {
  render(<PageHeader title="My Title" subtitle="My subtitle" />);
  const labelText = screen.getByText(/my subtitle/i);
  expect(labelText).toBeInTheDocument();
});
