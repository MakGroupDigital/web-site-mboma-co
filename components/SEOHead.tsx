import React from 'react';

const SEOHead: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MboMa & Co.",
    "alternateName": "MboMa and Company",
    "description": "Structure de pilotage et de gouvernance de projets complexes opérant à l'interface des nations et du futur.",
    "url": "https://mboma.org",
    "logo": "https://mboma.org/favicon.svg",
    "image": "https://mboma.org/og-image.svg",
    "email": "co@mboma.org",
    "foundingDate": "2024",
    "slogan": "Nous ne faisons pas du bruit. Nous laissons une trace.",
    "areaServed": {
      "@type": "Place",
      "name": "Africa"
    },
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Brazzaville",
        "addressCountry": "CG"
      },
      {
        "@type": "PostalAddress", 
        "addressLocality": "Kinshasa",
        "addressCountry": "CD"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Paris", 
        "addressCountry": "FR"
      }
    ],
    "sameAs": [
      "https://mboma.org"
    ],
    "knowsAbout": [
      "Governance",
      "Innovation",
      "Digital Transformation", 
      "African Development",
      "Technology Sovereignty",
      "Project Management"
    ],
    "serviceType": [
      "Institutional Governance",
      "Digital Transformation",
      "Innovation Ecosystems",
      "Program Management"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default SEOHead;