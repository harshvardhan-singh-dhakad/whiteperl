export const defaultMeta = {
  title: "Glam Studio | Premium Beauty Parlour in Indore, MP",
  description: "Glam Studio offers premium beauty services in Indore, including expert bridal makeup, facial treatments, hair care, nail art, and more. Book your appointment today for a stunning makeover.",
  keywords: "beauty parlour Indore, hair salon MP, bridal makeup Indore, facial Indore, threading waxing Indore, best ladies salon Indore, nail art Indore",
  ogTitle: "Glam Studio - Luxury Beauty & Bridal Salon",
  ogDescription: "Experience luxury beauty treatments at Indore's finest parlour. Specialized in bridal makeup and advanced hair care.",
  ogImage: "https://glamstudio.in/og-image.jpg",
  ogUrl: "https://glamstudio.in",
  twitterCard: "summary_large_image",
};

export type PageName = "home" | "about" | "services" | "contact" | "gallery" | "bridal-makeup";

export function generateMeta(page: PageName) {
  const overrides: Record<PageName, Partial<typeof defaultMeta>> = {
    home: {
      title: "Glam Studio | Best Beauty Parlour in Indore",
    },
    about: {
      title: "About Us | Glam Studio Indore",
      description: "Learn more about Glam Studio's journey to becoming the leading beauty parlour in Indore, MP.",
    },
    services: {
      title: "Our Services | Facial, Hair, Bridal & More - Glam Studio",
      description: "Explore our wide range of beauty services including bridal makeup, facials, hair spa, and nail art in Indore.",
    },
    contact: {
      title: "Contact Us | Book Appointment at Glam Studio",
      description: "Visit Glam Studio in Indore, MP or call us to book your premium beauty session.",
    },
    gallery: {
      title: "Gallery | Our Best Makeovers - Glam Studio Indore",
      description: "See our latest bridal makeovers and beauty transformations at Glam Studio.",
    },
    "bridal-makeup": {
      title: "Premium Bridal Makeup Indore | Glam Studio",
      description: "Get the perfect bridal look with Indore's top makeup artists at Glam Studio.",
    }
  };

  return {
    ...defaultMeta,
    ...(overrides[page] || {}),
  };
}
