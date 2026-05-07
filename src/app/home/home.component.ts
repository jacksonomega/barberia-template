import { Component, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  name: string;
  desc: string;
  duration: string;
  price: number;
}

interface Barber {
  name: string;
  role: string;
  img: string;
  specialties: string[];
  instagram: string;
}

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

interface PricingItem {
  name: string;
  price: number;
  popular?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('heroSection') heroSection!: ElementRef;

  currentYear = new Date().getFullYear();
  activeTestimonial = signal(0);
  mobileMenuOpen = signal(false);

  services: Service[] = [
    { icon: '✂️', name: 'Corte Clásico', desc: 'Corte tradicional con navaja y tijera, acabado impecable.', duration: '30 min', price: 18 },
    { icon: '💈', name: 'Corte + Barba', desc: 'Servicio completo: corte de cabello y arreglo de barba.', duration: '50 min', price: 28 },
    { icon: '🪒', name: 'Afeitado Real', desc: 'Afeitado clásico con navaja caliente y toallas de vapor.', duration: '40 min', price: 22 },
    { icon: '⚡', name: 'Fade Premium', desc: 'Degradado perfecto con máquina, técnica de alto nivel.', duration: '45 min', price: 25 },
    { icon: '👑', name: 'Servicio VIP', desc: 'Corte + barba + tratamiento capilar + masaje de cuero cabelludo.', duration: '90 min', price: 55 },
    { icon: '🎨', name: 'Color & Mechas', desc: 'Coloración profesional adaptada a tu estilo personal.', duration: '75 min', price: 45 },
  ];

  barbers: Barber[] = [
    {
      name: 'Carlos Mendoza',
      role: 'Maestro Barbero · 15 años',
      img: '/barber-carlos.png',
      specialties: ['Fade', 'Barba', 'Clásico'],
      instagram: '@carlos_cuts',
    },
    {
      name: 'Miguel Torres',
      role: 'Barbero Senior · 8 años',
      img: '/barber-miguel.png',
      specialties: ['Color', 'Diseño', 'Moderno'],
      instagram: '@miguel_barber',
    },
    {
      name: 'Roberto Silva',
      role: 'Especialista Afeitado · 12 años',
      img: '/barber-roberto.png',
      specialties: ['Navaja', 'VIP', 'Clásico'],
      instagram: '@roberto_silva',
    },
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Alejandro R.',
      rating: 5,
      text: 'El mejor corte que me han dado en mi vida. Carlos es un artista. El ambiente es increíble y el servicio VIP vale cada euro. Ya no voy a ningún otro sitio.',
      date: 'Hace 2 días',
      avatar: 'AR',
    },
    {
      name: 'David M.',
      rating: 5,
      text: 'Fui por primera vez la semana pasada y quedé absolutamente alucinado. El afeitado clásico con la navaja fue una experiencia de lujo. 100% recomendado.',
      date: 'Hace 1 semana',
      avatar: 'DM',
    },
    {
      name: 'Javier L.',
      rating: 5,
      text: 'Llevo 3 años siendo cliente y nunca me han decepcionado. Miguel siempre sabe exactamente lo que quiero aunque yo no sepa explicarlo bien. Profesionales de verdad.',
      date: 'Hace 2 semanas',
      avatar: 'JL',
    },
    {
      name: 'Sergio P.',
      rating: 5,
      text: 'El ambiente, la música, la atención... todo es perfecto. Me arreglé antes de mi boda y quedé tan bien que hasta el fotógrafo me preguntó dónde me había cortado.',
      date: 'Hace 1 mes',
      avatar: 'SP',
    },
  ];

  pricing: PricingItem[] = [
    { name: 'Corte Clásico', price: 18 },
    { name: 'Corte + Barba', price: 28, popular: true },
    { name: 'Afeitado Real', price: 22 },
    { name: 'Fade Premium', price: 25 },
    { name: 'Diseño de Barba', price: 15 },
    { name: 'Color & Mechas', price: 45 },
    { name: 'Tratamiento Capilar', price: 20 },
    { name: 'Servicio VIP', price: 55 },
  ];

  ngOnInit() {
    // Auto-rotate testimonials
    setInterval(() => {
      this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
      this.activeTestimonial.set(this.currentTestimonialIndex);
    }, 5000);
  }

  private currentTestimonialIndex = 0;

  setTestimonial(index: number) {
    this.currentTestimonialIndex = index;
    this.activeTestimonial.set(index);
  }

  get stars() {
    return Array(5).fill(0);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    this.mobileMenuOpen.set(false);
  }
}
