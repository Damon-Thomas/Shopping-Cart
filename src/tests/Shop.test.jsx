import { render, screen } from '@testing-library/react';
import Shop from '../Shop';
import { expect } from 'vitest';




describe('Shop', () => {
  it('renders Shop as usual', () => {
    const { container } = render(<Shop />);
    expect(container).toMatchSnapshot();
  });
});





