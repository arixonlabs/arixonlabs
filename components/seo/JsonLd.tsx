import React from 'react';

const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Arixon Labs",
    "alternateName": "Arixon",
    "url": "https://arixon.labs",
    "logo": "https://arixon.labs/logo.png",
    "image": "https://arixon.labs/og-image.png",
    "description": "Arixon Labs is a premier IT company specializing in custom AI automation, SaaS platform development, and high-performance web applications. We bridge the gap between complex engineering and human-centric design.",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kerala",
      "addressRegion": "KL",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.8505",
      "longitude": "76.2711"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/arixon-labs",
      "https://twitter.com/arixonlabs",
      "https://github.com/arixonlabs"
    ],
    "services": [
      {
        "@type": "Service",
        "name": "SaaS Platform Development",
        "description": "Custom cloud-based software solutions for global scale."
      },
      {
        "@type": "Service",
        "name": "AI Automation & Integration",
        "description": "Implementing LLMs, chatbots, and generative AI to streamline business workflows."
      },
      {
        "@type": "Service",
        "name": "Generative Engine Optimization (GEO)",
        "description": "Optimizing content to ensure brand visibility in AI-driven search engines like ChatGPT and Gemini."
      },
      {
        "@type": "Service",
        "name": "Answer Engine Optimization (AEO)",
        "description": "Structuring information for direct answers and voice search compatibility."
      }
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does Arixon Labs specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Arixon Labs specializes in custom AI automation, SaaS platform engineering, and high-end web development with a focus on SEO, GEO, and AEO."
          }
        },
        {
          "@type": "Question",
          "name": "How does GEO help my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generative Engine Optimization (GEO) ensures that AI platforms like ChatGPT and Gemini correctly identify and recommend your business when users ask relevant questions."
          }
        },
        {
          "@type": "Question",
          "name": "Can Arixon Labs build custom AI bots?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we build advanced AI chatbots and automation agents tailored to specific business needs, integrating with existing CRM and ERP systems."
          }
        }
      ]
    }

  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;
