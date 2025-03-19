export const useLocalStorage = () => {
  const setItem = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
  };

  return { setItem, getItem };
};
