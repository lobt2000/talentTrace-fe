export enum StagesEnum {
  TECH_INTERVIEW,
  SOFT_INTERVIEW,
  INTERVIEW,
  PRACTICE_TASK,
  ENGLISH_TEST,
  DEFAULT,
}

export type stagesEnumKeys = keyof typeof StagesEnum;
