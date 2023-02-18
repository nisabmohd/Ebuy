import { useState } from "react";

export default function useLocalStorage<V>(
  key: string,
  initialValue: V
): [V, (val: V) => void] {
  const [value, setStateValue] = useState<V>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  function setValue(val: V | ((value: V) => V)) {
    if (val instanceof Function) {
      const call = val(value);
      setStateValue(call);
      localStorage.setItem(key, JSON.stringify(call));
    } else {
      setStateValue(val);
      localStorage.setItem(key, JSON.stringify(val));
    }
  }
  return [value, setValue];
}

export function clearLocalStorage() {
  localStorage.clear();
}
