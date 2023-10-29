export const saveToLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): any => {
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  const parsedValue = JSON.parse(value);
  return parsedValue;
};

export const getLengthArray = (array: any[]): number => array.length;
