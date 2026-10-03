import { BarberBusinessData } from './business-data.interface';

export const FAKE_APEX_DATA: BarberBusinessData = {
  id: 'fake-apex',
  isMock: true,

  brandName: 'Apex',
  brandAccent: 'Studio',
  fullName: 'Apex Barber Studio',
  heroLabel: 'Barbería de Autor · Chamberí / Salamanca · Calle Velázquez, 88',
  tagline: 'Cortes Urbanos, Fades & Vanguardia',
  heroDescription:
    'En Apex Barber Studio redefinimos el arte del cuidado masculino. Especialistas en degradados milimétricos, diseño de barba a navaja y las técnicas de colorimetría más avanzadas en un espacio exclusivo pensado para tu máximo confort.',
  heroStats: [
    { num: 'Velázquez 88', label: 'Madrid Centro' },
    { num: '100%', label: 'Higiene & Esterilización' },
    { num: 'Top', label: 'Estilistas Certificados' },
  ],

  whatsappNumber: '612 345 678',
  whatsappUrl:
    'https://wa.me/34612345678?text=Hola%20Apex%20Barber%20Studio%2C%20quiero%20reservar%20una%20cita',

  aboutLabel: 'Nuestra Filosofía',
  aboutTitle: 'Conoce Apex Barber Studio',
  aboutHighlight: 'Apex Barber Studio',
  aboutSubtitle:
    'Ubicados en pleno centro de Madrid en Calle Velázquez 88. Un espacio diseñado para desconectar del ritmo urbano mientras profesionales del visagismo cuidan cada detalle de tu corte y barba.',
  aboutCards: [
    {
      title: 'Visagismo & Asesoría',
      desc: 'Analizamos las proporciones de tu rostro y tu tipo de cabello para recomendarte el corte y perfilado que mejor potencien tu imagen con acabados de alta definición.',
      icon: 'image',
    },
    {
      title: 'Fades de Precisión & Freestyle',
      desc: 'Desde Low, Mid y High Fades hasta diseños vanguardistas y cortes a tijera clásicos. Ejecución milimétrica y atención minuciosa en cada detalle.',
      icon: 'cut',
    },
    {
      title: 'Precios Claros y Honestos',
      desc: 'En Apex Barber Studio apostamos por tarifas transparentes: cosmética de gama alta, toallas calientes y café de especialidad incluidos en tu servicio.',
      icon: 'badge',
    },
    {
      title: 'Colorimetría Avanzada & Matices',
      desc: 'Gama completa de tintes platinados, grises ceniza y tonos alternativos con protectores dérmicos y acondicionadores orgánicos que cuidan tu fibra capilar.',
      icon: 'paint',
    },
  ],

  servicesSectionSubtitle:
    'Desde degradados urbanos con navaja tradicional hasta tratamientos capilares regeneradores y asesoría de visagismo.',
  services: [
    {
      icon: 'scissors',
      name: 'Corte Signature & Fade',
      desc: 'Degradado a medida con máquina y tijera, texturizado superior y peinado final con fijador mate premium.',
      duration: '35 min',
      price: 18,
    },
    {
      icon: 'bolt',
      name: 'Diseño Freestyle & Vanguardia',
      desc: 'Líneas personalizadas, dibujos geométricos y propuestas creativas para quienes buscan marcar su propio estilo.',
      duration: '45 min',
      price: 22,
    },
    {
      icon: 'palette',
      name: 'Colorimetría & Matices Platinum',
      desc: 'Decoloración controlada, matización de rubios, blancos nórdicos y colores de fantasía con productos sin amoníaco.',
      duration: '60 min',
      price: 40,
    },
    {
      icon: 'barber',
      name: 'Pack Apex: Corte + Barba',
      desc: 'Servicio completo: corte de precisión y perfilado de barba con aceite esencial y toalla caliente perfumada.',
      duration: '50 min',
      price: 26,
    },
    {
      icon: 'razor',
      name: 'Afeitado Tradicional Navaja',
      desc: 'Ritual clásico de afeitado con hojas estériles monouso, crema batida tibia y masaje relajante balsámico.',
      duration: '35 min',
      price: 16,
    },
    {
      icon: 'crown',
      name: 'Visagismo & Asesoría Capilar',
      desc: 'Estudio morfológico facial con propuesta de estilo integral, recomendaciones de productos y mantenimiento en casa.',
      duration: '30 min',
      price: 20,
    },
  ],

  videoTitle: 'Vive la Experiencia Apex Studio',
  videoSubtitle:
    'Descubre el ambiente vanguardista, los protocolos de cuidado y la pasión por el detalle en Calle Velázquez 88.',
  videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2ouwxkl53T0?rel=0',
  videoWatchUrl: 'https://youtu.be/2ouwxkl53T0',
  videoIframeTitle: 'Apex Barber Studio - Vídeo Demostrativo',
  videoFooterPrompt: '¿Preparado para un corte con identidad propia y asesoría profesional?',
  videoFooterPhone: '612 345 678',
  videoFooterInstagram: '@apexbarber.studio',

  hygieneSubtitle:
    'En Apex Barber Studio aplicamos estrictos protocolos de bioseguridad: esterilización por ultrasonido, lamas desechables y batas de protección individual.',

  pricingSubtitle:
    'Tarifas sin sorpresas con productos profesionales y servicio de cortesía incluido en cada cita.',
  pricing: [
    { name: 'Corte Signature / Skin Fade', price: 18 },
    { name: 'Pack Apex: Corte + Barba Completa', price: 26, popular: true },
    { name: 'Diseños Freestyle & Contornos', price: 22 },
    { name: 'Colorimetría & Decoloración Platinum', price: 40 },
    { name: 'Afeitado Clásico a Navaja Monouso', price: 16 },
    { name: 'Perfilado & Ritual Spa de Barba', price: 14 },
    { name: 'Tratamiento Detox & Masaje Capilar', price: 18 },
    { name: 'Experiencia Apex VIP Gold', price: 60 },
  ],

  teamSubtitle:
    'Un equipo de barberos apasionados por la estética contemporánea, la técnica y la atención cercana.',
  barbers: [
    {
      name: 'Lucas Rossi',
      role: 'Director Creativo & Master Fade',
      img: '/barber-carlos.png',
      specialties: ['Skin Fade', 'Corte Clásico', 'Visagismo'],
      instagram: '@apexbarber.studio',
    },
    {
      name: 'Mateo Silva',
      role: 'Especialista en Colorimetría & Freestyle',
      img: '/barber-miguel.png',
      specialties: ['Platinum', 'Freestyle', 'Decoloración'],
      instagram: '@apexbarber.studio',
    },
    {
      name: 'Julián Castro',
      role: 'Maestro Barbero & Ritual Navaja',
      img: '/barber-roberto.png',
      specialties: ['Barba Spa', 'Navaja Clásica', 'Balsámico'],
      instagram: '@apexbarber.studio',
    },
  ],

  testimonials: [
    {
      name: 'Mateo R.',
      rating: 5,
      text: 'Excelente servicio en Velázquez. El fade quedó impecable y la atención de Lucas fue de diez. El mejor corte que me han hecho en Madrid.',
      date: 'Hace 2 días',
      avatar: 'MR',
    },
    {
      name: 'Laura M.',
      rating: 5,
      text: 'Le regalé el pack de corte y barba a mi pareja y salió encantado. La puntualidad, la limpieza del local y los productos que usan huelen genial.',
      date: 'Hace 5 días',
      avatar: 'LM',
    },
    {
      name: 'Sergio G.',
      rating: 5,
      text: 'Buscaba un rubio platino sin quemarme el pelo y Mateo lo clavó por completo. Trato inmejorable y ambiente con muy buena música.',
      date: 'Hace 1 semana',
      avatar: 'SG',
    },
    {
      name: 'Alejandro B.',
      rating: 5,
      text: 'Gran descubrimiento. Te ofrecen café nada más entrar, te escuchan lo que quieres y el afeitado con toalla caliente es una experiencia relajante total.',
      date: 'Hace 2 semanas',
      avatar: 'AB',
    },
  ],

  socialInstagramText: 'Síguenos en Instagram y Reserva tu Turno por DM',
  socialPhone: '612 345 678',
  contactAddressHtml:
    'Calle Velázquez número 88<br>Barrio de Salamanca<br>28001 Madrid, España',
  contactPhone: '612 345 678',
  contactPhoneClean: '612345678',
  contactInstagramHandle: '@apexbarber.studio',
  contactInstagramUrl: 'https://instagram.com/apexbarber.studio',
  contactScheduleHtml:
    'Lun–Sáb: 09:30–20:30<br>Cita previa recomendada · Walk-ins según disponibilidad',
  googleMapsIframeUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.758410940348!2d-3.684809!3d40.431245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228956976fdf7%3A0x77c25144b62db481!2sCalle%20de%20Vel%C3%A1zquez%2C%20Madrid!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses',
  googleMapsTitle: 'Ubicación de Apex Barber Studio en Calle Velázquez 88, Madrid',

  footerTagline: 'Calle Velázquez 88 · Salamanca · Madrid · Tel: 612 345 678',
  footerCopyText: 'Apex Barber Studio · Calle Velázquez 88, Madrid · Todos los derechos reservados',

  floatingButtonAriaLabel: 'Abrir asistente IA de Apex Barber Studio',

  chatInitialMessage:
    '¡Hola! Soy el asistente virtual de **Apex Barber Studio** en Calle Velázquez 88 (Barrio de Salamanca, Madrid). Puedo informarte sobre nuestros cortes Signature, técnicas de colorimetría, protocolos de higiene o ayudarte a agendar tu cita al 612 345 678. ¿En qué te puedo asesorar hoy?',
  chatAssistantName: 'Asistente Apex Barber',
  chatSidebarLocation: 'Calle Velázquez, 88\nSalamanca, Madrid',
  chatQuickReplies: [
    'Reservar Cita Rápida',
    'Cortes Signature & Color',
    'Protocolos de Higiene',
    'Dónde estamos (Velázquez 88)',
    'Horarios y Precios',
  ],

  // Mock public services for booking & chat
  mockPublicServices: [
    { id: 101, name: 'Corte Signature & Fade', service: 'Degradado de autor y corte con tijera', price: 18 },
    { id: 102, name: 'Pack Apex: Corte + Barba', service: 'Corte integral y perfilado con toalla caliente', price: 26 },
    { id: 103, name: 'Diseño Freestyle & Vanguardia', service: 'Corte creativo y líneas personalizadas', price: 22 },
    { id: 104, name: 'Colorimetría & Matices Platinum', service: 'Tinte y decoloración sin amoníaco', price: 40 },
    { id: 105, name: 'Afeitado Tradicional Navaja', service: 'Afeitado monouso y masaje balsámico', price: 16 },
    { id: 106, name: 'Experiencia Apex VIP Gold', service: 'Corte, barba, tratamiento facial y peinado', price: 60 },
  ],

  // Mock employees for booking & chat
  mockEmployees: [
    {
      id: 'barber-apex-1',
      first_name: 'Lucas',
      last_name: 'Rossi',
      avatar: '/barber-carlos.png',
      active: true,
      services: [
        { id: 101, name: 'Corte Signature & Fade', price: 18, duration: 35 },
        { id: 102, name: 'Pack Apex: Corte + Barba', price: 26, duration: 50 },
        { id: 105, name: 'Afeitado Tradicional Navaja', price: 16, duration: 35 },
      ],
      schedules: [
        { weekday: 1, start_time: '09:30', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 2, start_time: '09:30', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 3, start_time: '09:30', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 4, start_time: '09:30', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 5, start_time: '09:30', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 6, start_time: '09:30', end_time: '19:00', break_start: '14:00', break_end: '15:00' },
      ],
    },
    {
      id: 'barber-apex-2',
      first_name: 'Mateo',
      last_name: 'Silva',
      avatar: '/barber-miguel.png',
      active: true,
      services: [
        { id: 101, name: 'Corte Signature & Fade', price: 18, duration: 35 },
        { id: 103, name: 'Diseño Freestyle & Vanguardia', price: 22, duration: 45 },
        { id: 104, name: 'Colorimetría & Matices Platinum', price: 40, duration: 60 },
      ],
      schedules: [
        { weekday: 1, start_time: '10:00', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 2, start_time: '10:00', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 3, start_time: '10:00', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 4, start_time: '10:00', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 5, start_time: '10:00', end_time: '20:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 6, start_time: '10:00', end_time: '19:00', break_start: '14:00', break_end: '15:00' },
      ],
    },
    {
      id: 'barber-apex-3',
      first_name: 'Julián',
      last_name: 'Castro',
      avatar: '/barber-roberto.png',
      active: true,
      services: [
        { id: 101, name: 'Corte Signature & Fade', price: 18, duration: 35 },
        { id: 102, name: 'Pack Apex: Corte + Barba', price: 26, duration: 50 },
        { id: 105, name: 'Afeitado Tradicional Navaja', price: 16, duration: 35 },
        { id: 106, name: 'Experiencia Apex VIP Gold', price: 60, duration: 60 },
      ],
      schedules: [
        { weekday: 1, start_time: '09:30', end_time: '19:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 2, start_time: '09:30', end_time: '19:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 3, start_time: '09:30', end_time: '19:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 4, start_time: '09:30', end_time: '19:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 5, start_time: '09:30', end_time: '19:30', break_start: '14:00', break_end: '15:00' },
        { weekday: 6, start_time: '09:30', end_time: '18:30', break_start: '14:00', break_end: '15:00' },
      ],
    },
  ],
};
