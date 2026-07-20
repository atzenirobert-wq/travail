/**
 * Prefixes an absolute path with Astro's configured `base` (import.meta.env.BASE_URL).
 * Needed because this site can be deployed under a subpath (e.g. GitHub Pages
 * project sites at /travail/) as well as at the domain root.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

export const SITE = {
  name: 'TopClim.fr',
  domain: 'https://topclim.fr',
  tagline: 'Le comparateur indépendant des climatiseurs mobiles',
  description:
    "TopClim.fr compare les climatiseurs mobiles du marché pour vous aider à choisir : puissance, bruit, consommation, prix. Guides et comparatifs indépendants.",
  // TODO: remplacer par l'e-mail de contact réel avant mise en ligne
  contactEmail: 'contact@topclim.fr',
  // TODO: remplacer par le fournisseur d'e-mailing réel (Brevo, Mailchimp...) avant mise en ligne
  newsletterFormAction: 'https://example-esp.com/subscribe/REPLACE_ME',
} as const;

export const SILOS = {
  'climatiseur-mobile': {
    label: 'Climatiseur mobile',
    slug: 'climatiseur-mobile',
  },
} as const;

export type MerchantId = 'amazon' | 'cdiscount' | 'manomano';

export const MERCHANTS: Record<MerchantId, { label: string; className: string }> = {
  amazon: { label: 'Voir sur Amazon', className: 'bg-[#FF9900] hover:bg-[#e88a00] text-slate-900' },
  cdiscount: { label: 'Voir sur Cdiscount', className: 'bg-[#E4002B] hover:bg-[#c50026] text-white' },
  manomano: { label: 'Voir sur ManoMano', className: 'bg-[#77B62B] hover:bg-[#679c25] text-white' },
};
