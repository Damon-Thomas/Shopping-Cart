import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders App', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});






  