import { render, screen } from '@testing-library/react';
import App from '../containers/App/App';

test('renders learn text toolbar', () => {
  render(<App />);
  const h6Element = screen.getByText(/Managing Gateways/i);
  expect(h6Element).toBeInTheDocument();
});
