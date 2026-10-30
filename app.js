/* ICMFM XXII · Gijón 2027 — single-page app with one "window" per section (no build step). */
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
    address: ["ICMFM XXII Secretariat", "Department of Construction and Manufacturing Engineering", "Polytechnic School of Engineering of Gijón, University of Oviedo", "Campus de Viesques, 33203 Gijón, Asturias, Spain"],
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
    { iso: "2027-02-28", label: "Abstract submission deadline", key: true },
    { iso: "2027-03-31", label: "Notification of abstract acceptance", key: true },
    { iso: "2027-05-15", label: "Early-bird registration deadline", key: true },
    { iso: "2027-05-31", label: "Full paper submission (optional)", key: true },
    { iso: "2027-07-15", label: "Final programme published" },
    { iso: "2027-09-08", end: "2027-09-10", label: "ICMFM XXII Colloquium in Gijón", main: true, key: true },
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
    { name: "Stanislav Seitl", aff: "Institute of Physics of Materials, Czech Academy of Sciences, Czech Republic" },
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
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    plane: '<path d="M2 16.5 22 9l-3-2-7 2.5L6 5 4 6l4 5-4 1.5-2-1.5-1 1 3 3Z"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/>',
    bus: '<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M8 21v-3M16 21v-3"/>',
    ship: '<path d="M3 17l2 3h14l2-3-9-3Z"/><path d="M12 3v11M7 8h10l-1 5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19V5"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>',
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  };
  const icon = (n) => `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">${I[n]}</svg>`;

  /* ---------------- Helpers ---------------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const day = (iso) => new Date(iso + "T12:00:00");
  const fmt = (iso, opts = { day: "numeric", month: "long", year: "numeric" }) => day(iso).toLocaleDateString("en-GB", opts);
  const t = (iso, text) => `<time datetime="${iso}">${text || fmt(iso)}</time>`;
  const tRange = (a, b) => `${t(a, String(day(a).getDate()))}–${t(b)}`;
  const mailto = (subject) => `mailto:${CONF.email}?subject=${encodeURIComponent(subject)}`;
  const ext = (href, text, srText = "") => `<a href="${href}" target="_blank" rel="noopener">${text}<span class="visually-hidden">${srText} (opens in a new tab)</span></a>`;
  const credit = (p, note = "") => `<a href="${p.page}" target="_blank" rel="noopener">${esc(p.credit)}${note}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
  const notice = (html) => `<div class="notice" role="note">${icon("alert")}<div>${html}</div></div>`;
  const pageHead = (title, lead) => `<div class="page-head"><h1 class="page-title" tabindex="-1">${title}</h1>${lead ? `<p class="page-lead">${lead}</p>` : ""}</div>`;
  const cardHead = (ic, title, tag = "h2") => `<div class="card-head"><span class="ico">${icon(ic)}</span><${tag} class="h3">${title}</${tag}></div>`;
  const people = (list, cls = "") => `<ul class="committee ${cls}">${list.map((p) => `<li><span class="p-name">${esc(p.name)}</span><span class="p-aff">${esc(p.aff)}</span></li>`).join("")}</ul>`;

  /* Madrid offset for a date: CEST from the last Sunday of March to the last Sunday of October, CET otherwise. */
  const lastSunday = (y, m) => { const d = new Date(Date.UTC(y, m, 0)); return d.getUTCDate() - d.getUTCDay(); };
  const madridOffset = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    const summer = (m > 3 && m < 10) || (m === 3 && d >= lastSunday(y, 3)) || (m === 10 && d < lastSunday(y, 10));
    return summer ? "+02:00" : "+01:00";
  };
  const deadline = (iso) => new Date(`${iso}T23:59:59${madridOffset(iso)}`);

  const timelineState = () => {
    const now = new Date();
    let nextFound = false;
    return DATES.map((d) => {
      const past = deadline(d.end || d.iso) < now;
      let next = false;
      if (!past && !nextFound) { next = true; nextFound = true; }
      return { ...d, past, next };
    });
  };

  const tabs = (viewId, label, items) => `
    <div class="tabs" role="tablist" aria-label="${esc(label)}">
      ${items.map((x) => `<button role="tab" type="button" id="tab-${viewId}-${x.id}" data-tab="${x.id}" aria-controls="panel-${viewId}-${x.id}" aria-selected="false" tabindex="-1">${esc(x.label)}</button>`).join("")}
    </div>
    ${items.map((x) => `<div role="tabpanel" id="panel-${viewId}-${x.id}" aria-labelledby="tab-${viewId}-${x.id}" tabindex="0" hidden>${x.html}</div>`).join("")}`;

  /* ---------------- Views (one window each, same order as the top menu) ---------------- */
  const VIEWS = [
    { id: "home", label: "Welcome", title: "Welcome", render: () => {
      const p = PHOTOS.cimadevilla;
      const st = timelineState();
      return `
      <h1 class="visually-hidden" tabindex="-1">Welcome to ICMFM XXII</h1>
      <figure class="hero">
        <img src="${p.src}" srcset="${p.small} 800w, ${p.src} 1600w" sizes="(max-width: 1150px) 100vw, 1120px" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" fetchpriority="high">
        <div class="hero-bar">
          <div>
            <p class="cd-label" id="cdLabel">The colloquium opens in</p>
            <div class="countdown" id="countdown" role="group" aria-labelledby="cdLabel"></div>
          </div>
          <div class="btn-row">
            <a class="btn btn-light" href="#/submissions/abstract">${icon("upload")}Submit an abstract</a>
            <a class="btn btn-light" href="#/dates">${icon("calendar")}Important dates</a>
          </div>
        </div>
        <figcaption class="hero-credit">${credit(p, " (cropped)")}</figcaption>
      </figure>

      <div class="card home-grid">
        <div class="home-main">
          <section aria-labelledby="h-welcome">
            <h2 id="h-welcome">Welcome</h2>
            <div class="prose">
              <p>Fatigue damage is one of the most important types of damage affecting structural materials in industrial service, and it can end in sudden, unexpected fracture. Since metal alloys remain the materials of choice for the most heavily loaded components and structures, every aspect of fatigue keeps the attention of scientists, engineers and designers.</p>
              <p>The <strong>${esc(CONF.name)}</strong> encourages the exchange of knowledge and experience between the communities working on basic and applied research on the fatigue of metals, from microscopic, analytical, simulation and application points of view.</p>
              <p>Eleven years after ICMFM XVIII, the colloquium returns to Gijón, on the Cantabrian coast of northern Spain, from <strong>${tRange("2027-09-08", "2027-09-10")}</strong>, at the monumental ${esc(CONF.venue)}.</p>
            </div>
          </section>
          <section aria-labelledby="h-topics">
            <h2 id="h-topics">Topics of the conference</h2>
            <p>Contributions are welcome on, but not limited to, the following topics:</p>
            <ul class="topics">${TOPICS.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
          </section>
          <section aria-labelledby="h-proc">
            <h2 id="h-proc">Proceedings and journal publication</h2>
            <p>Accepted and reviewed papers will be published in an open-access proceedings volume. Authors of selected papers will be invited to submit extended versions to special issues of indexed international journals on fatigue, fracture and structural integrity. <a href="#/submissions/publication">More about publication</a>.</p>
          </section>
        </div>
        <aside class="aside" aria-label="Key information">
          <section aria-labelledby="h-kd">
            <h2 id="h-kd">Important dates</h2>
            <ul class="mini-dates">
              ${st.filter((d) => d.key).map((d) => `<li class="${d.past ? "is-past" : ""} ${d.next ? "is-next" : ""}">${d.end ? tRange(d.iso, d.end) : t(d.iso)}${d.next ? ' <span class="badge badge-next">Next</span>' : ""}${d.past ? '<span class="visually-hidden"> (closed)</span>' : ""}<span>${esc(d.label)}</span></li>`).join("")}
            </ul>
            <a href="#/dates">All dates</a>
          </section>
          <section aria-labelledby="h-cu">
            <h2 id="h-cu">Contact us</h2>
            <p>Conference Secretariat<br><a href="mailto:${CONF.email}">${esc(CONF.email)}</a></p>
            <p class="small muted">Polytechnic School of Engineering of Gijón, Campus de Viesques, 33203 Gijón (Spain)</p>
          </section>
          <section aria-labelledby="h-lang">
            <h2 id="h-lang">Conference language</h2>
            <p>The official language of the colloquium is English. All abstracts, papers, presentations and posters must be in English.</p>
          </section>
        </aside>
      </div>`;
    } },

    { id: "organization", label: "Organization", title: "Organization", tabs: true, render: () => `
      ${pageHead("Organization")}
      ${tabs("organization", "Organization sections", [
        { id: "committees", label: "Committees", html: `
          <div class="grid grid-2">
            <div class="card">
              <h2 class="card-title">Organizing Committee</h2>
              <p class="role-label">Chairs</p>
              ${people(CHAIRS, "one")}
              <p class="role-label">International collaborators</p>
              ${people(COLLABORATORS, "one")}
            </div>
            <div class="card">
              <h2 class="card-title">Scientific Committee</h2>
              ${notice("The International Scientific Committee will be announced soon.")}
              <p>The committee brings together leading researchers on the fatigue of metals from Europe, the Americas and Asia, and is responsible for the peer review of abstracts and papers.</p>
            </div>
          </div>` },
        { id: "history", label: "History of the colloquium", html: `
          <div class="card">
            <h2 class="card-title">A colloquium with history</h2>
            <p class="prose">A founding colloquium on the mechanical fatigue of metals was held in Brno in 1968. It was followed by the numbered series: twelve colloquia held every two years from 1972 until 1994 (XII, Miskolc, Hungary). After a twelve-year break the series restarted in 2006 and opened to participants from every country interested in the fatigue of metallic materials. In 2027 it returns to Gijón, eleven years after ICMFM XVIII.</p>
            <ul class="history">
              ${HISTORY.map(([n, y, pl, cur]) => `<li${cur ? ' class="is-current"' : ""}><b>${n} · ${y}</b><span>${esc(pl)}${cur ? " · this edition" : ""}</span></li>`).join("")}
            </ul>
          </div>` },
      ])}` },

    { id: "dates", label: "Important dates", title: "Important dates", render: () => `
      ${pageHead("Important dates", "All deadlines close at 23:59 Madrid time (CET in winter, CEST in summer) on the date shown.")}
      <div class="card">
        <ol class="timeline">
          ${timelineState().map((d) => `<li class="${d.main ? "is-main" : ""} ${d.past ? "is-past" : ""} ${d.next ? "is-next" : ""}">
            <span class="tl-date">${d.end ? tRange(d.iso, d.end) : t(d.iso, fmt(d.iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))}</span>
            <span class="tl-label">${esc(d.label)}</span>${d.next ? '<span class="badge badge-next">Next</span>' : ""}${d.past ? '<span class="badge badge-past">Closed</span>' : ""}
          </li>`).join("")}
        </ol>
        <div class="btn-row"><a class="btn btn-soft" href="assets/icmfm-xxii-dates.ics" download>${icon("download")}Add the colloquium to your calendar (.ics)</a></div>
      </div>` },

    { id: "programme", label: "Programme", title: "Programme", tabs: true, render: () => `
      ${pageHead("Programme")}
      ${tabs("programme", "Programme sections", [
        { id: "overview", label: "Overview", html: `
          <div class="card">
            ${notice(`The detailed schedule will be published by ${t("2027-07-15")}.`)}
            <div class="table-wrap" role="region" aria-labelledby="sched-cap" tabindex="0"><table><caption id="sched-cap" class="visually-hidden">Tentative outline of the three days</caption><thead><tr><th scope="col">Day</th><th scope="col">Outline (tentative)</th></tr></thead><tbody>
            <tr><th scope="row">${t("2027-09-08", "Wed 8 Sep")}</th><td>Registration · Opening · Plenary lecture · Technical sessions · Welcome reception</td></tr>
            <tr><th scope="row">${t("2027-09-09", "Thu 9 Sep")}</th><td>Plenary lecture · Technical and special sessions · Posters · Conference dinner</td></tr>
            <tr><th scope="row">${t("2027-09-10", "Fri 10 Sep")}</th><td>Plenary lecture · Technical sessions · Closing ceremony</td></tr>
            </tbody></table></div>
          </div>` },
        { id: "plenary", label: "Plenary lectures", html: `
          <div class="card">${notice("Plenary speakers will be announced in spring 2027.")}<p class="prose">Each day of the colloquium opens with a plenary lecture by an internationally recognised expert in the fatigue of metals.</p></div>` },
        { id: "special", label: "Special sessions", html: `
          <div class="card prose">
            <p>Proposals for special sessions on emerging or focused topics are welcome. A proposal should include a title, a short description (max. 300 words) and the names and affiliations of the organisers.</p>
            <p>Deadline for proposals: <strong>${t("2027-01-31")}</strong>.</p>
            <a class="btn btn-soft" href="${mailto(CONF.short + " – Special session proposal")}">${icon("mail")}Propose a special session</a>
          </div>` },
      ])}` },

    { id: "submissions", label: "Registration & submissions", title: "Registration and submissions", tabs: true, render: () => `
      ${pageHead("Registration &amp; submissions")}
      ${tabs("submissions", "Registration and submission sections", [
        { id: "registration", label: "Registration", html: `
          <div class="card">
            ${notice(`Online registration opens on ${t("2027-02-01")}. Fees will be published here before then. The early-bird rate applies until ${t("2027-05-15")}.`)}
            <div class="table-wrap" role="region" aria-labelledby="fees-cap" tabindex="0"><table><caption id="fees-cap" class="visually-hidden">Registration fees</caption>
              <thead><tr><th scope="col">Category</th><th scope="col">Early bird*</th><th scope="col">Regular</th><th scope="col">Includes</th></tr></thead><tbody>
              <tr><th scope="row">Participant</th><td>TBA</td><td>TBA</td><td>All sessions, proceedings, coffee breaks, lunches, welcome reception and conference dinner</td></tr>
              <tr><th scope="row">Student**</th><td>TBA</td><td>TBA</td><td>As participant</td></tr>
              <tr><th scope="row">Accompanying person</th><td>TBA</td><td>TBA</td><td>Welcome reception, conference dinner and social programme</td></tr>
            </tbody></table></div>
            <p class="small muted" style="margin-top:10px">* Until ${t("2027-05-15")}. ** Proof of student status required. TBA: to be announced.</p>
            <p>Need an invoice, an institutional payment or an invitation letter for your visa? <a href="${mailto(CONF.short + " – Registration enquiry")}">Contact the secretariat</a>.</p>
          </div>` },
        { id: "abstract", label: "Abstract submission", html: `
          <div class="card">
            ${notice(`The call for abstracts opens on ${t("2026-12-01")}. The official abstract and paper templates (Word and LaTeX) will be available here from that date.`)}
            <ol class="steps">
              <li><strong>Prepare</strong> a one-page abstract in English using the official template.</li>
              <li><strong>Export</strong> it as PDF and name the file <code>ICMFM22_Surname_Abstract.pdf</code>.</li>
              <li><strong>Send</strong> it to <a href="${mailto("Abstract ICMFM XXII")}">${esc(CONF.email)}</a> with the subject “Abstract ICMFM XXII” by ${t("2027-02-28")}.</li>
              <li><strong>Receive</strong> a confirmation of receipt and, by ${t("2027-03-31")}, the notification of acceptance.</li>
            </ol>
            <div class="btn-row"><a class="btn btn-primary" href="${mailto("Abstract ICMFM XXII")}">${icon("mail")}Email your abstract</a></div>
          </div>` },
        { id: "paper", label: "Full paper (optional)", html: `
          <div class="card">
            <p class="prose">Authors of accepted abstracts may submit a full paper of up to 8 pages using the official paper template.</p>
            <ol class="steps">
              <li>Prepare your manuscript with the paper template (8-page limit).</li>
              <li>Send it as PDF to <a href="${mailto("Paper ICMFM XXII")}">${esc(CONF.email)}</a> with the subject “Paper ICMFM XXII”.</li>
              <li>Deadline: ${t("2027-05-31")}. Papers are peer reviewed by the Scientific Committee.</li>
            </ol>
          </div>` },
        { id: "publication", label: "Publication", html: `
          <div class="grid grid-2">
            <div class="card">${cardHead("book", "Proceedings")}<p>Accepted and reviewed papers will be published in an open-access proceedings volume. The publisher will be announced.</p></div>
            <div class="card">${cardHead("globe", "Journal publication of selected papers")}<p>Authors of selected papers will be invited to submit extended versions to special issues of indexed international journals on fatigue, fracture and structural integrity.</p></div>
          </div>` },
      ])}` },

    { id: "venue", label: "Venue", title: "Venue", tabs: true, render: () => `
      ${pageHead("Venue")}
      ${tabs("venue", "Venue sections", [
        { id: "gijon", label: "Gijón and the venue", html: `
          <div class="grid grid-2">
            <div class="card prose">
              <h2 class="card-title">Gijón, Asturias</h2>
              <p>Gijón, a city of about 270,000 people, lies on the Cantabrian coast of northern Spain. The colloquium, organised by the Polytechnic School of Engineering of Gijón (University of Oviedo), takes place at the <strong>${esc(CONF.venue)}</strong>. Built in the mid-20th century, this monumental complex is today a hub of culture, research and education.</p>
              <p>The city has three large sandy beaches and a marina in the centre, next to the historic fishermen's quarter of Cimadevilla, with its Roman baths. Almost a third of Asturias is protected natural space, with mountains rising above 2,500 m, a rugged coastline and picturesque fishing villages.</p>
              <figure class="photo"><img src="${PHOTOS.laboral.small}" width="800" height="342" alt="${esc(PHOTOS.laboral.alt)}" loading="lazy" decoding="async"><figcaption>${credit(PHOTOS.laboral, " (cropped)")}</figcaption></figure>
            </div>
            <div class="card">
              <h2 class="card-title">Location</h2>
              <div class="map-box" id="mapBox">
                <div>
                  <p>The interactive map is provided by OpenStreetMap and loads only when you ask for it.</p>
                  <button class="btn btn-soft" type="button" id="loadMap">${icon("pin")}Show interactive map</button>
                </div>
              </div>
              <p class="small muted" style="margin-top:10px">Universidad Laboral, Calle Luis Moya Blanco 261, 33203 Gijón · ${ext(CONF.mapLink, "Open in OpenStreetMap")}</p>
            </div>
          </div>` },
        { id: "travel", label: "How to reach Gijón", html: `
          <div class="grid grid-2">
            <div class="card">${cardHead("plane", "By plane")}<p><strong>Asturias Airport (OVD)</strong> is about 40 km from Gijón, with daily flights to Madrid and Barcelona and connections to other Spanish and European cities; check current routes at ${ext("https://www.aena.es/en/asturias.html", "aena.es")}. ALSA buses link the airport with Gijón bus station in about 45 minutes.</p><p>Alternative airports: Santander (≈ 190 km), Bilbao (≈ 300 km), A Coruña (≈ 290 km) and Santiago de Compostela (≈ 330 km), all connected to Gijón by bus.</p></div>
            <div class="card">${cardHead("train", "By train")}<p>High-speed services connect Madrid with Gijón in about 4 h 30 min. Timetables and tickets at ${ext("https://www.renfe.com", "renfe.com")}.</p></div>
            <div class="card">${cardHead("bus", "By bus")}<p>ALSA runs direct coaches to Gijón from Madrid, Bilbao, Santander, A Coruña, Santiago and many other cities: ${ext("https://www.alsa.com", "alsa.com")}.</p><p>Within Gijón, several EMTUSA city bus lines stop at the Universidad Laboral: ${ext("https://www.emtusagijon.es", "emtusagijon.es")}.</p></div>
            <div class="card">${cardHead("ship", "By ferry")}<p>From the UK, ferries sail from Portsmouth and Plymouth to Santander, about two hours by road from Gijón.</p></div>
          </div>` },
      ])}` },

    { id: "accommodation", label: "Accommodation", title: "Accommodation", render: () => `
      ${pageHead("Accommodation", "September is still high season on the coast, so we recommend booking early. Any preferential rates agreed with hotels will be announced here.")}
      <div class="card">
        <ul class="hotels">
          ${HOTELS.map(([n, d]) => `<li><span><span class="p-name">${esc(n)}</span><span class="p-aff">${esc(d)}</span></span>${ext(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n + ", Gijón, Spain")}`, "View on map", ` ${esc(n)}`)}</li>`).join("")}
        </ul>
        <p class="small muted" style="margin-top:16px">The list is for guidance only and is not an endorsement. More options: ${ext("https://www.gijon.info/en", "Gijón tourist office")}.</p>
      </div>` },

    { id: "contact", label: "Contact", title: "Contact", render: () => `
      ${pageHead("Contact")}
      <div class="grid grid-2">
        <div class="card">
          ${cardHead("mail", "Conference Secretariat")}
          <p class="copy"><a href="mailto:${CONF.email}">${esc(CONF.email)}</a><button class="copy-btn" type="button" data-copy="${esc(CONF.email)}">Copy address</button></p>
          <p class="visually-hidden" role="status" id="copyStatus"></p>
          <p class="small muted" style="margin-bottom:4px">Postal address</p>
          <address style="font-style:normal">${CONF.address.map(esc).join("<br>")}</address>
        </div>
        <div class="card">
          <h2 class="card-title">Quick links</h2>
          <ul>
            <li><a href="${mailto("Abstract ICMFM XXII")}">Send an abstract</a></li>
            <li><a href="${mailto(CONF.short + " – Special session proposal")}">Propose a special session</a></li>
            <li><a href="${mailto(CONF.short + " – Sponsorship")}">Sponsorship and exhibition</a></li>
            <li><a href="#/legal">Legal notice and privacy</a></li>
          </ul>
        </div>
      </div>` },
  ];

  const EXTRA = {
    legal: { id: "legal", label: "Legal notice & privacy", title: "Legal notice and privacy", render: () => `
      ${pageHead("Legal notice and privacy")}
      <div class="card prose">
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
        <p>The site uses no cookies, analytics, tracking or browser storage. Fonts and images are served from the site itself.</p>
        <p>The site is hosted on GitHub Pages (GitHub, Inc., USA), which processes visitors' IP addresses in its server logs for security purposes, under GitHub's privacy statement and the EU–US Data Privacy Framework. The interactive map (OpenStreetMap) and the hotel links (Google Maps) only contact those services if you click them.</p>
        <h2 class="h3">Image credits</h2>
        <ul>
          <li>Universidad Laboral de Gijón: ${credit(PHOTOS.laboral)}, cropped and toned. ${ext(PHOTOS.laboral.license, "Licence CC BY 2.0")}</li>
          <li>Cimadevilla, Gijón: ${credit(PHOTOS.cimadevilla)}, cropped. ${ext(PHOTOS.cimadevilla.license, "Licence CC BY-SA 3.0")}</li>
          <li>Social preview image (og-card.jpg): derived from “Cimadevilla” by FDV, CC BY-SA 3.0; the derivative is likewise offered under ${ext(PHOTOS.cimadevilla.license, "CC BY-SA 3.0")}.</li>
          <li>Map data © OpenStreetMap contributors, ${ext("https://opendatacommons.org/licenses/odbl/", "ODbL")}.</li>
        </ul>
      </div>` },
    notfound: { id: "notfound", label: "Not found", title: "Page not found", render: () => `
      ${pageHead("Page not found", "The address you followed does not match any page of the colloquium website.")}
      <div class="btn-row"><a class="btn btn-primary" href="#/home">${icon("home")}Go to the welcome page</a><a class="btn btn-soft" href="#/contact">${icon("mail")}Contact the secretariat</a></div>` },
  };

  /* ---------------- DOM refs ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const view = $("#view");
  const topnav = $("#topnav");
  const navList = $("#navList");
  const navOffset = () => (getComputedStyle(topnav).position === "sticky" ? topnav.offsetHeight : 0) + 8;
  let countdownTimer = null;

  /* Square off the menu bar once it sticks to the top of the viewport. */
  const onScroll = () => topnav.classList.toggle("is-stuck", topnav.getBoundingClientRect().top <= 0 && window.scrollY > 0);
  window.addEventListener("scroll", onScroll, { passive: true });

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
    const label = $("#cdLabel");
    const start = new Date(CONF.start).getTime();
    const end = new Date(CONF.end).getTime();
    const tick = () => {
      const now = Date.now();
      if (now >= end) { label.hidden = true; el.innerHTML = '<p class="cd-msg">Thank you for joining ICMFM XXII in Gijón.</p>'; clearInterval(countdownTimer); return; }
      if (now >= start) { label.hidden = true; el.innerHTML = '<p class="cd-msg">Happening now at the Universidad Laboral.</p>'; return; }
      let s = Math.floor((start - now) / 1000);
      const d = Math.floor(s / 86400); s %= 86400;
      const h = Math.floor(s / 3600); s %= 3600;
      const m = Math.floor(s / 60);
      el.innerHTML = [[d, "days"], [h, "hours"], [m, "minutes"]].map(([n, l]) => `<div><b>${n}</b><small>${l}</small></div>`).join("");
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

  const pager = (idx) => {
    if (idx < 0) return "";
    const prev = VIEWS[idx - 1];
    const next = VIEWS[idx + 1];
    const link = (v, dir) => `<a class="${dir}" href="#/${v.id}" rel="${dir}"><small>${dir === "prev" ? "← Previous" : "Next →"}</small><strong>${esc(v.label)}</strong></a>`;
    return `<nav class="pager" aria-label="Previous and next page">${prev ? link(prev, "prev") : ""}${next ? link(next, "next") : ""}</nav>`;
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
      if (focus) {
        const list = view.querySelector('[role="tablist"]');
        const top = list.getBoundingClientRect().top + window.scrollY - navOffset();
        window.scrollTo({ top, behavior: "instant" });
        list.querySelector('[aria-selected="true"]').focus({ preventScroll: true });
      }
      return;
    }
    current = v.id;

    view.innerHTML = v.render() + pager(idx);
    view.classList.remove("is-entering"); void view.offsetWidth; view.classList.add("is-entering");
    document.title = `${v.id === "home" ? "" : v.title + " · "}${CONF.short} · Gijón 2027`;
    navList.querySelectorAll("a").forEach((a) => (a.dataset.id === v.id ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));

    if (v.id === "home") startCountdown(); else clearInterval(countdownTimer);
    wireTabs(v.id, r.sub);
    wireExtras();
    if (focus) {
      // Bring the new window into view just below the sticky menu, without jumping above the masthead fold.
      const top = $("#main").getBoundingClientRect().top + window.scrollY - navOffset();
      if (window.scrollY > top) window.scrollTo({ top, behavior: "instant" });
      view.querySelector("h1")?.focus({ preventScroll: true });
    }
  };

  window.addEventListener("hashchange", () => render(true));
  render(false);
})();
