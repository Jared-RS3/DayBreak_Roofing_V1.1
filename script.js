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

  attachUI();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  onScroll();
})();
