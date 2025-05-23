import { eventTypes } from '$lib/content';
import type { SkillItem, TimelineEvent } from '$lib/content/resume';

export const getColor = (skill: SkillItem) => {
    switch (skill.levelTag) {
        case "high":

            return "bg-exp-pro";//bg-green-500"

        case "medium":

            return  "bg-exp-work";//"bg-yellow-500"
        case "base":

            return  "bg-exp-base";//"bg-pink-500"
    }
}
export const mapTimelineUI = <
  T extends TimelineEvent,
  TOut extends T & { className: string }
>(item: T): TOut => {
  return {
    ...item,
    className: eventTypes[item.type]
  } as TOut;
};

// export const mapTimelineUI = <
// T extends TimelineEvent,
// TOut extends TimelineEventUI
// >(item: T): TOut=> {
//     return {
//         ...item,
//         className: eventTypes[item.type]
//     } as TOut;
// }