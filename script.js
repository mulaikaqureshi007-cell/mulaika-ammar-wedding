// Mulaika & Ammar Wedding Site — JS
(() => {
  const $ = (sel) => document.querySelector(sel);

  // Mobile nav
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link is clicked
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Copy buttons
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = prev), 1200);
      } catch {
        alert("Copy failed. You can manually copy: " + text);
      }
    });
  });

  // Countdown to Mehndi: April 3, 2026 19:00 Asia/Karachi (UTC+05:00)
  // We compute against an absolute UTC timestamp so it works anywhere.
  const targetUtc = Date.UTC(2026, 3, 3, 14, 0, 0); // 2026-04-03 14:00:00Z == 19:00 PKT

  const dEl = $("#cd-days");
  const hEl = $("#cd-hours");
  const mEl = $("#cd-mins");
  const sEl = $("#cd-secs");
  const noteEl = $("#cd-note");

  function pad(n){ return String(n).padStart(2, "0"); }

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, targetUtc - now);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (dEl) dEl.textContent = String(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
    if (sEl) sEl.textContent = pad(secs);

    if (noteEl) {
      if (diff === 0) {
        noteEl.textContent = "It’s wedding time.";
      } else {
        noteEl.textContent = "Counting down to April 3, 2026 at 7:00 PM (Lahore).";
      }
    }
  }

  tick();
  setInterval(tick, 1000);
})();
