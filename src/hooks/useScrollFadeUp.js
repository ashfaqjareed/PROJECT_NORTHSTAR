// src/hooks/useScrollFadeUp.js
// Wires IntersectionObserver to add 'visible' class on .fade-up elements
import { useEffect } from 'react';

export function useScrollFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(() => el.classList.add('visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = document.querySelectorAll('.fade-up');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
