# TopClim.fr

Site Astro (statique, contenu en Markdown) pour un comparateur indépendant de
climatiseurs mobiles, avec capture email et liens d'affiliation multi-marchands
(Amazon, Cdiscount, ManoMano).

## Démarrer

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère le site statique dans dist/
npm run preview   # sert le build de dist/
```

## Structure

- `src/content/guides/` — guides piliers (silo "climatiseur-mobile")
- `src/content/comparatifs/` — pages de comparatif, référencent des produits
- `src/content/produits/` — fiches produit (specs, galerie photo, fourchette de
  prix **indicative**, liens marchands — jamais de prix exact/figé)
- `src/content/legal/` — mentions légales, RGPD, CGU, cookies, transparence affiliation
- `src/components/EmailCapture.astro` — bloc de capture email, réutilisé sur les pages clés
- `src/components/MerchantButtons.astro` — boutons Amazon / Cdiscount / ManoMano, pointent vers `/go/<produit>-<marchand>/`
- `src/components/Lightbox.astro` — visionneuse photo (carrousel) ouverte au clic sur une fiche produit
- `src/pages/go/[slug].astro` — pages de redirection statiques (une par produit × marchand) qui portent l'URL d'affiliation réelle ; noindex, exclues du sitemap
- `src/lib/site.ts` — constantes du site (nom, contact, URL du formulaire newsletter)

## À faire avant la mise en ligne

1. **ID Partenaire Amazon** : les liens Amazon dans `src/content/produits/*.md`
   n'ont pas encore de tag d'affiliation (`?tag=...`). À ajouter une fois le
   compte Amazon Associates validé.
2. **Formulaire newsletter** : remplacer `SITE.newsletterFormAction` dans
   `src/lib/site.ts` par l'URL réelle de votre prestataire d'e-mailing (Brevo,
   Mailchimp...). **Ne jamais inclure de lien Amazon dans les e-mails envoyés
   ensuite** — c'est interdit par les CGU du programme Amazon Associates.
3. **Pages légales** (`src/content/legal/`) : à faire valider par un
   professionnel (avocat/comptable) et à compléter — raison sociale, SIRET,
   hébergeur, DPO le cas échéant. Tous les placeholders sont entre crochets.
4. Mettre à jour `SITE.contactEmail` et le domaine dans `astro.config.mjs`
   (`site: 'https://topclim.fr'`) si nécessaire.

## Garde-fous déjà en place

- Aucun prix exact/figé n'est codé en dur : chaque produit peut avoir une
  fourchette `prixApproxEur` (min/max) clairement présentée comme indicative,
  avec renvoi vers le prix réel chez le marchand. Champ optionnel, prévu aussi
  pour alimenter un futur filtre par budget.
- Les liens marchands visibles pointent vers une page de redirection interne
  (`/go/...`) plutôt que vers l'URL d'affiliation brute, pour ne pas exposer
  le tag/identifiant du compte dans le survol des liens ou le code source des
  pages produits. La page de redirection porte `rel="sponsored nofollow noopener"`
  sur le lien réel et un `<meta name="robots" content="noindex, nofollow">`.
- Tous les liens marchands s'ouvrent dans un nouvel onglet.
- Le formulaire newsletter ne référence aucun lien Amazon.
- Bandeau de consentement cookies (RGPD) avant tout cookie non essentiel.
- Page dédiée "Comment on gagne de l'argent" pour la transparence sur
  l'affiliation.
- Les rafraîchisseurs évaporatifs (type `rafraichisseur`) sont étiquetés
  distinctement des vrais climatiseurs à compresseur (type `climatiseur`) et
  n'affichent jamais de specs BTU/dB qu'ils ne communiquent pas.
