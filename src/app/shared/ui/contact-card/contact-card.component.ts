import { Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div
      class="cc"
      appScrollReveal
      [revealAnimation]="'fade-left'"
      [revealDelay]="animationDelay"
    >
      <span class="cc__icon-wrap">
        @switch (icon) {
          @case ('location') {
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          }
          @case ('phone') {
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.93-1.94a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          }
          @case ('email') {
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          }
          @case ('clock') {
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          }
        }
      </span>
      <div class="cc__body">
        <p class="cc__label">{{ label }}</p>
        @if (isLink && href) {
          <a [href]="href" class="cc__value cc__value--link" [id]="contactId">
            <span [innerHTML]="value"></span>
          </a>
        } @else {
          <p class="cc__value"><span [innerHTML]="value"></span></p>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .cc {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      padding: 16px;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(.4,0,.2,1);
    }
    .cc:hover {
      background: rgba(212,168,67,0.04);
      transform: translateX(4px);
    }

    .cc__icon-wrap {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(212,168,67,0.08);
      border: 1px solid rgba(212,168,67,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
      transition: all 0.35s ease;
    }
    .cc:hover .cc__icon-wrap {
      background: rgba(212,168,67,0.15);
      border-color: rgba(212,168,67,0.3);
      transform: scale(1.05);
    }

    .cc__body { flex: 1; }
    .cc__label {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .cc__value {
      font-size: 0.95rem;
      color: var(--text-primary);
      line-height: 1.6;
    }
    .cc__value--link {
      color: var(--gold);
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .cc__value--link:hover {
      text-decoration: underline;
      filter: brightness(1.2);
    }
  `],
})
export class ContactCardComponent {
  @Input() icon: 'location' | 'phone' | 'email' | 'clock' = 'location';
  @Input() label = '';
  @Input() value = '';
  @Input() href = '';
  @Input() isLink = false;
  @Input() contactId = '';
  @Input() animationDelay = 0;
}
