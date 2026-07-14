import { LOCATIONS, BRAND, STORY } from "@/config/restaurantData";

/**
 * JSON-LD structured data for both restaurant locations.
 * Renders two `LocalBusiness` / `Restaurant` entities so Google can show
 * rich results (hours, address, phone, order link) in local search.
 * Injected once in the root layout — no client JS needed.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": LOCATIONS.map((loc) => ({
      "@type": "Restaurant",
      "@id": `${BRAND.domain}/#${loc.id}`,
      name: loc.label,
      image: `${BRAND.domain}/media/hero.jpg`,
      description: `${STORY.motto} — Authentic Colombian food in San Jose, CA.`,
      url: BRAND.domain,
      telephone: loc.phone,
      servesCuisine: "Colombian",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: loc.state,
        postalCode: loc.zip,
        addressCountry: "US",
      },
      openingHoursSpecification: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${day}`,
        opens: "11:00",
        closes: "21:30",
      })),
      hasMenu: loc.orderUrl,
      potentialAction: {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: loc.orderUrl,
        },
        deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
