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

/*
export default function ({
  messages,
}: {
  messages: MessageWithImages[];
}): string[] {
  return []
}
*/


// used interfaces, do not touch
export interface MessageWithImages {
  sentBy: string;
  content: string;
  images: string[];
  sentAt: string;
}
