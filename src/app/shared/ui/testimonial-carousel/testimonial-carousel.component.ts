import { Component, Input, OnInit, OnDestroy, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Testimonial } from '../../models';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';

@Component({
  selector: 'app-testimonial-carousel',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div class="kd-tcar" appScrollReveal revealAnimation="slide-up">
      <div class="kd-tcar__frame">
        @for (t of testimonials; track t.name; let i = $index) {
          @if (i === activeIndex()) {
            <div class="kd-tcar__slide">
              <p class="kd-tcar__quote">“{{ t.text }}”</p>
              <div class="kd-tcar__meta">
                <div class="kd-tcar__author-wrap">
                  <span class="kd-tcar__name">{{ t.name }}</span>
                  <span class="kd-tcar__sep">—</span>
                  <span class="kd-tcar__date">{{ t.date }}</span>
                </div>
                <div class="kd-tcar__stars" [attr.aria-label]="t.rating + ' de 5 estrellas'">
                  @for (s of [1, 2, 3, 4, 5]; track s) {
                    <span [class.kd-star--empty]="s > t.rating">★</span>
                  }
                </div>
              </div>
            </div>
          }
        }
      </div>

      <div class="kd-tcar__controls">
        <div class="kd-tcar__dots">
          @for (t of testimonials; track t.name; let i = $index) {
            <button
              type="button"
              class="kd-tcar__dot"
              [class.kd-tcar__dot--active]="i === activeIndex()"
              (click)="goTo(i)"
              [attr.aria-label]="'Reseña ' + (i + 1)"
            >
              0{{ i + 1 }}
            </button>
          }
        </div>
        <button type="button" class="kd-tcar__next" (click)="next()">
          Siguiente Reseña →
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .kd-tcar {
      width: 100%;
      border-top: 1px solid var(--red);
      border-bottom: 1px solid var(--red);
      padding: 48px 0;
    }

    .kd-tcar__frame {
      min-height: 190px;
      display: flex;
      align-items: center;
    }

    .kd-tcar__slide {
      width: 100%;
      animation: kdSlideFade 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    @keyframes kdSlideFade {
      from { opacity: 0; transform: translate3d(0, 20px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }

    .kd-tcar__quote {
      font-family: var(--font-display);
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      font-weight: 400;
      line-height: 1.22;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      margin-bottom: 28px;
      max-width: 980px;
    }

    .kd-tcar__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .kd-tcar__author-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.15rem;
    }

    .kd-tcar__name {
      font-weight: 700;
      color: #FFFFFF;
    }

    .kd-tcar__sep,
    .kd-tcar__date {
      color: #A1A1AA;
    }

    .kd-tcar__stars {
      font-size: 1.25rem;
      letter-spacing: 4px;
      color: var(--red);
    }

    .kd-star--empty {
      opacity: 0.25;
      color: #71717A;
    }

    .kd-tcar__controls {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(232, 38, 43, 0.4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .kd-tcar__dots {
      display: flex;
      gap: 10px;
    }

    .kd-tcar__dot {
      padding: 6px 18px;
      border: 1px solid var(--red);
      border-radius: 50px;
      background: var(--bg-base);
      color: #FFFFFF;
      font-family: var(--font-display);
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .kd-tcar__dot--active,
    .kd-tcar__dot:hover {
      background: var(--red);
      color: #FFFFFF;
    }

    .kd-tcar__next {
      padding: 6px 24px;
      border: 1px solid var(--red);
      border-radius: 50px;
      background: var(--bg-base);
      color: #FFFFFF;
      font-family: var(--font-display);
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .kd-tcar__next:hover {
      background: var(--red);
      color: #FFFFFF;
    }
  `],
})
export class TestimonialCarouselComponent implements OnInit, OnDestroy {
  @Input() testimonials: Testimonial[] = [];
  @Input() autoplay = true;
  @Input() interval = 5000;

  activeIndex = signal(0);
  animating = signal(false);

  private platformId = inject(PLATFORM_ID);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (this.autoplay && isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  private startAutoplay(): void {
    this.timer = setInterval(() => {
      this.next();
    }, this.interval);
  }

  next(): void {
    if (!this.testimonials.length) return;
    this.animating.set(true);
    setTimeout(() => this.animating.set(false), 50);
    this.activeIndex.set((this.activeIndex() + 1) % this.testimonials.length);
  }

  goTo(index: number): void {
    if (this.timer) clearInterval(this.timer);
    this.animating.set(true);
    setTimeout(() => this.animating.set(false), 50);
    this.activeIndex.set(index);
    if (this.autoplay && isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  starsArray(count: number): number[] {
    return Array(count).fill(0);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
