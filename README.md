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
- `src/content/produits/` — fiches produit (specs + liens marchands, **jamais de prix en dur**)
- `src/content/legal/` — mentions légales, RGPD, CGU, cookies, transparence affiliation
- `src/components/EmailCapture.astro` — bloc de capture email, réutilisé sur les pages clés
- `src/components/MerchantButtons.astro` — boutons Amazon / Cdiscount / ManoMano (`rel="sponsored nofollow noopener"`)
- `src/lib/site.ts` — constantes du site (nom, contact, URL du formulaire newsletter)

## À faire avant la mise en ligne

1. **Contenu produit** : les 3 fiches dans `src/content/produits/` sont des
   données d'exemple (noms génériques, liens marchands non fonctionnels) à
   remplacer par de vrais modèles testés, avec de vrais liens d'affiliation
   (tag Amazon Associates, identifiants Cdiscount/ManoMano).
2. **Formulaire newsletter** : remplacer `SITE.newsletterFormAction` dans
   `src/lib/site.ts` par l'URL réelle de votre prestataire d'e-mailing (Brevo,
   Mailchimp...). **Ne jamais inclure de lien Amazon dans les e-mails envoyés
   ensuite** — c'est interdit par les CGU du programme Amazon Associates.
3. **Pages légales** (`src/content/legal/`) : à faire valider par un
   professionnel (avocat/comptable) et à compléter — raison sociale, SIRET,
   hébergeur, DPO le cas échéant. Tous les placeholders sont entre crochets.
4. **Images produit** : remplacer `public/images/produits/placeholder-clim.svg`
   par de vraies photos.
5. Mettre à jour `SITE.contactEmail` et le domaine dans `astro.config.mjs`
   (`site: 'https://topclim.fr'`) si nécessaire.

## Garde-fous déjà en place

- Aucun prix n'est codé en dur nulle part dans le contenu ou les composants.
- Tous les liens marchands portent `rel="sponsored nofollow noopener"` et
  s'ouvrent dans un nouvel onglet.
- Le formulaire newsletter ne référence aucun lien Amazon.
- Bandeau de consentement cookies (RGPD) avant tout cookie non essentiel.
- Page dédiée "Comment on gagne de l'argent" pour la transparence sur
  l'affiliation.
