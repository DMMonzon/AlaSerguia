import { Product, Portal, SessionService, Letter, Article, User, NewsletterSubscriber } from '../types';
import portal1Img from '../../assets/img/Portal1_Home.jpeg';
import portal2Img from '../../assets/img/Portal2_Home.jpeg';
import portal3Img from '../../assets/img/Portal3_Home.jpeg';
import portal4Img from '../../assets/img/Portal4_Home.jpeg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Tu Energía y Consciencia',
    category: 'ebook',
    price: 7500,
    description: 'Guía práctica para transformar tus hábitos energéticos, liberar tensiones acumuladas y reconectar con tu vibración vital.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    pagesCount: 84,
    badge: 'MÁS VENDIDO',
    downloadUrl: '#download-tu-energia-y-consciencia.pdf',
    previewPages: [
      {
        pageNumber: 1,
        title: 'El Regreso a tu Esencia',
        content: 'Toda transformación real no proviene de añadir algo externo, sino de recordar lo que siempre estuvo ahí. Cuando nos permitimos pausar y escuchar el ritmo silencioso de la respiración, el cuerpo comienza a soltar aquello que ya no necesita sostener.'
      },
      {
        pageNumber: 2,
        title: 'Capítulo I: El Campo Energético',
        content: 'Tu campo de energía es una extensión viva de tus pensamientos, tus memorias y tu sentir. Aprender a limpiarlo diariamente es tan elemental como lavar tus manos antes de comer. En esta sección exploraremos rituales sencillos con elementos naturales.'
      },
      {
        pageNumber: 3,
        title: 'Práctica Diario de Reconexión',
        content: 'Al despertar, tómate 3 minutos sin pantallas. Apoya las plantas de los pies sobre el suelo, siente el contacto con la Tierra e inhala imaginando una luz dorada que recorre tu columna verticalmente.'
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Limpieza Energética del Hogar',
    category: 'guia',
    price: 5500,
    description: 'Manual paso a paso para armonizar espacios con hierbas sagradas, sahumerios naturales y sonidos de cuencos.',
    coverImage: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=600',
    pagesCount: 42,
    badge: 'RECOMENDADO',
    downloadUrl: '#download-limpieza-energetica.pdf',
    previewPages: [
      {
        pageNumber: 1,
        title: 'Espacios Sagrados',
        content: 'Nuestra casa es un espejo directo de nuestro estado interior. Cuando el hogar se recarga de densidad o discusiones, la energía se estanca en los rincones. Limpiar el espacio es renovar tu propia mente.'
      },
      {
        pageNumber: 2,
        title: 'Elementos para Sahumar',
        content: 'Salvia blanca, Palo Santo, Romero y Lavanda. Cada planta posee un patrón vibratorio único que transmuta la densidad en calma profunda.'
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Oráculo Animales de Poder',
    category: 'oraculo',
    price: 8500,
    description: 'Set de 33 cartas ilustradas con animales guía y libro interpretativo para recibir mensajes diarios de intuición y fortaleza.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    pagesCount: 33,
    badge: 'EDICIÓN ESPECIAL',
    downloadUrl: '#download-oraculo-animales.pdf',
    previewPages: [
      {
        pageNumber: 1,
        title: 'Carta 01: El Colibrí (La Alegría)',
        content: 'El Colibrí te recuerda que el dulzor de la vida reside en los pequeños detalles del presente. Si esta carta llegó a ti, es momento de alivianar la carga mental y permitirte sonreír sin motivos trascendentes.'
      },
      {
        pageNumber: 2,
        title: 'Carta 02: La Lechuza (La Sabiduría Silenciosa)',
        content: 'Observa en la oscuridad sin temor. La Lechuza te invita a confiar en tus corazonadas y en aquello que no se ve a simple vista.'
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'Set de Afirmaciones: Mi Luz Interior',
    category: 'afirmaciones',
    price: 6500,
    description: 'Baraja inspiradora de 40 frases con ilustraciones en acuarela para cultivar el amor propio y la paz mental.',
    coverImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    pagesCount: 40,
    downloadUrl: '#download-set-mi-luz-interior.pdf',
    previewPages: [
      {
        pageNumber: 1,
        title: 'Afirmación #07: Confianza',
        content: '\"Suelto el control del futuro y me abrazo con ternura en este instante. Todo se está acomodando para mi mayor bien.\"'
      }
    ]
  },
  {
    id: 'prod-5',
    title: 'Colores Mágicos: Cuentos de Sofía y Kael',
    category: 'ebook',
    price: 6500,
    description: 'Cuento ilustrado para niños y adultos sensibles sobre la amistad entre una niña curiosa y su pequeño dragón verde de luz.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    pagesCount: 52,
    badge: 'INFANTIL Y FAMILIA',
    downloadUrl: '#download-sofia-y-kael.pdf',
    previewPages: [
      {
        pageNumber: 1,
        title: 'Capítulo 1: El dragón en el jardín de lavandas',
        content: 'Sofía solía buscar caracoles bajo los arbustos de lavanda, hasta que una tarde tibia encontró dos ojitos verdes brillante parpadeando suavemente entre las flores. Era Kael, un pequeño dragón que estornudaba chispas de luz violeta cada vez que tenía miedo.'
      },
      {
        pageNumber: 2,
        title: 'El secreto del fuego suave',
        content: '—No tengas miedo, Kael —dijo Sofía ofreciéndole un gajo de naranja—. El fuego no solo sirve para defenderse, también sirve para entibiar el corazón de los amigos cuando hace frío.'
      }
    ]
  }
];

export const PORTALS_DATA: Portal[] = [
  {
    id: 'portal-1',
    title: 'Energía y Consciencia',
    subtitle: 'Herramientas para tu bienestar energético y espiritual',
    description: 'Un espacio para reconectar con tu energía vital, liberar lo que ya no te pertenece y crear hábitos que te acerquen a la vida que realmente querés vivir.',
    iconName: 'Sun',
    illustration: portal1Img,
    chapterTitle: 'CAPÍTULO I: El regreso a vos',
    chapterMotto: 'Toda transformación comienza cuando decidimos mirar hacia adentro.',
    features: [
      { title: 'Ebooks', description: 'Guías para tu crecimiento personal', icon: 'BookOpen' },
      { title: 'Mini Guías', description: 'Herramientas prácticas para tu día a día', icon: 'Compass' },
      { title: 'Videos', description: 'Contenido para inspirar y acompañar', icon: 'Video' },
      { title: 'Artículos', description: 'Reflexiones y recursos para tu camino', icon: 'FileText' },
      { title: 'Meditaciones', description: 'Para conectar, soltar y renovar tu energía', icon: 'Sparkles' }
    ],
    contentItems: [
      { id: 'c1', title: 'Guía de Autoconocimiento y Rituales Diarios', type: 'ebook', durationOrPages: '84 págs.' },
      { id: 'c2', title: 'Cómo limpiar y proteger tu aura en 5 minutos', type: 'guide', durationOrPages: '12 págs.' },
      { id: 'c3', title: 'Video: El arte de soltar expectativas', type: 'video', durationOrPages: '18 min.' },
      { id: 'c4', title: 'Meditación guiada: Baño de Luz Dorada', type: 'audio', durationOrPages: '15 min.' }
    ]
  },
  {
    id: 'portal-2',
    title: 'Luz Interior',
    subtitle: 'Afirmaciones, guía y recursos para tu crecimiento personal',
    description: 'Un santuario de palabras inspiradoras, oráculos intuitivos y frases diarias para recordar la luz radiante que siempre habita dentro de ti.',
    iconName: 'Lotus',
    illustration: portal2Img,
    chapterTitle: 'CAPÍTULO II: Encendiendo la Llama',
    chapterMotto: 'No busques la luz afuera cuando vos sos la fuente misma de la claridad.',
    features: [
      { title: 'Afirmaciones', description: 'Tarjetas diarias de reprogramación amorosa', icon: 'Heart' },
      { title: 'Oráculos', description: 'Mensajes para despertar tu intuición', icon: 'Moon' },
      { title: 'Diarios de Luz', description: 'Ejercicios de escritura expresiva', icon: 'PenTool' }
    ],
    contentItems: [
      { id: 'c5', title: 'Deck de Afirmaciones "Mi Luz Interior"', type: 'guide', durationOrPages: '40 tarjetas' },
      { id: 'c6', title: 'Oráculo de los Animales de Poder', type: 'ebook', durationOrPages: '33 cartas' }
    ]
  },
  {
    id: 'portal-3',
    title: 'Sofía y Kael',
    subtitle: 'Cuentos y recursos para acompañar a los más pequeños',
    description: 'Aventuras mágicas e historias llenas de ternura para enseñar la gestión emocional, la empatía y la magia del mundo interior a niños y familias.',
    iconName: 'Feather',
    illustration: portal3Img,
    chapterTitle: 'CAPÍTULO III: El Valle del Dragón Verde',
    chapterMotto: 'Los niños nos recuerdan que la magia siempre estuvo en la inocencia.',
    features: [
      { title: 'Cuentos Ilustrados', description: 'Historias para la hora de dormir', icon: 'Book' },
      { title: 'Actividades', description: 'Dibujos para colorear y reflexionar', icon: 'Palette' },
      { title: 'Audiocuentos', description: 'Narraciones con música suave de arpa', icon: 'Volume2' }
    ],
    contentItems: [
      { id: 'c7', title: 'Cuento: El Dragón Kael aprende a respirar', type: 'ebook', durationOrPages: '52 págs.' },
      { id: 'c8', title: 'Audiocuento: La noche de los deseos brillosos', type: 'audio', durationOrPages: '12 min.' }
    ]
  },
  {
    id: 'portal-4',
    title: 'Sesiones',
    subtitle: 'Acompañamientos personalizados para tu camino',
    description: 'Encuentros individuales de escucha profunda, armonización y lectura intuitiva mediante Tarot holístico, Reiki a distancia y Registros Akáshicos.',
    iconName: 'Sparkles',
    illustration: portal4Img,
    chapterTitle: 'CAPÍTULO IV: El Puente de Acompañamiento',
    chapterMotto: 'Acompañar no significa tener todas las respuestas. Significa caminar juntos un tramo.',
    features: [
      { title: 'Tarot Holístico', description: 'Mirada simbólica y orientación clara', icon: 'Eye' },
      { title: 'Reiki', description: 'Paz y armonización energética integral', icon: 'Sun' },
      { title: 'Akáshicos', description: 'Conexión con la sabiduría de tu alma', icon: 'Key' }
    ],
    contentItems: [
      { id: 'c9', title: 'Reserva de Lectura de Tarot (Online)', type: 'guide', durationOrPages: '60 min.' },
      { id: 'c10', title: 'Sesión de Reiki y Limpieza Chakra', type: 'guide', durationOrPages: '75 min.' },
      { id: 'c11', title: 'Lectura de Registros Akáshicos', type: 'guide', durationOrPages: '60 min.' }
    ]
  }
];

export const SESSIONS_DATA: SessionService[] = [
  {
    id: 'sess-tarot',
    title: 'Tarot',
    subtitle: 'Mirada simbólica y guía intuitiva',
    description: 'Una herramienta para mirar una situación desde otra perspectiva y abrir nuevas preguntas. No buscamos adivinar el futuro, sino comprender el presente con claridad.',
    price: 12000,
    duration: '60 a 75 minutos',
    modality: 'Online (Videollamada)',
    icon: 'Sparkles',
    illustration: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Claridad en momentos de duda o toma de decisiones',
      'Comprensión profunda de patrones emocionales',
      'Espacio seguro y libre de juicios',
      'Resumen con mapa de tirada enviado a tu correo'
    ]
  },
  {
    id: 'sess-reiki',
    title: 'Reiki',
    subtitle: 'Armonización energética y serenidad',
    description: 'Un espacio de armonización energética para volver al equilibrio y regalarte un momento de calma profunda. Ayuda a liberar el estrés y tensiones acumuladas.',
    price: 10000,
    duration: '60 minutos',
    modality: 'Online / A distancia',
    icon: 'Sun',
    illustration: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Alivio del estrés físico y la sobrecarga mental',
      'Desbloqueo suave de centros energéticos (Chakras)',
      'Sensación reconfortante de paz interior',
      'Sugerencias de hábitos para mantener la armonía'
    ]
  },
  {
    id: 'sess-akashicos',
    title: 'Registros Akáshicos',
    subtitle: 'Conexión con la memoria de tu alma',
    description: 'Un encuentro orientado a la reflexión y la conexión con aquello que hoy necesita ser comprendido en tu historia personal y tu propósito de vida.',
    price: 14000,
    duration: '60 a 75 minutos',
    modality: 'Online (Videollamada)',
    icon: 'Key',
    illustration: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
    benefits: [
      'Respuestas sobre el origen de bloqueos recurrentes',
      'Comprensión del sentido de tus relaciones importantes',
      'Orientación alineada con la paz y la luz de tu alma',
      'Grabación de audio de la sesión para volver a escuchar'
    ]
  }
];

export const INITIAL_LETTERS: Letter[] = [
  {
    id: 'let-1',
    category: 'Estoy atravesando un cambio',
    content: 'Querida AlaSerguía: Durante años sentí que debía encajar en expectativas ajenas. Hoy decidí dar un paso al costado y empezar de cero en un pueblo pequeño. A veces tengo miedo del silencio, pero dentro mío sé que es el espacio que mi alma necesitaba para florecer.',
    wantsResponse: false,
    canShareAnonymously: true,
    authorName: 'Camila R.',
    createdAt: '22 de Julio, 2026',
    heartsCount: 18,
    replies: [
      'Gracias por compartir tu valentía, el silencio es donde nacen las flores verdaderas.'
    ]
  },
  {
    id: 'let-2',
    category: 'Quiero agradecer',
    content: 'En un momento de mucha oscuridad, encontré la lectura sobre el dragón Kael. Se la leí a mi hijita antes de dormir y las dos terminamos llorando de emoción. Gracias por recordar que la magia es real y vive en el amor cotidiano.',
    wantsResponse: false,
    canShareAnonymously: true,
    authorName: 'Mariana G.',
    createdAt: '19 de Julio, 2026',
    heartsCount: 24,
    replies: []
  },
  {
    id: 'let-3',
    category: 'Necesito desahogarme',
    content: 'A veces siento que la prisa de la ciudad apaga mis ganas. Solo quería dejar estas palabras acá para recordar respirar profundo hoy.',
    wantsResponse: true,
    canShareAnonymously: true,
    authorName: 'Anónimo',
    createdAt: '15 de Julio, 2026',
    heartsCount: 12,
    replies: [
      'Apoya tus pies en el suelo y escucha: tu ritmo es el único que importa.'
    ]
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Kronos y Kairós: el arte de vivir en el tiempo correcto',
    excerpt: 'Comprender la diferencia entre el tiempo medido por el reloj y el instante sagrado donde todo cobra sentido.',
    content: 'Vivimos tiranizados por Kronos, el tiempo lineal de los minutos, las agendas y los vencimientos. Sin embargo, existe otra dimensión del tiempo que los antiguos griegos llamaban Kairós: el momento oportuno, el instante de revelación donde el reloj se detiene y sentimos que estamos en el lugar indicado. Para habitar Kairós, necesitamos dejar de correr tras la meta y volver a enamorarnos de la presencia.',
    date: '18 Julio 2026',
    readTime: '5 min de lectura',
    category: 'Reflexiones',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'art-2',
    title: '5 prácticas para volver a tu centro cada día',
    excerpt: 'Gestos sencillos de reconexión energética para realizar en medio de la rutina agitada.',
    content: '1. Tres respiraciones conscientes al despertar antes de tocar el teléfono.\n2. Baño de pies con agua tibia y sal gruesa para descargar tensiones al regresar a casa.\n3. Encender una vela pequeña con la intención de iluminar tus pensamientos.\n4. Escribir 3 gratitudes en un cuaderno al atardecer.\n5. Sentir el pulso de tu corazón durante 1 minuto en silencio.',
    date: '10 Julio 2026',
    readTime: '4 min de lectura',
    category: 'Herramientas',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'art-3',
    title: '¿Qué son los Registros Akáshicos y cómo nos orientan?',
    excerpt: 'Una explicación clara y amorosa sobre la biblioteca energética del viaje de la conciencia.',
    content: 'El término Akasha proviene del sánscrito y significa éter o sustancia primordial. Los Registros Akáshicos son la memoria vibracional de todas las vivencias, aprendizajes y potenciales de cada ser. Una lectura no busca predecir el futuro como algo rígido, sino mostrar los caminos de mayor luz y ayudarte a resolver dudas profundas.',
    date: '02 Julio 2026',
    readTime: '7 min de lectura',
    category: 'Espiritualidad',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Fernanda (AlaSerguía)',
    email: 'fernanda@alaserguia.com',
    role: 'admin',
    joinedDate: '2024-01-15',
    purchasesCount: 12,
    newsletterSubscribed: true
  },
  {
    id: 'usr-1',
    name: 'Sofía Martinez',
    email: 'sofia.mtz@gmail.com',
    role: 'user',
    joinedDate: '2026-03-10',
    purchasesCount: 3,
    newsletterSubscribed: true
  },
  {
    id: 'usr-2',
    name: 'Lucas Benítez',
    email: 'lucas.b@outlook.com',
    role: 'user',
    joinedDate: '2026-05-22',
    purchasesCount: 1,
    newsletterSubscribed: true
  },
  {
    id: 'usr-3',
    name: 'Elena Gómez',
    email: 'elena.gomez@yahoo.com',
    role: 'user',
    joinedDate: '2026-06-04',
    purchasesCount: 2,
    newsletterSubscribed: false
  }
];

export const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'sofia.mtz@gmail.com', dateJoined: '2026-03-10', status: 'activo' },
  { id: 'sub-2', email: 'lucas.b@outlook.com', dateJoined: '2026-05-22', status: 'activo' },
  { id: 'sub-3', email: 'maria.luz@hotmail.com', dateJoined: '2026-07-01', status: 'activo' },
  { id: 'sub-4', email: 'camila.r@gmail.com', dateJoined: '2026-07-14', status: 'activo' }
];
