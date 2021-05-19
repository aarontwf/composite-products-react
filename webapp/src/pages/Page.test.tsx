import { render, screen } from '@testing-library/react';
import Page from './Page';

jest.mock('../components/NavBar', () => () => <div data-testid="nav-bar" />);

test('Renders nav bar', () => {
  render(<Page />);
  const navBar = screen.getByTestId('nav-bar');
  expect(navBar).toBeInTheDocument();
});

test('Renders children', () => {
  render(<Page><h1>Hello World</h1></Page>);
  const pageContent = screen.getByText('Hello World');
  expect(pageContent).toBeInTheDocument();
});
