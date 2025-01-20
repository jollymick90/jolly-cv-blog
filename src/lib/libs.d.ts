export type LevelTag = "high" | "medium" | "base"
export interface SkillItem {
    name: string;
    level: number;
    levelTag: LevelTag;
}

export interface SkillItemUI extends SkillItem {
    color: string
}