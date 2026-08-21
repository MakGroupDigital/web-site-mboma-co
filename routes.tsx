import React from 'react';
import { RouteObject } from 'react-router-dom';

// Import page components (will be created/updated)
import HeroSection from './pages/HeroSection';
import InstitutionPage from './pages/InstitutionPage';
import VisionPage from './pages/VisionPage';
import ExpertisesPage from './pages/ExpertisesPage';
import ArchitecturePage from './pages/ArchitecturePage';
import RapportsPage from './pages/RapportsPage';
import AuditBookingPage from './pages/AuditBookingPage';
import MasterclassPage from './pages/MasterclassPage';
import VerificationPage from './pages/VerificationPage';
import MoniOfferPage from './pages/MoniOfferPage';
import TechnologyPartnershipPage from './pages/TechnologyPartnershipPage';
import TechnologyAuditCampaignPage from './pages/TechnologyAuditCampaignPage';
import DigitalizeBusinessPage from './pages/DigitalizeBusinessPage';
import AppIdeaCampaignPage from './pages/AppIdeaCampaignPage';
import AiAutomationCampaignPage from './pages/AiAutomationCampaignPage';
import MobileSurveillanceArticlePage from './pages/MobileSurveillanceArticlePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HeroSection />,
  },
  {
    path: '/institution',
    element: <InstitutionPage />,
  },
  {
    path: '/vision',
    element: <VisionPage />,
  },
  {
    path: '/expertises',
    element: <ExpertisesPage />,
  },
  {
    path: '/architecture',
    element: <ArchitecturePage />,
  },
  {
    path: '/rapports',
    element: <RapportsPage />,
  },
  {
    path: '/audit-booking',
    element: <AuditBookingPage />,
  },
  {
    path: '/masterclass',
    element: <MasterclassPage />,
  },
  {
    path: '/verify/:type/:id',
    element: <VerificationPage />,
  },
  {
    path: '/moni_offer',
    element: <MoniOfferPage />,
  },
  {
    path: '/moni_offer/',
    element: <MoniOfferPage />,
  },
  {
    path: '/moni-offer',
    element: <MoniOfferPage />,
  },
  {
    path: '/moni-offer/',
    element: <MoniOfferPage />,
  },
  {
    path: '/technology-partnership-program',
    element: <TechnologyPartnershipPage />,
  },
  {
    path: '/partnership',
    element: <TechnologyPartnershipPage />,
  },
  {
    path: '/audit-technologique',
    element: <TechnologyAuditCampaignPage />,
  },
  {
    path: '/technology-audit',
    element: <TechnologyAuditCampaignPage />,
  },
  {
    path: '/digitalisez-votre-entreprise',
    element: <DigitalizeBusinessPage />,
  },
  {
    path: '/digitalisation-entreprise',
    element: <DigitalizeBusinessPage />,
  },
  {
    path: '/idee-application',
    element: <AppIdeaCampaignPage />,
  },
  {
    path: '/app-idea',
    element: <AppIdeaCampaignPage />,
  },
  {
    path: '/automatisez-vos-taches-avec-ia',
    element: <AiAutomationCampaignPage />,
  },
  {
    path: '/automatisation-ia',
    element: <AiAutomationCampaignPage />,
  },
  {
    path: '/articles/espionnage-camera-micro-telephone',
    element: <MobileSurveillanceArticlePage />,
  },
];
