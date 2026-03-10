import { useState, useEffect } from "react";

export function useTemporaryState<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (value === initialValue) return;

    const timer = setTimeout(() => {
      setValue(initialValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, initialValue]);

  return [value, setValue] as const;
}
