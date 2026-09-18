import { Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '../../animations/scroll-reveal.directive';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `
    <div
      class="section-header-wrap"
      [class.center]="align === 'center'"
      appScrollReveal
      [revealAnimation]="animate ? 'fade-up' : 'fade-up'"
      [revealDelay]="0"
    >
      <p class="sh-label">{{ label }}</p>
      <h2 class="sh-title">
        {{ titleBefore }}
        <span class="sh-highlight">{{ highlightWord }}</span>
        {{ titleAfter }}
      </h2>
      <div class="sh-divider">
        <span class="sh-divider-line"></span>
        <span class="sh-divider-diamond"></span>
        <span class="sh-divider-line"></span>
      </div>
      @if (subtitle) {
        <p class="sh-subtitle">{{ subtitle }}</p>
      }
    </div>
  `,
  styles: [`
    .section-header-wrap {
      margin-bottom: 0;
    }
    .section-header-wrap.center {
      text-align: center;
    }
    .section-header-wrap.center .sh-subtitle {
      margin-left: auto;
      margin-right: auto;
    }
    .section-header-wrap.center .sh-divider {
      justify-content: center;
    }
    .sh-label {
      display: inline-block;
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 12px;
      position: relative;
      padding-left: 24px;
    }
    .sh-label::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 2px;
      background: var(--gradient-gold);
      border-radius: 2px;
    }
    .section-header-wrap.center .sh-label {
      padding-left: 0;
    }
    .section-header-wrap.center .sh-label::before {
      display: none;
    }
    .sh-title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.15;
      color: var(--text-primary);
      margin-bottom: 16px;
    }
    .sh-highlight {
      background: var(--gradient-gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
    }
    .sh-highlight::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2px;
      background: var(--gradient-gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.6s cubic-bezier(.4,0,.2,1);
    }
    .section-header-wrap:hover .sh-highlight::after {
      transform: scaleX(1);
    }
    .sh-divider {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }
    .sh-divider-line {
      width: 28px;
      height: 2px;
      background: var(--gradient-gold);
      border-radius: 2px;
    }
    .sh-divider-diamond {
      width: 8px;
      height: 8px;
      background: var(--gold);
      transform: rotate(45deg);
      border-radius: 1px;
      animation: shimmer-diamond 3s ease-in-out infinite;
    }
    @keyframes shimmer-diamond {
      0%, 100% { opacity: 1; transform: rotate(45deg) scale(1); }
      50% { opacity: 0.6; transform: rotate(45deg) scale(0.8); }
    }
    .sh-subtitle {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 560px;
      margin-bottom: 48px;
      line-height: 1.7;
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

  get titleBefore(): string {
    if (!this.highlightWord || !this.title.includes(this.highlightWord)) return this.title;
    return this.title.substring(0, this.title.indexOf(this.highlightWord));
  }

  get titleAfter(): string {
    if (!this.highlightWord || !this.title.includes(this.highlightWord)) return '';
    return this.title.substring(this.title.indexOf(this.highlightWord) + this.highlightWord.length);
  }
}
