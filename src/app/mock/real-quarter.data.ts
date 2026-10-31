import { BarberBusinessData } from './business-data.interface';

export const REAL_QUARTER_DATA: BarberBusinessData = {
  id: 'real-quarter',
  isMock: false,

  brandName: 'HIS',
  brandAccent: 'Barbería Urban 2',
  fullName: 'HIS Barbería Urban 2',
  heroLabel: 'Barbería · Varones de cualquier edad · C. de San Marcos, 1',
  tagline: 'Cortes, Barba & Estilo · Varones de cualquier edad',
  heroDescription:
    'Especialistas en cortes masculinos, degradados a navaja y a cero, arreglo y diseño de barba y tratamientos capilares para varones de cualquier edad (niños, jóvenes y adultos). Te esperamos con el mejor ambiente en C. de San Marcos, 1.',
  heroStats: [
    { num: 'Varones', label: 'Cualquier Edad' },
    { num: '14', label: 'Servicios de 20–30 min' },
    { num: 'M–V & S', label: 'M–V 9:30–20:30 · S 9:00–14:00' },
  ],

  whatsappNumber: '+34 632 77 91 83',
  whatsappUrl:
    'https://wa.me/34632779183?text=Hola%20HIS%20Barber%C3%ADa%20Urban%202%2C%20quiero%20reservar%20una%20cita',

  aboutLabel: 'Nuestra Filosofía',
  aboutTitle: 'Conoce HIS Barbería Urban 2',
  aboutHighlight: 'HIS Barbería Urban 2',
  aboutSubtitle:
    'Ubicados en C. de San Marcos, 1, Madrid Centro. Atención exclusiva y profesional para varones de cualquier edad.',
  aboutCards: [
    {
      title: 'Varones de Cualquier Edad',
      desc: 'Atención personalizada para niños, jóvenes y adultos. Desde cortes para menores de 10 años hasta estilos clásicos y de tendencia con la máxima dedicación.',
      icon: 'image',
    },
    {
      title: 'Degradados a Navaja & Cero',
      desc: 'Maestría en degradados rasurados a navaja tradicional o al cero, con difuminados limpios, contornos milimétricos y acabados de gran durabilidad.',
      icon: 'cut',
    },
    {
      title: 'Arreglo & Formación de Barba',
      desc: 'Afeitado tradicional con toalla caliente, rasurado a máquina o diseño y formación de barba con perfilado simétrico de mejillas y cuello.',
      icon: 'badge',
    },
    {
      title: 'Tarifas Transparentes & Justas',
      desc: 'Catálogo de servicios completo y accesible desde 2€ (lavar cabeza) hasta packs combinados de corte y barba por 15€.',
      icon: 'paint',
    },
  ],

  servicesSectionSubtitle:
    'Servicios con duración estimada de 20 a 30 minutos, ejecutados con instrumental esterilizado y atención al detalle.',
  services: [
    {
      icon: 'razor',
      name: 'Corte degradado a Navaja',
      desc: 'Degradado de alta precisión rasurado a navaja clásica para un acabado ultra apurado y pulcro.',
      duration: '20–30 min',
      price: 10,
    },
    {
      icon: 'scissors',
      name: 'Corte degradado a cero',
      desc: 'Skin fade impecable desde el cero con difuminado suave y transición perfecta.',
      duration: '20–30 min',
      price: 9,
    },
    {
      icon: 'barber',
      name: 'Corte de pelo con forma',
      desc: 'Corte estructurado y definición de contornos marcados adaptados a tu fisonomía.',
      duration: '20–30 min',
      price: 9,
    },
    {
      icon: 'cut',
      name: 'Corte rapado a maquina',
      desc: 'Corte homogéneo a máquina con longitud a medida y repaso nítido de cuello y patillas.',
      duration: '20–30 min',
      price: 6,
    },
    {
      icon: 'razor',
      name: 'Afeitar la barba',
      desc: 'Afeitado tradicional completo con toalla caliente, navaja higienizada y bálsamo suave.',
      duration: '20–30 min',
      price: 6,
    },
    {
      icon: 'barber',
      name: 'Formar la barba',
      desc: 'Recorte, simetría y perfilado de líneas de mejillas y cuello a navaja para máxima definición.',
      duration: '20–30 min',
      price: 7,
    },
    {
      icon: 'scissors',
      name: 'Corte degradado y afeitar barba',
      desc: 'Combo integral: corte degradado (a cero o navaja) y afeitado apurado con toalla caliente.',
      duration: '20–30 min',
      price: 15,
    },
    {
      icon: 'scissors',
      name: 'Corte degradado y formar barba',
      desc: 'El pack más demandado: degradado de tendencia más diseño y perfilado completo de barba.',
      duration: '20–30 min',
      price: 15,
    },
    {
      icon: 'crown',
      name: 'Solo peinar',
      desc: 'Arreglo, definición y fijación con productos profesionales de barbería (cera, pomada o mate).',
      duration: '20–30 min',
      price: 3,
    },
    {
      icon: 'cut',
      name: 'Afeitar la barba a maquina',
      desc: 'Rasurado rápido, uniforme y sin irritación con shaver y trimmer profesional.',
      duration: '20–30 min',
      price: 4,
    },
    {
      icon: 'bolt',
      name: 'Lavar cabeza',
      desc: 'Lavado higienizante con champú profesional y suave masaje capilar tonificante.',
      duration: '20–30 min',
      price: 2,
    },
    {
      icon: 'palette',
      name: 'Alisado de pelo',
      desc: 'Tratamiento alisador profesional para disciplinar el cabello y aportar soltura y brillo.',
      duration: '20–30 min',
      price: 12,
    },
    {
      icon: 'scissors',
      name: 'Corte de pelo a tijera',
      desc: 'Técnica artesanal 100% a tijera para cabellos medios o largos con control total de volumen.',
      duration: '20–30 min',
      price: 9,
    },
    {
      icon: 'crown',
      name: 'Niños menores de 10 años',
      desc: 'Corte especializado para los más pequeños con paciencia, delicadeza y el mejor estilo infantil.',
      duration: '20–30 min',
      price: 8,
    },
  ],

  videoTitle: 'Vive la Experiencia en HIS Barbería Urban 2',
  videoSubtitle:
    'Descubre el ambiente, la técnica y la pasión por el detalle en C. de San Marcos, 1.',
  videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2ouwxkl53T0?rel=0',
  videoWatchUrl: 'https://youtube.com/@canal',
  videoIframeTitle: 'HIS Barbería Urban 2 - Vídeo Oficial',
  videoFooterPrompt: '¿Listo para un corte impecable o tu arreglo de barba?',
  videoFooterPhone: '+34 632 77 91 83',
  videoFooterInstagram: '@hisbarberia',

  hygieneSubtitle:
    'En HIS Barbería Urban 2 desinfectamos diariamente nuestro material y garantizamos la higiene absoluta de todos los productos y espacios.',

  pricingSubtitle:
    'Tarifas claras y accesibles para todos los servicios (duración aproximada 20 a 30 min).',
  pricing: [
    { name: 'Corte degradado a Navaja', price: 10 },
    { name: 'Corte degradado a cero', price: 9 },
    { name: 'Corte de pelo con forma', price: 9 },
    { name: 'Corte rapado a maquina', price: 6 },
    { name: 'Afeitar la barba', price: 6 },
    { name: 'Formar la barba', price: 7 },
    { name: 'Corte degradado y afeitar barba', price: 15, popular: true },
    { name: 'Corte degradado y formar barba', price: 15, popular: true },
    { name: 'Solo peinar', price: 3 },
    { name: 'Afeitar la barba a maquina', price: 4 },
    { name: 'Lavar cabeza', price: 2 },
    { name: 'Alisado de pelo', price: 12 },
    { name: 'Corte de pelo a tijera', price: 9 },
    { name: 'Niños menores de 10 años', price: 8 },
  ],

  teamSubtitle:
    'Profesionales apasionados por la barbería clásica y las últimas tendencias.',
  barbers: [
    {
      name: 'Jackson Echevarria',
      role: 'Especialista en Fades & Navaja',
      img: '/barber-carlos.png',
      specialties: ['Degradado a Navaja', 'Fade a Cero', 'Formar Barba'],
      instagram: '@hisbarberia',
    },
    {
      name: 'Juan Ballesteros',
      role: 'Estilista & Corte Clásico',
      img: '/barber-miguel.png',
      specialties: ['Corte a Tijera', 'Alisado de Pelo', 'Niños'],
      instagram: '@hisbarberia',
    },
  ],

  testimonials: [
    {
      name: 'Carlos M.',
      rating: 5,
      text: 'El degradado a navaja y el perfilado de barba quedaron impecables. La atención para varones de todas las edades es de diez.',
      date: 'Hace 3 días',
      avatar: 'CM',
    },
    {
      name: 'David R.',
      rating: 5,
      text: 'Traje a mi hijo para el corte infantil y a mí me hicieron un fade a cero. Grandes profesionales, puntuales y precios muy honestos.',
      date: 'Hace 1 semana',
      avatar: 'DR',
    },
    {
      name: 'Álvaro S.',
      rating: 5,
      text: 'Llevo meses viniendo aquí. El pack de corte degradado y formar barba por 15€ es imbatible en calidad.',
      date: 'Hace 2 semanas',
      avatar: 'AS',
    },
  ],

  socialInstagramText: 'Síguenos en Instagram y Reserva por WhatsApp',
  socialPhone: '+34 632 77 91 83',
  contactAddressHtml:
    'C. de San Marcos, 1<br>Centro<br>28004 Madrid, España',
  contactPhone: '+34 632 77 91 83',
  contactPhoneClean: '34632779183',
  contactInstagramHandle: '@hisbarberia',
  contactInstagramUrl: 'https://instagram.com/hisbarberia',
  contactScheduleHtml:
    '<strong>Lunes:</strong> Cerrado<br><strong>Martes a Viernes:</strong> 09:30 – 14:00 &nbsp;|&nbsp; 16:30 – 20:30<br><strong>Sábados:</strong> 09:00 – 14:00<br><strong>Domingos:</strong> Cerrado',
  annualCalendar:
    'Varones de cualquier edad · Martes a Sábado (Lunes y Domingos cerrado)',
  googleMapsIframeUrl:
    'https://www.google.com/maps?q=C.+de+San+Marcos%2C+1%2C+Centro%2C+28004+Madrid&output=embed',
  googleMapsTitle: 'Ubicación de HIS Barbería Urban 2 en C. de San Marcos, 1, Madrid',

  footerTagline: 'C. de San Marcos, 1 · Centro · Madrid · Tel/WhatsApp: +34 632 77 91 83 · Horario: M–V 9:30–14:00 y 16:30–20:30, S 9:00–14:00 (Lunes Cerrado)',
  footerCopyText: 'HIS Barbería Urban 2 · Varones de cualquier edad · Todos los derechos reservados',

  floatingButtonAriaLabel: 'Abrir asistente IA de HIS Barbería Urban 2',

  chatInitialMessage:
    '¡Hola! Soy el asistente virtual de **HIS Barbería Urban 2** en C. de San Marcos, 1 (Centro, Madrid). Atendemos a **varones de cualquier edad** (niños, jóvenes y adultos).\n\n' +
    '• **Horario:** Martes a Viernes de 09:30 a 14:00 y de 16:30 a 20:30 | Sábados de 09:00 a 14:00 (Lunes y Domingos cerrado).\n' +
    '• **Contacto / WhatsApp:** +34 632 77 91 83.\n' +
    '• **14 Servicios (20–30 min):** Desde 2€ (lavar cabeza) hasta 15€ (pack degradado y barba).\n\n¿En qué te puedo asesorar o qué servicio deseas reservar?',
  chatAssistantName: 'Asistente HIS Barbería Urban 2',
  chatSidebarLocation: 'C. de San Marcos, 1\nCentro, 28004 Madrid',
  chatQuickReplies: [
    'Reservar Cita',
    'Servicios y Precios',
    'Horarios (M–V y Sábados)',
    'Varones de cualquier edad',
    'WhatsApp (+34 632 77 91 83)',
  ],

  mockPublicServices: [],
  mockEmployees: [],
};
