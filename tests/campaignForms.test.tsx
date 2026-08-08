import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const serviceMocks = vi.hoisted(() => ({
  sendCampaignLeadEmail: vi.fn(),
  sendPartnershipConfirmationEmail: vi.fn(),
  sendCampaignConfirmation: vi.fn(),
}));

vi.mock('../services/campaignEmailService', () => ({
  sendCampaignLeadEmail: serviceMocks.sendCampaignLeadEmail,
}));

vi.mock('../services/partnershipService', () => ({
  sendPartnershipConfirmationEmail: serviceMocks.sendPartnershipConfirmationEmail,
}));

vi.mock('../services/campaignService', () => ({
  sendCampaignConfirmation: serviceMocks.sendCampaignConfirmation,
}));

vi.mock('framer-motion', async () => {
  const ReactModule = await import('react');
  const componentCache = new Map<string, React.ComponentType<Record<string, unknown>>>();
  const ignoredProps = new Set([
    'initial', 'animate', 'exit', 'transition', 'whileInView', 'viewport', 'whileHover', 'whileTap', 'layout',
  ]);
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

import TechnologyPartnershipPage from '../pages/TechnologyPartnershipPage';
import TechnologyAuditCampaignPage from '../pages/TechnologyAuditCampaignPage';
import DigitalizeBusinessPage from '../pages/DigitalizeBusinessPage';
import AppIdeaCampaignPage from '../pages/AppIdeaCampaignPage';
import AiAutomationCampaignPage from '../pages/AiAutomationCampaignPage';

afterEach(cleanup);

beforeEach(() => {
  Object.values(serviceMocks).forEach((mock) => mock.mockReset());
  serviceMocks.sendCampaignLeadEmail.mockResolvedValue(undefined);
  serviceMocks.sendPartnershipConfirmationEmail.mockResolvedValue(undefined);
  serviceMocks.sendCampaignConfirmation.mockResolvedValue(undefined);
});

const fillContact = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/^Prénom/), 'Marie');
  await user.type(screen.getByLabelText(/^Nom \*/), 'Mboma');
  await user.type(screen.getByLabelText(/E-mail/), 'marie@example.com');
  await user.type(screen.getByLabelText(/Téléphone/), '+243810000000');
};

const submitValidForm = async (user: ReturnType<typeof userEvent.setup>, buttonName: string) => {
  const button = screen.getByRole('button', { name: buttonName });
  const form = button.closest('form');
  assertFormExists(form);
  const invalidFields = Array.from(form.elements)
    .filter((element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
      element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement)
    .filter((element) => !element.checkValidity())
    .map((element) => ({ name: element.name, value: element.value, message: element.validationMessage }));
  expect(invalidFields).toEqual([]);
  await user.click(button);
};

const assertFormExists = (form: HTMLFormElement | null): asserts form is HTMLFormElement => {
  if (!form) throw new Error('Submit button is not attached to a form.');
};

describe('campaign forms', () => {
  it('submits the Technology Partnership form', async () => {
    const user = userEvent.setup();
    render(<TechnologyPartnershipPage />);

    await fillContact(user);
    await user.type(screen.getByLabelText(/Organisation \*/), 'MboMa Test');
    await user.type(screen.getByLabelText(/Votre fonction/), 'Directrice innovation');
    await user.selectOptions(screen.getByLabelText(/Type d’organisation/), 'Entreprise');
    await user.selectOptions(screen.getByLabelText(/Objectif principal/), 'Co-développement technologique');
    await user.selectOptions(screen.getByLabelText(/Niveau d’avancement/), 'Concept défini');
    await user.type(screen.getByLabelText(/Présentez brièvement/), 'Nous souhaitons co-développer une solution technologique à impact régional.');
    await user.click(screen.getByRole('checkbox', { name: /J’accepte/ }));
    await submitValidForm(user, 'Soumettre la demande');

    await waitFor(() => expect(serviceMocks.sendPartnershipConfirmationEmail).toHaveBeenCalledOnce());
    expect(await screen.findByText('Demande transmise')).toBeTruthy();
  });

  it('submits the Technology Audit form after selecting a priority', async () => {
    const user = userEvent.setup();
    render(<TechnologyAuditCampaignPage />);

    await fillContact(user);
    await user.type(screen.getByLabelText(/Organisation \*/), 'MboMa Test');
    await user.type(screen.getByLabelText(/Votre fonction/), 'DSI');
    await user.selectOptions(screen.getByLabelText(/Taille de l’organisation/), '11–50 personnes');
    await user.selectOptions(screen.getByLabelText(/Environnement principal/), 'Environnement hybride');
    await user.click(screen.getByRole('checkbox', { name: 'Infrastructure' }));
    expect(screen.getByText(/1 sélectionnée/)).toBeTruthy();
    await user.type(screen.getByLabelText(/Contexte ou problème/), 'Nous souhaitons mesurer la performance et la sécurité du système.');
    await user.click(screen.getByRole('checkbox', { name: /J’accepte/ }));
    await submitValidForm(user, 'Soumettre la demande d’audit');

    await waitFor(() => expect(serviceMocks.sendCampaignLeadEmail).toHaveBeenCalledOnce());
    expect(await screen.findByText('Demande enregistrée')).toBeTruthy();
  });

  it('submits the Digitalize your business form after selecting a process', async () => {
    const user = userEvent.setup();
    render(<DigitalizeBusinessPage />);

    await fillContact(user);
    await user.type(screen.getByLabelText(/Entreprise \*/), 'MboMa Test');
    await user.type(screen.getByLabelText(/Votre fonction/), 'Responsable opérations');
    await user.selectOptions(screen.getByLabelText(/Taille de l’entreprise/), '11–50 personnes');
    await user.selectOptions(screen.getByLabelText(/Objectif principal/), 'Centraliser les opérations');
    await user.click(screen.getByRole('checkbox', { name: 'Clients & CRM' }));
    expect(screen.getByText(/1 sélectionné/)).toBeTruthy();
    await user.type(screen.getByLabelText(/Outils utilisés/), 'Excel et plusieurs applications');
    await user.type(screen.getByLabelText(/Contexte ou besoin/), 'Nous voulons centraliser les données clients et les commandes.');
    await user.click(screen.getByRole('checkbox', { name: /J’accepte/ }));
    await submitValidForm(user, 'Soumettre mon projet');

    await waitFor(() => expect(serviceMocks.sendCampaignConfirmation).toHaveBeenCalledOnce());
    expect(await screen.findByText('Projet transmis')).toBeTruthy();
  });

  it('submits the application idea form after selecting a need', async () => {
    const user = userEvent.setup();
    render(<AppIdeaCampaignPage />);

    await fillContact(user);
    await user.type(screen.getByLabelText(/Projet ou organisation/), 'Mon Application');
    await user.type(screen.getByLabelText(/Votre rôle/), 'Fondatrice');
    await user.selectOptions(screen.getByLabelText(/Structure/), 'Startup');
    await user.selectOptions(screen.getByLabelText(/Type de produit/), 'Application mobile');
    await user.selectOptions(screen.getByLabelText(/Avancement actuel/), 'Idée initiale');
    await user.click(screen.getByRole('checkbox', { name: 'Application mobile' }));
    expect(screen.getByText(/1 sélectionné/)).toBeTruthy();
    await user.type(screen.getByLabelText(/Décrivez l’idée/), 'Une application mobile qui simplifie la gestion quotidienne des petites entreprises.');
    await user.click(screen.getByRole('checkbox', { name: /J’accepte/ }));
    await submitValidForm(user, 'Soumettre mon idée');

    await waitFor(() => expect(serviceMocks.sendCampaignConfirmation).toHaveBeenCalledOnce());
    expect(await screen.findByText('Idée transmise')).toBeTruthy();
  });

  it('submits the AI automation form after selecting a task', async () => {
    const user = userEvent.setup();
    render(<AiAutomationCampaignPage />);

    await fillContact(user);
    await user.type(screen.getByLabelText(/Entreprise \*/), 'MboMa Test');
    await user.type(screen.getByLabelText(/Votre fonction/), 'Responsable service client');
    await user.selectOptions(screen.getByLabelText(/Taille de l’entreprise/), '11–50 personnes');
    await user.selectOptions(screen.getByLabelText(/Objectif principal/), 'Gagner du temps');
    await user.click(screen.getByRole('checkbox', { name: 'Service client' }));
    expect(screen.getByText(/1 sélectionnée/)).toBeTruthy();
    await user.type(screen.getByLabelText(/Outils utilisés/), 'Messagerie et CRM');
    await user.type(screen.getByLabelText(/Décrivez la tâche/), 'Les équipes répondent manuellement aux mêmes questions plusieurs fois par jour.');
    await user.click(screen.getByRole('checkbox', { name: /J’accepte/ }));
    await submitValidForm(user, 'Soumettre mon besoin');

    await waitFor(() => expect(serviceMocks.sendCampaignConfirmation).toHaveBeenCalledOnce());
    expect(await screen.findByText('Demande transmise')).toBeTruthy();
  });

  it('reports an email delivery failure without showing a false selection error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    serviceMocks.sendCampaignConfirmation.mockRejectedValueOnce(new Error('Notification API unavailable'));
    const user = userEvent.setup();
    render(<DigitalizeBusinessPage />);

    await fillContact(user);
    await user.type(screen.getByLabelText(/Entreprise \*/), 'MboMa Test');
    await user.type(screen.getByLabelText(/Votre fonction/), 'Responsable opérations');
    await user.selectOptions(screen.getByLabelText(/Taille de l’entreprise/), '11–50 personnes');
    await user.selectOptions(screen.getByLabelText(/Objectif principal/), 'Centraliser les opérations');
    await user.click(screen.getByRole('checkbox', { name: 'Clients & CRM' }));
    await user.type(screen.getByLabelText(/Outils utilisés/), 'Excel');
    await user.type(screen.getByLabelText(/Contexte ou besoin/), 'Centraliser les opérations et les informations commerciales.');
    await user.click(screen.getByRole('checkbox', { name: /J’accepte/ }));
    await submitValidForm(user, 'Soumettre mon projet');

    expect(await screen.findByText(/Le projet n’a pas pu être transmis/)).toBeTruthy();
    expect(screen.queryByText(/Sélectionnez au moins un processus/)).toBeNull();
  });
});
