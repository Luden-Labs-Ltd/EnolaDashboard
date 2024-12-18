import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): {
    storedValue: T,
    setValue: (value: T) => void,
    isLocalValueLoading: boolean,
} {
  const [isLocalValueLoading, setIsLocalValueLoading] = useState(true);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
      setIsLocalValueLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return { storedValue, setValue, isLocalValueLoading };
}

export default useLocalStorage;
