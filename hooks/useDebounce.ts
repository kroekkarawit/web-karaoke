import { useState, useEffect } from "react";
export default function useDebounce(value: string, delay: number, searchFunction: (query: string) => void) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchFunction(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay, searchFunction]);
}