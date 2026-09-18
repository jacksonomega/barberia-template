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
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective implements OnInit, OnDestroy {
  /** Strength of the magnetic pull (0–1) */
  @Input() magneticStrength = 0.3;

  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  private cachedRect: DOMRect | null = null;
  private rafId: number | null = null;

  private onMouseEnter = () => this.handleEnter();
  private onMouseMove = (e: MouseEvent) => this.handleMove(e);
  private onMouseLeave = () => this.handleLeave();

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;
    host.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';

    this.zone.runOutsideAngular(() => {
      host.addEventListener('mouseenter', this.onMouseEnter, { passive: true });
      host.addEventListener('mousemove', this.onMouseMove, { passive: true });
      host.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
    });
  }

  private handleEnter(): void {
    const host = this.el.nativeElement;
    this.cachedRect = host.getBoundingClientRect();
    host.style.willChange = 'transform';
    host.style.transition = 'transform 0.06s linear';
  }

  private handleMove(e: MouseEvent): void {
    if (!this.cachedRect) {
      this.cachedRect = this.el.nativeElement.getBoundingClientRect();
    }
    if (this.rafId !== null) return;

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (!this.cachedRect) return;

      const host = this.el.nativeElement;
      const x = e.clientX - this.cachedRect.left - this.cachedRect.width / 2;
      const y = e.clientY - this.cachedRect.top - this.cachedRect.height / 2;

      const tx = (x * this.magneticStrength).toFixed(1);
      const ty = (y * this.magneticStrength).toFixed(1);

      host.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
  }

  private handleLeave(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.cachedRect = null;
    const host = this.el.nativeElement;
    host.style.transition = 'transform 0.35s cubic-bezier(.4,0,.2,1)';
    host.style.transform = 'translate3d(0, 0, 0)';
    host.style.willChange = 'auto';
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    const host = this.el.nativeElement;
    host.removeEventListener('mouseenter', this.onMouseEnter);
    host.removeEventListener('mousemove', this.onMouseMove);
    host.removeEventListener('mouseleave', this.onMouseLeave);
  }
}

