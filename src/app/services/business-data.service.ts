import { Injectable, computed, inject, effect, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CompanyService } from './company.service';
import { BarberServicesService } from './barber-services.service';
import { EmployeeService } from './employee.service';
import { BarberBusinessData } from '../mock/business-data.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessDataService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly companyService = inject(CompanyService);
  private readonly barberServicesService = inject(BarberServicesService);
  private readonly employeeService = inject(EmployeeService);

  readonly isBrowser = isPlatformBrowser(this.platformId);

  // Señales reactivas directamente de la API
  readonly company = this.companyService.company;
  readonly apiServices = this.barberServicesService.services;
  readonly apiEmployees = this.employeeService.employees;

  readonly isMock = signal<boolean>(false).asReadonly();

  // Datos actuales del negocio calculados reactivamente desde la API
  readonly business = computed<BarberBusinessData>(() => {
    const c = this.company();
    const rawName = (c.name || 'Barbería Shop').trim();
    const fullName = 'Barbería Shop';
    const brandName = 'Barbería';
    const brandAccent = 'Shop';

    const address = (c.address || 'Av. de Marcial Llorente, 114 LC 6, 28696 Pelayos de la Presa, Madrid').trim();
    const contactAddressHtml = address.includes(',')
      ? address.replace(/, /g, '<br>')
      : address;

    // Horario obtenido de la API
    const rawHours = c.business_hours || 'Martes a Domingo de 09:30 a 14:00 y de 16:30 a 20:30\nLunes Descanso';
    const contactScheduleHtml = rawHours.replace(/\n/g, '<br>');

    const annualCalendar = c.annual_calendar || 'Todo el año salvo festivos';

    let igUrl = (c.instagram || 'www.instagram.com/goldbarbery/').trim();
    if (igUrl && !igUrl.startsWith('http://') && !igUrl.startsWith('https://')) {
      igUrl = 'https://' + igUrl;
    }

    let igHandle = (c.instagram || '').trim();
    igHandle = igHandle
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/^instagram\.com\//, '')
      .replace(/\/$/, '');
    if (igHandle && !igHandle.startsWith('@')) {
      igHandle = '@' + igHandle;
    }
    if (!igHandle) igHandle = '@goldbarbery';

    // Teléfono de la API
    const rawPhone = (c.phone || '632779183').replace(/\D/g, '');
    const cleanPhone = rawPhone.length === 9 ? `+34 ${rawPhone.substring(0, 3)} ${rawPhone.substring(3, 5)} ${rawPhone.substring(5, 7)} ${rawPhone.substring(7, 9)}` : `+34 ${rawPhone}`;
    const cleanPhoneNumeric = rawPhone.startsWith('34') ? rawPhone : `34${rawPhone}`;
    const whatsappUrl = `https://wa.me/${cleanPhoneNumeric}?text=${encodeURIComponent('Hola ' + fullName + ', quiero reservar una cita')}`;
    const googleMapsUrl = c.google_maps_url || 'https://maps.app.goo.gl/f4jM1hR9sZawkeFe8';
    const googleMapsIframeUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    const cityOrArea = 'Pelayos de la Presa';

    // Servicios mapeados en tiempo real desde la API
    const mappedServices = this.apiServices().map((s) => {
      let icon = 'scissors';
      const n = s.name.toLowerCase();
      if (n.includes('navaja') || n.includes('afeitar')) icon = 'razor';
      else if (n.includes('barba')) icon = 'barber';
      else if (n.includes('lavar')) icon = 'bolt';
      else if (n.includes('alisado')) icon = 'palette';
      else if (n.includes('niño') || n.includes('peinar')) icon = 'crown';

      return {
        icon,
        name: s.name,
        desc: s.service || `${s.name} con acabados profesionales y máxima precisión.`,
        duration: '20–30 min',
        price: s.price,
      };
    });

    // Tarifas mapeadas desde la API
    const mappedPricing = this.apiServices().map((s) => ({
      name: s.name,
      price: s.price,
      popular: s.name.toLowerCase().includes('combo') || s.name.toLowerCase().includes('corte degradado y'),
    }));

    // Barberos mapeados en tiempo real desde la API
    const mappedBarbers = this.apiEmployees().map((emp, idx) => ({
      name: `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'Barbero Especialista',
      role: 'Barbero Especialista',
      img: emp.avatar || (idx === 0 ? '/barber-carlos.png' : '/barber-miguel.png'),
      specialties: emp.services?.length ? emp.services.map((sv) => sv.name) : ['Degradado a Navaja', 'Fade a Cero', 'Formar Barba'],
      instagram: igHandle,
    }));

    return {
      id: 'real-quarter',
      isMock: false,
      brandName,
      brandAccent,
      fullName,
      heroLabel: `Barbería · Varones de cualquier edad · ${cityOrArea}`,
      tagline: 'Tu estilo, nuestra pasión · Pelayos de la Presa',
      heroDescription: `Especialistas en cortes masculinos, degradados a navaja y a cero, diseño de barba y cuidado personal. Te esperamos en ${address}.`,
      heroStats: [
        { num: 'Pelayos', label: 'de la Presa' },
        { num: `${mappedServices.length}`, label: 'Servicios Disponibles' },
        { num: 'M–D', label: 'Martes a Domingo' },
      ],
      whatsappNumber: cleanPhone,
      whatsappUrl,
      aboutLabel: 'Nuestra Filosofía',
      aboutTitle: `Conoce ${fullName}`,
      aboutHighlight: fullName,
      aboutSubtitle: `Ubicados en ${address}. Atención exclusiva y personalizada para varones de cualquier edad en un ambiente profesional y cercano.`,
      aboutCards: [
        {
          title: 'Varones de Cualquier Edad',
          desc: 'Desde los más pequeños (cortes niños menores de 10 años) hasta jóvenes y adultos. Nos adaptamos a cada estilo con paciencia y máxima técnica.',
          icon: 'image',
        },
        {
          title: 'Degradados a Navaja & Cero',
          desc: 'Maestría en degradados rasurados a navaja clásica o al cero, con difuminados limpios, contornos milimétricos y acabados duraderos.',
          icon: 'cut',
        },
        {
          title: 'Arreglo & Formación de Barba',
          desc: 'Afeitado tradicional con toalla caliente, rasurado a máquina o diseño y formación de barba con perfilado simétrico de mejillas y cuello.',
          icon: 'badge',
        },
        {
          title: 'Tarifas Transparentes & Justas',
          desc: `Catálogo de servicios completo y claro desde 2€ (lavar cabeza) hasta combinados de 15€, siempre con la máxima calidad y dedicación.`,
          icon: 'paint',
        },
      ],
      servicesSectionSubtitle:
        'Servicios ejecutados con instrumental esterilizado, dedicación y atención al detalle en Pelayos de la Presa.',
      services: mappedServices,
      videoTitle: `Vive la Experiencia en ${fullName}`,
      videoSubtitle: `Descubre el ambiente, la técnica y la pasión por el detalle en ${address}.`,
      videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2ouwxkl53T0?rel=0',
      videoWatchUrl: c.youtube || 'https://youtube.com/@goldbarbery',
      videoIframeTitle: `${fullName} - Vídeo Demostrativo`,
      videoFooterPrompt: '¿Preparado para un corte con identidad propia y asesoría profesional?',
      videoFooterPhone: cleanPhone,
      videoFooterInstagram: igHandle,
      hygieneSubtitle: `En ${fullName} aplicamos protocolos rigurosos de higiene y desinfección para tu total seguridad y confort.`,
      pricingSubtitle: 'Tarifas oficiales sincronizadas en tiempo real con nuestra plataforma.',
      pricing: mappedPricing,
      teamSubtitle: 'Profesionales apasionados por la barbería clásica y las últimas tendencias.',
      barbers: mappedBarbers.length > 0 ? mappedBarbers : [
        {
          name: 'Jackson Almeida Echevarría',
          role: 'Barbero Especialista',
          img: '/barber-carlos.png',
          specialties: ['Degradado a Navaja', 'Fade a Cero', 'Formar Barba'],
          instagram: igHandle,
        },
      ],
      testimonials: [
        {
          name: 'Manuel Godoy Elvira',
          rating: 5,
          text: 'Muy buena barbería, yo solo voy a esta, nunca me han cortado el pelo mal, muy expertos y rápidos. 5 ⭐',
          date: 'Google Maps · Hace un año',
          avatar: 'MG',
        },
        {
          name: 'Edgar Pitarch V.',
          rating: 5,
          text: 'Trato genial, buen corte y buen precio 👌',
          date: 'Google Maps · Hace 5 meses',
          avatar: 'EP',
        },
        {
          name: 'Fernando Sánchez Camacho',
          rating: 5,
          text: 'Peluquería espectacular, buen trato, buenos cortes y buenos precios, estoy encantado con el servicio, el corte y el trato',
          date: 'Google Maps · Hace 2 años',
          avatar: 'FS',
        },
        {
          name: 'JR DC',
          rating: 4,
          text: 'Peluquería de pueblo , bien , limpio y ameno el personal,  precio buenos , hay que ayudar a los nuevos emprendedores',
          date: 'Google Maps · Hace 4 meses',
          avatar: 'JR',
        },
      ],
      socialInstagramText: `Síguenos en ${igHandle} y Reserva por WhatsApp`,
      socialPhone: cleanPhone,
      contactAddressHtml,
      contactPhone: cleanPhone,
      contactPhoneClean: cleanPhoneNumeric,
      contactInstagramHandle: igHandle,
      contactInstagramUrl: igUrl,
      contactScheduleHtml,
      annualCalendar,
      facebookUrl: c.facebook || 'https://facebook.com/goldbarbery',
      youtubeUrl: c.youtube || 'https://youtube.com/@goldbarbery',
      googleMapsUrl,
      googleMapsIframeUrl,
      googleMapsTitle: `Ubicación de ${fullName} en ${address}`,
      footerTagline: `${address} · Horario: ${rawHours.replace(/\n/g, ' · ')} · Tel: ${cleanPhone}`,
      footerCopyText: `${fullName} · Pelayos de la Presa · Todos los derechos reservados`,
      floatingButtonAriaLabel: `Abrir asistente IA de ${fullName}`,
      chatInitialMessage: `¡Hola! Soy el asistente virtual de **${fullName}** en ${address}.\n\n` +
        `• **Horario:** ${rawHours.replace(/\n/g, ' | ')}.\n` +
        `• **WhatsApp / Teléfono:** ${cleanPhone}.\n` +
        `• **Servicios:** ${mappedServices.length} opciones disponibles.\n\n¿En qué te puedo asesorar o qué servicio deseas reservar?`,
      chatAssistantName: `Asistente ${fullName}`,
      chatSidebarLocation: address,
      chatQuickReplies: [
        'Reservar Cita',
        'Servicios y Precios',
        'Horarios',
        `WhatsApp (${cleanPhone})`,
      ],
      mockPublicServices: [],
      mockEmployees: [],
    };
  });

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        const c = this.company();
        if (c && c.name) {
          this.titleService.setTitle(
            `Barbería Shop | Pelayos de la Presa · ${c.address || ''}`
          );
        }
      });
    }
  }
}
