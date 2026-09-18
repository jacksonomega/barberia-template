import { Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';
import { TiltDirective } from '../../animations/tilt.directive';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [ScrollRevealDirective, TiltDirective],
  template: `
    <div
      class="tc"
      appScrollReveal
      [revealAnimation]="'fade-up'"
      [revealDelay]="animationDelay"
      appTilt
      [tiltMaxAngle]="5"
      [tiltGlare]="true"
    >
      <div class="tc__img-wrap">
        <img [src]="imageSrc" [alt]="name" class="tc__img" loading="lazy">
        <div class="tc__img-overlay"></div>
        <div class="tc__img-border"></div>
      </div>
      <div class="tc__info">
        <h3 class="tc__name">{{ name }}</h3>
        <p class="tc__role">{{ role }}</p>
        <div class="tc__tags">
          @for (s of specialties; track s) {
            <span class="tc__tag">{{ s }}</span>
          }
        </div>
        @if (socialHandle) {
          <a
            class="tc__social"
            [href]="'https://instagram.com/' + socialHandle.replace('@', '')"
            target="_blank"
            rel="noopener"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {{ socialHandle }}
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .tc {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
      overflow: hidden;
      transition: all 0.4s cubic-bezier(.4,0,.2,1);
    }
    .tc:hover {
      border-color: rgba(255,255,255,0.35);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(255,255,255,0.1);
    }

    .tc__img-wrap {
      position: relative;
      height: 280px;
      overflow: hidden;
    }
    .tc__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      transition: transform 0.6s cubic-bezier(.4,0,.2,1);
    }
    .tc:hover .tc__img { transform: scale(1.08); }

    .tc__img-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(10,10,11,0.9) 0%, transparent 60%);
    }
    .tc__img-border {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--gradient-gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.5s cubic-bezier(.4,0,.2,1);
    }
    .tc:hover .tc__img-border {
      transform: scaleX(1);
    }

    .tc__info { padding: 24px; }
    .tc__name {
      font-family: var(--font-display);
      font-size: 1.4rem;
      margin-bottom: 4px;
      color: var(--text-primary);
      transition: color 0.3s ease;
    }
    .tc:hover .tc__name { color: var(--gold); }

    .tc__role {
      font-size: 0.82rem;
      color: var(--gold);
      margin-bottom: 16px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .tc__tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc__tag {
      padding: 4px 12px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.18);
      border-radius: 20px;
      font-size: 0.75rem;
      color: #FFFFFF;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .tc:hover .tc__tag {
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.35);
    }
    .tc__social {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      transition: all 0.3s ease;
      text-decoration: none;
    }
    .tc__social:hover { color: var(--gold); }
  `],
})
export class TeamCardComponent {
  @Input() name = '';
  @Input() role = '';
  @Input() imageSrc = '';
  @Input() specialties: string[] = [];
  @Input() socialHandle = '';
  @Input() animationDelay = 0;
}
