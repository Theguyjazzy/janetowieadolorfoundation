import { useEffect, RefObject } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let sharedLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return sharedLenis;
}

export function initLenisSync(): () => void {
  if (prefersReducedMotion()) {
    return () => {};
  }

  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.92,
  });

  sharedLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    sharedLenis = null;
  };
}

/**
 * MOT-02: Woven Veil Route Transition
 */
export function triggerWovenVeilTransition(
  veilEl: HTMLElement | null,
  onApex: () => void,
): void {
  if (!veilEl || prefersReducedMotion()) {
    onApex();
    window.scrollTo(0, 0);
    return;
  }

  veilEl.classList.add('is-active');
  const tl = gsap.timeline({
    onComplete: () => {
      veilEl.classList.remove('is-active');
      ScrollTrigger.refresh();
    },
  });

  tl.set(veilEl, { transformOrigin: 'bottom center', scaleY: 0 })
    .to(veilEl, {
      scaleY: 1,
      duration: 0.22,
      ease: 'power3.in',
      onComplete: () => {
        onApex();
        if (sharedLenis) {
          sharedLenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      },
    })
    .set(veilEl, { transformOrigin: 'top center' })
    .to(veilEl, {
      scaleY: 0,
      duration: 0.28,
      delay: 0.04,
      ease: 'power4.out',
    });
}

/**
 * MOT-01, MOT-03, MOT-04, MOT-05, MOT-09 on Home
 */
export function useHomeChoreography(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // MOT-01: Hero Sovereign Opening + Image Shutter
      const heroLines = root.querySelectorAll('.hero-line-inner');
      const heroSub = root.querySelector('.hero-meta-col');
      const mainPrintFrame = root.querySelector('.hero-print-main .print-frame');
      const mainPrintImg = root.querySelector('.hero-print-main .print-frame img');
      const sidePrints = root.querySelectorAll('.hero-print-left, .hero-print-right');

      if (reduce) {
        gsap.set([heroLines, heroSub, mainPrintFrame, mainPrintImg, sidePrints], {
          clearProps: 'all',
          autoAlpha: 1,
        });
      } else {
        const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        heroTl
          .fromTo(
            heroLines,
            { yPercent: 105 },
            { yPercent: 0, duration: 0.85, stagger: 0.1 },
          )
          .fromTo(
            heroSub,
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7 },
            '-=0.55',
          );

        if (mainPrintFrame && mainPrintImg) {
          heroTl
            .fromTo(
              mainPrintFrame,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'power4.out' },
              0.08,
            )
            .fromTo(
              mainPrintImg,
              { scale: 1.12 },
              { scale: 1.0, duration: 1.15, ease: 'power3.out' },
              0.08,
            );
        }

        if (sidePrints.length) {
          heroTl.fromTo(
            sidePrints,
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.12 },
            0.22,
          );
        }
      }

      if (!reduce) {
        // MOT-03: Uneven Print Parallax Depth
        gsap.utils.toArray<HTMLElement>('[data-parallax-print]').forEach((el) => {
          const speed = Number(el.dataset.parallaxPrint || 22);
          gsap.to(el, {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          });
        });

        // MOT-04: Masked Section Headings & Group Staggers
        gsap.utils.toArray<HTMLElement>('[data-reveal-heading]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal-item]');
          if (!items.length) return;
          gsap.fromTo(
            items,
            { y: 22, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.72,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 84%',
                once: true,
              },
            },
          );
        });

        // MOT-05: Obsidian Chronicle Counters + Documentary Frame Depth Drift
        const counters = root.querySelectorAll<HTMLElement>('[data-counter-target]');
        if (counters.length) {
          ScrollTrigger.create({
            trigger: '#impact',
            start: 'top 92%',
            once: true,
            onEnter: () => {
              counters.forEach((el) => {
                const target = Number(el.dataset.counterTarget || 0);
                const suffix = el.dataset.counterSuffix || '';
                const decimals = Number(el.dataset.counterDecimals || 0);
                const state = { val: 0 };
                gsap.to(state, {
                  val: target,
                  duration: 0.65,
                  ease: 'power3.out',
                  onUpdate: () => {
                    el.textContent = `${state.val.toFixed(decimals)}${suffix}`;
                  },
                });
              });
            },
          });
        }

        const reelImgs = root.querySelectorAll<HTMLElement>('.chronicle-card-img img');
        if (reelImgs.length) {
          gsap.fromTo(
            reelImgs,
            { scale: 1.08, yPercent: 4 },
            {
              scale: 1.0,
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: '#impact',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        // MOT-09: Magnetic desktop buttons
        if (!window.matchMedia('(pointer: coarse)').matches) {
          gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((btn) => {
            const xTo = gsap.quickTo(btn, 'x', { duration: 0.38, ease: 'power3.out' });
            const yTo = gsap.quickTo(btn, 'y', { duration: 0.38, ease: 'power3.out' });

            const onMove = (e: PointerEvent) => {
              const rect = btn.getBoundingClientRect();
              const dx = (e.clientX - rect.left - rect.width / 2) * 0.14;
              const dy = (e.clientY - rect.top - rect.height / 2) * 0.14;
              xTo(Math.max(-6, Math.min(6, dx)));
              yTo(Math.max(-6, Math.min(6, dy)));
            };

            const onLeave = () => {
              xTo(0);
              yTo(0);
            };

            btn.addEventListener('pointermove', onMove);
            btn.addEventListener('pointerleave', onLeave);
          });
        }
      }

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef]);
}

/**
 * Shared sub-page entrance reveal
 */
export function useSubpageChoreography(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const heroItems = root.querySelectorAll('[data-subpage-hero]');
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.08, ease: 'power4.out' },
        );
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const items = group.querySelectorAll('[data-reveal-item]');
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.68,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
              once: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
