import { BarberBusinessData } from './business-data.interface';

export const REAL_QUARTER_DATA: BarberBusinessData = {
  id: 'real-quarter',
  isMock: false,

  brandName: 'Quarter',
  brandAccent: 'Barber',
  fullName: 'Quarter Barber',
  heroLabel: 'Barbería · Atocha (Pacífico) · Calle Abtao, 4',
  tagline: 'Cortes, Color & Actitud',
  heroDescription:
    'En Quarter Barber destacamos por contar con los medios más profesionales del sector, adaptándonos siempre a las exigencias de cada cliente y asesorando la imagen. Te espera un ambiente moderno y amigable donde nuestros clientes se convierten en amigos.',
  heroStats: [
    { num: 'Abtao 4', label: 'Atocha · Pacífico' },
    { num: '100%', label: 'Higiene Innegociable' },
    { num: 'Top', label: 'Pioneros en Color' },
  ],

  whatsappNumber: '647 565 356',
  whatsappUrl:
    'https://wa.me/34647565356?text=Hola%20Quarter%20Barber%2C%20quiero%20reservar%20una%20cita',

  aboutLabel: 'Nuestra Esencia',
  aboutTitle: 'Conoce Quarter Barber',
  aboutHighlight: 'Quarter Barber',
  aboutSubtitle:
    'Nos situamos en pleno barrio de Atocha (Pacífico) en Calle Abtao número 4 donde te espera un ambiente moderno y amigable, ya que podemos afirmar con orgullo que nuestros clientes se convierten en amigos.',
  aboutCards: [
    {
      title: 'Asesoramiento de Imagen',
      desc: 'Contamos con los medios más profesionales del sector. Nos adaptamos en cada visita a las exigencias y estilo de cada cliente, aconsejándote el corte que mejor potencia tus facciones.',
      icon: 'image',
    },
    {
      title: 'Cortes Actuales & Alternativos',
      desc: 'Somos especialistas en los cortes más demandados y actuales, pero nos fascinan las propuestas alternativas: ¡nos encanta plantearlas y hacerlas frente con técnica y estilo!',
      icon: 'cut',
    },
    {
      title: 'Pioneros en Precios Justos',
      desc: 'En Quarter Barber creemos firmemente en democratizar el estilo: somos pioneros en cortes de máxima calidad a buenos precios para que siempre luzcas impecable.',
      icon: 'badge',
    },
    {
      title: 'Amplitud en Tintes & Color',
      desc: 'Ofrecemos una impresionante amplitud de colores en tintes para que elijas libremente tu identidad, utilizando exclusivamente los mejores productos del mercado.',
      icon: 'paint',
    },
  ],

  servicesSectionSubtitle:
    'Desde degradados de tendencia hasta propuestas alternativas y colorimetría avanzada con productos top.',
  services: [
    {
      icon: 'scissors',
      name: 'Cortes Actuales & Fade',
      desc: 'Especialistas en degradados limpios, texturizados y cortes de tendencia con acabados de precisión.',
      duration: '35 min',
      price: 16,
    },
    {
      icon: 'bolt',
      name: 'Propuestas Alternativas',
      desc: 'Nos encantan los desafíos: diseños creativos, cortes vanguardistas y propuestas atrevidas con máxima personalidad.',
      duration: '45 min',
      price: 20,
    },
    {
      icon: 'palette',
      name: 'Tintes & Colorimetría',
      desc: 'Pioneros en tintes: amplísima gama de colores con los mejores productos profesionales del mercado.',
      duration: '60 min',
      price: 35,
    },
    {
      icon: 'barber',
      name: 'Corte + Barba Quarter',
      desc: 'Pack completo de corte actual y perfilado de barba con asesoramiento personalizado.',
      duration: '50 min',
      price: 24,
    },
    {
      icon: 'razor',
      name: 'Afeitado Lama Única',
      desc: 'Afeitado tradicional con lamas desechables de uso único y toallas higienizadas para máxima seguridad.',
      duration: '35 min',
      price: 15,
    },
    {
      icon: 'crown',
      name: 'Asesoramiento de Imagen',
      desc: 'Estudio y adaptación de tu imagen según tu fisonomía y preferencias para potenciar tu estilo.',
      duration: '30 min',
      price: 18,
    },
  ],

  videoTitle: 'Vive la Experiencia Quarter Barber',
  videoSubtitle:
    'Conoce el ambiente moderno, amigable y profesional que se respira en nuestro salón de Calle Abtao 4.',
  videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2ouwxkl53T0?rel=0',
  videoWatchUrl: 'https://youtu.be/2ouwxkl53T0',
  videoIframeTitle: 'Quarter Barber - Vídeo Oficial',
  videoFooterPrompt: '¿Listo para cambiar de look o probar un estilo alternativo?',
  videoFooterPhone: '647 565 356',
  videoFooterInstagram: '@quarterbarber',

  hygieneSubtitle:
    'En Quarter Barber desinfectamos diariamente nuestro material y garantizamos la higiene absoluta de todos los productos y espacios.',

  pricingSubtitle:
    'Pioneros en cortes a buenos precios y amplitud en tintes con productos del más alto nivel.',
  pricing: [
    { name: 'Corte Actual / Degradado Urbano', price: 16 },
    { name: 'Corte + Barba Quarter', price: 24, popular: true },
    { name: 'Propuestas Alternativas & Diseño', price: 20 },
    { name: 'Tintes & Colorimetría Especial', price: 35 },
    { name: 'Afeitado Tradicional (Lama Única)', price: 15 },
    { name: 'Perfilado & Arreglo de Barba', price: 12 },
    { name: 'Tratamiento Capilar & Lavado', price: 14 },
    { name: 'Servicio Completo Quarter VIP', price: 55 },
  ],

  teamSubtitle:
    'Un ambiente cercano donde te asesoramos y convertimos cada visita en una experiencia entre amigos.',
  barbers: [
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
  ],

  testimonials: [
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
  ],

  socialInstagramText: 'Síguenos en Instagram y Reserva por DM',
  socialPhone: '647 565 356',
  contactAddressHtml:
    'Calle Abtao número 4<br>Barrio de Atocha (Pacífico)<br>28007 Madrid, España',
  contactPhone: '647 565 356',
  contactPhoneClean: '647565356',
  contactInstagramHandle: '@quarterbarber',
  contactInstagramUrl: 'https://instagram.com/quarterbarber',
  contactScheduleHtml:
    'Lun–Sáb: 10:00–21:00<br>Atención personalizada con o sin cita',
  googleMapsIframeUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.286380628352!2d-3.6806085!3d40.4048997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422616238b9e6f%3A0x6b8f154ea018317e!2sCalle%20de%20Abtao%2C%204%2C%20Retiro%2C%2028007%20Madrid!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses',
  googleMapsTitle: 'Ubicación de Quarter Barber en Calle Abtao 4, Madrid',

  footerTagline: 'Calle Abtao 4 · Pacífico (Atocha) · Madrid · Tel: 647 565 356',
  footerCopyText: 'Quarter Barber · Calle Abtao 4, Madrid · Todos los derechos reservados',

  floatingButtonAriaLabel: 'Abrir asistente IA de Quarter Barber',

  chatInitialMessage:
    '¡Hola! Soy el asistente virtual de **Quarter Barber** en Calle Abtao 4 (Barrio de Atocha - Pacífico). Puedo ayudarte a informarte sobre nuestros cortes actuales, propuestas alternativas, amplia gama de tintes, higiene innegociable o cómo reservar tu cita al 647 565 356. ¿En qué te puedo asesorar hoy?',
  chatAssistantName: 'Asistente Quarter Barber',
  chatSidebarLocation: 'Calle Abtao, 4\nAtocha (Pacífico), Madrid',
  chatQuickReplies: [
    'Reservar Cita Rápida',
    'Cortes y Tintes',
    'Higiene y Seguridad',
    'Dónde estáis (Abtao 4)',
    'Horarios',
  ],

  // Datos simulados de respaldo para Quarter en caso de desconexión API
  mockPublicServices: [
    { id: 1, name: 'Cortes Actuales & Fade', service: 'Cortes de tendencia y degradados', price: 16 },
    { id: 2, name: 'Corte + Barba Quarter', service: 'Pack completo corte y barba', price: 24 },
    { id: 3, name: 'Propuestas Alternativas', service: 'Cortes vanguardistas', price: 20 },
    { id: 4, name: 'Tintes & Colorimetría', service: 'Colorimetría profesional', price: 35 },
    { id: 5, name: 'Afeitado Lama Única', service: 'Afeitado higiénico tradicional', price: 15 },
    { id: 6, name: 'Servicio Completo Quarter VIP', service: 'Corte, barba, tratamiento y lavado', price: 55 },
  ],
  mockEmployees: [
    {
      id: 'barber-qb-1',
      first_name: 'Carlos',
      last_name: 'Quarter',
      avatar: '/barber-carlos.png',
      active: true,
      services: [
        { id: 1, name: 'Cortes Actuales & Fade', price: 16, duration: 35 },
        { id: 2, name: 'Corte + Barba Quarter', price: 24, duration: 50 },
      ],
      schedules: [
        { weekday: 1, start_time: '10:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 2, start_time: '10:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 3, start_time: '10:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 4, start_time: '10:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 5, start_time: '10:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 6, start_time: '10:00', end_time: '20:00', break_start: '14:00', break_end: '15:00' },
      ],
    },
    {
      id: 'barber-qb-2',
      first_name: 'Miguel',
      last_name: 'Color',
      avatar: '/barber-miguel.png',
      active: true,
      services: [
        { id: 1, name: 'Cortes Actuales & Fade', price: 16, duration: 35 },
        { id: 3, name: 'Propuestas Alternativas', price: 20, duration: 45 },
        { id: 4, name: 'Tintes & Colorimetría', price: 35, duration: 60 },
      ],
      schedules: [
        { weekday: 1, start_time: '11:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 2, start_time: '11:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 3, start_time: '11:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 4, start_time: '11:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 5, start_time: '11:00', end_time: '21:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 6, start_time: '10:00', end_time: '20:00', break_start: '14:00', break_end: '15:00' },
      ],
    },
    {
      id: 'barber-qb-3',
      first_name: 'Roberto',
      last_name: 'Atocha',
      avatar: '/barber-roberto.png',
      active: true,
      services: [
        { id: 1, name: 'Cortes Actuales & Fade', price: 16, duration: 35 },
        { id: 2, name: 'Corte + Barba Quarter', price: 24, duration: 50 },
        { id: 5, name: 'Afeitado Lama Única', price: 15, duration: 35 },
      ],
      schedules: [
        { weekday: 1, start_time: '10:00', end_time: '20:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 2, start_time: '10:00', end_time: '20:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 3, start_time: '10:00', end_time: '20:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 4, start_time: '10:00', end_time: '20:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 5, start_time: '10:00', end_time: '20:00', break_start: '14:00', break_end: '15:00' },
        { weekday: 6, start_time: '10:00', end_time: '19:00', break_start: '14:00', break_end: '15:00' },
      ],
    },
  ],
};
