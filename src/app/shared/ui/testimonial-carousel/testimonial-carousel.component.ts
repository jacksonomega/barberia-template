import { Component, Input, OnInit, OnDestroy, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Testimonial } from '../../models';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';

@Component({
  selector: 'app-testimonial-carousel',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div class="tcar" appScrollReveal revealAnimation="fade-up">
      <div class="tcar__card">
        <div class="tcar__quote-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.2">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>
        </div>
        @for (t of testimonials; track t.name; let i = $index) {
          @if (i === activeIndex()) {
            <div class="tcar__content" [class.tcar__content--entering]="animating()">
              <div class="tcar__stars">
                @for (s of starsArray(t.rating); track $index) {
                  <span class="tcar__star">★</span>
                }
              </div>
              <p class="tcar__text">"{{ t.text }}"</p>
              <div class="tcar__author">
                <div class="tcar__avatar">{{ t.avatar }}</div>
                <div>
                  <p class="tcar__name">{{ t.name }}</p>
                  <p class="tcar__date">{{ t.date }}</p>
                </div>
              </div>
            </div>
          }
        }
        <div class="tcar__progress">
          <div class="tcar__progress-bar" [style.animationDuration.ms]="interval"></div>
        </div>
      </div>
      <div class="tcar__dots">
        @for (t of testimonials; track t.name; let i = $index) {
          <button
            class="tcar__dot"
            [class.tcar__dot--active]="i === activeIndex()"
            (click)="goTo(i)"
            [attr.aria-label]="'Reseña ' + (i + 1)"
          ></button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .tcar { max-width: 720px; margin: 0 auto; }

    .tcar__card {
      position: relative;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
      padding: 48px;
      margin-bottom: 24px;
      min-height: 280px;
      display: flex;
      align-items: center;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(.4,0,.2,1);
    }
    .tcar__card:hover {
      border-color: rgba(255,255,255,0.25);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(255,255,255,0.1);
    }

    .tcar__quote-icon {
      position: absolute;
      top: 24px;
      right: 32px;
      color: var(--gold);
    }

    .tcar__content {
      width: 100%;
      animation: tcar-fade-in 0.5s ease both;
    }
    .tcar__content--entering {
      animation: tcar-slide-in 0.5s cubic-bezier(.4,0,.2,1) both;
    }

    @keyframes tcar-fade-in {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes tcar-slide-in {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .tcar__stars {
      color: var(--gold);
      font-size: 1.3rem;
      letter-spacing: 3px;
      margin-bottom: 24px;
    }
    .tcar__star {
      display: inline-block;
      animation: tcar-star-pop 0.3s ease both;
    }
    .tcar__star:nth-child(2) { animation-delay: 0.05s; }
    .tcar__star:nth-child(3) { animation-delay: 0.1s; }
    .tcar__star:nth-child(4) { animation-delay: 0.15s; }
    .tcar__star:nth-child(5) { animation-delay: 0.2s; }

    @keyframes tcar-star-pop {
      0% { transform: scale(0) rotate(-20deg); opacity: 0; }
      70% { transform: scale(1.2) rotate(5deg); }
      100% { transform: scale(1) rotate(0); opacity: 1; }
    }

    .tcar__text {
      font-size: 1.1rem;
      color: var(--text-primary);
      line-height: 1.7;
      margin-bottom: 32px;
      font-style: italic;
    }
    .tcar__author {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .tcar__avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #000000;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
    .tcar__name {
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 2px;
    }
    .tcar__date {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    /* Progress bar */
    .tcar__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255,255,255,0.08);
      overflow: hidden;
    }
    .tcar__progress-bar {
      height: 100%;
      background: #FFFFFF;
      animation: tcar-progress linear infinite;
      transform-origin: left;
    }
    @keyframes tcar-progress {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    /* Dots */
    .tcar__dots {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .tcar__dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(.4,0,.2,1);
      padding: 0;
    }
    .tcar__dot--active {
      background: #FFFFFF;
      border-color: #FFFFFF;
      width: 28px;
      border-radius: 5px;
      box-shadow: 0 0 12px rgba(255,255,255,0.3);
    }

    @media (max-width: 768px) {
      .tcar__card { padding: 28px; min-height: auto; }
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
