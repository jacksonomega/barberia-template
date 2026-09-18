import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  NgZone,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit, OnDestroy {
  /** Maximum tilt angle in degrees */
  @Input() tiltMaxAngle = 8;

  /** Show glare overlay on hover */
  @Input() tiltGlare = true;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  private glareEl?: HTMLElement;
  private cachedRect: DOMRect | null = null;
  private rafId: number | null = null;

  private onMouseEnter = () => this.handleEnter();
  private onMouseMove = (e: MouseEvent) => this.handleMove(e);
  private onMouseLeave = () => this.handleLeave();

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;
    host.style.transformStyle = 'preserve-3d';
    host.style.transition = 'transform 0.4s cubic-bezier(.03,.98,.52,.99)';

    if (this.tiltGlare) {
      this.glareEl = this.renderer.createElement('div');
      this.renderer.setStyle(this.glareEl, 'position', 'absolute');
      this.renderer.setStyle(this.glareEl, 'inset', '0');
      this.renderer.setStyle(this.glareEl, 'borderRadius', 'inherit');
      this.renderer.setStyle(this.glareEl, 'pointerEvents', 'none');
      this.renderer.setStyle(this.glareEl, 'opacity', '0');
      this.renderer.setStyle(this.glareEl, 'transition', 'opacity 0.3s ease');
      this.renderer.setStyle(this.glareEl, 'zIndex', '10');
      this.renderer.setStyle(this.glareEl, 'overflow', 'hidden');
      this.renderer.setStyle(this.glareEl, 'background',
        'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)');

      // Ensure parent is positioned
      const position = getComputedStyle(host).position;
      if (!position || position === 'static') {
        this.renderer.setStyle(host, 'position', 'relative');
      }

      this.renderer.appendChild(host, this.glareEl);
    }

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
    host.style.transition = 'transform 0.08s linear';
    if (this.glareEl) {
      this.glareEl.style.opacity = '1';
    }
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
      const centerX = this.cachedRect.left + this.cachedRect.width / 2;
      const centerY = this.cachedRect.top + this.cachedRect.height / 2;

      const percentX = (e.clientX - centerX) / (this.cachedRect.width / 2);
      const percentY = (e.clientY - centerY) / (this.cachedRect.height / 2);

      const rotateX = -percentY * this.tiltMaxAngle;
      const rotateY = percentX * this.tiltMaxAngle;

      host.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      if (this.glareEl) {
        const glareAngle = Math.atan2(percentY, percentX) * (180 / Math.PI) + 180;
        this.glareEl.style.background = `linear-gradient(${glareAngle.toFixed(0)}deg, rgba(255,255,255,0.18) 0%, transparent 60%)`;
      }
    });
  }

  private handleLeave(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.cachedRect = null;
    const host = this.el.nativeElement;
    host.style.transition = 'transform 0.5s cubic-bezier(.03,.98,.52,.99)';
    host.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    host.style.willChange = 'auto';
    if (this.glareEl) {
      this.glareEl.style.opacity = '0';
    }
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
    if (this.glareEl) {
      this.renderer.removeChild(host, this.glareEl);
    }
  }
}

