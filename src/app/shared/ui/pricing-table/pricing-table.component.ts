import { Component, Input } from '@angular/core';

import { PricingItem } from '../../models';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';
import { GoldButtonComponent } from '../gold-button/gold-button.component';

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  imports: [ScrollRevealDirective, GoldButtonComponent],
  template: `
    <div class="pt" appScrollReveal revealAnimation="fade-up">
      <div class="pt__table">
        @for (item of items; track item.name; let i = $index) {
          <div
            class="pt__row"
            [class.pt__row--popular]="item.popular"
            [style.animationDelay.ms]="i * 80"
          >
            @if (item.popular && showPopularBadge) {
              <span class="pt__badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Más Popular
              </span>
            }
            <span class="pt__name">{{ item.name }}</span>
            <div class="pt__dots"></div>
            <span class="pt__price">{{ item.price }}€</span>
          </div>
        }
      </div>
      @if (ctaText) {
        <div class="pt__cta">
          <app-gold-button [href]="ctaLink" variant="primary" size="md" [pulse]="true">
            {{ ctaText }}
          </app-gold-button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .pt__table {
      max-width: 680px;
      margin: 0 auto 48px;
      display: flex;
      flex-direction: column;
    }
    .pt__row {
      position: relative;
      display: flex;
      align-items: center;
      padding: 18px 24px;
      border-bottom: 1px solid var(--border);
      transition: all 0.35s cubic-bezier(.4,0,.2,1);
      animation: pt-row-enter 0.5s ease both;
    }

    @keyframes pt-row-enter {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .pt__row:first-child { border-top: 1px solid var(--border); }
    .pt__row:hover {
      background: rgba(212,168,67,0.04);
      padding-left: 32px;
    }
    .pt__row--popular {
      background: rgba(212,168,67,0.06);
      border-color: rgba(212,168,67,0.3);
    }
    .pt__row--popular:hover {
      background: rgba(212,168,67,0.1);
    }

    .pt__badge {
      position: absolute;
      top: -10px;
      right: 24px;
      background: var(--gradient-gold);
      color: #0A0A0B;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      padding: 3px 10px;
      border-radius: 20px;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      animation: pt-badge-pop 0.5s cubic-bezier(.4,0,.2,1) both;
      animation-delay: 0.3s;
    }

    @keyframes pt-badge-pop {
      0% { transform: scale(0); }
      70% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .pt__name {
      font-weight: 600;
      font-size: 1rem;
      color: var(--text-primary);
      white-space: nowrap;
    }
    .pt__dots {
      flex: 1;
      margin: 0 16px;
      border-bottom: 1px dashed var(--border);
    }
    .pt__price {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--gold);
      font-weight: 700;
      white-space: nowrap;
      transition: transform 0.3s ease;
    }
    .pt__row:hover .pt__price {
      transform: scale(1.08);
    }

    .pt__cta { text-align: center; }
  `],
})
export class PricingTableComponent {
  @Input() items: PricingItem[] = [];
  @Input() showPopularBadge = true;
  @Input() ctaText = '';
  @Input() ctaLink = '/chat';
}
