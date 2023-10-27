export enum colorPlate {
  '#FF113D' = 40,
  '#dc4437' = 60,
  '#FD9A35' = 80,
  '#2ED1B9' = 100,
}

export const getColorPlate = (percent): colorPlateKeys => {
  const percents: Array<string | colorPlate> = Object.values(colorPlate).filter(
    (el) => typeof el === 'number'
  );
  const comparePercent: string | colorPlate = percents.find((per, i, obj) =>
    !obj[i - 1] && per >= percent
      ? true
      : per >= percent && obj[i - 1] < percent
  );
  return colorPlate[comparePercent];
};
export type colorPlateKeys = keyof typeof colorPlate;
