"use client";

import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  duration = 1200,
  startOnMount = true,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startOnMount) return;
    let start = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setValue(current);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration, startOnMount]);

  return value;
}
