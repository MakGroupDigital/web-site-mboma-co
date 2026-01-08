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
];
