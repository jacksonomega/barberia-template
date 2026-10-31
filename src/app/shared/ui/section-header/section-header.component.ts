import { Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div
      class="kd-sh"
      [class.kd-sh--center]="align === 'center'"
      appScrollReveal
      [revealAnimation]="'slide-up'"
      [revealDelay]="0"
    >
      <h2 class="kd-sh__title">
        {{ formattedTitle }}
      </h2>
      @if (subtitle) {
        <p class="kd-sh__subtitle">{{ subtitle }}</p>
      }
    </div>
  `,
  styles: [`
    .kd-sh {
      margin-bottom: 36px;
    }
    .kd-sh--center {
      text-align: center;
    }
    .kd-sh__title {
      font-family: var(--font-display);
      font-size: clamp(2.75rem, 6.2vw, 5rem);
      font-weight: 700;
      line-height: 1.04;
      letter-spacing: -0.025em;
      color: #FFFFFF;
      margin: 0;
    }
    .kd-sh__subtitle {
      margin-top: 24px;
      font-family: var(--font-display);
      font-size: clamp(1.25rem, 2.2vw, 2rem);
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: -0.015em;
      color: #FFFFFF;
      max-width: 760px;
    }
    .kd-sh--center .kd-sh__subtitle {
      margin-left: auto;
      margin-right: auto;
    }
  `],
})
export class SectionHeaderComponent {
  @Input() label = '';
  @Input() title = '';
  @Input() highlightWord = '';
  @Input() subtitle = '';
  @Input() align: 'left' | 'center' = 'left';
  @Input() animate = true;

  get formattedTitle(): string {
    const t = (this.title || '').trim();
    if (!t) return '';
    return t.endsWith('.') ? t : `${t}.`;
  }
}
