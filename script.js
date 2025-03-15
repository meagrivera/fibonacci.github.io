/* script.js */

document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el SVG donde se dibujará la animación
    const svg = d3.select("#logo-animation");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const centerX = width / 2;
    const centerY = height / 2;

    // Parámetros para la espiral de Fibonacci
    const iterations = 12;
    const scaleFactor = 4;

    // Calcula la secuencia de Fibonacci
    const fib = [1, 1];
    for (let i = 2; i < iterations + 2; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }

    // Construye el camino de la espiral
    let dAttr = `M ${centerX},${centerY}`;
    let currentX = centerX, currentY = centerY;
    for (let i = 2; i < iterations; i++) {
        const radius = fib[i - 1] * scaleFactor;
        const dx = (i % 4 < 2) ? radius : -radius;
        const dy = ((i + 1) % 4 < 2) ? radius : -radius;
        dAttr += ` a ${radius},${radius} 0 0 0 ${dx},${dy}`;
        currentX += dx;
        currentY += dy;
    }

    // Añade la espiral al SVG
    const spiralPath = svg.append("path")
        .attr("d", dAttr)
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round");

  // Anima la espiral
const totalLength = spiralPath.node().getTotalLength();
spiralPath
  .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
  .attr("stroke-dashoffset", totalLength)
  .transition()
    .duration(5000)
    .ease(d3.easeCubicInOut)
    .attr("stroke-dashoffset", 0)
    .on("end", () => {
        // Calcula el bounding box de la espiral para posicionar el texto debajo
        const bbox = spiralPath.node().getBBox();
        const textY = bbox.y + bbox.height + 50; // 50px de margen debajo de la espiral

        // Agrega el texto "Fibonacci" en el SVG, centrado horizontalmente
        svg.append("text")
          .attr("x", centerX)
          .attr("y", textY)
          .attr("text-anchor", "middle")
          .attr("fill", "#fff")
          .attr("font-size", "48px")
          .attr("opacity", 0)
          .text("Fibonacci")
          .transition()
            .duration(3000)
            .attr("opacity", 1)
            .on("end", () => {
                // Una vez mostrado el texto, se oculta el preloader y se muestra el contenido principal
                document.getElementById('preloader').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
            });
    });


});


document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  const textElements = document.querySelectorAll("[data-lang]");
  
const translations = {
  es: {
    title: "Fibonacci - Servicios de Datos: Data Analytics, Data Science e IA",
    inicio: "Inicio",
    servicios: "Servicios",
    sobre: "Sobre Nosotros",
    contacto: "Contacto",
    hero: "Impulsa la Revolución de tus Datos",
    inspiracion: "Transforma tu negocio con servicios integrales de análisis de datos, ciencia de datos e inteligencia artificial.",
    cta: "Agenda una consulta gratuita",
    nuestros_servicios: "Nuestros Servicios",
    datos_servicio: "Servicios de Datos Integrales",
    datos_servicio_desc: "Ofrecemos análisis de datos avanzado, ciencia de datos e inteligencia artificial para transformar grandes volúmenes de información en decisiones estratégicas.",
    datos_punto1: "Análisis avanzado para detectar oportunidades de negocio.",
    datos_punto2: "Modelos predictivos y soluciones de IA personalizadas.",
    datos_punto3: "Optimización de procesos mediante automatización y Data Science.",
    ventajas_titulo: "¿Por qué externalizar el análisis de datos?",
    ventaja1: "<strong>Eficiencia de costos:</strong> Las empresas pueden utilizar herramientas avanzadas de IA sin una gran inversión.",
    ventaja2: "<strong>Acceso a expertos:</strong> Obtén ayuda de especialistas externos a tu equipo.",
    ventaja3: "<strong>Enfoque en el negocio:</strong> Permite que te concentres en tus actividades principales mientras nosotros optimizamos tus datos.",
    sobre_nosotros: "Sobre Nosotros",
    about_desc: "En Fibonacci, contamos con más de 20 años de experiencia y un equipo especializado en datos. Nuestra misión es transformar grandes volúmenes de información en ventajas competitivas para tu empresa.",
    por_que_elegir: "¿Por qué elegirnos?",
    elegir_desc: "Potenciamos tu negocio con análisis avanzado, inteligencia artificial y soluciones integrales de datos, reduciendo costos operativos y acelerando el crecimiento.",
    filosofia: "Nuestra filosofía: <br><strong>Enfoque en datos.</strong> Transformamos información en estrategias ganadoras. <br><strong>Innovación continua.</strong> Soluciones inteligentes para impulsar tu negocio. <br><strong>Excelencia operativa.</strong> Servicios integrales que maximizan tus recursos.",
    contacto_desc: "Contáctanos para descubrir cómo nuestros servicios de datos pueden transformar tu empresa y potenciar la innovación.",
    cta_contacto: "Reserva una consulta",
    copyright: "Copyright © 2025 Fibonacci. Todos los derechos reservados."
  },
  en: {
    title: "Fibonacci - Data Services: Data Analytics, Data Science and AI",
    inicio: "Home",
    servicios: "Services",
    sobre: "About Us",
    contacto: "Contact",
    hero: "Drive the Data Revolution",
    inspiracion: "Transform your business with comprehensive data analytics, data science, and AI services.",
    cta: "Schedule a Free Consultation",
    nuestros_servicios: "Our Services",
    datos_servicio: "Comprehensive Data Services",
    datos_servicio_desc: "We offer advanced data analytics, data science, and AI to transform large volumes of information into strategic decisions.",
    datos_punto1: "Advanced analytics to identify business opportunities.",
    datos_punto2: "Predictive models and tailored AI solutions.",
    datos_punto3: "Process optimization through automation and data science.",
    ventajas_titulo: "Why Outsource Data Analytics?",
    ventaja1: "<strong>Cost Efficiency:</strong> Businesses can use advanced AI tools without a large investment.",
    ventaja2: "<strong>Access to Expertise:</strong> Companies can get help from external experts.",
    ventaja3: "<strong>Focus on Core Business:</strong> Allows companies to concentrate on their main activities while we optimize their data.",
    sobre_nosotros: "About Us",
    about_desc: "At Fibonacci, we combine over 20 years of experience with a specialized team focused on data. Our mission is to transform large volumes of information into competitive advantages for your business.",
    por_que_elegir: "Why Choose Us?",
    elegir_desc: "We empower your business with advanced analytics, AI, and comprehensive data solutions that reduce operational costs and accelerate growth.",
    filosofia: "Our philosophy: <br><strong>Data-driven focus.</strong> We transform information into winning strategies. <br><strong>Continuous innovation.</strong> Intelligent solutions to propel your business. <br><strong>Operational excellence.</strong> Comprehensive services that maximize your resources.",
    contacto_desc: "Get in touch to discover how our data services can transform your business and drive innovation.",
    cta_contacto: "Book a Consultation",
    copyright: "Copyright © 2025 Fibonacci. All rights reserved."
  }
};


  let currentLang = "es";

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    textElements.forEach(el => {
      const key = el.getAttribute("data-lang");
      if (translations[currentLang][key]) {
        el.innerHTML = translations[currentLang][key];
      }
    });
    langToggle.textContent = currentLang === "es" ? "EN" : "ES";
    document.title = translations[currentLang]["title"];
  });
});




// Menu de hamburguesa para mobiles

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    hamburgerBtn.addEventListener("click", () => {
         navMenu.classList.toggle("show");
    });

    // Agrega el evento a cada enlace dentro del menú
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
         link.addEventListener("click", () => {
             navMenu.classList.remove("show");
         });
    });
});


// Recargar pagina
document.addEventListener("DOMContentLoaded", () => {
    const homeLink = document.getElementById("home-link");
    homeLink.addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        location.reload();  // Recarga la página para mostrar el preloader y la animación
    });
});

