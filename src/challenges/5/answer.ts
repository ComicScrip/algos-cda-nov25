/**
 * In this challenge, you have to get all the images sent in a conversation (list of messages).
 * Images must be sorted by message datetime they are attached to. 
 * If there are multiple images with the same message datetime, the ones that have the smallest file name should appear first.
 * You should not display duplicates. If duplicates are found, the recent one should be kept.
 * This algo could be useful to create a medias gallery in a conversation app (such as in WhatsApp conversations)
 *
 * @param messages List of messages with their images
 * @returns All existing images sorted by their message datetimes (recent first), without duplicates
 */

// ↓ uncomment bellow lines and add your response!


export default function ({
  messages,
}: {
  messages: MessageWithImages[];
}): string[] {
  /*
  // Chaque objet image devient un objet image/date sentAt
  const imagesWithDate = messages.flatMap(message => 
    message.images.map(image => ({image, sentAt: message.sentAt}))
  );
  // Dédoublonnage avec filter qui décide s'il faut le garder ou pas (true/false)
  const seen = new Set<string>();
  const uniqueImages = imagesWithDate.filter(item => {
    if (seen.has(item.image)) return false; 
    // si pas encore vu, on garde, sinon on passe au suivant
    seen.add(item.image);
    return true;
  });

  // Classement d'abord par date sentAt puis par image.length avec sort et localeCompare
  uniqueImages.sort((a, b) => { // attend une fonction localeCompare qui compare a et b et retourne soit un nombre négatif, soit 0, soit un nombre positif
    const dateCompare = a.sentAt.localeCompare(b.sentAt);
    // Si dates différentes, on retourne dateCompare pour trier et on s'arrête là, sinon on utilise image.length car c'est le 2eme critère
    if (dateCompare !== 0) return dateCompare;
    return a.image.length - b.image.length;
    // ou écriture ternaire : return dateCompare !== 0 ? dateCompare : a.image.length - b.image.length;
  });

  return uniqueImages.map(item => item.image);
  */

  return [...new Set(
    messages.sort((a, b) => b.sentAt.localeCompare(a.sentAt))
      .flatMap(m => m.images.sort((a, b) => a.length - b.length))
  )]
}



// used interfaces, do not touch
export interface MessageWithImages {
  sentBy: string;
  content: string;
  images: string[];
  sentAt: string;
}
