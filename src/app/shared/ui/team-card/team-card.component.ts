import { Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <article
      class="kd-team-card"
      appScrollReveal
      [revealAnimation]="animationDelay % 300 === 150 ? 'clip-up' : 'clip-down'"
      [revealDelay]="animationDelay"
    >
      <div class="kd-team-card__img-wrap">
        <img [src]="imageSrc || '/barber-carlos.png'" [alt]="name" class="kd-team-card__img" loading="lazy">
      </div>
      <div class="kd-team-card__body" appScrollReveal revealAnimation="slide-up" [revealDelay]="animationDelay + 120">
        <div class="kd-team-card__header">
          <h3 class="kd-team-card__name">{{ name }}</h3>
          <p class="kd-team-card__role">{{ role }}</p>
        </div>
        <div class="kd-team-card__tags">
          @for (s of specialties; track s) {
            <span class="kd-team-card__tag">{{ s }}</span>
          }
        </div>
        @if (socialHandle) {
          <a
            class="kd-team-card__link"
            [href]="'https://instagram.com/' + socialHandle.replace('@', '')"
            target="_blank"
            rel="noopener"
          >
            <span>{{ socialHandle }}</span>
            <span aria-hidden="true">↗</span>
          </a>
        }
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; }

    .kd-team-card {
      background: var(--bg-base);
      display: flex;
      flex-direction: column;
    }

    .kd-team-card__img-wrap {
      position: relative;
      height: 400px;
      overflow: hidden;
      background: var(--bg-surface);
    }

    .kd-team-card__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      filter: contrast(1.04) saturate(1.05);
      transform: scale(1);
      transition: transform 1.4s cubic-bezier(0.19, 1, 0.22, 1), filter 0.6s ease;
    }

    .kd-team-card:hover .kd-team-card__img {
      transform: scale(1.04);
      filter: grayscale(35%) contrast(1.04);
    }

    .kd-team-card__body {
      padding: 24px 0 8px;
      border-top: 1px solid var(--red);
      margin-top: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .kd-team-card__name {
      font-family: var(--font-display);
      font-size: clamp(1.65rem, 2.5vw, 2.2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .kd-team-card__role {
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 400;
      color: #D4D4D8;
      letter-spacing: -0.01em;
    }

    .kd-team-card__tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .kd-team-card__tag {
      padding: 4px 16px;
      border: 1px solid var(--red);
      border-radius: 50px;
      font-size: 0.85rem;
      color: #FFFFFF;
      background: var(--bg-base);
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .kd-team-card__tag:hover {
      background: var(--red);
      color: #FFFFFF;
    }

    .kd-team-card__link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: fit-content;
      font-size: 1rem;
      color: #FFFFFF;
      border-bottom: 1px solid transparent;
      padding-bottom: 2px;
      transition: border-color 0.2s ease;
    }

    .kd-team-card__link:hover {
      border-bottom-color: var(--red);
    }
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
