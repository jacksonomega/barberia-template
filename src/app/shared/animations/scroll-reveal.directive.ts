import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  NgZone,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type RevealAnimationType =
  | 'fade-up'
  | 'slide-up'
  | 'fade-in'
  | 'fade-left'
  | 'fade-right'
  | 'scale'
  | 'blur'
  | 'clip-down'
  | 'clip-up';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  /** Animation type to apply */
  @Input() revealAnimation: RevealAnimationType = 'slide-up';

  /** Delay before animation starts (ms) */
  @Input() revealDelay = 0;

  /** Portion of element visible before trigger (0–1) */
  @Input() revealThreshold = 0.12;

  /** Only animate once */
  @Input() revealOnce = true;

  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;

    const rect = host.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Si ya está visible en el viewport o muy próximo (con margen generoso), revelar de inmediato sin flicker
    const isAlreadyVisible = rect.top < vh * 1.05 && rect.bottom > -80;

    const duration =
      this.revealAnimation === 'clip-down' || this.revealAnimation === 'clip-up'
        ? 650
        : 450;
    const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

    host.style.willChange = 'opacity, transform, clip-path';
    host.style.transition = `opacity ${duration}ms ${easing} ${this.revealDelay}ms, transform ${duration}ms ${easing} ${this.revealDelay}ms, clip-path ${duration}ms ${easing} ${this.revealDelay}ms, filter ${duration}ms ${easing} ${this.revealDelay}ms`;

    if (isAlreadyVisible) {
      // Elementos visibles desde el inicio: mantenerlos visibles inmediatamente
      this.reveal(host, 0);
      return;
    }

    this.applyInitialTransform(host);

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal(host, duration);
      return;
    }

    // Safety timeout: revelar automáticamente tras 900ms para evitar huecos negros si el observer se demora
    const fallbackTimer = setTimeout(() => {
      this.reveal(host, duration);
    }, 900);

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              clearTimeout(fallbackTimer);
              this.reveal(host, duration);
              if (this.revealOnce) {
                this.observer?.unobserve(host);
              }
            } else if (!this.revealOnce) {
              this.hide(host);
            }
          });
        },
        {
          // Disparar 100px antes de que el elemento entre al viewport para que nunca haya huecos negros
          threshold: 0.01,
          rootMargin: '140px 0px 80px 0px',
        },
      );

      this.observer.observe(host);
    });
  }

  private applyInitialTransform(host: HTMLElement): void {
    switch (this.revealAnimation) {
      case 'clip-down':
        host.style.opacity = '1';
        host.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
        host.style.transform = 'scale(1.02)';
        break;
      case 'clip-up':
        host.style.opacity = '1';
        host.style.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
        host.style.transform = 'scale(1.02)';
        break;
      case 'fade-in':
        host.style.opacity = '0.4';
        host.style.transform = 'none';
        break;
      case 'slide-up':
      case 'fade-up':
        host.style.opacity = '0.35';
        host.style.transform = 'translate3d(0, 20px, 0)';
        break;
      case 'fade-left':
        host.style.opacity = '0.35';
        host.style.transform = 'translate3d(-24px, 0, 0)';
        break;
      case 'fade-right':
        host.style.opacity = '0.35';
        host.style.transform = 'translate3d(24px, 0, 0)';
        break;
      case 'scale':
        host.style.opacity = '0.4';
        host.style.transform = 'scale(0.97)';
        break;
      case 'blur':
        host.style.opacity = '0.4';
        host.style.filter = 'blur(4px)';
        host.style.transform = 'translate3d(0, 16px, 0)';
        break;
    }
  }

  private reveal(el: HTMLElement, duration = 750): void {
    el.style.opacity = '1';
    el.style.transform = 'translate3d(0, 0, 0) scale(1)';
    el.style.filter = 'none';
    if (this.revealAnimation === 'clip-down' || this.revealAnimation === 'clip-up') {
      el.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    }
    el.classList.add('kd-revealed');
    setTimeout(() => {
      el.style.willChange = 'auto';
    }, this.revealDelay + duration + 100);
  }

  private hide(el: HTMLElement): void {
    el.classList.remove('kd-revealed');
    el.style.willChange = 'opacity, transform, clip-path';
    this.applyInitialTransform(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
