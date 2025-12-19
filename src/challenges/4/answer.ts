/**
 * In this challenge, you should sort messages by their sentAt property (oldest first) and
 * modify them by adding an "unread" property
 * (boolean meaning that the current user did not read this message) based on the lastActivityDatetime
 * input.
 *
 * @param lastActivityDatetime String representing an ISO8601 datetime. Represent the last time the user checked his messages
 * @param messages List of messages, unsorted and without unread property
 * @returns Sorted list of messages with the unread information
 */

// ↓ uncomment bellow lines and add your response!

export default function ({
  lastActivityDatetime,
  messages,
}: {
  lastActivityDatetime: string;
  messages: Message[];
}): MessageWithUnread[] {
  /*
  const lastActivityObj = new Date(lastActivityDatetime);
  const res = messages
    .sort((a, b) => a.sentAt.localeCompare(b.sentAt))
    .map(message => {
      return {
        ...message,
        unread: new Date(message.sentAt) > lastActivityObj,
      };
    });
  return res;
  */

  return messages.sort((a, b) => a.sentAt.localeCompare(b.sentAt))
    .map(m => ({ ...m, unread: m.sentAt > lastActivityDatetime }))
}

// used interfaces, do not touch
export interface Message {
  sentBy: string;
  sentAt: string;
  content: string;
}

export interface MessageWithUnread extends Message {
  unread: boolean;
}
