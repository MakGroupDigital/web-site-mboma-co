import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const serviceMocks = vi.hoisted(() => ({
  sendContexxeCloudOfferRequest: vi.fn(),
}));

vi.mock('../services/contexxeCloudService', () => ({
  sendContexxeCloudOfferRequest: serviceMocks.sendContexxeCloudOfferRequest,
}));

vi.mock('framer-motion', async () => {
  const ReactModule = await import('react');
  const componentCache = new Map<string, React.ComponentType<Record<string, unknown>>>();
  const ignoredProps = new Set(['initial', 'animate', 'exit', 'transition', 'whileInView', 'viewport']);
  const motion = new Proxy({}, {
    get: (_target, tag: string) => {
      if (!componentCache.has(tag)) {
        componentCache.set(tag, ReactModule.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
          const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !ignoredProps.has(key)));
          return ReactModule.createElement(tag, { ...domProps, ref });
        }));
      }
      return componentCache.get(tag);
    },
  });
  return { motion };
});

import ContexxeCloudPage from '../pages/ContexxeCloudPage';

afterEach(cleanup);

beforeEach(() => {
  serviceMocks.sendContexxeCloudOfferRequest.mockReset();
  serviceMocks.sendContexxeCloudOfferRequest.mockResolvedValue(undefined);
});

describe('Contexxe Cloud offer page', () => {
  it('shows the manual and submits a complete offer request', async () => {
    const user = userEvent.setup();
    render(<ContexxeCloudPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Votre mémoire numérique/ })).toBeTruthy();
    expect(screen.getByTitle('Manuel d’utilisation Contexxe Cloud').getAttribute('src')).toContain('/Manuel_d_utilisation_Contexxe_Cloud.pdf');

    await user.type(screen.getByLabelText(/^Prénom/), 'Marie');
    await user.type(screen.getByLabelText(/^Nom/), 'Mboma');
    await user.type(screen.getByLabelText(/E-mail professionnel/), 'marie@example.com');
    await user.type(screen.getByLabelText(/Téléphone/), '+243810000000');
    await user.type(screen.getByLabelText(/Organisation/), 'Contexxe Test');
    await user.type(screen.getByLabelText(/Fonction/), 'Directrice des opérations');
    await user.selectOptions(screen.getByLabelText(/Secteur/), 'Banque & finance');
    await user.selectOptions(screen.getByLabelText(/Utilisateurs/), '11 à 50');
    await user.selectOptions(screen.getByLabelText(/Stockage/), '1 To');
    await user.click(screen.getByRole('checkbox', { name: 'OCR & numérisation' }));
    await user.selectOptions(screen.getByLabelText(/Données à migrer/), 'Fichiers et dossiers');
    await user.selectOptions(screen.getByLabelText(/Délai souhaité/), 'Sous 3 mois');
    await user.type(screen.getByLabelText(/Contexte complémentaire/), 'Nous souhaitons centraliser et indexer nos dossiers clients.');
    await user.click(screen.getByRole('checkbox', { name: /J’accepte/ }));
    const submitButton = screen.getByRole('button', { name: 'Recevoir une proposition' });
    const form = submitButton.closest('form');
    const invalidFields = Array.from(form?.elements || [])
      .filter((element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
        element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement)
      .filter((element) => !element.checkValidity())
      .map((element) => element.name || element.type);
    expect(invalidFields).toEqual([]);
    await user.click(submitButton);

    await waitFor(() => expect(serviceMocks.sendContexxeCloudOfferRequest).toHaveBeenCalledOnce());
    expect(await screen.findByText('Demande transmise')).toBeTruthy();
    expect(serviceMocks.sendContexxeCloudOfferRequest.mock.calls[0][0].priorities).toEqual(['OCR & numérisation']);
  });

  it('requires at least one priority before transmission', async () => {
    const user = userEvent.setup();
    render(<ContexxeCloudPage />);

    const form = screen.getByRole('button', { name: 'Recevoir une proposition' }).closest('form');
    expect(form).toBeTruthy();
    form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(await screen.findByText('Sélectionnez au moins un besoin prioritaire.')).toBeTruthy();
    expect(serviceMocks.sendContexxeCloudOfferRequest).not.toHaveBeenCalled();
  });
});
