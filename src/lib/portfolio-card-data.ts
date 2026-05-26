export interface GlassCardItem {
  id: number;
  title: string;
  description: string;
  author: string;
  role: string;
  imageUrl: string;
}

export const cardData: GlassCardItem[] = [
  {
    id: 1,
    title: "Summit Peak Roofing - Hero Redesign",
    description:
      "I built a bold hero with full-width roof installation imagery, trust badges, and a high-contrast emergency call CTA. The company reported a clear lift in quote form submissions.",
    author: "Owner Testimony",
    role: "Summit Peak Roofing, Denver CO",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Ironclad Exteriors - Commercial Focus Hero",
    description:
      "This hero page was designed around flat-roof commercial projects with before-and-after visuals, service area highlights, and a streamlined lead capture section above the fold.",
    author: "Client Feedback",
    role: "Ironclad Exteriors, Dallas TX",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Blue Ridge Roofing Co. - Storm Repair Hero",
    description:
      "I created a storm-damage-focused hero featuring urgent messaging, financing highlights, and strong social proof. The layout was optimized for mobile-first emergency visitors.",
    author: "Marketing Manager Testimony",
    role: "Blue Ridge Roofing Co., Charlotte NC",
    imageUrl:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    title: "Coastal Shield Roofing - Premium Residential Hero",
    description:
      "For this project I delivered a clean premium hero with crew-at-work photography, neighborhood credibility messaging, and a modern CTA cluster for inspections and estimates.",
    author: "Founder Testimony",
    role: "Coastal Shield Roofing, Tampa FL",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
];
