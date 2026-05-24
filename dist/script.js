(function () {
  "use strict";

  const TOTAL_FRAMES = 241;
  const FADE = 0.04;

  const frames = [];
  let loadedCount = 0;
  let currentFrame = 0;
  let lastScrollY = 0;

  const canvas = document.getElementById("hero-canvas");
  const ctx = canvas.getContext("2d");

  const scrollContainer = document.getElementById("scroll-container");
  const scrollIndicator = document.getElementById("scroll-indicator");
  const nav = document.getElementById("nav");

  const sections = [
    { id: "panel-hero", from: 0.0, to: 0.2 },
    { id: "panel-testimonials", from: 0.2, to: 0.4 },
    { id: "panel-mission", from: 0.4, to: 0.6 },
    { id: "panel-systems", from: 0.6, to: 0.8 },
    { id: "panel-results", from: 0.8, to: 1.0 },
  ];

  sections.forEach((section) => {
    section.el = document.getElementById(section.id);
  });

  const dots = document.querySelectorAll(".dot");
  const jumpLinks = document.querySelectorAll(".panel-jump");

  const loader = buildLoader();

  for (let i = 1; i <= TOTAL_FRAMES; i += 1) {
    const img = new Image();
    img.src = "images/ezgif-frame-" + String(i).padStart(3, "0") + ".jpg";
    img.onload = function () {
      loadedCount += 1;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      loader.update(pct);

      if (loadedCount === 1) {
        resizeCanvas();
      }

      if (loadedCount === TOTAL_FRAMES) {
        loader.hide();
      }
    };

    frames.push(img);
  }

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);

    drawFrame(currentFrame);
  }

  function drawFrame(index) {
    const img = frames[index];
    if (!img || !img.complete) return;

    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW;
    let drawH;
    let offsetX;
    let offsetY;

    if (imgRatio > canvasRatio) {
      drawH = ch;
      drawW = ch * imgRatio;
      offsetX = (cw - drawW) / 2;
      offsetY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawH) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    const overlay = ctx.createLinearGradient(0, 0, 0, ch);
    overlay.addColorStop(0, "rgba(3, 12, 25, 0.08)");
    overlay.addColorStop(1, "rgba(3, 12, 25, 0.22)");
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, cw, ch);
  }

  function panelOpacity(progress, from, to) {
    if (progress < from || progress > to) return 0;

    if (from > 0 && progress < from + FADE) {
      return (progress - from) / FADE;
    }

    if (to < 1 && progress > to - FADE) {
      return Math.max(0, (to - progress) / FADE);
    }

    return 1;
  }

  function getScrollProgress() {
    const maxScroll = scrollContainer.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  }

  function scrollToSection(index) {
    const section = sections[index];
    if (!section) return;

    const maxScroll = scrollContainer.offsetHeight - window.innerHeight;
    const targetProgress = (section.from + section.to) / 2;
    const targetY = targetProgress * maxScroll;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  function syncPanelState(progress) {
    let activeSection = 0;

    sections.forEach((section, idx) => {
      const opacity = panelOpacity(progress, section.from, section.to);
      section.el.style.opacity = opacity;
      section.el.style.pointerEvents = opacity > 0.05 ? "auto" : "none";

      if (opacity > 0.5) {
        activeSection = idx;
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === activeSection);
    });
  }

  function syncFrame(progress) {
    const frameIndex = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1,
    );

    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      drawFrame(currentFrame);
    }
  }

  function syncChrome(progress) {
    scrollIndicator.style.opacity = window.scrollY > 80 ? "0" : "1";

    if (window.scrollY > 30) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    const delta = window.scrollY - lastScrollY;

    if (window.scrollY > 180 && delta > 6) {
      nav.style.transform = "translateY(-140%)";
    } else {
      nav.style.transform = "translateY(0)";
    }

    lastScrollY = window.scrollY;
  }

  function onScroll() {
    const progress = getScrollProgress();
    syncFrame(progress);
    syncPanelState(progress);
    syncChrome(progress);
  }

  function attachUI() {
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.section);
        scrollToSection(idx);
      });
    });

    jumpLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const idx = Number(link.dataset.target);
        if (!Number.isNaN(idx)) {
          scrollToSection(idx);
        }
      });
    });

    const hamburger = document.getElementById("nav-hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileClose = document.getElementById("mobile-close");

    hamburger.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });

    mobileClose.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  function buildLoader() {
    const overlay = document.createElement("div");
    overlay.style.cssText = [
      "position:fixed;inset:0;z-index:9999",
      "background:#f5f7fc",
      "display:flex;flex-direction:column;align-items:center;justify-content:center",
      "transition:opacity 0.6s ease",
    ].join(";");

    const label = document.createElement("p");
    label.style.cssText =
      "font-family:Inter,sans-serif;font-size:0.66rem;letter-spacing:0.22em;text-transform:uppercase;color:#355186;margin-bottom:14px";
    label.textContent = "Loading";

    const track = document.createElement("div");
    track.style.cssText =
      "width:180px;height:2px;background:#d5def1;border-radius:999px;overflow:hidden";

    const bar = document.createElement("div");
    bar.style.cssText =
      "width:0%;height:100%;background:#0066ff;transition:width 0.25s ease";

    track.appendChild(bar);
    overlay.appendChild(label);
    overlay.appendChild(track);
    document.body.appendChild(overlay);

    return {
      update(pct) {
        bar.style.width = pct + "%";
        label.textContent = pct < 100 ? "Loading " + pct + "%" : "Ready";
      },
      hide() {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.remove();
        }, 700);
      },
    };
  }

  function initCaseStudyCarousel() {
    const shell = document.getElementById("case-study-shell");
    if (!shell) return;

    const indexEl = document.getElementById("cs-index-number");
    const companyEl = document.getElementById("cs-company");
    const quoteEl = document.getElementById("cs-quote");
    const authorEl = document.getElementById("cs-author");
    const roleEl = document.getElementById("cs-role");
    const progressEl = document.getElementById("cs-progress-fill");
    const tickerEl = document.getElementById("cs-ticker-track");
    const prevBtn = document.getElementById("cs-prev");
    const nextBtn = document.getElementById("cs-next");

    if (
      !indexEl ||
      !companyEl ||
      !quoteEl ||
      !authorEl ||
      !roleEl ||
      !progressEl ||
      !tickerEl ||
      !prevBtn ||
      !nextBtn
    ) {
      return;
    }

    const caseStudies = [
      {
        quote: "Transformed our entire creative process overnight.",
        author: "Sarah Chen",
        role: "Design Director",
        company: "Linear",
      },
      {
        quote: "The most elegant solution we've ever implemented.",
        author: "Marcus Webb",
        role: "Creative Lead",
        company: "Vercel",
      },
      {
        quote: "Pure craftsmanship in every single detail.",
        author: "Elena Frost",
        role: "Head of Product",
        company: "Stripe",
      },
    ];

    let activeIndex = 0;
    let timer = null;

    function renderTicker() {
      const tickerText = caseStudies.map((item) => item.company).join(" • ");
      tickerEl.textContent = `${tickerText} • ${tickerText} • ${tickerText} • ${tickerText} •`;
    }

    function render(index) {
      const current = caseStudies[index];
      indexEl.textContent = String(index + 1).padStart(2, "0");
      companyEl.textContent = current.company;

      quoteEl.classList.add("is-changing");
      window.setTimeout(() => {
        quoteEl.textContent = current.quote;
        quoteEl.classList.remove("is-changing");
      }, 140);

      authorEl.textContent = current.author;
      roleEl.textContent = current.role;

      const pct = ((index + 1) / caseStudies.length) * 100;
      progressEl.style.height = `${pct}%`;
    }

    function goNext() {
      activeIndex = (activeIndex + 1) % caseStudies.length;
      render(activeIndex);
    }

    function goPrev() {
      activeIndex = (activeIndex - 1 + caseStudies.length) % caseStudies.length;
      render(activeIndex);
    }

    function restartTimer() {
      if (timer) {
        window.clearInterval(timer);
      }
      timer = window.setInterval(goNext, 6000);
    }

    prevBtn.addEventListener("click", () => {
      goPrev();
      restartTimer();
    });

    nextBtn.addEventListener("click", () => {
      goNext();
      restartTimer();
    });

    renderTicker();
    render(activeIndex);
    restartTimer();
  }

  function initFaqShowcase() {
    const list = document.getElementById("faq-showcase-list");
    if (!list) return;

    const items = Array.from(list.querySelectorAll("details"));
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function initMobileHeroFormToggle() {
    const heroPanel = document.querySelector("#panel-hero .panel-content");
    const formToggleBtn = document.getElementById("hero-form-toggle");
    if (!heroPanel || !formToggleBtn) return;

    const mobileMq = window.matchMedia("(max-width: 640px)");
    let mobileOpen = false;

    function syncState() {
      if (!mobileMq.matches) {
        heroPanel.classList.remove("form-collapsed");
        formToggleBtn.setAttribute("aria-expanded", "true");
        formToggleBtn.textContent = "Quick Form Always Visible";
        mobileOpen = true;
        return;
      }

      heroPanel.classList.toggle("form-collapsed", !mobileOpen);
      formToggleBtn.setAttribute("aria-expanded", mobileOpen ? "true" : "false");
      formToggleBtn.textContent = mobileOpen ? "Hide Quick Form" : "Expand Quick Form";
    }

    formToggleBtn.addEventListener("click", () => {
      if (!mobileMq.matches) return;
      mobileOpen = !mobileOpen;
      syncState();
    });

    if (typeof mobileMq.addEventListener === "function") {
      mobileMq.addEventListener("change", () => {
        mobileOpen = false;
        syncState();
      });
    }

    syncState();
  }

  attachUI();
  initCaseStudyCarousel();
  initFaqShowcase();
  initMobileHeroFormToggle();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  onScroll();
})();
