/* ==========================================================================
   Rendering + interactions. Content lives in data.js.
   ========================================================================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    orcid: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8.5 8v8M11.5 8h2.2a4 4 0 0 1 0 8h-2.2z"/><circle cx="8.5" cy="5.8" r=".4" fill="currentColor"/></svg>',
    scholar: '<svg viewBox="0 0 24 24"><path d="M2 9l10-6 10 6-10 6z"/><path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>',
    github: '<svg viewBox="0 0 24 24"><path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.9-2.3c3-.3 6-1.5 6-6.5A5 5 0 0 0 18.8 6 4.7 4.7 0 0 0 18.7 3S17.5 2.7 15 4.4a13.4 13.4 0 0 0-6 0C6.5 2.7 5.3 3 5.3 3a4.7 4.7 0 0 0-.1 3.2A5 5 0 0 0 4 9.7c0 5 3 6.2 6 6.5a3 3 0 0 0-.9 2.3V22"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    pdf: '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    doi: '<svg viewBox="0 0 24 24"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    network: '<svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-3h14v3"/></svg>',
    certification: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8.5 13.9L7 22l5-3 5 3-1.5-8.1"/></svg>',
    award: '<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
    achievement: '<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.1l1.5-7L2 9.3l7-.8z"/></svg>',
  };

  /* ---------- socials & contact links ---------- */
  const socialItems = [
    ["orcid", "ORCID", SITE.links.orcid],
    ["scholar", "Google Scholar", SITE.links.scholar],
    ["linkedin", "LinkedIn", SITE.links.linkedin],
    ["github", "GitHub", SITE.links.github],
  ].filter(([, , url]) => url && url !== "https://github.com/");
  const socialHTML = socialItems.map(([k, label, url]) =>
    `<li><a href="${esc(url)}" target="_blank" rel="noopener">${ICONS[k]}${label}</a></li>`).join("");
  $("#socials").innerHTML = socialHTML + `<li><a href="mailto:${esc(SITE.email)}">${ICONS.mail}Email</a></li>`;
  $("#socials2").innerHTML = socialHTML;
  const mail = $("#mailLink");
  mail.href = `mailto:${SITE.email}`; mail.textContent = SITE.email;
  $("#cvDownload").href = SITE.cvPdf;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- publications ---------- */
  const STATUS = { "published": "Published", "under-review": "Under review", "preprint": "Preprint", "in-preparation": "In preparation" };
  const pubGrid = $("#pubGrid");
  pubGrid.innerHTML = PUBLICATIONS.map((p, i) => `
    <button class="pub reveal" data-status="${esc(p.status)}" data-i="${i}" style="transition-delay:${(i % 3) * 80}ms" aria-haspopup="dialog">
      <div class="pub__top"><span class="status status--${esc(p.status)}">${STATUS[p.status] || esc(p.status)}</span><span class="pub__year">${esc(p.year)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p class="pub__venue">${esc(p.venue)}</p>
      <p class="pub__authors">${esc(p.authors)}</p>
      <div class="tags">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      <div class="pub__links">
        <span class="pub__link ${p.pdf ? "is-on" : ""}">${ICONS.pdf}Paper</span>
        <span class="pub__link ${p.code ? "is-on" : ""}">${ICONS.github}Code</span>
        <span class="pub__open">Details ${ICONS.arrow}</span>
      </div>
    </button>`).join("");

  // hide filters that have no publications
  $$(".filter").forEach(b => {
    const f = b.dataset.filter;
    if (f !== "all" && !PUBLICATIONS.some(p => p.status === f)) b.remove();
  });
  $("#pubFilters").addEventListener("click", e => {
    const btn = e.target.closest(".filter"); if (!btn) return;
    $$(".filter").forEach(b => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    $$(".pub").forEach(card => {
      const show = f === "all" || card.dataset.status === f;
      card.classList.toggle("is-hidden", !show);
      if (show) { card.classList.remove("is-visible"); requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("is-visible"))); }
    });
  });

  // spotlight + 3D tilt
  if (!reduced && matchMedia("(hover: hover)").matches) {
    $$(".pub").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty("--mx", x + "px"); card.style.setProperty("--my", y + "px");
        const rx = ((y / r.height) - .5) * -6, ry = ((x / r.width) - .5) * 6;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  // modal
  const modal = $("#pubModal"), body = $("#modalBody");
  let lastFocus = null;
  const openModal = i => {
    const p = PUBLICATIONS[i];
    const btn = (url, icon, label, primary) => url
      ? `<a class="btn ${primary ? "btn--primary" : "btn--ghost"}" href="${esc(url)}" target="_blank" rel="noopener">${icon}${label}</a>` : "";
    const actions = btn(p.pdf, ICONS.pdf, "Read the paper (PDF)", true) + btn(p.code, ICONS.github, "Code on GitHub") + btn(p.doi, ICONS.doi, "DOI");
    const missing = [!p.pdf && "PDF", !p.code && "code"].filter(Boolean);
    body.innerHTML = `
      <span class="status status--${esc(p.status)}">${STATUS[p.status] || ""}</span>
      <h3 id="modalTitle">${esc(p.title)}</h3>
      <p class="pub__venue">${esc(p.venue)} · ${esc(p.year)}</p>
      <p class="pub__authors">${esc(p.authors)}</p>
      <p class="modal__abstract">${esc(p.abstract)}</p>
      <div class="tags" style="margin-bottom:22px">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      <div class="modal__actions">${actions}</div>
      ${missing.length ? `<p class="modal__soon">${missing.join(" and ")} coming soon.</p>` : ""}`;
    lastFocus = document.activeElement;
    modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => $(".modal__close").focus(), 50);
  };
  const closeModal = () => {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll"); lastFocus && lastFocus.focus();
  };
  pubGrid.addEventListener("click", e => { const c = e.target.closest(".pub"); if (c) openModal(+c.dataset.i); });
  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });

  /* ---------- CV ---------- */
  const tl = items => items.map(it => `
    <li class="reveal">
      <span class="timeline__period">${esc(it.period)}</span>
      <h4>${esc(it.title)}</h4>
      <div class="timeline__place">${esc(it.place)}</div>
      ${it.details && it.details.length ? `<ul>${it.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
    </li>`).join("");
  $("#cvEducation").innerHTML = tl(CV.education);
  $("#cvExperience").innerHTML = tl(CV.experience);
  $("#cvSkills").innerHTML = Object.entries(CV.skills).map(([g, list]) =>
    `<div class="skill-group"><h4>${esc(g)}</h4><div class="tags">${list.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div></div>`).join("");
  $("#cvLanguages").innerHTML = CV.languages.map(l => `<li>${esc(l)}</li>`).join("");

  /* ---------- teaching ---------- */
  const TYPE = { lecture: "Lectures", lab: "Labs", exam: "Exams", solution: "Solutions" };
  const fileList = files => files.length
    ? `<ul class="files">${files.map(f => `<li><a href="${esc(f.file)}" target="_blank" rel="noopener"><span class="pdf">${ICONS.pdf}</span>${esc(f.name)}<span class="ftype">${esc(f.type || "pdf")}</span></a></li>`).join("")}</ul>`
    : `<div class="empty">Course materials will be published here soon.</div>`;
  $("#courseGrid").innerHTML = COURSES.map((c, i) => {
    const types = [...new Set(c.files.map(f => f.type).filter(Boolean))];
    const tabs = types.length > 1
      ? `<div class="course__tabs" role="tablist"><button class="is-active" data-t="all">All</button>${types.map(t => `<button data-t="${esc(t)}">${TYPE[t] || esc(t)}</button>`).join("")}</div>` : "";
    return `<article class="course reveal" data-c="${i}" style="transition-delay:${i * 100}ms">
      <div class="course__icon">${ICONS[c.icon] || ICONS.code}</div>
      <h3>${esc(c.title)}</h3>
      <div class="course__level">${esc(c.level)} · ${c.files.length} document${c.files.length === 1 ? "" : "s"}</div>
      <p>${esc(c.description)}</p>
      ${tabs}<div class="course__files">${fileList(c.files)}</div>
    </article>`;
  }).join("");
  $("#courseGrid").addEventListener("click", e => {
    const b = e.target.closest(".course__tabs button"); if (!b) return;
    const card = b.closest(".course"), c = COURSES[+card.dataset.c], t = b.dataset.t;
    $$(".course__tabs button", card).forEach(x => x.classList.toggle("is-active", x === b));
    $(".course__files", card).innerHTML = fileList(t === "all" ? c.files : c.files.filter(f => f.type === t));
  });

  /* ---------- achievements ---------- */
  $("#achGrid").innerHTML = ACHIEVEMENTS.map((a, i) => `
    <article class="badge badge--${esc(a.kind)} reveal" style="transition-delay:${(i % 4) * 70}ms">
      <div class="badge__icon">${ICONS[a.kind] || ICONS.achievement}</div>
      <span class="badge__kind">${esc(a.kind)}</span>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.issuer)}</p>
      <div class="badge__foot">
        <span>${esc(a.date)}</span>
        ${a.status === "in-progress" ? `<span class="badge__prog">● in progress</span>` : a.link ? `<a class="badge__verify" href="${esc(a.link)}" target="_blank" rel="noopener">verify ↗</a>` : ""}
      </div>
    </article>`).join("");

  /* ---------- contact form (FormSubmit → your inbox) ---------- */
  const form = $("#contactForm"), status = $("#formStatus"), sendBtn = $("#sendBtn");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach(inp => {
      const bad = !inp.value.trim() || (inp.type === "email" && !/^\S+@\S+\.\S+$/.test(inp.value));
      inp.closest(".field").classList.toggle("is-invalid", bad); if (bad) ok = false;
    });
    if (!ok) { status.className = "form__status err"; status.textContent = "Please fill in your name, a valid email and a message."; return; }
    if (form._honey.value) return;
    const data = Object.fromEntries(new FormData(form));
    data._subject = data._subject ? `[Website] ${data._subject}` : "[Website] New message";
    data._template = "table"; data._captcha = "false";
    sendBtn.disabled = true; $(".btn__label", sendBtn).textContent = "Sending…";
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || String(j.success) === "false") throw new Error(j.message || "failed");
      status.className = "form__status ok"; status.textContent = "Thank you! Your message has been sent — I'll get back to you soon.";
      form.reset();
    } catch {
      status.className = "form__status err";
      const q = encodeURIComponent;
      status.innerHTML = `Couldn't send right now. <a href="mailto:${SITE.email}?subject=${q(data._subject)}&body=${q(data.message + "\n\n— " + data.name + " (" + data.email + ")")}" style="text-decoration:underline">Open it in your email app instead</a>.`;
    } finally { sendBtn.disabled = false; $(".btn__label", sendBtn).textContent = "Send message"; }
  });
  $$("[required]", form).forEach(i => i.addEventListener("input", () => i.closest(".field").classList.remove("is-invalid")));

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
  }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));

  /* ---------- nav: scroll state, active link, mobile menu ---------- */
  const nav = $("#nav"), links = $("#navLinks"), burger = $("#burger");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const secIO = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) $$("a", links).forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => secIO.observe(s));
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", open); links.classList.toggle("is-open", open);
  });
  links.addEventListener("click", e => { if (e.target.closest("a")) { burger.setAttribute("aria-expanded", "false"); links.classList.remove("is-open"); } });

  /* ---------- theme ---------- */
  const root = document.documentElement;
  let saved = null; try { saved = localStorage.getItem("theme"); } catch {}
  root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  });

  /* ---------- animated network graph (hero background) ---------- */
  const cv = $("#graphBg"), ctx = cv.getContext("2d");
  let W, H, nodes = [], packets = [], mouse = { x: -999, y: -999 }, raf;
  const css = v => getComputedStyle(root).getPropertyValue(v).trim();
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, Math.max(28, W * H / 16000)));
    nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1.4 + Math.random() * 2.2, hot: Math.random() < .08 }));
  };
  const LINK = 140;
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    const edge = css("--accent-2"), hot = css("--accent"), dot = css("--muted");
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1;
      const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { n.x += dx / d * .8; n.y += dy / d * .8; }
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK) {
        ctx.globalAlpha = (1 - d / LINK) * .35; ctx.strokeStyle = (a.hot || b.hot) ? hot : edge;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        if (Math.random() < .0008 && packets.length < 25) packets.push({ a, b, t: 0 });
      }
    }
    for (const n of nodes) { ctx.globalAlpha = n.hot ? .95 : .55; ctx.fillStyle = n.hot ? hot : dot; ctx.beginPath(); ctx.arc(n.x, n.y, n.hot ? n.r + 1.2 : n.r, 0, 7); ctx.fill(); }
    packets = packets.filter(p => (p.t += .015) < 1);
    for (const p of packets) { ctx.globalAlpha = 1 - p.t * .5; ctx.fillStyle = p.a.hot ? hot : edge; ctx.beginPath(); ctx.arc(p.a.x + (p.b.x - p.a.x) * p.t, p.a.y + (p.b.y - p.a.y) * p.t, 2.2, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  };
  resize(); addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); reduced ? drawOnce() : draw(); });
  const hero = $(".hero");
  hero.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
  const drawOnce = () => { draw(); cancelAnimationFrame(raf); };
  // pause when hero off-screen
  new IntersectionObserver(([en]) => { cancelAnimationFrame(raf); if (en.isIntersecting && !reduced) draw(); }).observe(hero);
  if (reduced) drawOnce();
})();
