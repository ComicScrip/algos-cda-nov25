/**
 * In this challenge, you want to compute stats about your chat usage. Your
 * main goal is to see when, during the day, your chat is mostly used. To
 * do so, you should create a function that, for a given list of messages and
 * 2 datetimes returns hour by hour the number of messages sent, in the given
 * time interval.
 *
 * The computed result must contain all one-hour data even if there is no message
 * in it. The result must contain the time interval (so from datetime and to datetime
 * params must be rounded down and up if they have some minutes, for instance the datetime interval
 * from "2023-11-10T10:30:00.000Z" to "2023-11-10T12:15:00.000Z" must be treated as
 * from "2023-11-10T10:00:00.000Z" to "2023-11-10T13:00:00.000Z")
 *
 * Tip 1: the input messages list is not sorted chronologically
 * Tip 2: when rounding up "2023-11-10T23:10:00.000Z" you should be careful to add a day and set the hour to 00:00
 *
 * Example:
 * Input:
 *  - messages: [
 *      { content: "...", sentAt: "2023-11-08T21:00:01.000Z" },
 *      { content: "...", sentAt: "2023-11-10T02:04:00.000Z" },
 *      { content: "...", sentAt: "2023-11-10T10:24:00.000Z" },
 *      { content: "...", sentAt: "2023-11-10T10:26:00.000Z" },
 *      { content: "...", sentAt: "2023-11-12T20:12:00.000Z" },
 *      { content: "...", sentAt: "2023-11-12T20:18:00.000Z" },
 *      { content: "...", sentAt: "2023-11-12T23:54:00.000Z" },
 *  ]
 *  - fromDatetime: "2023-11-10T10:30:00.000Z"
 *  - toDatetime: "2023-11-12T21:00:00.000Z"
 *
 * Output should be: [
 *      { fromDatetime: "2023-11-10T10:00:00.000Z", toDatetime: "2023-11-10T11:00:00.000Z", messagesCount: 2 },
 *      { fromDatetime: "2023-11-10T11:00:00.000Z", toDatetime: "2023-11-10T12:00:00.000Z", messagesCount: 0 },
 *      ...,
 *      { fromDatetime: "2023-11-10T23:00:00.000Z", toDatetime: "2023-11-11T00:00:00.000Z", messagesCount: 0 },
 *      ...,
 *      { fromDatetime: "2023-11-12T20:00:00.000Z", toDatetime: "2023-11-12T21:00:00.000Z", messagesCount: 2 }
 *  ]
 */

/*
function floorToHour(dateTime: Date): Date {
  const d = new Date(dateTime.getTime());
  d.setUTCMinutes(0, 0, 0);
  return d;
}

function ceilToHour(dateTime: Date): Date {
  const ms = dateTime.getTime();
  const hourMs = 60 * 60 * 1000;
  return new Date(Math.ceil(ms / hourMs) * hourMs);
}

// Solution 2: Complexité = O(n + h)
export default function ({
  messages,
  fromDatetime,
  toDatetime,
}: {
  messages: Message[];
  fromDatetime: string;
  toDatetime: string;
}): MessageStatsSlot[] {

  const start = floorToHour(new Date(fromDatetime));
  const end = ceilToHour(new Date(toDatetime));

  const hourMs = 60 * 60 * 1000;

  const slots: MessageStatsSlot[] = [];
  const slotMap = new Map<number, MessageStatsSlot>();

  // création des slots horaires
  for (let t = start.getTime(); t < end.getTime(); t += hourMs) {
    const slot: MessageStatsSlot = {
      fromDatetime: new Date(t).toISOString(),
      toDatetime: new Date(t + hourMs).toISOString(),
      messagesCount: 0,
    };

    slots.push(slot);
    slotMap.set(t, slot);
  }

  // parcours des messages UNE seule fois
  for (const message of messages) {
    const sentAtMs = new Date(message.sentAt).getTime();

    if (sentAtMs < start.getTime() || sentAtMs >= end.getTime()) continue;

    const slotTime =
      Math.floor((sentAtMs - start.getTime()) / hourMs) * hourMs +
      start.getTime();

    const slot = slotMap.get(slotTime);
    if (slot) {
      slot.messagesCount++;
    }
  }

  return slots;
}
*/

export default function ({
  messages,
  fromDatetime,
  toDatetime,
}: {
  messages: Message[];
  fromDatetime: string;
  toDatetime: string;
}): MessageStatsSlot[] {
  // Round down fromDatetime to the nearest hour
  const from = new Date(fromDatetime);
  from.setUTCMinutes(0, 0, 0);

  // Round up toDatetime to the nearest hour (if not already on the hour)
  const to = new Date(toDatetime);
  if (to.getUTCMinutes() !== 0 || to.getUTCSeconds() !== 0 || to.getUTCMilliseconds() !== 0) {
    to.setUTCMinutes(0, 0, 0);
    to.setUTCHours(to.getUTCHours() + 1);
  }

  const slots: MessageStatsSlot[] = [];
  const current = new Date(from);

  while (current < to) {
    const slotFrom = new Date(current);
    const slotTo = new Date(current);
    slotTo.setUTCHours(slotTo.getUTCHours() + 1);

    const messagesCount = messages.filter((msg) => {
      const sentAt = new Date(msg.sentAt);
      return sentAt >= slotFrom && sentAt < slotTo;
    }).length;

    slots.push({
      fromDatetime: slotFrom.toISOString(),
      toDatetime: slotTo.toISOString(),
      messagesCount,
    });

    current.setUTCHours(current.getUTCHours() + 1);
  }

  return slots;
}
// used interfaces, do not touch
export interface Message {
  content: string;
  sentBy: string;
  sentAt: string;
  message: string;
}

export interface MessageStatsSlot {
  fromDatetime: string;
  toDatetime: string;
  messagesCount: number;
}
