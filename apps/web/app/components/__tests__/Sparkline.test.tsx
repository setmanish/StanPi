import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Sparkline from '../Sparkline';

describe('Sparkline', () => {
  it('renders a blank SVG of the given size when data is empty', () => {
    const { container } = render(<Sparkline data={[]} width={120} height={30} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('width')).toBe('120');
    expect(svg?.getAttribute('height')).toBe('30');
    expect(svg?.querySelector('path')).toBeNull();
  });

  it('renders a flat path for constant data', () => {
    const { container } = render(<Sparkline data={[1, 1, 1]} />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('d')).toBe('M0,24 L50,24 L100,24');
  });

  it('maps values to the correct SVG coordinates', () => {
    const { container } = render(<Sparkline data={[0, 5, 10]} />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('d')).toBe('M0,24 L50,12 L100,0');
  });

  it('renders an area fill when the fill prop is provided', () => {
    const { container } = render(<Sparkline data={[0, 10]} fill="#f00" />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(2);
    const area = paths[0];
    expect(area.getAttribute('fill')).toBe('#f00');
    expect(area.getAttribute('opacity')).toBe('0.2');
  });
});
