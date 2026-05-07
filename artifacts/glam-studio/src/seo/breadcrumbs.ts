export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function generateBreadcrumbsSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };
}

// Example usage:
// generateBreadcrumbsSchema([
//   { name: "Home", item: "https://glamstudio.in" },
//   { name: "Services", item: "https://glamstudio.in/services" },
//   { name: "Bridal Makeup", item: "https://glamstudio.in/services/bridal-makeup" }
// ])
