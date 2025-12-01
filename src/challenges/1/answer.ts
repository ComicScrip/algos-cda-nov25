/**
 * In this challenge, you must sort all ads by their price (cheapest first). If some of them
 * have the same price, you should sort by their title alphabetically (A to Z)
 *
 * @param ads Unsorted list of ads
 * @returns Sorted list of ads
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ ads }: { ads: Ad[] }): Ad[] {
  /*
  return ads.sort((a, b) => {
    if (a.price !== b.price) {
      return a.price - b.price; // Sort by price ascending (cheapest first: built in sort comparator method push negative values first, null values in relative way and positive values at the end)
    }
    return a.title.localeCompare(b.title); // Sort by title alphabetically (A to Z)
  });
  */
  return ads.sort((a, b) => a.price === b.price ? a.title.localeCompare(b.title) : a.price - b.price)
}

// used interfaces, do not touch
export interface Ad {
  title: string;
  price: number;
  tags: string[];
}
