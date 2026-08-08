import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('framer-motion', async () => {
  const ReactModule = await import('react');
  const motion = new Proxy({}, {
    get: (_target, tag: string) => ReactModule.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      const { initial, whileInView, viewport, transition, ...domProps } = props;
      void initial;
      void whileInView;
      void viewport;
      void transition;
      return ReactModule.createElement(tag, { ...domProps, ref });
    }),
  });

  return { motion };
});

import Footer from '../components/Footer';

afterEach(cleanup);

const publicRoutes = [
  '/',
  '/institution',
  '/vision',
  '/expertises',
  '/architecture',
  '/rapports',
  '/technology-partnership-program',
  '/audit-technologique',
  '/digitalisez-votre-entreprise',
  '/idee-application',
  '/automatisez-vos-taches-avec-ia',
  '/audit-booking',
  '/masterclass',
  '/moni_offer',
];

describe('footer navigation', () => {
  it('provides direct links to every public page', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const internalLinks = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => Boolean(href?.startsWith('/')));

    expect(internalLinks).toEqual(publicRoutes);
  });
});
