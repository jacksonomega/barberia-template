import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-floating-action-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="[href]"
      class="fab"
      [class.fab--left]="position === 'bottom-left'"
      [class.fab--pulse]="pulse"
      [id]="fabId"
      [attr.aria-label]="ariaLabel || label"
    >
      <span class="fab__icon">
        @if (icon === 'chat') {
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        }
        @if (icon === 'scissors') {
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
            <line x1="20" y1="4" x2="8.12" y2="15.88"/>
            <line x1="14.47" y1="14.48" x2="20" y2="20"/>
            <line x1="8.12" y1="8.12" x2="12" y2="12"/>
          </svg>
        }
        @if (icon === 'phone') {
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.93-1.94a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        }
      </span>
      @if (label) {
        <span class="fab__label">{{ label }}</span>
      }
    </a>
  `,
  styles: [`
    :host { display: block; }

    .fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 200;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-radius: 50px;
      background: var(--gradient-gold);
      color: #0A0A0B;
      font-weight: 700;
      font-size: 0.9rem;
      box-shadow: 0 8px 32px rgba(212,168,67,0.5);
      transition: all 0.35s cubic-bezier(.4,0,.2,1);
      text-decoration: none;
      animation: fab-enter 0.6s cubic-bezier(.34,1.56,.64,1) both;
      animation-delay: 1s;
    }

    @keyframes fab-enter {
      from { transform: scale(0) rotate(-180deg); opacity: 0; }
      to { transform: scale(1) rotate(0); opacity: 1; }
    }

    .fab--left {
      right: auto;
      left: 32px;
    }
    .fab--pulse {
      animation: fab-enter 0.6s cubic-bezier(.34,1.56,.64,1) both,
                 fab-pulse 2.5s ease infinite;
      animation-delay: 1s, 1.6s;
    }
    @keyframes fab-pulse {
      0%   { box-shadow: 0 8px 32px rgba(212,168,67,0.5), 0 0 0 0 rgba(212,168,67,0.4); }
      70%  { box-shadow: 0 8px 32px rgba(212,168,67,0.5), 0 0 0 18px rgba(212,168,67,0); }
      100% { box-shadow: 0 8px 32px rgba(212,168,67,0.5), 0 0 0 0 rgba(212,168,67,0); }
    }

    .fab:hover {
      transform: scale(1.08);
      filter: brightness(1.1);
      box-shadow: 0 12px 40px rgba(212,168,67,0.6);
    }
    .fab:active { transform: scale(0.98); }

    .fab__icon { display: flex; align-items: center; }
    .fab__label {
      font-family: var(--font-body);
      letter-spacing: 0.02em;
    }

    @media (max-width: 768px) {
      .fab__label { display: none; }
      .fab { padding: 16px; border-radius: 50%; }
    }
  `],
})
export class FloatingActionButtonComponent {
  @Input() icon = 'chat';
  @Input() label = '';
  @Input() href = '/chat';
  @Input() pulse = true;
  @Input() position: 'bottom-right' | 'bottom-left' = 'bottom-right';
  @Input() fabId = 'floating-action-btn';
  @Input() ariaLabel = '';
}
