import { Component, Input, signal, PLATFORM_ID, OnInit, OnDestroy, NgZone, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavLink } from '../../models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="nav" [class.nav--scrolled]="scrolled()">
      <div class="nav__inner">
        <a class="nav__logo" (click)="onLogoClick()">
          <span class="nav__logo-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </svg>
          </span>
          <span class="nav__brand">{{ brandName }} <em>{{ brandAccent }}</em></span>
        </a>

        <ul class="nav__links" [class.nav__links--open]="menuOpen()">
          @for (link of links; track link.label) {
            @if (link.isCta) {
              <li>
                <a
                  [routerLink]="[link.route || '/']"
                  class="nav__cta"
                  [id]="'nav-cta-' + link.label.toLowerCase().replace(' ', '-')"
                >
                  {{ link.label }}
                </a>
              </li>
            } @else if (link.sectionId) {
              <li>
                <a
                  class="nav__link"
                  (click)="scrollTo(link.sectionId)"
                >
                  {{ link.label }}
                  <span class="nav__link-bar"></span>
                </a>
              </li>
            } @else {
              <li>
                <a
                  [routerLink]="[link.route || '/']"
                  class="nav__link"
                >
                  {{ link.label }}
                  <span class="nav__link-bar"></span>
                </a>
              </li>
            }
          }
        </ul>

        <button
          class="nav__hamburger"
          (click)="toggleMenu()"
          id="hamburger-btn"
          aria-label="Menú"
          [class.nav__hamburger--active]="menuOpen()"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 0 24px;
      background: rgba(10,10,11,0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid transparent;
      transform: translateZ(0);
      will-change: background, border-color, box-shadow;
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .nav--scrolled {
      background: rgba(10,10,11,0.92);
      border-bottom-color: var(--border);
      box-shadow: 0 4px 30px rgba(0,0,0,0.3);
    }

    .nav__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .nav__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      text-decoration: none;
    }
    .nav__logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
      transition: transform 0.4s ease;
    }
    .nav__logo:hover .nav__logo-icon {
      transform: rotate(15deg) scale(1.1);
    }
    .nav__brand {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--text-primary);
    }
    .nav__brand em {
      color: var(--gold);
      font-style: italic;
    }

    .nav__links {
      display: flex;
      align-items: center;
      gap: 32px;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .nav__link {
      position: relative;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      transition: color 0.3s ease;
      letter-spacing: 0.02em;
      text-decoration: none;
    }
    .nav__link:hover { color: var(--gold); }

    .nav__link-bar {
      position: absolute;
      left: 0; bottom: -4px;
      width: 100%; height: 2px;
      background: var(--gradient-gold);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.35s cubic-bezier(.4,0,.2,1);
      border-radius: 1px;
    }
    .nav__link:hover .nav__link-bar {
      transform: scaleX(1);
      transform-origin: left;
    }

    .nav__cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      background: #FFFFFF;
      color: #000000 !important;
      font-family: var(--font-body);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border: 1px solid #FFFFFF;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(.4,0,.2,1);
      box-shadow: 0 4px 16px rgba(255,255,255,0.2);
      text-decoration: none;
    }
    .nav__cta:hover {
      transform: translateY(-2px);
      background: #000000;
      color: #FFFFFF !important;
      border-color: #FFFFFF;
      box-shadow: 0 8px 24px rgba(255,255,255,0.25);
    }

    /* Hamburger */
    .nav__hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      z-index: 101;
    }
    .nav__hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(.4,0,.2,1);
      transform-origin: center;
    }
    .nav__hamburger--active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .nav__hamburger--active span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    .nav__hamburger--active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    @media (max-width: 768px) {
      .nav__links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 68px; left: 0; right: 0;
        background: rgba(17,17,20,0.98);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
        padding: 24px;
        gap: 20px;
        animation: nav-mobile-in 0.3s ease both;
      }
      @keyframes nav-mobile-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .nav__links--open { display: flex; }
      .nav__hamburger { display: flex; }
    }
  `],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() brandName = 'Quarter';
  @Input() brandAccent = 'Barber';
  @Input() links: NavLink[] = [];
  @Input() ctaText = 'Reservar Cita';
  @Input() ctaRoute = '/chat';

  menuOpen = signal(false);
  scrolled = signal(false);

  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private scrollListener?: () => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.zone.runOutsideAngular(() => {
      this.scrollListener = () => {
        const isScrolled = window.scrollY > 50;
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

