const roundNearestFive = (x: number): number => 5 * Math.round(x / 5);

const percent1rm = (oneRm: number, percent: number): number => oneRm * percent;

const setCalc = (oneRm: number, percent: number): number =>
  roundNearestFive(percent1rm(oneRm, percent));

export const NuckolsPress = (oneRm: number): [number, number | string][][] => {
  const percent80 = setCalc(oneRm, 0.8);
  const percent85 = setCalc(oneRm, 0.85);
  const percent90 = setCalc(oneRm, 0.9);

  const day1 = (): [number, number | string][] => [
    [percent80, 5],
    [percent80, 5],
    [percent80, 5],
    [percent80, 5],
    [percent85, 3],
    [percent85, "AMAP, 5+"],
  ];

  const day2 = (): [number, number | string][] => [
    [percent80, 5],
    [percent80, 5],
    [percent85, 3],
    [percent85, 3],
    [percent85, 3],
    [percent85, "AMAP, 5+"],
  ];

  const day3 = (): [number, number | string][] => [
    [percent85, 3],
    [percent85, 3],
    [percent85, 3],
    [percent90, 1],
    [percent90, 1],
    [percent90, "AMAP, 3+"],
  ];

  return [day1(), day2(), day3()];
};

export const NuckolsSquat = (oneRm: number): [number, number | string][][] => {
  const percent80 = setCalc(oneRm, 0.8);
  const percent84 = setCalc(oneRm, 0.84);
  const percent90 = setCalc(oneRm, 0.9);
  const percent92 = setCalc(oneRm, 0.92);
  const percent95 = setCalc(oneRm, 0.95);

  const day1 = (): [number, number | string][] => [
    [percent80, "AMAP x 3. Goal: 8"],
    [percent84, "AMAP if > goal"],
  ];

  const day2 = (): [number, number | string][] => [
    [percent90, "AMAP x 3. Goal: 5"],
    [percent92, "AMAP if > goal"],
  ];

  const day3 = (): [number, number | string][] => [
    [percent95, "AMAP x 3. Goal: 3"],
  ];

  return [day1(), day2(), day3()];
};

export const NuckolsDeadlift = (
  oneRm: number,
): [number, number | string][][] => {
  const percent60 = setCalc(oneRm, 0.6);
  const percent65 = setCalc(oneRm, 0.65);
  const percent70 = setCalc(oneRm, 0.7);
  const percent80 = setCalc(oneRm, 0.8);
  const percent85 = setCalc(oneRm, 0.85);
  const percent90 = setCalc(oneRm, 0.9);

  const day1 = (): [number, number | string][] => [
    [percent80, 5],
    [percent80, 5],
    [percent80, 5],
    [percent80, 5],
    [percent60, "6x3 EMOM"],
  ];

  const day2 = (): [number, number | string][] => [
    [percent90, 1],
    [percent90, 1],
    [percent85, 3],
    [percent85, 3],
    [percent85, 3],
    [percent65, "6x3 EMOM"],
  ];

  const day3 = (): [number, number | string][] => [[percent70, "6x3 EMOM"]];

  return [day1(), day2(), day3()];
};

export const SquatOverload = (oneRm: number): [number, number | string][][] => {
  const repHi = roundNearestFive(oneRm * 0.94);
  const repMid = roundNearestFive(oneRm * 0.78);
  const rep5 = roundNearestFive(oneRm * 0.89);
  const rep20 = roundNearestFive(oneRm * 0.63);
  const repDropdown = roundNearestFive(oneRm * 0.8);
  const repNext = Math.floor((repHi / 0.89) * 0.94);

  const day1 = (): [number, number | string][] => [
    [repHi, 3],
    [repHi, 2],
    [repHi, 1],
    [repDropdown, "3x3 focus on speed"],
  ];

  const day2 = (): [number, number | string][] => [
    [repHi, 5],
    [repHi, 3],
    [repHi, 1],
    [repDropdown, "3x3 focus on speed"],
  ];

  const day3 = (): [number, number][] => [
    [repMid, 5],
    [rep5, 3],
    [repHi, 1],
    [repNext, 1],
    [rep20, 20],
  ];

  return [day1(), day2(), day3()];
};
