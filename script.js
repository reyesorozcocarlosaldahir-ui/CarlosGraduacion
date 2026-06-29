(function () {
  "use strict";

  const GRADUATION_DATE = new Date(2026, 6, 3, 15, 0, 0).getTime();

  const JOKES = [
    "Yo entrando a la escuela: 😎 | Yo saliendo: 👴 con rodillas de señor y ojeras de panda.",
    "Mi salud mental fue el proyecto final... y reprobó en primera vuelta. 😭",
    "Google, YouTube y yo obtuvimos este título. El diploma debería traer tres nombres. 🤝",
    "Mi promedio y yo tuvimos una relación tóxica, pero al final no nos bloqueamos. 💀",
    "Todavía escucho en mi cabeza: ‘jóvenes, para mañana investigan...’ y me da escalofrío.",
    "El estrés me acompañó más que algunos compañeros de equipo. Ese sí nunca me abandonó. 😔",
    "Yo no terminé la escuela. La escuela terminó conmigo, pero salí con papelito. ☠️",
    "Este logro está patrocinado por café, ansiedad, pestañas abiertas y fechas límite. ☕",
    "Mis neuronas dieron su vida por este título. Favor de guardar un minuto de silencio. 🫡",
    "Graduado oficialmente. Responsable… seguimos buscando evidencia. 🔍",
    "Error 404: tareas pendientes no encontradas. Por fin descansó el alma.",
    "Después de tantos trabajos en equipo aprendí algo: confiar en nadie y guardar copia. 🤡",
    "Si alguien pregunta por la maestría, se activa la alarma sísmica emocional. 🚨",
    "Mi computadora vio cosas que ningún ser humano debería ver: documentos llamados FINAL_FINAL_AHORA_SÍ.docx.",
    "El verdadero examen empieza cuando me pregunten: ‘¿y dónde vas a trabajar?’ 😭",
    "Mi título llegó. Mi estabilidad económica viene en camino… según paquetería. 📦",
    "La escuela me quitó el sueño, pero no las ganas de comer en mi fiesta. 🍗",
    "Hoy no se entrega tarea. Hoy se entrega el cuerpo a la comida. 😌",
    "Si me ven feliz, no interrumpan. Es mi primer día sin culpa académica.",
    "Sobreviví a exposiciones, tareas, desveladas y al clásico ‘no era para hoy’.",
    "Mi último semestre fue como película de terror, pero con más café y menos presupuesto.",
    "Mi mamá ya puede decir: ‘sí terminó’. Yo también estoy sorprendido.",
    "El trauma fue incluido sin costo extra en la colegiatura.",
    "No sé qué aprendí más: mi carrera o inventar excusas para entregar tarde.",
    "Hoy desbloqueé el logro: ‘Graduado, pero emocionalmente en mantenimiento’."
  ];

  const POPUPS = [
    "Logro desbloqueado: sobreviviste al sistema educativo 🏆",
    "Alerta: el graduado aún reacciona a la palabra ‘tarea’ 🚨",
    "Carlos.exe está iniciando modo fiesta...",
    "Trauma académico detectado. Aplicando pastel como tratamiento 🍰",
    "Nueva misión: comer, reír y no hablar de tareas.",
    "Sistema: se encontraron 0 ganas de hacer una maestría.",
    "Notificación: las ojeras también están invitadas.",
    "Modo graduado activado. Responsabilidad pendiente de instalar.",
    "Se recomienda aplaudir fuerte para evitar recaídas académicas.",
    "Advertencia: preguntar ‘¿y ahora qué sigue?’ puede causar silencio incómodo."
  ];

  const RULE_REACTIONS = [
    "Esa regla fue escrita con lágrimas reales.",
    "Confirmado por el comité de traumas escolares.",
    "Regla aprobada por mis ojeras.",
    "Esta regla tiene respaldo emocional.",
    "Basado en hechos reales. Lamentablemente.",
    "Mi última neurona votó a favor.",
    "Esta regla no se discute, se respeta.",
    "El graduado no está exagerando… bueno, tantito.",
    "La universidad dejó cicatrices y esta regla.",
    "Cualquier parecido con la realidad no es coincidencia."
  ];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  function safeText(element, text) {
    if (element) element.textContent = text;
  }

  function rand(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  /* FRASES MEME ROTATIVAS */

  const jokeElement = $("#jokeText");
  let currentJokeIndex = 0;

  function startJokes() {
    if (!jokeElement) return;

    jokeElement.textContent = JOKES[0];

    setInterval(() => {
      currentJokeIndex = (currentJokeIndex + 1) % JOKES.length;

      jokeElement.style.opacity = "0";
      jokeElement.style.transform = "translateY(10px) scale(.98)";

      setTimeout(() => {
        jokeElement.textContent = JOKES[currentJokeIndex];
        jokeElement.style.opacity = "1";
        jokeElement.style.transform = "translateY(0) scale(1)";
      }, 330);
    }, 4300);
  }

  /* CONTADOR */

  const daysEl = $("#days");
  const hoursEl = $("#hours");
  const minutesEl = $("#minutes");
  const secondsEl = $("#seconds");
  const countdownContainer = $("#countdown");

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function animateNumber(element, value) {
    if (!element) return;

    const newValue = String(value);

    if (element.textContent === newValue) return;

    element.style.opacity = "0.55";
    element.style.transform = "translateY(-8px) scale(1.07)";

    setTimeout(() => {
      element.textContent = newValue;
      element.style.opacity = "1";
      element.style.transform = "translateY(0) scale(1)";
    }, 120);
  }

  let countdownInterval;

  function updateCountdown() {
    const now = Date.now();
    const distance = GRADUATION_DATE - now;

    if (Number.isNaN(distance)) {
      if (countdownContainer) {
        countdownContainer.innerHTML = `
          <div class="countdown-finished">
            <h3>⚠️ Error en fecha</h3>
            <p>El contador se confundió más que yo en un examen sorpresa.</p>
          </div>
        `;
      }
      return;
    }

    if (distance <= 0) {
      if (countdownContainer) {
        countdownContainer.innerHTML = `
          <div class="countdown-finished">
            <h3>🎉 ¡Hoy es el gran día! 🎉</h3>
            <p>Se acabaron las tareas. Empieza la fiesta, la comida y el modo graduado.</p>
          </div>
        `;
      }

      clearInterval(countdownInterval);
      launchConfettiBurst(170);
      showToast("¡Llegó el día! Oficialmente se permite llorar, comer y presumir 🎓");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    animateNumber(daysEl, days);
    animateNumber(hoursEl, formatNumber(hours));
    animateNumber(minutesEl, formatNumber(minutes));
    animateNumber(secondsEl, formatNumber(seconds));
  }

  function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  /* CONFETI */

  const canvas = $("#confetti-canvas");
  let ctx;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let confettiPieces = [];
  let animationFrame;

  const confettiColors = [
    "#FFD700",
    "#D4AF37",
    "#FFF2A8",
    "#FFFFFF",
    "#FF6B6B",
    "#4ECDC4",
    "#FF8C42"
  ];

  function resizeCanvas() {
    if (!canvas) return;

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
  }

  function createConfettiPiece(fromTop = true, burst = false) {
    if (burst) {
      return {
        x: width / 2,
        y: height / 2,
        size: Math.random() * 9 + 5,
        speedX: (Math.random() - 0.5) * 12,
        speedY: (Math.random() - 0.5) * 12,
        color: rand(confettiColors),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        shape: Math.random() > 0.5 ? "rect" : "circle"
      };
    }

    return {
      x: Math.random() * width,
      y: fromTop ? Math.random() * height - height : height / 2,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * 2.5 + 1.3,
      color: rand(confettiColors),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 7,
      opacity: Math.random() * 0.6 + 0.4,
      shape: Math.random() > 0.7 ? "circle" : "rect"
    };
  }

  function initConfetti(count = 120) {
    confettiPieces = [];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finalCount = reduced ? 35 : count;

    for (let i = 0; i < finalCount; i++) {
      confettiPieces.push(createConfettiPiece(true));
    }
  }

  function drawConfetti() {
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    confettiPieces.forEach((piece) => {
      ctx.save();
      ctx.globalAlpha = piece.opacity;
      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.fillStyle = piece.color;

      if (piece.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(
          -piece.size / 2,
          -piece.size / 2,
          piece.size,
          piece.size * 0.65
        );
      }

      ctx.restore();

      piece.x += piece.speedX;
      piece.y += piece.speedY;
      piece.rotation += piece.rotationSpeed;
      piece.speedY += 0.004;

      if (piece.y > height + 50) {
        Object.assign(piece, createConfettiPiece(true));
        piece.y = -50;
      }

      if (piece.x > width + 50) piece.x = -50;
      if (piece.x < -50) piece.x = width + 50;
    });

    animationFrame = requestAnimationFrame(drawConfetti);
  }

  function launchConfettiBurst(amount = 90) {
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finalAmount = reduced ? Math.floor(amount / 4) : amount;

    for (let i = 0; i < finalAmount; i++) {
      confettiPieces.push(createConfettiPiece(false, true));
    }
  }

  function startConfetti() {
    if (!canvas) return;

    ctx = canvas.getContext("2d");

    resizeCanvas();
    initConfetti();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initConfetti();
    });

    drawConfetti();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
      } else {
        drawConfetti();
      }
    });
  }

  /* PARTÍCULAS DORADAS */

  function createParticles() {
    const particlesContainer = $("#particles");
    if (!particlesContainer) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particleCount = reduced ? 12 : window.innerWidth < 600 ? 24 : 48;

    particlesContainer.innerHTML = "";

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.width = particle.style.height = Math.random() * 5 + 3 + "px";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 7 + 7 + "s";
      particle.style.background = `rgba(212, 175, 55, ${Math.random() * 0.35 + 0.12})`;

      particlesContainer.appendChild(particle);
    }
  }

  /* TOASTS / NOTIFICACIONES MEME */

  function ensureToastContainer() {
    let container = $(".toast-container");

    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    return container;
  }

  function showToast(message, duration = 4200) {
    const container = ensureToastContainer();
    const toast = document.createElement("div");

    toast.className = "meme-toast";
    toast.innerHTML = `
      <span class="toast-icon">🎓</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 400);
    }, duration);
  }

  function startRandomToasts() {
    setTimeout(() => {
      showToast("Bienvenido al evento donde el graduado por fin dejó de decir ‘ya casi termino’");
    }, 1400);

    setInterval(() => {
      showToast(rand(POPUPS));
    }, 14500);
  }

  /* REACCIONES AL TOCAR REGLAS */

  function setupRuleReactions() {
    const rules = $$(".rules-list li");

    rules.forEach((rule) => {
      rule.addEventListener("click", () => {
        showToast(rand(RULE_REACTIONS), 3200);
        rule.classList.add("rule-hit");

        setTimeout(() => {
          rule.classList.remove("rule-hit");
        }, 500);
      });
    });
  }

  /* SECCIÓN SOBRES CON DINERO: HUMOR */

  function setupMoneySection() {
    const moneySection = $(".money-section");
    if (!moneySection) return;

    let clicks = 0;

    moneySection.addEventListener("click", () => {
      clicks++;

      if (clicks === 1) {
        showToast("El graduado no pide dinero… solo manifiesta abundancia en forma de sobre 💸");
      } else if (clicks === 2) {
        showToast("Sobres detectados: 0. Esperanza del graduado: 100% 😌");
      } else if (clicks === 3) {
        showToast("Logro desbloqueado: entendiste la indirecta del sobre 🏆");
        launchConfettiBurst(120);
      } else {
        showToast(rand([
          "El sobre puede ser discreto. El agradecimiento será público.",
          "No es obligación, es estrategia de supervivencia adulta.",
          "El graduado acepta efectivo, buenos deseos y tacos.",
          "La vida adulta cuesta. Este mensaje también fue patrocinado por la realidad.",
          "Si el sobre pesa, el corazón del graduado también."
        ]));
      }
    });
  }

  /* EFECTO REVEAL AL HACER SCROLL */

  function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(
      ".graduate-box, .event-card, .meme-quote, .countdown-section, .rules-section, .money-section, .dress-card, .final-message, .footer"
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 80);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  /* EFECTO 3D TIPO APPLE */

  function setupCardTilt() {
    const card = $(".invitation-card");
    if (!card) return;

    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 900) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 5;
      const rotateX = ((y / rect.height) - 0.5) * -5;

      card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    });
  }

  /* EASTER EGG DEL BIRRETE */

  function setupCapEasterEgg() {
    const cap = $(".cap-icon");
    if (!cap) return;

    let taps = 0;
    let timer;

    cap.addEventListener("click", () => {
      taps++;
      cap.classList.add("cap-pop");

      setTimeout(() => cap.classList.remove("cap-pop"), 450);

      clearTimeout(timer);
      timer = setTimeout(() => {
        taps = 0;
      }, 1500);

      if (taps === 1) {
        showToast("Birrete presionado. Trauma académico respondiendo...");
      }

      if (taps === 3) {
        showToast("Logro secreto: tocaste el birrete como si fuera botón de emergencia 🎓");
        launchConfettiBurst(130);
      }

      if (taps >= 5) {
        showToast("Modo exagerado activado: el graduado exige doble aplauso 👏");
        launchConfettiBurst(200);
        taps = 0;
      }
    });
  }

  /* BOTÓN WHATSAPP AUTOMÁTICO */

  function createWhatsAppButton() {
    const finalMessage = $(".final-message");
    if (!finalMessage) return;

    const phoneNumber = "+527224668293";
    const text = encodeURIComponent(
      "¡Confirmo mi asistencia a tu graduación! Prometo no preguntar por la maestría y llevar buen regalo"
    );

    const link = document.createElement("a");
    link.className = "whatsapp-button";
    link.target = "_blank";
    link.rel = "noopener";

    if (phoneNumber.trim()) {
      link.href = `https://wa.me/${phoneNumber}?text=${text}`;
    } else {
      link.href = `https://wa.me/?text=${text}`;
    }

    link.innerHTML = `
      <i class="fab fa-whatsapp"></i>
      Confirmar asistencia por WhatsApp
    `;

    finalMessage.appendChild(link);
  }

  /* MINI TARJETA DE LOGRO */

  function addAchievementCard() {
    const moneySection = $(".money-section");
    if (!moneySection) return;

    const card = document.createElement("div");
    card.className = "achievement-card";

    card.innerHTML = `
      <span>🏆 Logro desbloqueado</span>
      <strong>Sobreviví a tareas, exposiciones y trabajos en equipo.</strong>
      <small>Recompensa: fiesta, comida y cero pendientes académicos.</small>
    `;

    moneySection.insertAdjacentElement("afterend", card);
  }

  /* TÍTULO DINÁMICO DEL NAVEGADOR */

  function setupPageTitleFun() {
    const originalTitle = document.title;

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        document.title = "No te vayas, falta el pastel 🍰";
      } else {
        document.title = originalTitle;
      }
    });
  }

  /* MICROBRILLOS ALEATORIOS */

  function createSparkles() {
    const card = $(".invitation-card");
    if (!card) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setInterval(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";

      sparkle.style.left = Math.random() * 95 + "%";
      sparkle.style.top = Math.random() * 95 + "%";

      card.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1200);
    }, 1600);
  }

  /* INICIO */

  document.addEventListener("DOMContentLoaded", () => {
    startJokes();
    startCountdown();
    startConfetti();
    createParticles();
    setupRevealAnimations();
    setupCardTilt();
    setupCapEasterEgg();
    setupRuleReactions();
    setupMoneySection();
    createWhatsAppButton();
    addAchievementCard();
    setupPageTitleFun();
    createSparkles();

    setTimeout(() => {
      launchConfettiBurst(140);
    }, 900);

    setTimeout(() => {
      showToast("Sistema iniciado: Carlos.exe ya está en modo graduación 🎓");
    }, 1800);

    setTimeout(() => {
      showToast("Advertencia: esta invitación contiene humor estudiantil y señales de trauma académico 😂");
    }, 6500);
    
    
    
  });
  
})();
