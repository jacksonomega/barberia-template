import { Component, Input } from '@angular/core';
import { TiltDirective } from '../../animations/tilt.directive';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [TiltDirective, ScrollRevealDirective],
  template: `
    <div
      class="svc-card"
      [class.svc-card--featured]="featured"
      appTilt
      [tiltMaxAngle]="6"
      [tiltGlare]="true"
      appScrollReveal
      [revealAnimation]="'fade-up'"
      [revealDelay]="animationDelay"
    >
      <div class="svc-card__glow"></div>
      <div class="svc-card__icon-wrap">
        <svg class="svc-card__icon" width="32" height="32" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="1.7"
             stroke-linecap="round" stroke-linejoin="round">
          @switch (icon) {
            @case ('scissors') {
              <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            }
            @case ('barber') {
              <path d="M4 7h16M4 12h16M4 17h16"/>
              <path d="M9 2v3M12 2v3M15 2v3"/>
            }
            @case ('razor') {
              <rect x="2" y="8" width="20" height="8" rx="1"/>
              <line x1="7" y1="8" x2="7" y2="16"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="17" y1="8" x2="17" y2="16"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            }
            @case ('bolt') {
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            }
            @case ('crown') {
              <path d="M2 18h20M3 10l3 4 6-8 6 8 3-4v8H3V10z"/>
              <circle cx="12" cy="4" r="1.5"/><circle cx="3" cy="10" r="1.5"/>
              <circle cx="21" cy="10" r="1.5"/>
            }
            @case ('palette') {
              <path d="M12 2a10 10 0 1 0 10 10c0-1.1-.9-2-2-2h-1.5a2 2 0 0 1-2-2v-1.5A2 2 0 0 0 14.5 4.5"/>
              <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/>
              <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/>
              <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/>
            }
          }
        </svg>
      </div>
      <h3 class="svc-card__name">{{ name }}</h3>
      <p class="svc-card__desc">{{ description }}</p>
      <div class="svc-card__footer">
        <span class="svc-card__duration">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {{ duration }}
        </span>
        <span class="svc-card__price">{{ price }}{{ currency }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .svc-card {
      position: relative;
      padding: 40px 32px;
      background: linear-gradient(145deg, rgba(24,24,28,0.7) 0%, rgba(17,17,20,0.9) 100%);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      overflow: hidden;
      z-index: 1;
      transition: all 0.4s cubic-bezier(.4,0,.2,1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }

    .svc-card__glow {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 50%);
      z-index: -1;
      transition: opacity 0.6s ease;
      opacity: 0;
      pointer-events: none;
    }

    .svc-card:hover {
      border-color: rgba(255,255,255,0.35);
      box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.08);
    }
    .svc-card:hover .svc-card__glow { opacity: 1; }

    .svc-card--featured {
      border-color: rgba(255,255,255,0.2);
      background: linear-gradient(145deg, rgba(28,28,34,0.8) 0%, rgba(17,17,20,0.95) 100%);
    }

    .svc-card__icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      transition: all 0.5s cubic-bezier(.4,0,.2,1);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .svc-card__icon {
      color: #FFFFFF;
      transition: transform 0.4s ease, filter 0.3s ease;
    }
    .svc-card:hover .svc-card__icon-wrap {
      background: #FFFFFF;
      border-color: #FFFFFF;
      transform: scale(1.08) rotate(5deg);
      box-shadow: 0 8px 30px rgba(255,255,255,0.25);
    }
    .svc-card:hover .svc-card__icon {
      color: #000000;
      transform: scale(1.1);
    }

    .svc-card__name {
      font-family: var(--font-display);
      font-size: 1.4rem;
      margin-bottom: 12px;
      color: var(--text-primary);
      transition: color 0.3s ease;
    }
    .svc-card:hover .svc-card__name { color: var(--gold); }

    .svc-card__desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .svc-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding-top: 20px;
    }
    .svc-card__duration {
      font-size: 0.85rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .svc-card__price {
      font-family: var(--font-display);
      font-size: 1.8rem;
      color: var(--gold);
      font-weight: 700;
      line-height: 1;
      transition: transform 0.3s ease;
    }
    .svc-card:hover .svc-card__price {
      transform: scale(1.08);
    }
  `],
})
export class ServiceCardComponent {
  @Input() icon = 'scissors';
  @Input() name = '';
  @Input() description = '';
  @Input() duration = '';
  @Input() price = 0;
  @Input() currency = '€';
  @Input() featured = false;
  @Input() animationDelay = 0;
}
