const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const topBtn = document.getElementById("topBtn");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });
}

/* Reveal animation */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 90) {
      el.classList.add("active");
    }
  });

  if (topBtn) {
    if (window.scrollY > 420) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* EmailJS Appointment Form */
const form = document.getElementById("appointmentForm");
const note = document.getElementById("formNote");

if (typeof emailjs !== "undefined") {
  emailjs.init({
    publicKey: "tfUkPJPQrFkGBLJoC"
  });
}

if (form && note) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');

    note.textContent = "Sending your appointment request...";
    note.style.color = "#2f9b52";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    if (typeof emailjs === "undefined") {
      note.textContent = "Email service is not loaded. Please refresh and try again.";
      note.style.color = "#e86f00";

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Appointment Request";
      }

      return;
    }

    emailjs
      .sendForm("service_nutragenz", "template_dkkfsqq", this)
      .then(() => {
        note.textContent = "Appointment request sent successfully.";
        note.style.color = "#2f9b52";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        note.textContent = "Something went wrong. Please contact on WhatsApp.";
        note.style.color = "#e86f00";
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Appointment Request";
        }
      });
  });
}

/* Hero floating movement */
const heroPanel = document.querySelector(".hero-panel");

if (heroPanel) {
  heroPanel.addEventListener("mousemove", (e) => {
    const rect = heroPanel.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 28;
    const y = (e.clientY - rect.top - rect.height / 2) / 28;

    document.querySelectorAll(".floating-chip, .hero-floating-pill").forEach((chip, i) => {
      chip.style.transform = `translate(${x * (i + 1) * 0.35}px, ${y * (i + 1) * 0.35}px)`;
    });
  });

  heroPanel.addEventListener("mouseleave", () => {
    document.querySelectorAll(".floating-chip, .hero-floating-pill").forEach((chip) => {
      chip.style.transform = "";
    });
  });
}

/* Animate skill bars when expertise card becomes visible */
if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".skill").forEach((skill) => {
            skill.classList.add("animate");
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  document.querySelectorAll(".info-card").forEach((card) => {
    skillObserver.observe(card);
  });
} else {
  document.querySelectorAll(".skill").forEach((skill) => {
    skill.classList.add("animate");
  });
}

/* Soft 3D hover effect for professional cards */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".service, .achievement, .timeline-card, .info-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      const rotateY = (x / r.width - 0.5) * 5;
      const rotateX = (y / r.height - 0.5) * -5;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}