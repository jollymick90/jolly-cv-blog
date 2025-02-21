import type { SkillItem } from '$lib/content/resume';

export const getColor = (skill: SkillItem) => {
    switch (skill.levelTag) {
        case "high":

            return "bg-green-500"

        case "medium":

            return "bg-yellow-500"
        case "base":

            return "bg-pink-500"
    }
}