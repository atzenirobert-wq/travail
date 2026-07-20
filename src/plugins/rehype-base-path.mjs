import { visit } from 'unist-util-visit';

/**
 * Prefixes root-relative <a href="/..."> links inside rendered Markdown with
 * the site's configured base path, so internal links between guides,
 * comparatifs and legal pages keep working when deployed under a subpath
 * (e.g. GitHub Pages project sites at /travail/).
 */
export function rehypeBasePath(base) {
  const prefix = base.replace(/\/$/, '');
  return () => (tree) => {
    if (!prefix) return;
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && typeof node.properties?.href === 'string') {
        const href = node.properties.href;
        if (href.startsWith('/') && !href.startsWith('//')) {
          node.properties.href = prefix + href;
        }
      }
    });
  };
}
