import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      silo: z.enum(['climatiseur-mobile']).default('climatiseur-mobile'),
      publishDate: z.date(),
      updatedDate: z.date().optional(),
      showEmailCapture: z.boolean().default(true),
      relatedComparatifs: z.array(reference('comparatifs')).default([]),
    }),
});

const comparatifs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/comparatifs' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      silo: z.enum(['climatiseur-mobile']).default('climatiseur-mobile'),
      publishDate: z.date(),
      updatedDate: z.date().optional(),
      showEmailCapture: z.boolean().default(true),
      produits: z.array(reference('produits')).default([]),
    }),
});

const produits = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/produits' }),
  schema: () =>
    z.object({
      nom: z.string(),
      marque: z.string(),
      // Un vrai climatiseur (compresseur + gaine d'évacuation) refroidit
      // réellement une pièce ; un rafraîchisseur évaporatif a un effet plus
      // limité (voir le guide). On distingue les deux pour ne jamais prêter
      // à un rafraîchisseur des specs/performances de climatiseur.
      type: z.enum(['climatiseur', 'rafraichisseur']).default('climatiseur'),
      image: z.string(),
      imageAlt: z.string(),
      puissanceBtu: z.number().optional(),
      surfaceConseilleeM2: z.string(),
      niveauSonoreDb: z.number().optional(),
      reversible: z.boolean(),
      classeEnergetique: z.string().optional(),
      avantages: z.array(z.string()),
      inconvenients: z.array(z.string()),
      noteRedaction: z.number().min(0).max(5),
      liens: z.object({
        amazon: z.string().url().optional(),
        cdiscount: z.string().url().optional(),
        manomano: z.string().url().optional(),
      }),
    }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: () =>
    z.object({
      title: z.string(),
      updatedDate: z.date(),
    }),
});

export const collections = { guides, comparatifs, produits, legal };
