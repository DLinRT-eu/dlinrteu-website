
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
  noindex?: boolean;
}

const SITE_ORIGIN = 'https://dlinrt.eu';

const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/opengraph-image.png',
  structuredData,
  noindex = false,
}: SEOProps) => {
  const fullTitle = `${title} | DLinRT`;
  const isDev = import.meta.env.DEV;

  // Self-reference canonical/og:url to the current path when not provided.
  let pathname = '/';
  try {
    // useLocation is available because SEO is always rendered inside the Router.
    pathname = useLocation().pathname || '/';
  } catch {
    pathname = '/';
  }
  const resolvedCanonicalUrl = canonical ?? `${SITE_ORIGIN}${pathname}`;

  const resolvedOgImage = isDev ? ogImage : `${SITE_ORIGIN}${ogImage}`;
  const resolvedCanonical = isDev && (() => {
    try {
      return new URL(resolvedCanonicalUrl).host === 'dlinrt.eu';
    } catch {
      return false;
    }
  })()
    ? resolvedCanonicalUrl.replace(SITE_ORIGIN, '')
    : resolvedCanonicalUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />
      {noindex && <meta name="robots" content="noindex" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
