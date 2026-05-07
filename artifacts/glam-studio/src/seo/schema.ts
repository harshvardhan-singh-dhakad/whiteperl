export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Glam Studio",
  "image": "https://glamstudio.in/logo.png",
  "@id": "https://glamstudio.in",
  "url": "https://glamstudio.in",
  "telephone": "+91 731 000 0000",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123, Vijay Nagar Main Rd",
    "addressLocality": "Indore",
    "addressRegion": "MP",
    "postalCode": "452010",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7533,
    "longitude": 75.8937
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "11:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/glamstudioindore",
    "https://www.instagram.com/glamstudioindore",
    "https://twitter.com/glamstudio"
  ]
};

export function getSchemaMarkup(schema: any) {
  return JSON.stringify(schema);
}
