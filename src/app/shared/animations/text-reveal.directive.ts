import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTextReveal]',
  standalone: true,
})
export class TextRevealDirective implements OnInit, OnDestroy {
  /** Animation mode: chars, words, or lines */
  @Input() textRevealMode: 'chars' | 'words' | 'lines' = 'words';

  /** Base delay between items (ms) */
  @Input() textRevealDelay = 60;

  /** Stagger offset per item (ms) */
  @Input() textRevealStagger = 40;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;
  private originalText = '';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;
    this.originalText = host.innerHTML;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animate(host);
            this.observer?.unobserve(host);
          }
        });
      },
      { threshold: 0.2 },
    );

    // Set initial hidden state on the whole element
    this.renderer.setStyle(host, 'visibility', 'visible');

    this.observer.observe(host);
  }

  private animate(host: HTMLElement): void {
    const text = host.textContent || '';
    let items: string[];

    switch (this.textRevealMode) {
      case 'chars':
        items = text.split('');
        break;
      case 'lines':
        items = text.split('\n').filter(Boolean);
        break;
      case 'words':
      default:
        items = text.split(/\s+/).filter(Boolean);
        break;
    }

    host.innerHTML = '';

    items.forEach((item, i) => {
      const span = this.renderer.createElement('span');
      this.renderer.setStyle(span, 'display', 'inline-block');
      this.renderer.setStyle(span, 'opacity', '0');
      this.renderer.setStyle(span, 'transform', 'translateY(20px) rotateX(40deg)');
      this.renderer.setStyle(span, 'transition',
        `opacity 0.5s cubic-bezier(.4,0,.2,1) ${this.textRevealDelay + i * this.textRevealStagger}ms, transform 0.5s cubic-bezier(.4,0,.2,1) ${this.textRevealDelay + i * this.textRevealStagger}ms`);

      const textNode = this.renderer.createText(item);
      this.renderer.appendChild(span, textNode);
      this.renderer.appendChild(host, span);

      // Add space between words/lines
      if (this.textRevealMode !== 'chars' && i < items.length - 1) {
        const space = this.renderer.createText(this.textRevealMode === 'lines' ? '' : ' ');
        this.renderer.appendChild(host, space);
      }
    });

    // Trigger animation
    requestAnimationFrame(() => {
      const spans = host.querySelectorAll('span');
      spans.forEach((span) => {
        this.renderer.setStyle(span, 'opacity', '1');
        this.renderer.setStyle(span, 'transform', 'translateY(0) rotateX(0)');
      });
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
