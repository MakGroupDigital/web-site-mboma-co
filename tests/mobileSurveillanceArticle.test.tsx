import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

vi.mock('framer-motion', async () => {
  const ReactModule = await import('react');
  const ignoredProps = new Set(['initial', 'animate', 'exit', 'transition', 'whileInView', 'viewport']);
  const motion = new Proxy({}, {
    get: (_target, tag: string) => ReactModule.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !ignoredProps.has(key)));
      return ReactModule.createElement(tag, { ...domProps, ref });
    }),
  });
  return { motion };
});

import MobileSurveillanceArticlePage from '../pages/MobileSurveillanceArticlePage';

afterEach(cleanup);

describe('mobile surveillance article', () => {
  it('renders the complete study, its image, sources and direct navigation', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/articles/espionnage-camera-micro-telephone']}>
          <MobileSurveillanceArticlePage />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { level: 1, name: /Peut-on être espionné/ })).toBeTruthy();
    expect(screen.getByRole('img', { name: /risques d’espionnage/ }).getAttribute('src')).toBe('/articleimage.png');
    expect(screen.getByRole('heading', { name: /Pourquoi la caméra et le microphone/ })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Conclusion' })).toBeTruthy();
    expect(screen.getByText(/C'est un ordinateur personnel contenant des capteurs/)).toBeTruthy();
    expect(screen.getAllByRole('link', { name: /Android Help|Apple Support|CISA|NIST|Amnesty/ }).length).toBeGreaterThanOrEqual(5);
    expect(screen.getByRole('link', { name: /Découvrir l’audit/ }).getAttribute('href')).toBe('/audit-technologique');
  });
});
