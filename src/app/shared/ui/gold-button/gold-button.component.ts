import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MagneticDirective } from '../../animations/magnetic.directive';

@Component({
  selector: 'app-gold-button',
  standalone: true,
  imports: [RouterLink, CommonModule, MagneticDirective],
  template: `
    <ng-container *ngIf="href; else btnTpl">
      <!-- Enlace externo (https, http, tel, mailto) -->
      <a
        *ngIf="isExternal; else routerLinkTpl"
        [href]="href"
        [target]="computedTarget"
        [rel]="computedTarget === '_blank' ? 'noopener noreferrer' : null"
        class="gold-btn"
        [class]="'gold-btn gold-btn--' + variant + ' gold-btn--' + size"
        [class.gold-btn--pulse]="pulse"
        [class.gold-btn--disabled]="disabled"
        appMagnetic
        [magneticStrength]="variant === 'primary' ? 0.15 : 0"
        [id]="buttonId"
      >
        <span class="gold-btn__content">
          <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </span>
        <span class="gold-btn__shine"></span>
      </a>

      <!-- RouterLink interno para Angular -->
      <ng-template #routerLinkTpl>
        <a
          [routerLink]="[href]"
          class="gold-btn"
          [class]="'gold-btn gold-btn--' + variant + ' gold-btn--' + size"
          [class.gold-btn--pulse]="pulse"
          [class.gold-btn--disabled]="disabled"
          appMagnetic
          [magneticStrength]="variant === 'primary' ? 0.15 : 0"
          [id]="buttonId"
        >
          <span class="gold-btn__content">
            <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
          </span>
          <span class="gold-btn__shine"></span>
        </a>
      </ng-template>
    </ng-container>

    <ng-template #btnTpl>
      <button
        class="gold-btn"
        [class]="'gold-btn gold-btn--' + variant + ' gold-btn--' + size"
        [class.gold-btn--pulse]="pulse"
        [disabled]="disabled"
        appMagnetic
        [magneticStrength]="variant === 'primary' ? 0.15 : 0"
        (click)="clicked.emit($event)"
        [id]="buttonId"
      >
        <span class="gold-btn__content">
          <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </span>
        <span class="gold-btn__shine"></span>
      </button>
    </ng-template>

    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [`
    :host { display: inline-block; }

    .gold-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-body);
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      border-radius: var(--radius-btn);
      transition: all 0.35s cubic-bezier(.4,0,.2,1);
      overflow: hidden;
      text-decoration: none;
      outline: none;
    }

    /* Sizes */
    .gold-btn--sm { padding: 10px 20px; font-size: 0.8rem; }
    .gold-btn--md { padding: 14px 32px; font-size: 0.95rem; }
    .gold-btn--lg { padding: 18px 40px; font-size: 1.05rem; }

    /* Primary (Pure High-Contrast White with Black Text) */
    .gold-btn--primary {
      background: #FFFFFF;
      color: #000000;
      border: 1px solid #FFFFFF;
      box-shadow: 0 4px 20px rgba(255,255,255,0.22);
    }
    .gold-btn--primary:hover {
      transform: translateY(-3px);
      background: #E4E4E7;
      box-shadow: 0 8px 30px rgba(255,255,255,0.35);
    }
    .gold-btn--primary:active {
      transform: translateY(-1px);
    }

    /* Shine effect */
    .gold-btn__shine {
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.3) 50%,
        transparent 100%
      );
      transition: left 0.5s ease;
      pointer-events: none;
    }
    .gold-btn:hover .gold-btn__shine {
      left: 100%;
    }

    /* Outline (Monochrome) */
    .gold-btn--outline {
      background: transparent;
      color: #FFFFFF;
      border: 1px solid rgba(255,255,255,0.35);
      box-shadow: none;
    }
    .gold-btn--outline:hover {
      background: #FFFFFF;
      color: #000000;
      border-color: #FFFFFF;
      box-shadow: 0 0 24px rgba(255,255,255,0.25);
      transform: translateY(-3px);
    }

    /* Ghost */
    .gold-btn--ghost {
      background: transparent;
      color: #FFFFFF;
      box-shadow: none;
    }
    .gold-btn--ghost:hover {
      background: rgba(255,255,255,0.1);
    }

    /* Pulse */
    .gold-btn--pulse {
      animation: btn-pulse 2.5s ease infinite;
    }
    @keyframes btn-pulse {
      0%   { box-shadow: 0 4px 20px rgba(255,255,255,0.25), 0 0 0 0 rgba(255,255,255,0.35); }
      70%  { box-shadow: 0 4px 20px rgba(255,255,255,0.25), 0 0 0 16px rgba(255,255,255,0); }
      100% { box-shadow: 0 4px 20px rgba(255,255,255,0.25), 0 0 0 0 rgba(255,255,255,0); }
    }

    /* Disabled */
    .gold-btn--disabled,
    .gold-btn:disabled {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }

    .gold-btn__content {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 1;
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
