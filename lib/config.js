// =============================================================================
// lib/config.js — Single source of truth for site-wide constants
// =============================================================================

export const SITE_CONFIG = {
  name: 'Edinburgh University Chamber Orchestra',
  shortName: 'EUCO',
  url: 'https://www.eu-co.co.uk',
  educationUrl: 'https://education.eu-co.co.uk',
  rootDomain: 'eu-co.co.uk',
  description: "Edinburgh's fully auditioned student-led ensemble dedicated to performing chamber music at the highest level.",
  locale: 'en_GB',
  foundingDate: '1983',
  
  // Geo SEO — Used in structured data on every page
  geo: {
    city: 'Edinburgh',
    region: 'Scotland',
    country: 'United Kingdom',
    latitude: 55.9533,
    longitude: -3.1883,
  },

  social: {
    instagram: 'https://www.instagram.com/edunichamberorchestra/',
    facebook: 'https://www.facebook.com/EdinburghUniversityChamberOrchestra',
    twitter: 'https://x.com/EUCOmusic',
    youtube: 'https://www.youtube.com/@edinburghuniversitychamber9979',
  },

  contact: {
    email: 'euco.orchestra@gmail.com',
    instagramDM: 'https://www.instagram.com/direct/t/103973561196787/',
  },

  links: {
    eusa: 'https://www.eusa.ed.ac.uk/activities/view/edinburgh-university-chamber-orchestra',
    university: 'https://www.ed.ac.uk',
    stringers: 'https://www.stringersedinburgh.com/',
    donate: 'https://www.justgiving.com/crowdfunding/euco-outreach?utm_medium=FA&utm_source=CL',
    eso: 'https://edinburghstudioopera.org/',
  },

  // EmailJS config (for contact form and mailing list)
  emailjs: {
    serviceId: 'service_jpoqz8q',
    templateId: 'template_0xu8hte',
    publicKey: 'b4XIchSp18Pf0ICs9',
  },
};

// Default structured data for the organization (included on every page)
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/favicon/logo.png`,
    foundingDate: SITE_CONFIG.foundingDate,
    areaServed: {
      '@type': 'Place',
      name: SITE_CONFIG.geo.city,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.geo.latitude,
        longitude: SITE_CONFIG.geo.longitude,
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.geo.city,
      addressRegion: SITE_CONFIG.geo.region,
      addressCountry: 'GB',
    },
    sameAs: Object.values(SITE_CONFIG.social),
  };
}
