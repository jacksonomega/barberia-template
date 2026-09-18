import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

// Shared models
import { Service, Barber, Testimonial, PricingItem, NavLink } from '../shared/models';

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

  services: Service[] = [
    { icon: 'scissors', name: 'Cortes Actuales & Fade', desc: 'Especialistas en degradados limpios, texturizados y cortes de tendencia con acabados de precisión.', duration: '35 min', price: 16 },
    { icon: 'bolt', name: 'Propuestas Alternativas', desc: 'Nos encantan los desafíos: diseños creativos, cortes vanguardistas y propuestas atrevidas con máxima personalidad.', duration: '45 min', price: 20 },
    { icon: 'palette', name: 'Tintes & Colorimetría', desc: 'Pioneros en tintes: amplísima gama de colores con los mejores productos profesionales del mercado.', duration: '60 min', price: 35 },
    { icon: 'barber', name: 'Corte + Barba Quarter', desc: 'Pack completo de corte actual y perfilado de barba con asesoramiento personalizado.', duration: '50 min', price: 24 },
    { icon: 'razor', name: 'Afeitado Lama Única', desc: 'Afeitado tradicional con lamas desechables de uso único y toallas higienizadas para máxima seguridad.', duration: '35 min', price: 15 },
    { icon: 'crown', name: 'Asesoramiento de Imagen', desc: 'Estudio y adaptación de tu imagen según tu fisonomía y preferencias para potenciar tu estilo.', duration: '30 min', price: 18 },
  ];

  barbers: Barber[] = [
    {
      name: 'Equipo Quarter Barber',
      role: 'Especialistas en Cortes Actuales',
      img: '/barber-carlos.png',
      specialties: ['Fade', 'Cortes Actuales', 'Asesoría'],
      instagram: '@quarterbarber',
    },
    {
      name: 'Especialistas en Color',
      role: 'Colorimetría & Propuestas Alternativas',
      img: '/barber-miguel.png',
      specialties: ['Tintes', 'Decoloración', 'Diseño Freestyle'],
      instagram: '@quarterbarber',
    },
    {
      name: 'Barberos Quarter Atocha',
      role: 'Maestros del Perfilado & Barba',
      img: '/barber-roberto.png',
      specialties: ['Barba', 'Navaja Lama Única', 'Higiene'],
      instagram: '@quarterbarber',
    },
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Marcos G.',
      rating: 5,
      text: 'El ambiente en Calle Abtao es inmejorable, desde el primer día te tratan como a un amigo de toda la vida. El degradado y el tinte me quedaron espectaculares.',
      date: 'Hace 3 días',
      avatar: 'MG',
    },
    {
      name: 'Dani R.',
      rating: 5,
      text: 'Pocos sitios tienen tanta variedad de tintes y a un precio tan justo. Además la limpieza es brutal: abren la lama delante de ti y todo está desinfectado al detalle.',
      date: 'Hace 1 semana',
      avatar: 'DR',
    },
    {
      name: 'Álvaro S.',
      rating: 5,
      text: 'Buscaba un corte alternativo que en otras barberías no se atrevían a hacerme. Aquí no solo lo clavaron sino que me asesoraron genial. ¡Mi barbería de confianza en Pacífico!',
      date: 'Hace 2 semanas',
      avatar: 'AS',
    },
    {
      name: 'Iván M.',
      rating: 5,
      text: 'Pioneros en cortes a buenos precios en pleno Atocha. Muy profesionales, rápidos y el rollo del local te hace sentir como en casa. 100% recomendado.',
      date: 'Hace 3 semanas',
      avatar: 'IM',
    },
  ];

  pricing: PricingItem[] = [
    { name: 'Corte Actual / Degradado Urbano', price: 16 },
    { name: 'Corte + Barba Quarter', price: 24, popular: true },
    { name: 'Propuestas Alternativas & Diseño', price: 20 },
    { name: 'Tintes & Colorimetría Especial', price: 35 },
    { name: 'Afeitado Tradicional (Lama Única)', price: 15 },
    { name: 'Perfilado & Arreglo de Barba', price: 12 },
    { name: 'Tratamiento Capilar & Lavado', price: 14 },
    { name: 'Servicio Completo Quarter VIP', price: 55 },
  ];

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
