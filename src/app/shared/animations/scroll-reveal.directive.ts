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

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  /** Animation type to apply */
  @Input() revealAnimation: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'blur' = 'fade-up';

  /** Delay before animation starts (ms) */
  @Input() revealDelay = 0;

  /** Portion of element visible before trigger (0–1) */
  @Input() revealThreshold = 0.15;

  /** Only animate once */
  @Input() revealOnce = true;

  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;

    // Set initial hidden state
    host.style.opacity = '0';
    host.style.willChange = 'opacity, transform';
    host.style.transition = `opacity 0.6s cubic-bezier(.4,0,.2,1) ${this.revealDelay}ms, transform 0.6s cubic-bezier(.4,0,.2,1) ${this.revealDelay}ms, filter 0.6s cubic-bezier(.4,0,.2,1) ${this.revealDelay}ms`;

    this.applyInitialTransform(host);

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.reveal(host);
              if (this.revealOnce) {
                this.observer?.unobserve(host);
              }
            } else if (!this.revealOnce) {
              this.hide(host);
            }
          });
        },
        { threshold: this.revealThreshold },
      );

      this.observer.observe(host);
    });
  }

  private applyInitialTransform(host: HTMLElement): void {
    switch (this.revealAnimation) {
      case 'fade-up':
        host.style.transform = 'translate3d(0, 32px, 0)';
        break;
      case 'fade-left':
        host.style.transform = 'translate3d(-32px, 0, 0)';
        break;
      case 'fade-right':
        host.style.transform = 'translate3d(32px, 0, 0)';
        break;
      case 'scale':
        host.style.transform = 'scale(0.92)';
        break;
      case 'blur':
        host.style.filter = 'blur(6px)';
        host.style.transform = 'translate3d(0, 20px, 0)';
        break;
    }
  }

  private reveal(el: HTMLElement): void {
    el.style.opacity = '1';
    el.style.transform = 'translate3d(0, 0, 0) scale(1)';
    el.style.filter = 'none';
    // Clean up will-change after transition completes
    setTimeout(() => {
      el.style.willChange = 'auto';
    }, this.revealDelay + 650);
  }

  private hide(el: HTMLElement): void {
    el.style.opacity = '0';
    el.style.willChange = 'opacity, transform';
    this.applyInitialTransform(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

