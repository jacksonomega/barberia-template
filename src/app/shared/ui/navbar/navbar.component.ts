import { Component, Input, Output, EventEmitter, signal, PLATFORM_ID, OnInit, OnDestroy, NgZone, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavLink } from '../../models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="kd-header" [class.kd-header--scrolled]="scrolled()" [class.kd-header--menu-open]="menuOpen()">
      <div class="kd-header__inner">
        <!-- Wordmark monumental estilo Kings Domain -->
        <a class="kd-header__logo" (click)="onLogoClick()" aria-label="Inicio">
          <img class="kd-header__logo-img" src="/logo-barberia-shop.svg" [alt]="brandName + ' ' + brandAccent" />
        </a>

        <!-- Acciones derechas + Menú desplegable en cajas con borde 1px solid #fff (Kings Domain) -->
        <div class="kd-header__right">
          <!-- Botones píldora rápidos (visibles cuando la barra de menú no los cubre en desktop) -->
          <div class="kd-header__pills" [class.kd-header__pills--hidden]="menuOpen()">
            @if (ctaClick.observed) {
              <button
                type="button"
                (click)="onQuickBookingClick()"
                class="kd-pill-btn"
                id="booking-btn"
              >
                RESERVAR CITA
              </button>
            } @else {
              <a
                [routerLink]="[ctaRoute]"
                class="kd-pill-btn"
                id="booking-btn"
              >
                RESERVAR CITA
              </a>
            }
            <a
              [routerLink]="['/chat']"
              class="kd-pill-btn kd-pill-btn--secondary"
              id="club-btn"
            >
              ASISTENTE IA
            </a>
          </div>

          <!-- Navegación expandible estilo Kings Domain (scaleX desde la derecha en Desktop, Fullscreen en Mobile) -->
          <div class="kd-nav-wrap">
            <nav class="kd-nav-drawer" [class.kd-nav-drawer--open]="menuOpen()" aria-label="Navegación principal">
              <ul class="kd-nav-list">
                @for (link of links; track link.label) {
                  <li class="kd-nav-item" [class.kd-nav-item--cta]="link.isCta">
                    @if (link.isCta) {
                      @if (ctaClick.observed) {
                        <button
                          type="button"
                          (click)="onCtaClick(link)"
                          class="kd-nav-link"
                          [id]="'nav-cta-' + link.label.toLowerCase().replace(' ', '-')"
                        >
                          {{ link.label }}
                        </button>
                      } @else {
                        <a
                          [routerLink]="[link.route || '/chat']"
                          [queryParams]="link.queryParams"
                          (click)="menuOpen.set(false)"
                          class="kd-nav-link"
                          [id]="'nav-cta-' + link.label.toLowerCase().replace(' ', '-')"
                        >
                          {{ link.label }}
                        </a>
                      }
                    } @else if (link.sectionId) {
                      <a
                        class="kd-nav-link"
                        (click)="scrollTo(link.sectionId)"
                      >
                        {{ link.label }}
                      </a>
                    } @else {
                      <a
                        [routerLink]="[link.route || '/']"
                        [queryParams]="link.queryParams"
                        (click)="menuOpen.set(false)"
                        class="kd-nav-link"
                      >
                        {{ link.label }}
                      </a>
                    }
                  </li>
                }
              </ul>
            </nav>

            <!-- Toggle Button (Hamburguesa / Cruz enmarcada en borde 1px solid #fff cuando está activa) -->
            <button
              type="button"
              class="kd-menu-toggle"
              [class.kd-menu-toggle--active]="menuOpen()"
              (click)="toggleMenu()"
              id="hamburger-btn"
              [attr.aria-expanded]="menuOpen()"
              aria-label="Menú"
            >
              @if (!menuOpen()) {
                <span class="kd-menu-toggle__bars">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              } @else {
                <span class="kd-menu-toggle__close" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
                    <line x1="1" y1="1" x2="15" y2="15"/>
                    <line x1="15" y1="1" x2="1" y2="15"/>
                  </svg>
                </span>
              }
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .kd-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: var(--bg-base);
      min-height: 92px;
      display: flex;
      align-items: center;
      padding: 18px 30px;
      border-bottom: 1px solid transparent;
      transition: border-color 0.25s ease, background-color 0.25s ease;
    }

    .kd-header--scrolled {
      border-bottom-color: rgba(255, 255, 255, 0.2);
    }

    .kd-header__inner {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    /* Wordmark Logo */
    .kd-header__logo {
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
      z-index: 1002;
    }

    .kd-header__logo-img { height: 64px; width: auto; display: block; }
    @media (max-width: 1023px) { .kd-header__logo-img { height: 52px; } }
    .kd-header__wordmark {
      font-family: var(--font-display);
      font-size: clamp(1.45rem, 2.8vw, 2.5rem);
      font-weight: 900;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      color: #FFFFFF;
      line-height: 0.95;
      transition: opacity 0.2s ease;
    }

    .kd-header__logo:hover .kd-header__wordmark {
      opacity: 0.85;
    }

    /* Right cluster */
    .kd-header__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      position: relative;
    }

    .kd-header__pills {
      display: flex;
      align-items: center;
      gap: 12px;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }

    .kd-header__pills--hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    /* Kings Domain Pill Buttons in Header */
    .kd-pill-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #FFFFFF;
      background-color: var(--bg-base);
      border: 1px solid var(--red);
      border-radius: 8px;
      padding: 8px 24px;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    .kd-pill-btn:hover {
      background-color: var(--red);
      color: #FFFFFF;
      animation: kdHeartbeat 0.35s ease;
    }

    /* Expandable Boxed Nav Bar (Desktop scaleX from right, Kings Domain style) */
    .kd-nav-wrap {
      display: flex;
      align-items: center;
      position: relative;
    }

    @media (min-width: 1024px) {
      .kd-nav-drawer {
        position: absolute;
        right: 58px;
        top: 50%;
        transform: translateY(-50%) scaleX(0);
        transform-origin: right center;
        transition: transform 0.32s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.22s ease;
        opacity: 0;
        pointer-events: none;
        background-color: var(--bg-base);
        z-index: 1001;
      }

      .kd-nav-drawer--open {
        transform: translateY(-50%) scaleX(1);
        opacity: 1;
        pointer-events: auto;
      }

      .kd-nav-list {
        display: flex;
        align-items: stretch;
        list-style: none;
        margin: 0;
        padding: 0;
        background-color: var(--bg-base);
      }

      .kd-nav-item {
        border-top: 1px solid var(--red);
        border-bottom: 1px solid var(--red);
        border-right: 1px solid var(--red);
      }

      .kd-nav-item:first-child {
        border-left: 1px solid var(--red);
      }

      .kd-nav-link {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 58px;
        padding: 0 32px;
        white-space: nowrap;
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 400;
        color: #FFFFFF;
        background: var(--bg-base);
        border: none;
        cursor: pointer;
        text-decoration: none;
        transition: background-color 0.18s ease, color 0.18s ease;
      }

      .kd-nav-link:hover {
        background-color: var(--red);
        color: #FFFFFF;
      }
    }

    /* Menu Toggle Button */
    .kd-menu-toggle {
      width: 44px;
      height: 44px;
      background: var(--bg-base);
      border: 1px solid transparent;
      color: #FFFFFF;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 1002;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    .kd-menu-toggle__bars {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 28px;
    }

    .kd-menu-toggle__bars span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--red);
      transition: transform 0.25s ease, background-color 0.2s ease;
    }

    .kd-menu-toggle:hover .kd-menu-toggle__bars span {
      background-color: #D4D4D8;
    }

    .kd-menu-toggle--active {
      width: 58px;
      height: 58px;
      border: 1px solid var(--red);
      background-color: var(--bg-base);
      color: #FFFFFF;
    }

    .kd-menu-toggle--active:hover {
      background-color: var(--red);
      color: #FFFFFF;
    }

    .kd-menu-toggle__close {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Tablet & Mobile Fullscreen Drawer (Kings Domain style) */
    @media (max-width: 1023px) {
      .kd-header {
        min-height: 76px;
        padding: 14px 20px;
      }

      .kd-pill-btn--secondary {
        display: none;
      }

      .kd-pill-btn {
        font-size: 0.82rem;
        padding: 5px 14px;
      }

      .kd-nav-drawer {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--bg-base);
        z-index: 1001;
        padding: 110px 28px 40px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.25s ease, visibility 0.25s ease;
        overflow-y: auto;
      }

      .kd-nav-drawer--open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .kd-nav-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
      }

      .kd-nav-item {
        border-bottom: 1px solid rgba(232, 38, 43, 0.4);
      }

      .kd-nav-link {
        display: block;
        width: 100%;
        text-align: left;
        padding: 18px 0;
        font-family: var(--font-display);
        font-size: clamp(1.85rem, 6vw, 2.5rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #FFFFFF;
        background: transparent;
        border: none;
        cursor: pointer;
        text-decoration: none;
      }

      .kd-menu-toggle--active {
        width: 46px;
        height: 46px;
      }
    }
  `],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() brandName = 'Quarter';
  @Input() brandAccent = 'Barber';
  @Input() links: NavLink[] = [];
  @Input() ctaText = 'Reservar Cita';
  @Input() ctaRoute = '/chat';
  @Output() ctaClick = new EventEmitter<void>();

  menuOpen = signal(false);
  scrolled = signal(false);

  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private router = inject(Router);
  private scrollListener?: () => void;

  onQuickBookingClick(): void {
    this.menuOpen.set(false);
    if (this.ctaClick.observed) {
      this.ctaClick.emit();
    } else {
      this.router.navigate([this.ctaRoute]);
    }
  }

  onCtaClick(link: NavLink): void {
    this.menuOpen.set(false);
    if (this.ctaClick.observed) {
      this.ctaClick.emit();
    } else if (link.route) {
      this.router.navigate([link.route], { queryParams: link.queryParams });
    }
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.zone.runOutsideAngular(() => {
      this.scrollListener = () => {
        const isScrolled = window.scrollY > 40;
        if (isScrolled !== this.scrolled()) {
          this.zone.run(() => {
            this.scrolled.set(isScrolled);
          });
        }
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    });
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen.set(false);
  }

  onLogoClick(): void {
    this.scrollTo('hero');
  }

  ngOnDestroy(): void {
    if (this.scrollListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
