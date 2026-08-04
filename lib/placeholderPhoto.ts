// Curated, freely-licensed photography (Wikimedia Commons) used as
// placeholder imagery in structural spots (hero, page banners) and as cover
// images for the seeded demo content. Swap for the foundation's own photos
// via the Cloudinary uploader once available.
//
// Each one was picked and visually checked by hand for its specific theme —
// an earlier version generated these from keyword strings against a random
// stock-photo service, which turned out both thematically wrong (a "medical"
// seed could return a photo of a game controller) and unreliable (the
// keyword-tagged alternative that fixed the theming returned 500s under
// normal load). A small fixed set of verified URLs has neither problem.
function commonsFile(filename: string, width = 1600) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}

export const STOCK_PHOTOS = {
  medicalOutreach: commonsFile("Medical_Outreach_to_Ilaje_Community_of_Lagos_state.jpg"),
  classroom: commonsFile(
    "A_young_Congolese_boy_during_a_lesson_at_the_Mugosi_Primary_School,_which_caters_mostly_for_children_of_the_Kahe_refugee_camp_in_the_town_of_Kitschoro,_in_the_north_eastern_part_of_the_Democratic_Republic_of_the_Congo.jpg"
  ),
  youthCelebration: commonsFile("African_Kids_aim_for_the_sky.jpg"),
  youthEvent: commonsFile("City_Life_Youth_Empowerment.jpg"),
  cleanWater: commonsFile("Cleanwater_mcprogram.jpg"),
} as const;

// Generic fallback for CMS content (e.g. a future admin-created programme)
// that doesn't have an uploaded cover image yet. A single verified, warm,
// widely-applicable photo beats a live per-title image lookup that can fail.
export function fallbackPhoto() {
  return STOCK_PHOTOS.youthCelebration;
}
