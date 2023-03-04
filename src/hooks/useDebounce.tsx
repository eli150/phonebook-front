import { useEffect, useCallback } from "react";

export default function useDebounce(
  effect: React.EffectCallback,
  deps: React.DependencyList,
  delay: number
) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
