export const GetRandomNum = (Min: number, Max: number): number => {
  const Range = Max - Min;
  const Rand = Math.random();
  return Min + Math.round(Rand * Range);
};

export const NumAdd = (x: number, y: number): number => {
  return x + y;
};

export const RandomNumArray = (length: number = 999) => {
  let nums: any[] = [];
  // @ts-ignore
  const arr = [...Array(length).keys()] as never[];
  const res = [];
  while (arr.length) {
    const randomIndex = Math.random() * arr.length - 1;
    res.push(arr.splice(randomIndex, 1)[0]);
  }
  nums = [...nums, ...res];

  return nums;
};
