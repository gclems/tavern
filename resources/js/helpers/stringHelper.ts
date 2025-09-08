export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const sign = (num: number) => `${num >= 0 ? '+' : ''}${num}`;
