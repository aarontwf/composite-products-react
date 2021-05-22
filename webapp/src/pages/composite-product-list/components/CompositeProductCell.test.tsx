import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CompositeProductCell from './CompositeProductCell';

// TODO split product cell so router wrapper is not required to test

test('Renders given name', () => {
  render(
    <MemoryRouter>
      <CompositeProductCell id="1" name="My Composite" directComponentCount={5} />
    </MemoryRouter>
  );
  const compositeName = screen.getByText(/my composite/i);
  expect(compositeName).toBeInTheDocument();
});

test('Renders given direct component count when not empty', () => {
  render(
    <MemoryRouter>
      <CompositeProductCell id="1" name="My Composite" directComponentCount={5} />
    </MemoryRouter>
  );
  const directComponentsLabel = screen.getByText(/5 direct components/i);
  expect(directComponentsLabel).toBeInTheDocument();
});

test('Renders given direct component count when empty', () => {
  render(
    <MemoryRouter>
      <CompositeProductCell id="1" name="My Composite" directComponentCount={0} />
    </MemoryRouter>
  );
  const directComponentsLabel = screen.getByText(/No components/i);
  expect(directComponentsLabel).toBeInTheDocument();
});
