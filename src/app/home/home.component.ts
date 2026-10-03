import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

// Shared models
import { NavLink } from '../shared/models';

// UI Components
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';
import { SectionHeaderComponent } from '../shared/ui/section-header/section-header.component';
import { GoldButtonComponent } from '../shared/ui/gold-button/gold-button.component';
import { ServiceCardComponent } from '../shared/ui/service-card/service-card.component';
import { TeamCardComponent } from '../shared/ui/team-card/team-card.component';
import { TestimonialCarouselComponent } from '../shared/ui/testimonial-carousel/testimonial-carousel.component';
import { PricingTableComponent } from '../shared/ui/pricing-table/pricing-table.component';
import { FloatingActionButtonComponent } from '../shared/ui/floating-action-button/floating-action-button.component';
import { ContactCardComponent } from '../shared/ui/contact-card/contact-card.component';

// Animation Directives
import { ScrollRevealDirective } from '../shared/animations/scroll-reveal.directive';
import { MagneticDirective } from '../shared/animations/magnetic.directive';

// Business Data Service
import { BusinessDataService } from '../services/business-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SectionHeaderComponent,
    GoldButtonComponent,
    ServiceCardComponent,
    TeamCardComponent,
    TestimonialCarouselComponent,
    PricingTableComponent,
    FloatingActionButtonComponent,
    ContactCardComponent,
    ScrollRevealDirective,
    MagneticDirective,
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

  navLinks: NavLink[] = [
    { label: 'Conócenos', sectionId: 'nosotros' },
    { label: 'Servicios', sectionId: 'servicios' },
    { label: 'Experiencia', sectionId: 'video' },
    { label: 'Higiene', sectionId: 'higiene' },
    { label: 'Precios', sectionId: 'precios' },
    { label: 'Contacto', sectionId: 'contacto' },
    { label: 'Reservar Cita', route: '/chat', isCta: true },
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

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

