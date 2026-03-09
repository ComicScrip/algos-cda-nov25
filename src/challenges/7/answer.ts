/**
 * In this challenge, you will get the opening slots of a company by day of
 * the week (1 being Monday, this is the iso week day). You have to create
 * a function that returns the planning of the opening hours of the company for
 * a precise day, hour by hour. If there is an ambiguity for a given hour
 * you should consider so company to be closed.
 *
 * We ensure that opening slots are valid (the opensAt time is before closesAt,
 * no need to check that).
 *
 * Tip: opening slots are not sorted chronologically!
 *
 *
 * Example:
 * Input: {
 *  openingSlots: [{ "isoWeekday": 1, "opensAt": "09:00", "closesAt": "12:00" }, { "isoWeekday": 1, "opensAt": "14:00", "closesAt": "19:30" }],
 *  isoWeekday: 1
 * Output: [
 *     { fromTime: "00:00", toTime: "01:00", status: "closed"},
 *     { fromTime: "01:00", toTime: "02:00", status: "closed"},
 *     ...,
 *     { fromTime: "09:00", toTime: "10:00", status: "opened"},
 *     ...,
 *     { fromTime: "19:00", toTime: "20:00", status: "closed"},
 *     ...,
 *     { fromTime: "23:00", toTime: "00:00", status: "closed"},
 * ]
 *
 * @param openingSlots List of opening slots of the company
 * @param isoWeekday Number of the day in the week we want the planning for (1 being Monday)
 * @returns The planning with the status of each slot of the given day, a slot being 60 minutes
 */

/*
// Conversion des "hh:mm" format String en nombre de minutes après 00:00
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Conversion du nombre de minutes après 00:00 en format String "hh:mm"
function formatHour(hour: number): string {
  return hour.toString().padStart(2, '0') + ':00';
}

export default function ({
  openingSlots,
  isoWeekday,
}: {
  openingSlots: OpeningSlot[];
  isoWeekday: number;
}): PlanningSlot[] {

  // Filtrage des créneaux du jour demandé (output: mercredi = 3)
  const slotsForDay = openingSlots.filter(
    slot => slot.isoWeekday === isoWeekday
  );

  const planning: PlanningSlot[] = [];

  // Boucle pour les 24 heures pour définir les créneaux du planning output
  for (let hour = 0; hour < 24; hour++) {
    const fromTime = formatHour(hour);
    const toTime = formatHour(hour === 23 ? 0 : hour + 1);

  // Conversion des créneaux du planning output en minutes
  const fromMinutes = timeToMinutes(fromTime);
  const toMinutes = timeToMinutes(toTime === "00:00" ? "24:00" : toTime);
  
  // Vérifier si un créneau du planning output est inclus dans le openingSlot du jour demandé
  const coveringSlots = slotsForDay.filter(slot => {
    const opensAtMinutes = timeToMinutes(slot.opensAt);
    const closesAtMinutes = timeToMinutes(slot.closesAt);
    
    return opensAtMinutes <= fromMinutes && toMinutes <= closesAtMinutes;
  });

  // S'il y en a 1 : opened, si non : closed
  // Exemple pour closed :
  // openingSlot: 09:00 - 11:45  (540 - 705 minutes)
  // créneau:     09:00 - 10:00  (555 - 600 minutes)
  const status = coveringSlots.length === 1 ? "opened" : "closed";

    planning.push({
      fromTime,
      toTime,
      status
    });
  }
  
  return planning;
}
*/

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function ({
  openingSlots,
  isoWeekday,
}: {
  openingSlots: OpeningSlot[];
  isoWeekday: number;
}): PlanningSlot[] {
  const daySlots = openingSlots.filter((s) => s.isoWeekday === isoWeekday);

  return Array.from({ length: 24 }, (_, h) => {
    const fromMin = h * 60;
    const toMin = (h + 1) * 60;

    const matchCount = daySlots.filter(
      (s) => fromMin >= toMinutes(s.opensAt) && toMin <= toMinutes(s.closesAt)
    ).length;

    return {
      fromTime: formatTime(fromMin),
      toTime: formatTime(toMin),
      status: matchCount === 1 ? "opened" : "closed",
    }
  });
}

// used interfaces, do not touch
export interface OpeningSlot {
  isoWeekday: number;
  opensAt: string;
  closesAt: string;
}

export interface PlanningSlot {
  fromTime: string;
  toTime: string;
  status: "opened" | "closed";
}
