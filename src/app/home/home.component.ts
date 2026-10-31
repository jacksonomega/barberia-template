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

  readonly safeVideoUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.b().videoEmbedUrl)
  );

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

  /** Elementos del Marquee superior (estilo Kings Domain) */
  readonly topMarqueeItems = computed(() => {
    const biz = this.b();
    const base = [
      'Varones de Cualquier Edad',
      'Corte Degradado a Navaja 10€',
      'Corte Degradado a Cero 9€',
      'Corte de Pelo con Forma 9€',
      'Corte Rapado a Máquina 6€',
      'Formar la Barba 7€',
      'Afeitar la Barba 6€',
      'Corte Degradado + Barba 15€',
      'Alisado de Pelo 12€',
      'Corte a Tijera 9€',
      'Niños Menores de 10 Años 8€',
      'WhatsApp +34 632 77 91 83',
      'M–V 09:30–14:00 & 16:30–20:30',
      'Sábados 09:00–14:00 (Lunes Cerrado)',
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

  /** Especialidades en cuadrícula escalonada estilo locationlist-linkwrap de Kings Domain */
  readonly staggeredHighlights = [
    { label: 'DEGRADADO A NAVAJA', sectionId: 'servicios' },
    { label: 'DEGRADADO A CERO', sectionId: 'servicios' },
    { label: 'CORTE CON FORMA', sectionId: 'servicios' },
    { label: 'FORMAR LA BARBA', sectionId: 'servicios' },
    { label: 'CORTE + FORMAR BARBA', sectionId: 'servicios' },
    { label: 'CORTE A TIJERA', sectionId: 'servicios' },
    { label: 'NIÑOS MENORES DE 10', sectionId: 'servicios' },
    { label: 'VARONES CUALQUIER EDAD', sectionId: 'estudio' },
  ];

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
