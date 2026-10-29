/* ICMFM XXII · Gijón 2027 — single-page "windowed" app (no build step). */
(() => {
  "use strict";

  /* ---------------- Configuration: edit here ---------------- */
  const CONF = {
    short: "ICMFM XXII",
    name: "XXII International Colloquium on Mechanical Fatigue of Metals",
    start: "2027-09-08T09:00:00+02:00",
    end: "2027-09-10T19:00:00+02:00",
    email: "secretary@icmfm22.org",
    cif: "Q3318001I",
    venue: "Universidad Laboral de Gijón",
    address: ["ICMFM XXII Secretariat", "Department of Construction and Manufacturing Engineering", "University of Oviedo · Campus de Viesques", "33203 Gijón, Asturias, Spain"],
    mapEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=-5.6400%2C43.5150%2C-5.5900%2C43.5330&layer=mapnik&marker=43.5244%2C-5.6157",
    mapLink: "https://www.openstreetmap.org/?mlat=43.5244&mlon=-5.6157#map=15/43.5244/-5.6157",
  };

  const PHOTOS = {
    laboral: {
      src: "assets/img/laboral.webp", small: "assets/img/laboral-800.webp", w: 1600, h: 684,
      alt: "The Universidad Laboral de Gijón, a monumental sandstone complex with a tall central tower",
      credit: "Photo: David Álvarez López, CC BY 2.0", license: "https://creativecommons.org/licenses/by/2.0/",
      page: "https://commons.wikimedia.org/wiki/File:Universidad_Laboral._Gij%C3%B3n.jpg",
    },
    cimadevilla: {
      src: "assets/img/cimadevilla.webp", small: "assets/img/cimadevilla-800.webp", w: 1600, h: 504,
      alt: "The fishermen's quarter of Cimadevilla and the old harbour of Gijón seen from the sea",
      credit: "Photo: FDV, CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/",
      page: "https://commons.wikimedia.org/wiki/File:Cimadevilla-261213.jpg",
    },
  };

  const DATES = [
    { iso: "2026-12-01", label: "Call for abstracts opens · templates available" },
    { iso: "2027-01-31", label: "Special session proposals deadline" },
    { iso: "2027-02-01", label: "Registration opens" },
    { iso: "2027-02-28", label: "Abstract submission deadline" },
    { iso: "2027-03-31", label: "Notification of abstract acceptance" },
    { iso: "2027-05-15", label: "Early-bird registration deadline" },
    { iso: "2027-05-31", label: "Full paper submission (optional)" },
    { iso: "2027-07-15", label: "Final programme published" },
    { iso: "2027-09-08", end: "2027-09-10", label: "ICMFM XXII Colloquium in Gijón", main: true },
  ];

  const TOPICS = [
    "Cyclic plasticity and internal structure", "Low, high and very high cycle fatigue", "Mechanisms of fatigue damage",
    "Fatigue thresholds", "Short and long crack growth", "Life prediction", "Fatigue modelling",
    "Variable amplitude loading", "Thermal fatigue", "Multiaxial fatigue", "Fatigue in biomaterials",
    "High-temperature fatigue", "Corrosion fatigue", "Environmentally assisted fatigue",
    "Fatigue of additively manufactured metals", "Probabilistic and data-driven fatigue assessment",
  ];

  const CHAIRS = [
    { name: "Alfonso Fernández-Canteli", aff: "University of Oviedo, Spain" },
    { name: "Miguel Muñiz-Calvente", aff: "University of Oviedo, Spain" },
    { name: "Diego Díaz-Salamanca", aff: "University of Oviedo, Spain" },
  ];
  const COLLABORATORS = [
    { name: "Abílio M. P. de Jesus", aff: "University of Porto (FEUP / INEGI), Portugal" },
    { name: "José A. F. O. Correia", aff: "University of Porto (FEUP / INEGI), Portugal" },
    { name: "Stanislav Seitl", aff: "Institute of Physics of Materials, Czech Academy of Sciences, Brno, Czech Republic" },
    { name: "Grzegorz Lesiuk", aff: "Wrocław University of Science and Technology, Poland" },
  ];

  const HISTORY = [
    ["Origins", "1968", "First colloquium, Brno"], ["I–XII", "1972–1994", "Biennial, from Brno to Miskolc (Hungary)"],
    ["XIII", "2006", "Ternopil, Ukraine"], ["XIV", "2008", "Varna, Bulgaria"], ["XV", "2010", "Opole, Poland"],
    ["XVI", "2012", "Brno, Czech Republic"], ["XVII", "2014", "Verbania, Italy"], ["XVIII", "2016", "Gijón, Spain"],
    ["XIX", "2018", "Porto, Portugal"], ["XX", "2021", "Wrocław, Poland (online)"], ["XXI", "2023", "Brno, Czech Republic"],
    ["XXII", "2027", "Gijón, Spain", true],
  ];

  const HOTELS = [
    ["Parador de Gijón Molino Viejo", "Isabel la Católica park"],
    ["Hotel Abba Playa Gijón", "Near San Lorenzo beach"],
    ["Hotel Príncipe de Asturias", "San Lorenzo seafront"],
    ["Hotel Alcomar", "San Lorenzo seafront"],
    ["Hotel Asturias", "Plaza Mayor, old town"],
    ["Hotel Pasaje", "Marina and old town"],
    ["Hotel Don Manuel", "City centre"],
    ["Hotel Pathos", "City centre"],
  ];

  /* ---------------- Icons ---------------- */
  const I = {
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    programme: '<path d="M4 6h16M4 12h10M4 18h13"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 5.5 4.8"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    plane: '<path d="M2 16.5 22 9l-3-2-7 2.5L6 5 4 6l4 5-4 1.5-2-1.5-1 1 3 3Z"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/>',
    bus: '<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M8 21v-3M16 21v-3"/>',
    ship: '<path d="M3 17l2 3h14l2-3-9-3Z"/><path d="M12 3v11M7 8h10l-1 5"/>',
    bed: '<path d="M3 18V6M3 13h18v5M21 13a3 3 0 0 0-3-3h-8v3"/><circle cx="7" cy="10" r="1.6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    arrowL: '<path d="M15 6l-6 6 6 6"/>',
    arrowR: '<path d="M9 6l6 6-6 6"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19V5"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>',
  };
  const icon = (n) => `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">${I[n]}</svg>`;

  /* ---------------- Helpers ---------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const day = (iso) => new Date(iso + "T12:00:00");
  const fmt = (iso, opts = { day: "numeric", month: "long", year: "numeric" }) => day(iso).toLocaleDateString("en-GB", opts);
  const t = (iso, text) => `<time datetime="${iso}">${text || fmt(iso)}</time>`;
  const tRange = (a, b) => `${t(a, String(day(a).getDate()))}–${t(b)}`;
  const initials = (n) => { const w = n.split(/\s+/); return (w[0][0] + w[w.length - 1][0]).toUpperCase(); };
  const mailto = (subject) => `mailto:${CONF.email}?subject=${encodeURIComponent(subject)}`;
  const ext = (href, text, srText = "") => `<a href="${href}" target="_blank" rel="noopener">${text}<span class="visually-hidden">${srText} (opens in a new tab)</span></a>`;
  const palette = [["#14456b", "#0b1f3a"], ["#a34c08", "#6b3105"], ["#1d7a6e", "#0f4a43"], ["#5a3d8a", "#33205a"]];

  const person = (p, i, role) => {
    const [c1, c2] = palette[i % palette.length];
    return `<li class="person"><span class="avatar" style="--c1:${c1};--c2:${c2}" aria-hidden="true">${esc(initials(p.name))}</span>
      <span class="person-body">${role ? `<span class="person-role">${esc(role)}</span>` : ""}<span class="person-name">${esc(p.name)}</span><span class="person-aff">${esc(p.aff)}</span></span></li>`;
  };

  const credit = (p, note = "") => `<a href="${p.page}" target="_blank" rel="noopener">${esc(p.credit)}${note}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
  const banner = (p) => `<figure class="banner"><img src="${p.src}" srcset="${p.small} 800w, ${p.src} 1600w" sizes="(max-width: 960px) 100vw, 1100px" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" loading="lazy" decoding="async"><figcaption>${credit(p)}</figcaption></figure>`;

  const timelineState = () => {
    const now = new Date();
    let nextFound = false;
    return DATES.map((d) => {
      const endDay = day(d.end || d.iso); endDay.setHours(23, 59, 59);
      const past = endDay < now;
      let next = false;
      if (!past && !nextFound) { next = true; nextFound = true; }
      return { ...d, past, next };
    });
  };

  const tabs = (viewId, items) => `
    <div class="tabs" role="tablist" aria-label="${esc(viewId)} sections">
      ${items.map((x) => `<button role="tab" type="button" id="tab-${viewId}-${x.id}" data-tab="${x.id}" aria-controls="panel-${viewId}-${x.id}" aria-selected="false" tabindex="-1">${esc(x.label)}</button>`).join("")}
    </div>
    ${items.map((x) => `<div role="tabpanel" id="panel-${viewId}-${x.id}" aria-labelledby="tab-${viewId}-${x.id}" tabindex="0" hidden>${x.html}</div>`).join("")}`;

  const notice = (html) => `<div class="notice" role="note">${icon("alert")}<div>${html}</div></div>`;
  const head = (eyebrow, title, lead) => `<div class="win-head"><span class="eyebrow">${eyebrow}</span><h1 tabindex="-1">${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}</div>`;

  /* ---------------- Views ---------------- */
  const heroArt = `<svg class="hero-art" viewBox="0 0 400 400" preserveAspectRatio="xMaxYMid meet" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#7fd3ff" stroke-opacity=".14">${Array.from({ length: 8 }, (_, i) => `<path d="M40 ${50 + i * 45} H400"/>`).join("")}${Array.from({ length: 8 }, (_, i) => `<path d="M${40 + i * 50} 30 V370"/>`).join("")}</g>
      <path d="M40 30 V370 H400" fill="none" stroke="#7fd3ff" stroke-opacity=".5" stroke-width="2"/>
      <path class="curve" pathLength="1" d="M50 70 C 140 72, 170 130, 210 200 S 300 300, 400 304" fill="none" stroke="#ffb347" stroke-width="4" stroke-linecap="round"/>
      ${[[90, 76], [140, 92], [180, 140], [215, 205], [255, 255], [305, 290], [360, 302]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#ffb347" fill-opacity=".9"/>`).join("")}
      <text x="48" y="392" fill="#bcd6ef" font-size="13" font-family="Space Grotesk, sans-serif">log N</text>
      <text x="14" y="40" fill="#bcd6ef" font-size="13" font-family="Space Grotesk, sans-serif">σ</text>
    </svg>`;

  const VIEWS = [
    { id: "home", label: "Home", icon: "home", title: "Welcome", render: () => {
      const nx = timelineState().find((d) => d.next);
      const p = PHOTOS.laboral;
      return `
      <section class="hero" aria-labelledby="h-home">
        <img class="hero-photo" src="${p.src}" srcset="${p.small} 800w, ${p.src} 1600w" sizes="(max-width: 960px) 100vw, 1100px" width="${p.w}" height="${p.h}" alt="" fetchpriority="high">
        ${heroArt}
        <div class="hero-content">
          <span class="eyebrow">International Colloquium · Since 1968</span>
          <h1 id="h-home" tabindex="-1">Mechanical Fatigue of Metals <span class="roman">XXII</span></h1>
          <p>The ICMFM returns to Gijón, on the Cantabrian coast of northern Spain, to bring together everyone working on basic and applied research on the fatigue of metals.</p>
          <div class="hero-meta">
            <span>${icon("calendar")}<span>${tRange("2027-09-08", "2027-09-10")}</span></span>
            <span>${icon("pin")}<span>${esc(CONF.venue)}, Spain</span></span>
          </div>
          <div class="btn-row">
            <a class="btn btn-primary" href="#/submission">${icon("upload")}Submit an abstract</a>
            <a class="btn btn-ghost" href="#/dates">${icon("calendar")}Important dates</a>
          </div>
          <div class="countdown" id="countdown"></div>
        </div>
        <span class="credit">${credit(p, " (cropped, toned)")}</span>
      </section>
      ${nx && !nx.main ? `<p class="milestone"><span class="badge badge-next">Next</span><strong>${esc(nx.label)}</strong><span class="muted">${t(nx.iso, fmt(nx.iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))}</span></p>` : ""}
      <section aria-labelledby="h-explore">
        <h2 id="h-explore" class="visually-hidden">Explore the colloquium</h2>
        <div class="tiles">
          ${VIEWS.slice(1).map((v, i) => `<a class="tile" href="#/${v.id}"><span class="tile-n" aria-hidden="true">${String(i + 2).padStart(2, "0")}</span><span class="tile-ico">${icon(v.icon)}</span><strong>${esc(v.label)}</strong><span class="tile-sub">${esc(v.blurb)}</span></a>`).join("")}
        </div>
      </section>`;
    } },

    { id: "about", label: "About", icon: "info", title: "About the colloquium", blurb: "Scope and history since 1968", render: () => `
      ${head("About", "Why fatigue still matters", "Fatigue is one of the most important types of damage affecting structural materials in industrial service, and it can end in sudden, unexpected fracture. Because metal alloys remain the materials of choice for the most heavily loaded components and structures, every aspect of fatigue keeps the attention of scientists, engineers and designers.")}
      <p class="prose">${esc(CONF.short)} encourages the exchange of knowledge and experience between the communities working on basic and applied research on the fatigue of metals, looking at the problem from microscopic, analytical, simulation and application points of view.</p>
      <div class="grid grid-3 section">
        <div class="card"><span class="card-ico">${icon("globe")}</span><h2 class="h3">Language</h2><p>The official language is English. All abstracts, papers, presentations and posters must be in English.</p></div>
        <div class="card"><span class="card-ico">${icon("pin")}</span><h2 class="h3">Host</h2><p>Organised by the University of Oviedo at the monumental ${esc(CONF.venue)}.</p></div>
        <div class="card"><span class="card-ico">${icon("mic")}</span><h2 class="h3">Format</h2><p>Three days of plenary lectures, special sessions, oral and poster presentations, plus a social programme.</p></div>
      </div>
      <section class="section" aria-labelledby="h-hist">
        <h2 id="h-hist">A colloquium with history</h2>
        <p class="prose">A founding colloquium on the mechanical fatigue of metals was held in Brno in 1968. It was followed by the numbered series: twelve colloquia held every two years from 1972 until 1994 (XII, Miskolc, Hungary). After a twelve-year break the series restarted in 2006 and opened to participants from every country interested in the fatigue of metallic materials. In 2027 it returns to Gijón, eleven years after ICMFM XVIII.</p>
        <ul class="history">
          ${HISTORY.map(([n, y, pl, cur]) => `<li${cur ? ' class="is-current"' : ""}><b>${n} · ${y}</b><span>${esc(pl)}${cur ? " · this edition" : ""}</span></li>`).join("")}
        </ul>
      </section>` },

    { id: "dates", label: "Important dates", icon: "calendar", title: "Important dates", blurb: "Deadlines and milestones", render: () => `
      ${head("Calendar", "Important dates", "All deadlines close at 23:59 Madrid time (CET in winter, CEST in summer) on the date shown.")}
      <ol class="timeline">
        ${timelineState().map((d) => `<li class="${d.main ? "is-main" : ""} ${d.past ? "is-past" : ""} ${d.next ? "is-next" : ""}">
          <span class="tl-date">${d.end ? tRange(d.iso, d.end) : t(d.iso, fmt(d.iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))}</span>
          <span class="tl-label">${esc(d.label)}</span>${d.next ? '<span class="badge badge-next">Next</span>' : ""}${d.past ? '<span class="badge badge-past">Closed</span>' : ""}
        </li>`).join("")}
      </ol>
      <div class="btn-row"><a class="btn btn-soft" href="assets/icmfm-xxii-dates.ics" download>${icon("download")}Add the colloquium to your calendar (.ics)</a></div>` },

    { id: "programme", label: "Programme", icon: "programme", title: "Scientific programme", blurb: "Topics, plenaries and sessions", tabs: true, render: () => `
      ${head("Scientific programme", "Programme")}
      ${tabs("programme", [
        { id: "topics", label: "Topics", html: `<p>Contributions are welcome on, but not limited to, the following topics:</p><ul class="chips">${TOPICS.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` },
        { id: "plenary", label: "Plenary lectures", html: `${notice("Plenary speakers will be announced in spring 2027.")}<p class="prose">Each day of the colloquium opens with a plenary lecture by an internationally recognised expert in the fatigue of metals.</p>` },
        { id: "special", label: "Special sessions", html: `<p class="prose">Proposals for special sessions on emerging or focused topics are welcome. A proposal should include a title, a short description (max. 300 words) and the names and affiliations of the organisers.</p><p>Deadline for proposals: <strong>${t("2027-01-31")}</strong>.</p><a class="btn btn-soft" href="${mailto(CONF.short + " – Special session proposal")}">${icon("mail")}Propose a special session</a>` },
        { id: "schedule", label: "Schedule", html: `${notice(`The detailed schedule will be published by ${t("2027-07-15")}.`)}
          <div class="table-wrap" role="region" aria-labelledby="sched-cap" tabindex="0"><table><caption id="sched-cap" class="visually-hidden">Tentative outline of the three days</caption><thead><tr><th scope="col">Day</th><th scope="col">Outline (tentative)</th></tr></thead><tbody>
          <tr><th scope="row">${t("2027-09-08", "Wed 8 Sep")}</th><td>Registration · Opening · Plenary lecture · Technical sessions · Welcome reception</td></tr>
          <tr><th scope="row">${t("2027-09-09", "Thu 9 Sep")}</th><td>Plenary lecture · Technical and special sessions · Posters · Conference dinner</td></tr>
          <tr><th scope="row">${t("2027-09-10", "Fri 10 Sep")}</th><td>Plenary lecture · Technical sessions · Closing ceremony</td></tr>
          </tbody></table></div>` },
      ])}` },

    { id: "committees", label: "Committees", icon: "people", title: "Committees", blurb: "Organisers and collaborators", tabs: true, render: () => `
      ${head("Organisation", "Committees")}
      ${tabs("committees", [
        { id: "organising", label: "Organising committee", html: `
          <h2 class="h3">Chairs</h2>
          <ul class="people">${CHAIRS.map((p, i) => person(p, i, "Chair")).join("")}</ul>
          <h2 class="h3 section">International collaborators</h2>
          <ul class="people">${COLLABORATORS.map((p, i) => person(p, i + 1)).join("")}</ul>` },
        { id: "scientific", label: "Scientific committee", html: `${notice("The International Scientific Committee will be announced soon.")}<p class="prose">The committee brings together leading researchers on the fatigue of metals from Europe, the Americas and Asia, and is responsible for the peer review of abstracts and papers.</p>` },
      ])}` },

    { id: "submission", label: "Submissions", icon: "upload", title: "Abstract and paper submission", blurb: "How to submit and publish", tabs: true, render: () => `
      ${head("Call for papers", "Submissions")}
      ${tabs("submission", [
        { id: "abstract", label: "Abstract", html: `
          ${notice(`The call for abstracts opens on ${t("2026-12-01")}. The official abstract and paper templates (Word and LaTeX) will be available here from that date.`)}
          <ol class="steps">
            <li><strong>Prepare</strong> a one-page abstract in English using the official template.</li>
            <li><strong>Export</strong> it as PDF and name the file <code>ICMFM22_Surname_Abstract.pdf</code>.</li>
            <li><strong>Send</strong> it to <a href="${mailto("Abstract ICMFM XXII")}">${esc(CONF.email)}</a> with the subject “Abstract ICMFM XXII” by ${t("2027-02-28")}.</li>
            <li><strong>Receive</strong> a confirmation of receipt and, by ${t("2027-03-31")}, the notification of acceptance.</li>
          </ol>
          <div class="btn-row"><a class="btn btn-primary" href="${mailto("Abstract ICMFM XXII")}">${icon("mail")}Email your abstract</a></div>` },
        { id: "paper", label: "Full paper (optional)", html: `
          <p class="prose">Authors of accepted abstracts may submit a full paper of up to 8 pages using the official paper template.</p>
          <ol class="steps">
            <li>Prepare your manuscript with the paper template (8-page limit).</li>
            <li>Send it as PDF to <a href="${mailto("Paper ICMFM XXII")}">${esc(CONF.email)}</a> with the subject “Paper ICMFM XXII”.</li>
            <li>Deadline: ${t("2027-05-31")}. Papers are peer reviewed by the Scientific Committee.</li>
          </ol>` },
        { id: "publication", label: "Publication", html: `
          <div class="grid grid-2">
            <div class="card"><span class="card-ico">${icon("book")}</span><h2 class="h3">Proceedings</h2><p>Accepted and reviewed papers will be published in an open-access proceedings volume. The publisher will be announced.</p></div>
            <div class="card"><span class="card-ico">${icon("globe")}</span><h2 class="h3">Journal special issues</h2><p>Authors of selected papers will be invited to submit extended versions to special issues of indexed international journals on fatigue, fracture and structural integrity.</p></div>
          </div>` },
      ])}` },

    { id: "registration", label: "Registration", icon: "ticket", title: "Registration", blurb: "Fees and what is included", render: () => `
      ${head("Registration", "Registration")}
      ${notice(`Online registration opens on ${t("2027-02-01")}. Fees will be published here before then. The early-bird rate applies until ${t("2027-05-15")}.`)}
      <div class="grid grid-3">
        <div class="card"><h2 class="h3">Participant</h2><p>Full access to the scientific and social programme.</p><p class="muted">Early bird and regular fees to be announced.</p></div>
        <div class="card"><h2 class="h3">Student</h2><p>Reduced fee for registered students. Proof of student status is required.</p><p class="muted">Fee to be announced.</p></div>
        <div class="card"><h2 class="h3">Accompanying person</h2><p>Welcome reception, conference dinner and social programme.</p><p class="muted">Fee to be announced.</p></div>
      </div>
      <div class="grid grid-2 section">
        <div class="card"><h2 class="h3">The participant fee includes</h2><ul><li>Access to all sessions</li><li>Conference materials and proceedings</li><li>Coffee breaks and lunches</li><li>Welcome reception and conference dinner</li></ul></div>
        <div class="card"><h2 class="h3">Need an invoice or a visa letter?</h2><p>The secretariat can help with invoices, institutional payments and invitation letters.</p><a class="btn btn-soft" href="${mailto(CONF.short + " – Registration enquiry")}">${icon("mail")}Contact the secretariat</a></div>
      </div>` },

    { id: "venue", label: "Venue", icon: "pin", title: "Venue", blurb: "Universidad Laboral, Gijón", render: () => `
      ${head("Venue", "Gijón, Asturias", "Gijón, a city of about 270,000 people, lies on the Cantabrian coast of northern Spain.")}
      <div class="grid grid-2">
        <div class="prose">
          <p>The colloquium, organised by the Polytechnic School of Engineering of Gijón (University of Oviedo), takes place at the <strong>${esc(CONF.venue)}</strong>. Built in the mid-20th century, this monumental complex is today a hub of culture, research and education.</p>
          <p>The city has three large sandy beaches and a marina in the centre, next to the historic fishermen's quarter of Cimadevilla, with its Roman baths. There is also an archaeological nature park and much more to explore.</p>
          <p>Almost a third of Asturias is protected natural space, with mountains rising above 2,500 m, a rugged coastline and picturesque fishing villages.</p>
          <figure class="photo"><img src="${PHOTOS.laboral.small}" width="800" height="342" alt="${esc(PHOTOS.laboral.alt)}" loading="lazy" decoding="async"><figcaption class="credit">${credit(PHOTOS.laboral, " (cropped)")}</figcaption></figure>
        </div>
        <div>
          <div class="map-box" id="mapBox">
            <div>
              <p>The interactive map is provided by OpenStreetMap and loads only when you ask for it.</p>
              <button class="btn btn-soft" type="button" id="loadMap">${icon("pin")}Show interactive map</button>
            </div>
          </div>
          <p class="muted" style="font-size:.88rem;margin-top:8px">Universidad Laboral, Calle Luis Moya Blanco 261, 33203 Gijón · ${ext(CONF.mapLink, "Open in OpenStreetMap")}</p>
        </div>
      </div>` },

    { id: "travel", label: "Getting there", icon: "plane", title: "Getting to Gijón", blurb: "Plane, train, bus and ferry", render: () => `
      ${head("Travel", "Getting to Gijón")}
      ${banner(PHOTOS.cimadevilla)}
      <div class="grid grid-2">
        <div class="card"><span class="card-ico">${icon("plane")}</span><h2 class="h3">By plane</h2><p><strong>Asturias Airport (OVD)</strong> is about 40 km from Gijón, with daily flights to Madrid and Barcelona and connections to other Spanish and European cities; check current routes at ${ext("https://www.aena.es/en/asturias.html", "aena.es")}. ALSA buses link the airport with Gijón bus station in about 45 minutes.</p><p>Alternative airports: Santander (≈ 190 km), Bilbao (≈ 300 km), A Coruña (≈ 290 km) and Santiago de Compostela (≈ 330 km), all connected to Gijón by bus.</p></div>
        <div class="card"><span class="card-ico">${icon("train")}</span><h2 class="h3">By train</h2><p>High-speed services connect Madrid with Gijón in about 4 h 30 min. Timetables and tickets at ${ext("https://www.renfe.com", "renfe.com")}.</p></div>
        <div class="card"><span class="card-ico">${icon("bus")}</span><h2 class="h3">By bus</h2><p>ALSA runs direct coaches to Gijón from Madrid, Bilbao, Santander, A Coruña, Santiago and many other cities: ${ext("https://www.alsa.com", "alsa.com")}.</p><p>Within Gijón, several EMTUSA city bus lines stop at the Universidad Laboral: ${ext("https://www.emtusagijon.es", "emtusagijon.es")}.</p></div>
        <div class="card"><span class="card-ico">${icon("ship")}</span><h2 class="h3">By ferry</h2><p>From the UK, ferries sail from Portsmouth and Plymouth to Santander, about two hours by road from Gijón.</p></div>
      </div>` },

    { id: "accommodation", label: "Accommodation", icon: "bed", title: "Accommodation", blurb: "Where to stay in Gijón", render: () => `
      ${head("Stay", "Accommodation", "September is still high season on the coast, so we recommend booking early. Any preferential rates agreed with hotels will be announced here.")}
      <ul class="people">
        ${HOTELS.map(([n, d], i) => `<li class="person"><span class="avatar" style="--c1:${palette[i % 4][0]};--c2:${palette[i % 4][1]}" aria-hidden="true">${icon("bed")}</span><span class="person-body"><span class="person-name">${esc(n)}</span><span class="person-aff">${esc(d)}</span>${ext(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n + ", Gijón, Spain")}`, "Find on Google Maps", ` ${esc(n)}`)}</span></li>`).join("")}
      </ul>
      <p class="muted section" style="font-size:.88rem">The list is for guidance only and is not an endorsement. More options: ${ext("https://www.gijon.info/en", "Gijón tourist office")}.</p>` },

    { id: "contact", label: "Contact", icon: "mail", title: "Contact", blurb: "Conference secretariat", render: () => `
      ${head("Get in touch", "Contact")}
      <div class="grid grid-2">
        <div class="card">
          <h2 class="h3">Conference secretariat</h2>
          <p class="copy"><a href="mailto:${CONF.email}">${esc(CONF.email)}</a><button class="copy-btn" type="button" data-copy="${esc(CONF.email)}">Copy address</button></p>
          <p class="visually-hidden" role="status" id="copyStatus"></p>
          <p class="muted" style="margin-bottom:4px;font-size:.88rem">Postal address</p>
          <address style="font-style:normal">${CONF.address.map(esc).join("<br>")}</address>
        </div>
        <div class="card">
          <h2 class="h3">Quick links</h2>
          <ul>
            <li><a href="${mailto("Abstract ICMFM XXII")}">Send an abstract</a></li>
            <li><a href="${mailto(CONF.short + " – Special session proposal")}">Propose a special session</a></li>
            <li><a href="${mailto(CONF.short + " – Sponsorship")}">Sponsorship and exhibition</a></li>
            <li><a href="#/legal">Legal notice and privacy</a></li>
          </ul>
        </div>
      </div>
      <p class="footer-note">${esc(CONF.name)} · 8–10 September 2027 · Gijón, Spain. Organised by the University of Oviedo.</p>` },
  ];

  const EXTRA = {
    legal: { id: "legal", label: "Legal notice & privacy", title: "Legal notice and privacy", render: () => `
      ${head("Legal", "Legal notice and privacy")}
      <div class="prose">
        <h2 class="h3">Website owner</h2>
        <p>In accordance with Spanish Law 34/2002 (LSSI-CE), this website is published on behalf of the organising committee of ${esc(CONF.short)} by the University of Oviedo (Universidad de Oviedo), tax ID (CIF) ${esc(CONF.cif)}, Calle San Francisco 3, 33003 Oviedo, Spain. Contact: <a href="mailto:${CONF.email}">${esc(CONF.email)}</a>.</p>
        <h2 class="h3">Data protection</h2>
        <ul>
          <li><strong>Controller:</strong> University of Oviedo, through the ${esc(CONF.short)} organising committee. The University's Data Protection Officer can be contacted through the details published at ${ext("https://www.uniovi.es", "uniovi.es")}.</li>
          <li><strong>Purpose:</strong> managing abstract and paper submissions, registrations and enquiries sent by email, and publishing the programme and proceedings.</li>
          <li><strong>Legal basis:</strong> your consent and the performance of your registration (art. 6.1.a and 6.1.b GDPR); the University's public-interest mission in research dissemination (art. 6.1.e GDPR).</li>
          <li><strong>Recipients:</strong> the Scientific Committee (for peer review) and, for accepted papers, the proceedings publisher. No data is sold or used for marketing.</li>
          <li><strong>Retention:</strong> for the duration of the colloquium and as long as needed to meet legal and accounting obligations; published papers remain in the proceedings.</li>
          <li><strong>Your rights:</strong> access, rectification, erasure, restriction, portability and objection, by writing to the secretariat. You may also lodge a complaint with the Spanish Data Protection Agency (${ext("https://www.aepd.es", "AEPD")}).</li>
        </ul>
        <h2 class="h3">This website</h2>
        <p>The site uses no cookies, analytics or tracking. Fonts and images are served from the site itself, and your light or dark theme choice is stored only in your own browser.</p>
        <p>The site is hosted on GitHub Pages (GitHub, Inc., USA), which processes visitors' IP addresses in its server logs for security purposes, under GitHub's privacy statement and the EU–US Data Privacy Framework. The interactive map (OpenStreetMap) and the hotel links (Google Maps) only contact those services if you click them.</p>
        <h2 class="h3">Image credits</h2>
        <ul>
          <li>Universidad Laboral de Gijón: ${credit(PHOTOS.laboral)}, cropped and toned. ${ext(PHOTOS.laboral.license, "Licence CC BY 2.0")}</li>
          <li>Cimadevilla, Gijón: ${credit(PHOTOS.cimadevilla)}, cropped. ${ext(PHOTOS.cimadevilla.license, "Licence CC BY-SA 3.0")}</li>
          <li>Social preview image (og-card.jpg): derived from “Cimadevilla” by FDV, CC BY-SA 3.0; the derivative is likewise offered under ${ext(PHOTOS.cimadevilla.license, "CC BY-SA 3.0")}.</li>
          <li>Map data © OpenStreetMap contributors, ${ext("https://opendatacommons.org/licenses/odbl/", "ODbL")}.</li>
        </ul>
      </div>` },
    notfound: { id: "notfound", label: "Not found", title: "Window not found", render: () => `
      ${head("404", "This window does not exist", "The address you followed does not match any page of the colloquium website.")}
      <div class="btn-row"><a class="btn btn-primary" href="#/home">${icon("home")}Go to the home page</a><a class="btn btn-soft" href="#/contact">${icon("mail")}Contact the secretariat</a></div>` },
  };

  /* ---------------- DOM refs ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const root = document.documentElement;
  const view = $("#view");
  const sidenav = $("#sidenav");
  const menuBtn = $("#menuToggle");
  const menuClose = $("#menuClose");
  const scrim = $("#scrim");
  const themeBtn = $("#themeToggle");
  const mqMobile = matchMedia("(max-width: 960px)");
  const outside = [$(".topbar"), $("#main"), $("#skipLink")];
  let countdownTimer = null;

  /* ---------------- Drawer (modal on mobile) ---------------- */
  const isOpen = () => sidenav.classList.contains("is-open");
  const setDrawer = (open, returnFocus = false) => {
    if (!mqMobile.matches) open = false;
    sidenav.classList.toggle("is-open", open);
    scrim.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    outside.forEach((el) => { el.inert = open; });
    if (open) {
      sidenav.setAttribute("role", "dialog");
      sidenav.setAttribute("aria-modal", "true");
      sidenav.setAttribute("aria-label", "Menu");
      (sidenav.querySelector('[aria-current="page"]') || sidenav.querySelector("a")).focus();
    } else {
      sidenav.removeAttribute("role");
      sidenav.removeAttribute("aria-modal");
      sidenav.setAttribute("aria-label", "Main");
      if (returnFocus) menuBtn.focus();
    }
  };
  menuBtn.addEventListener("click", () => setDrawer(!isOpen()));
  menuClose.addEventListener("click", () => setDrawer(false, true));
  scrim.addEventListener("click", () => setDrawer(false, true));
  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") { setDrawer(false, true); return; }
    if (e.key === "Tab") {
      const f = [...sidenav.querySelectorAll("a, button")].filter((el) => el.offsetParent !== null);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  mqMobile.addEventListener("change", () => setDrawer(false));

  /* ---------------- Theme ---------------- */
  const applyTheme = (th) => {
    root.dataset.theme = th;
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.content = th === "dark" ? "#070f1c" : "#f5f8fc"; m.removeAttribute("media"); });
    themeBtn.setAttribute("aria-pressed", String(th === "dark"));
  };
  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
  themeBtn.addEventListener("click", () => {
    const th = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(th);
    try { localStorage.setItem("icmfm-theme", th); } catch { /* storage unavailable */ }
  });

  /* ---------------- Skip link ---------------- */
  $("#skipLink").addEventListener("click", (e) => {
    e.preventDefault();
    (view.querySelector("h1") || $("#main")).focus();
  });

  /* ---------------- Behaviours ---------------- */
  const startCountdown = () => {
    const el = $("#countdown");
    clearInterval(countdownTimer);
    if (!el) return;
    const start = new Date(CONF.start).getTime();
    const end = new Date(CONF.end).getTime();
    const tick = () => {
      const now = Date.now();
      if (now >= end) { el.innerHTML = '<div class="cd-msg">Thank you for joining ICMFM XXII in Gijón.</div>'; clearInterval(countdownTimer); return; }
      if (now >= start) { el.innerHTML = '<div class="cd-msg">Happening now at the Universidad Laboral.</div>'; return; }
      let s = Math.floor((start - now) / 1000);
      const d = Math.floor(s / 86400); s %= 86400;
      const h = Math.floor(s / 3600); s %= 3600;
      const m = Math.floor(s / 60);
      el.innerHTML = `<p class="visually-hidden">Time left until the colloquium opens:</p>` + [[d, "days"], [h, "hours"], [m, "minutes"]].map(([n, l]) => `<div><b>${n}</b><small>${l}</small></div>`).join("");
    };
    tick();
    countdownTimer = setInterval(tick, 30000);
  };

  let selectTab = null; // set by wireTabs for the current window
  const wireTabs = (vId, initial) => {
    selectTab = null;
    const list = view.querySelector('[role="tablist"]');
    if (!list) return;
    const tabsEls = [...list.querySelectorAll('[role="tab"]')];
    const select = (tab, { focus = false, push = true } = {}) => {
      tabsEls.forEach((x) => {
        const on = x === tab;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
      if (push) {
        const hash = tab === tabsEls[0] ? `#/${vId}` : `#/${vId}/${tab.dataset.tab}`;
        if (location.hash !== hash) history.replaceState(null, "", hash);
      }
    };
    list.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab) select(tab);
    });
    list.addEventListener("keydown", (e) => {
      const i = tabsEls.indexOf(document.activeElement);
      const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabsEls.length - 1 };
      if (i >= 0 && e.key in map) { e.preventDefault(); select(tabsEls[(map[e.key] + tabsEls.length) % tabsEls.length], { focus: true }); }
    });
    selectTab = (id) => select(tabsEls.find((x) => x.dataset.tab === id) || tabsEls[0], { push: false });
    selectTab(initial);
  };

  const wireExtras = () => {
    view.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
      const status = $("#copyStatus");
      status.textContent = "";
      let msg;
      try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Copied!"; msg = "Email address copied to the clipboard."; }
      catch { b.textContent = "Copy failed"; msg = "Could not copy the email address. Please select it manually."; }
      setTimeout(() => { status.textContent = msg; }, 50);
      setTimeout(() => { b.textContent = "Copy address"; }, 2500);
    }));
    const loadMap = $("#loadMap");
    if (loadMap) loadMap.addEventListener("click", () => {
      const box = $("#mapBox");
      box.innerHTML = `<iframe title="Map showing the location of the Universidad Laboral de Gijón" src="${CONF.mapEmbed}" referrerpolicy="no-referrer"></iframe>`;
      box.querySelector("iframe").focus();
    });
  };

  /* ---------------- Router ---------------- */
  const parse = () => {
    const h = location.hash;
    if (!h || h === "#" || h === "#/") return { id: "home" };
    const m = h.match(/^#\/([\w-]+)(?:\/([\w-]+))?\/?$/);
    return m ? { id: m[1], sub: m[2] } : null;
  };

  const winBar = (v, idx) => {
    const prev = VIEWS[idx - 1];
    const next = VIEWS[idx + 1];
    const navLink = (target, dir) => target
      ? `<a href="#/${target.id}" rel="${dir}" aria-label="${dir === "prev" ? "Previous" : "Next"}: ${esc(target.label)}">${dir === "prev" ? icon("arrowL") : ""}<span class="lbl" aria-hidden="true">${esc(target.label)}</span>${dir === "next" ? icon("arrowR") : ""}</a>`
      : "";
    const counter = idx >= 0 ? `<span class="win-index" aria-hidden="true">${String(idx + 1).padStart(2, "0")} / ${String(VIEWS.length).padStart(2, "0")}</span>` : "";
    const progress = idx >= 0 ? `<span class="win-progress" aria-hidden="true"><span style="width:${((idx + 1) / VIEWS.length) * 100}%"></span></span>` : "";
    return `<div class="win-bar">${counter}<div class="win-crumb"><b>${esc(v.label)}</b></div>${progress}
      ${idx >= 0 ? `<nav class="win-nav" aria-label="Previous and next page">${navLink(prev, "prev")}${navLink(next, "next")}</nav>` : ""}</div>`;
  };

  let current = null;
  const render = (focus) => {
    let r = parse();
    if (!r) {
      if (current) return; // in-page anchor while a window is open
      history.replaceState(null, "", "#/home"); // first load with a non-route hash
      r = { id: "home" };
    }
    const idx = VIEWS.findIndex((v) => v.id === r.id);
    const v = idx >= 0 ? VIEWS[idx] : (EXTRA[r.id] || EXTRA.notfound);
    if (current === v.id && v.tabs) { // same window, only the tab changed
      if (selectTab) selectTab(r.sub);
      return;
    }
    current = v.id;

    view.innerHTML = `${winBar(v, idx)}<div class="win-body" id="winBody">${v.render()}</div>`;
    view.classList.remove("is-entering"); void view.offsetWidth; view.classList.add("is-entering");
    document.title = `${v.id === "home" ? "" : v.title + " · "}${CONF.short} · Gijón 2027`;
    sidenav.querySelectorAll(".nav-link").forEach((a) => (a.dataset.id === v.id ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));

    if (v.id === "home") startCountdown(); else clearInterval(countdownTimer);
    wireTabs(v.id, r.sub);
    wireExtras();
    if (isOpen()) setDrawer(false);
    if (focus) view.querySelector("h1")?.focus({ preventScroll: true });
  };

  window.addEventListener("hashchange", () => render(true));
  render(false);
})();
