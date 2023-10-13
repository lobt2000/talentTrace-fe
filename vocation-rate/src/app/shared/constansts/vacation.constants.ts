export enum Skills {
  Angular,
  React,
  Java,
  'C#',
  Python,
}

export const getSkillsArray = (): Array<Skills | string> => {
  return Object.values(Skills).filter((res) => typeof res === 'string');
};

export type keySkills = keyof typeof Skills;
