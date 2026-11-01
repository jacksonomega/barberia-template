import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// Shared models
import { NavLink } from '../shared/models';

// UI Components
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';
import { TeamCardComponent } from '../shared/ui/team-card/team-card.component';
import { TestimonialCarouselComponent } from '../shared/ui/testimonial-carousel/testimonial-carousel.component';
import { FloatingActionButtonComponent } from '../shared/ui/floating-action-button/floating-action-button.component';

// Animation Directives
import { ScrollRevealDirective } from '../shared/animations/scroll-reveal.directive';

// Business Data Service
import { BusinessDataService } from '../services/business-data.service';

export interface AccordionServiceItem {
  name: string;
  priceLabel: string;
  duration: string;
  desc: string;
  popular?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    TeamCardComponent,
    TestimonialCarouselComponent,
    FloatingActionButtonComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly businessService = inject(BusinessDataService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly b = this.businessService.business;

  readonly safeMapUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.b().googleMapsIframeUrl)
  );

  currentYear = new Date().getFullYear();

  /** Índice del servicio desplegado en el acordeón estilo Kings Domain (el primero abierto por defecto) */
  openServiceIndex = signal<number | null>(0);

  navLinks: NavLink[] = [
    { label: 'Tradición', sectionId: 'nosotros' },
    { label: 'Estudio', sectionId: 'estudio' },
    { label: 'Servicios', sectionId: 'servicios' },
    { label: 'Higiene', sectionId: 'higiene' },
    { label: 'Equipo', sectionId: 'equipo' },
    { label: 'Contacto', sectionId: 'contacto' },
    { label: 'Reservar Cita', route: '/chat', isCta: true },
  ];

  /** Elementos del Marquee superior derivados directamente de la API */
  readonly topMarqueeItems = computed(() => {
    const biz = this.b();
    const serviceList = biz.services.map((s) => `${s.name} ${s.price}€`);
    const base = [
      'Pelayos de la Presa',
      'Varones de Cualquier Edad',
      ...serviceList,
      `WhatsApp ${biz.whatsappNumber}`,
      biz.annualCalendar || 'Todo el año salvo festivos',
    ];
    return [...base, ...base];
  });

  /** Lista combinada de servicios y precios para el Acordeón Full-Width de Kings Domain */
  readonly accordionServices = computed<AccordionServiceItem[]>(() => {
    const biz = this.b();
    const svcMap = new Map<string, AccordionServiceItem>();

    for (const s of biz.services) {
      svcMap.set(s.name.toLowerCase(), {
        name: s.name,
        priceLabel: `${s.price}€`,
        duration: s.duration || '20–30 min',
        desc: s.desc,
      });
    }

    for (const p of biz.pricing) {
      const key = p.name.toLowerCase();
      if (!svcMap.has(key)) {
        svcMap.set(key, {
          name: p.name,
          priceLabel: `${p.price}€`,
          duration: '20–30 min',
          desc: `Servicio profesional de ${p.name.toLowerCase()} (20 a 30 min) para varones de cualquier edad en ${biz.fullName}.`,
          popular: p.popular,
        });
      } else if (p.popular) {
        const existing = svcMap.get(key)!;
        existing.popular = true;
      }
    }

    return Array.from(svcMap.values());
  });

  /** Especialidades en cuadrícula escalonada obtenidas de la API */
  get staggeredHighlights() {
    const list = this.b().services.slice(0, 7).map((s) => ({
      label: s.name.toUpperCase(),
      sectionId: 'servicios',
    }));
    return [
      ...list,
      { label: 'VARONES CUALQUIER EDAD', sectionId: 'estudio' },
    ];
  }

  get services() {
    return this.b().services;
  }

  get barbers() {
    return this.b().barbers;
  }

  get testimonials() {
    return this.b().testimonials;
  }

  get pricing() {
    return this.b().pricing;
  }

  toggleServiceAccordion(index: number): void {
    this.openServiceIndex.update((curr) => (curr === index ? null : index));
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
