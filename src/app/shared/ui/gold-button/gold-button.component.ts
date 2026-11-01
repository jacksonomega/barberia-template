import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gold-button',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <ng-container *ngIf="href; else btnTpl">
      <a
        *ngIf="isExternal; else routerLinkTpl"
        [href]="href"
        [target]="computedTarget"
        [rel]="computedTarget === '_blank' ? 'noopener noreferrer' : null"
        class="kd-btn"
        [class]="'kd-btn kd-btn--' + variant + ' kd-btn--' + size"
        [class.kd-btn--disabled]="disabled"
        [id]="buttonId"
      >
        <span class="kd-btn__content">
          <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </span>
      </a>

      <ng-template #routerLinkTpl>
        <a
          [routerLink]="[href]"
          class="kd-btn"
          [class]="'kd-btn kd-btn--' + variant + ' kd-btn--' + size"
          [class.kd-btn--disabled]="disabled"
          [id]="buttonId"
        >
          <span class="kd-btn__content">
            <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
          </span>
        </a>
      </ng-template>
    </ng-container>

    <ng-template #btnTpl>
      <button
        type="button"
        class="kd-btn"
        [class]="'kd-btn kd-btn--' + variant + ' kd-btn--' + size"
        [class.kd-btn--disabled]="disabled"
        [disabled]="disabled"
        (click)="clicked.emit($event)"
        [id]="buttonId"
      >
        <span class="kd-btn__content">
          <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </span>
      </button>
    </ng-template>

    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [`
    :host { display: inline-block; }

    /* Kings Domain Pill Button (1px solid #fff, 50px radius, instant black/white inversion) */
    .kd-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-family: var(--font-display);
      font-weight: 400;
      letter-spacing: -0.02em;
      line-height: 1.44;
      border: 1px solid var(--red);
      border-radius: 50px;
      cursor: pointer;
      transition: background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
      text-decoration: none;
      outline: none;
      background-color: var(--bg-base);
      color: #FFFFFF;
    }

    /* Sizes matching Kings Domain (.external-booknow-btn & .main-btn) */
    .kd-btn--sm { padding: 5px 24px; font-size: 0.95rem; min-width: 150px; }
    .kd-btn--md { padding: 8px 34px; font-size: 1.2rem; min-width: 200px; }
    .kd-btn--lg { padding: 10px 42px; font-size: 1.45rem; min-width: 240px; }

    /* Primary & Outline both follow Kings Domain high-contrast pill style */
    .kd-btn--primary {
      background-color: var(--bg-base);
      color: #FFFFFF;
      border: 1px solid var(--red);
    }
    .kd-btn--primary:hover {
      background-color: var(--red);
      color: #FFFFFF;
      border-color: var(--red);
    }

    .kd-btn--outline {
      background-color: transparent;
      color: #FFFFFF;
      border: 1px solid var(--red);
    }
    .kd-btn--outline:hover {
      background-color: var(--red);
      color: #FFFFFF;
      border-color: var(--red);
    }

    .kd-btn--ghost {
      background-color: transparent;
      color: #FFFFFF;
      border-color: transparent;
      min-width: auto;
      padding-left: 12px;
      padding-right: 12px;
    }
    .kd-btn--ghost:hover {
      border-bottom-color: var(--red);
    }

    .kd-btn--disabled,
    .kd-btn:disabled {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }

    .kd-btn__content {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    @media (max-width: 767px) {
      .kd-btn--md { padding: 6px 22px; font-size: 1rem; min-width: auto; }
      .kd-btn--lg { padding: 8px 26px; font-size: 1.1rem; min-width: auto; }
    }
  `],
})
export class GoldButtonComponent {
  @Input() variant: 'primary' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() href = '';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() disabled = false;
  @Input() pulse = false;
  @Input() buttonId = '';
  @Output() clicked = new EventEmitter<Event>();

  get isExternal(): boolean {
    if (!this.href) return false;
    return (
      this.href.startsWith('http://') ||
      this.href.startsWith('https://') ||
      this.href.startsWith('tel:') ||
      this.href.startsWith('mailto:') ||
      this.href.startsWith('//')
    );
  }

  get computedTarget(): string {
    if (this.target && this.target !== '_self') return this.target;
    if (this.isExternal && (this.href.startsWith('http://') || this.href.startsWith('https://'))) {
      return '_blank';
    }
    return '_self';
  }
}
