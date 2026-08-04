// Stand-in photography for structural/decorative spots (hero backdrops, page
// banners) that aren't CMS content. Swap for real photos once the foundation
// has some — same seeded-URL approach used by scripts/seed-content.mjs so the
// look is stable across reloads/deploys, not different on every render.
export function placeholderPhoto(seed: string, width = 1600, height = 1000) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
