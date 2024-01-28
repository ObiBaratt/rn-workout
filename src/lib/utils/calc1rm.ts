type MaxReps = {
  [key: number]: number;
};

export const maxReps: MaxReps = {
  1: 1.0,
  2: 0.97,
  3: 0.94,
  4: 0.92,
  5: 0.89,
  6: 0.86,
  7: 0.83,
  8: 0.81,
  9: 0.78,
  10: 0.75,
  11: 0.73,
  12: 0.71,
  13: 0.7,
  14: 0.68,
  15: 0.67,
  16: 0.65,
  17: 0.64,
  18: 0.63,
  19: 0.61,
  20: 0.6,
};

export const calcOneRm = (weight: number, reps: number): number => {
  const maxPercent = maxReps[reps];
  return Math.floor(weight / maxPercent);
};
