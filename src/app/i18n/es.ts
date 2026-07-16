import type { Content } from "./types";

export const es: Content = {
  site: {
    name: "Rolling Voyage",
    slogan: "Cada viaje tiene su propio ritmo",
    email: "hello@rollingvoyage.com",
    instagram: "https://instagram.com/rollingvoyagerd",
    foraProfile: "https://www.foratravel.com/advisor/sarah-ricart",
    termsUrl: "#",
    privacyUrl: "#",
    foraAffiliate: "Afiliada de Fora Travel",
    foraProfileLabel: "Perfil Fora",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    copyright: "© Rolling Voyage 2026",
    termsLabel: "Términos y condiciones",
    privacyLabel: "Aviso de privacidad",
  },
  nav: {
    home: "Inicio",
    approach: "Nuestro Enfoque",
    whatToExpect: "Qué esperar",
    services: "Maneras de viajar",
    contact: "Empecemos",
    cta: "Hablemos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  home: {
    hero: {
      subtitle:
        "Diseñamos viajes para vivir un destino, no solo visitarlo: auténticos, con criterio y a tu ritmo.",
      cta: "Hablemos",
    },
    about: {
      title: "Tu viaje, diseñado con intención",
      body: `Para nosotros, un buen viaje se siente personal, no una lista de lugares por tachar. Diseñamos cada experiencia a tu medida: quién eres, quién te acompaña y el ritmo que quieres llevar, con mirada local, logística clara y recomendaciones con criterio. Y gracias a nuestra afiliación con Fora, te abrimos las puertas a una red global de aliados de primer nivel.

Nuestra misión es acompañar a cada viajero en el diseño de experiencias auténticas y a su medida, donde se escucha lo que necesita y se respeta su ritmo, para que cada destino se viva con cercanía, calma y sentido.`,
      cta: "Conoce nuestro enfoque",
    },
    audience: {
      title: "Para viajeros como tú",
      intro: "Quizás te reconozcas en varias de estas:",
      items: [
        "Buscas comodidad, calidad y un viaje a tu medida, sin lujos de más.",
        "Viajas con quienes más quieres: tu pareja, tu familia, tus amigos.",
        "Te gusta una planificación que dé espacio a distintos ritmos e intereses.",
        "Para ti, la comida y la cultura son la verdadera puerta de entrada a un lugar.",
        "Prefieres invertir en una experiencia bien pensada antes que en el precio más bajo.",
        "Te gusta tenerlo todo claro, pero también la libertad de fluir durante el viaje.",
      ],
      cta: "Encuentra tu manera de viajar",
    },
    guide: {
      title: "Un recuerdo para el camino",
      body: "Un adelanto de lo que recibe cada viajero, creado a la medida de cada viaje.",
      cta: "Mira lo que te espera",
    },
    testimonials: {
      title: "En sus palabras",
      items: [
        {
          quote:
            "Me sentí acompañada y genuinamente bien cuidada durante todo el proceso. Cada detalle del viaje se organizó con dedicación y buen criterio, siempre respetando mis preferencias. Gracias a ese cuidado, nuestro viaje a Boston y Disney se sintió tranquilo, bien estructurado y lleno de momentos inolvidables. Un servicio guiado por el compromiso y el corazón, muy recomendado.",
          trip: "Viaje a Boston y Disney",
        },
        {
          quote:
            "Todo el proceso se sintió cuidado y pensado. Cada decisión se tomó pensando en mis necesidades, y siempre me sentí acompañado e informado. Los vuelos, el alojamiento y el auto se gestionaron con claridad y cuidado. Se notaba que el foco estaba en encontrar la mejor solución, no en cerrar una venta. Ese cuidado hizo que todo se sintiera tranquilo y muy personal.",
          trip: "Viaje a Nicaragua",
        },
        {
          quote:
            "La experiencia fue increíble y superó nuestras expectativas. Cada ciudad estuvo pensada con cuidado, y eso nos permitió sentirnos locales en vez de turistas y vivir México de forma auténtica y sin estrés. Cuando surgió un tema de salud al llegar, nos compartiste clínicas cercanas y contactos de emergencia, y eso hizo toda la diferencia. El viaje no habría sido lo mismo sin tu dedicación y tu atención al detalle.",
          trip: "Viaje a México",
        },
      ],
      prev: "Anterior",
      next: "Siguiente",
      label: (n) => `Testimonio ${n}`,
    },
    cta: {
      title: "Todo viaje comienza con una conversación.",
      body: "Cuéntanos a dónde sueñas con ir y nosotros nos encargamos del resto.",
      button: "Hablemos",
    },
  },
  approach: {
    eyebrow: "Nuestro Enfoque",
    title: "Cada viaje tiene su propio ritmo.",
    intro:
      "Creemos que viajar debería sentirse personal, no una lista de lugares por ver. Por eso diseñamos cada viaje alrededor de tu ritmo, de las personas con quienes lo vives y de lo que realmente te importa.",
    pillars: [
      {
        title: "Mirada local de verdad",
        body: "Conocemos el terreno y contamos con una red global de aliados de confianza, para llevarte a lo que vale la pena y ahorrarte lo que no.",
      },
      {
        title: "Logística impecable, sin perder el detalle",
        body: "Personalizar no significa improvisar. Cuidamos cada detalle y siempre sabrás qué está listo, qué es flexible y qué esperar.",
      },
      {
        title: "Un viaje a tu ritmo",
        body: "¿Planificar cada detalle o dejar espacio para improvisar? Las dos formas son válidas. Tu itinerario se adapta a ti, nunca al revés.",
      },
      {
        title: "Contigo, antes y durante",
        body: "Desde la primera conversación hasta tu último día de viaje, estamos a un mensaje de distancia, con calma cuando aparece lo inesperado.",
      },
    ],
    story: {
      title: "El nombre lo dice todo",
      body: "Rolling Voyage toma su símbolo de la aguja colipinta, un ave migratoria capaz de algunas de las travesías más largas del mundo, guiada por su instinto y a su propio ritmo. Más que un destino, representa el viaje en sí.",
      birdAlt: "Aguja colipinta",
    },
    cta: "Descubre cómo es viajar con nosotros",
  },
  whatToExpect: {
    eyebrow: "Qué esperar",
    journey: {
      title: "Así trabajamos juntos.",
      intro:
        "Desde el primer mensaje hasta tu regreso a casa, así es trabajar con nosotros: con intención, transparencia y a tu ritmo.",
      steps: [
        {
          title: "Conexión inicial",
          body: "Todo empieza con nuestro formulario, donde nos cuentas los primeros detalles del viaje que tienes en mente.",
        },
        {
          title: "Llamada de consulta",
          body: "Una conversación para conocer tu estilo de viaje, tus intereses y lo que más te importa.",
        },
        {
          title: "Propuesta",
          body: "Cuando todo está listo para comenzar, investigamos y diseñamos tu viaje con cuidado, y te enviamos una primera propuesta para que la revises y nos des tu opinión.",
        },
        {
          title: "Refinamiento",
          body: "Afinamos la propuesta con atención al ritmo y al detalle, y ajustamos recomendaciones y coordinación según la manera de viajar que elijas.",
        },
        {
          title: "Entrega de la guía",
          body: "Alrededor de un mes antes del viaje, recibes tu guía personalizada — una referencia clara y cuidada para todo el camino.",
        },
        {
          title: "Antes del viaje",
          body: "Afinamos las últimas recomendaciones, confirmaciones y detalles para que viajes con tranquilidad. Y si quieres, una llamada opcional para resolver cualquier duda de último momento.",
        },
      ],
      closing:
        "Durante todo el viaje seguimos contigo, listos para lo que traiga el camino.",
    },
    guide: {
      title: "Lo que llevarás contigo",
      intro:
        "Cada viaje de Rolling Voyage incluye una guía personalizada, que recibes alrededor de un mes antes de tu viaje: una referencia clara y bonita para tus días fuera. Cada guía refleja el destino, el ritmo del viaje y el estilo de cada viajero. Aquí un adelanto.",
      closing: "Solo un adelanto. La guía completa se crea para cada viajero.",
      cta: "Encuentra tu manera de viajar",
      imageAlt: "Páginas de guía de viaje",
    },
  },
  services: {
    eyebrow: "Maneras de viajar",
    title: "Elige cómo quieres viajar",
    intro:
      "Diseñamos cada viaje según lo que de verdad necesitas, ya sea una escapada tranquila o una experiencia que te transforme. Todo es personalizado y pensado a tu ritmo.",
    packages: [
      {
        name: "Go with the Flow",
        price: "Desde $150",
        description:
          "Para viajeros que valoran la flexibilidad, disfrutan explorar a su ritmo y quieren recomendaciones con criterio, sin necesidad de un plan totalmente estructurado.",
        includes: [
          "Guía digital personalizada con recomendaciones de actividades y gastronomía según tus intereses",
          "Opcional: gestión de reservas para actividades y/o restaurantes seleccionados",
          "Hasta dos revisiones tras la entrega",
          "Soporte durante el viaje ante cualquier imprevisto",
        ],
      },
      {
        name: "Signature Experience",
        price: "Desde $325",
        description:
          "Para quienes buscan una experiencia más completa y estructurada, con apoyo en logística, reservas y una planificación al detalle.",
        includes: [
          "Gestión de alojamiento, transporte y seguro de viaje",
          "Guía digital con itinerario día a día",
          "Reservas de actividades y restaurantes",
          "Hasta tres revisiones tras la entrega",
          "Detalles sorpresa pensados para ocasiones especiales",
          "Soporte durante el viaje",
        ],
      },
      {
        name: "All-In Journey",
        price: "Desde $500",
        description:
          "Una experiencia elevada para quienes quieren coordinación completa y acompañamiento cercano, antes y durante el viaje.",
        includes: [
          "Gestión de alojamiento, transporte y seguro de viaje",
          "Guía digital e impresa con itinerario día a día",
          "Reservas de actividades y restaurantes",
          "Hasta cinco revisiones tras la entrega",
          "Detalles sorpresa cuidadosamente seleccionados",
          "Soporte premium con seguimiento en tiempo real, check-in de vuelos y gestión de e-tickets",
        ],
      },
      {
        name: "The Hotel Edit",
        price: "Cortesía",
        description:
          "Para viajeros que ya tienen un hotel en mente y quieren acceder a beneficios y amenidades exclusivas a través de nuestros hoteles aliados.",
        includes: [
          "Acceso a amenidades y beneficios exclusivos en hoteles de 4 y 5 estrellas (ej.: desayuno de cortesía, créditos de hotel, early check-in y late check-out)",
          "Estatus preferente (ej.: prioridad en upgrades)",
        ],
        note: "Es un servicio de cortesía cuando ya tienes hotel y fechas definidas. Si necesitas que busquemos el hotel por ti, este servicio comienza en $50.",
      },
      {
        name: "Tailored Essentials",
        price: "Desde $50",
        description:
          "Una opción flexible para quienes necesitan ayuda con servicios puntuales, sin una planificación completa.",
        includes: [
          "Gestión de servicios de viaje específicos: vuelos, alojamiento, transporte, seguro de viaje",
          "Coordinación y seguimiento de lo reservado",
          "Asesoría básica sobre el servicio gestionado",
        ],
      },
    ],
    disclaimer:
      "Las tarifas aplican para viajes de hasta 14 días y grupos de hasta 7 viajeros.",
    cta: "Da el primer paso",
  },
  contact: {
    eyebrow: "Empecemos",
    title: "Comienza tu viaje",
    subtitle: "Pensado para sentirse ligero.",
    body: "Todo viaje comienza con una conversación. Cuéntanos algunos detalles del viaje que tienes en mente y nos pondremos en contacto para coordinar tu llamada. Sin compromiso y sin guiones rígidos.",
    form: {
      name: "Nombre completo",
      email: "Correo electrónico",
      message: "Cuéntanos lo que quisieras que sepamos",
      submit: "Hablemos",
      submitting: "Enviando…",
      microcopy: "Te responderemos en 1 o 2 días laborables.",
      successTitle: "Gracias por escribirnos",
      error: "Algo salió mal. Inténtalo de nuevo o escríbenos por correo.",
    },
  },
  meta: {
    title: "Rolling Voyage — Cada viaje tiene su propio ritmo",
    description:
      "Rolling Voyage diseña viajes personalizados con intención, criterio local y respeto por tu ritmo. Travel advisor afiliada a Fora.",
  },
};
