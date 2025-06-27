"use client";
import { useState, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  speed?: number;
  pauseOnHover?: boolean;
}

interface InfiniteScrollReturn {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useInfiniteScroll(
  { speed = 1, pauseOnHover = true }: InfiniteScrollProps = {}
): InfiniteScrollReturn {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (pauseOnHover) {
      const enter = () => setIsPaused(true);
      const leave = () => setIsPaused(false);
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);

      // ✅ Correção ESLint: usando const, não var
      const removeHover = () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };

      // Remove ao desmontar
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        removeHover();
      };
    }

    singleSetWidthRef.current = Array.from(el.children).reduce(
      (acc, child) =>
        acc + (child instanceof HTMLElement ? child.offsetWidth + 16 : 0),
      0
    );

    let pos = 0;

    const animate = () => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      pos -= speed;
      if (Math.abs(pos) >= singleSetWidthRef.current) {
        pos += singleSetWidthRef.current;
      }

      el.style.transform = `translateX(${pos}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, speed, pauseOnHover]);

  return { scrollRef, isPaused, setIsPaused };
}
