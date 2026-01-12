/**
 * In this challenge, you must find and attach to each ad the ad (or ads)
 * with which the current ad has the most tags in common. This algo will
 * be very useful to get similar products of a given product.
 * Attached ads must be sorted by their title (A to Z).
 * You must not change the order of the main list of ads.
 *
 * @param ads List of ads without closestAds
 * @returns The same list but with a new closestAds prop on each
 */

// ↓ uncomment bellow lines and add your response!

export default function ({
  ads,
}: {
  ads: AdWithTags[];
}): AdWithTagsAndClosestAds[] {
  /*
  return ads.map(ad => {
    const similarAd: AdWithTags[] = []
    let score = 0
    for (const other of ads) {
      if (ad.title === other.title) continue

      const similarTags = ad.tags.filter(t =>
        other.tags.includes(t)
      )

      if (similarTags.length > score) {
        score = similarTags.length
        similarAd.length = 0
        similarAd.push(other)
      }
      else if (similarTags.length === score && score > 0) {
        similarAd.push(other)
      }
    }

    return { ...ad, closestAds: similarAd.sort((a, b) => a.title.localeCompare(b.title)) }
  })
  */

  return ads.map(a => {
    // on ne veut pas de l'annonce courante dans le tableau qui contiendra les annonces les plus proches
    // attention : ne pas faire une comparaison de références d'objets (ad !== a) 
    // car les objets, même s'ils ont les mêmes propriétés et les mêmes valeurs, 
    // seront toujours considérés comme différents, 
    // il faut plutot se baser sur la comparaison de chaines (le titre des annonces) pour les différencier
    const otherAds = ads.filter(ad => ad.title !== a.title)
    const otherAdsWithNbTagsInCommon = otherAds.map(otherAd => {
      const nbTagsInCommon = a.tags.reduce(
        (total, currentTag) => otherAd.tags.includes(currentTag) ? total + 1 : total,
        0
      )
      return ({ otherAd, nbTagsInCommon })
    })
    // otherAdsWithNbTagsInCommon ressemble à ceci pour une annonce donnée : 
    // [
    //  { otherAd: {title: "ad B", ...}, nbTagsInCommon: 2 }, 
    //  { otherAd: {title: "ad C", ...}, nbTagsInCommon: 1 }, 
    //  { otherAd: {title: "ad D", ...}, nbTagsInCommon: 3 }, 
    //  { otherAd: {title: "ad E", ...}, nbTagsInCommon: 3 }, 
    // ]
    const maxNbOfTagsInCommon = Math.max(...otherAdsWithNbTagsInCommon.map(el => el.nbTagsInCommon))
    // dans l'exemple précédent, on aurait maxNbOfTagsInCommon = 3
    const closestAds = maxNbOfTagsInCommon === 0 ? [] : otherAdsWithNbTagsInCommon
      .filter(el => el.nbTagsInCommon === maxNbOfTagsInCommon)
      .map(el => ({ ...el.otherAd }))
    // si on suit l'exemple précedent, closestAds = 
    // [
    //   {title: "ad D", ...},
    //   {title: "ad E", ...}
    // ] 
    closestAds.sort((a, b) => a.title.localeCompare(b.title))

    return ({ ...a, closestAds })
  })
}


// used interfaces, do not touch
export interface AdWithTags {
  title: string;
  price: number;
  tags: string[];
}

export interface AdWithTagsAndClosestAds extends AdWithTags {
  closestAds: AdWithTags[];
}
