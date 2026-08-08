import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url = 'https://www.mboma.org',
  image = 'https://www.mboma.org/mboma-share-2026.png',
  type = 'website',
  keywords = 'MboMa, Afrique, gouvernance, innovation, développement, souveraineté, technologie, panafricain'
}) => {
  const fullTitle = `${title} | MboMa & Co.`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook / WhatsApp / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Logo MboMa & Co. - Institution Panafricaine" />
      <meta property="og:site_name" content="MboMa & Co." />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Logo MboMa & Co. - Institution Panafricaine" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
