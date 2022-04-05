import { useCallback, useEffect, useState } from 'react';

export default <T = unknown>(key: string, initialValue: T): [T | undefined, (value: T | ((val: T) => T)) => void, () => void] => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const initialize = (key: string) => {
      try {
        const item = localStorage?.getItem(key);
        if (item) {
          return JSON.parse(item);
        }

        localStorage?.setItem(key, JSON.stringify(initialValue));

        return initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    };
    setState(initialize(key));
  }, [initialValue, key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(state as T) : value;
        setState(valueToStore);
        localStorage?.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, state]
  );

  const remove = useCallback(() => {
    try {
      localStorage?.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [state, setValue, remove];
};
