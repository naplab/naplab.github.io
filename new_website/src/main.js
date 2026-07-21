import "./styles.css";
import { gallery, people, publications } from "./data.js";

const baseUrl = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const page = document.body.dataset.page || "home";
const main = document.querySelector("#main-content");

const routes = [
  ["home", "Home", ""],
  ["research", "Research", "research/"],
  ["people", "People", "people/"],
  ["publications", "Publications", "publications/"],
  ["teaching", "Teaching", "teaching/"],
  ["opportunities", "Opportunities", "opportunities/"],
  ["gallery", "Gallery", "gallery/"],
  ["contact", "Contact", "contact/"],
];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const routeUrl = (route = "") => `${baseUrl}${route}`;

const assetUrl = (path = "") => {
  const value = String(path || "");
  if (/^(https?:|data:)/i.test(value)) return value;
  return `${baseUrl}${value.replace(/^\/?assets\//, "").replace(/^\//, "")}`;
};

const safeExternalUrl = (value = "") => {
  const url = String(value).trim();
  return /^(https?:\/\/|mailto:)/i.test(url) ? url : "";
};

const externalAttrs = (href) =>
  /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";

const arrowLink = (label, href, className = "text-link") => {
  const safeHref = safeExternalUrl(href) || href;
  return `<a class="${className}" href="${escapeHtml(safeHref)}"${externalAttrs(safeHref)}>${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
};

const renderHeader = () => {
  const links = routes
    .map(
      ([key, label, path]) => `
        <a href="${routeUrl(path)}"${key === page ? ' aria-current="page"' : ""}>
          ${label}
        </a>`,
    )
    .join("");

  return `
    <header class="site-header">
      <div class="institution-bar">
        <div class="shell institution-inner">
          <a href="https://www.columbia.edu/" target="_blank" rel="noopener noreferrer">Columbia University in the City of New York</a>
          <a href="https://zuckermaninstitute.columbia.edu/" target="_blank" rel="noopener noreferrer">Zuckerman Mind Brain Behavior Institute</a>
        </div>
      </div>
      <div class="navigation-wrap">
        <div class="shell navigation-inner">
          <a class="brand" href="${routeUrl()}">
            <img src="${assetUrl("/assets/img/naplab_logo_small.png")}" alt="" width="76" height="52" />
            <span>
              <strong>NAPLab</strong>
              <small>Neural Acoustic Processing Laboratory</small>
            </span>
          </a>
          <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
            <span class="menu-toggle-label">Menu</span>
            <span class="menu-toggle-lines" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
          <nav class="primary-navigation" id="primary-navigation" aria-label="Primary navigation">
            ${links}
          </nav>
        </div>
      </div>
    </header>`;
};

const renderFooter = () => `
  <footer class="site-footer">
    <div class="footer-wave" aria-hidden="true"></div>
    <div class="shell footer-grid">
      <div>
        <a class="footer-brand" href="${routeUrl()}">NAPLab <span>@ Columbia</span></a>
        <p>Understanding and engineering the future of human auditory communication.</p>
      </div>
      <div>
        <p class="footer-label">Visit</p>
        <address>Jerome L. Greene Science Center<br />L3-028 · 3229 Broadway<br />New York, NY 10027</address>
      </div>
      <div>
        <p class="footer-label">Explore</p>
        <a href="${routeUrl("research/")}">Research</a>
        <a href="${routeUrl("people/")}">People</a>
        <a href="${routeUrl("opportunities/")}">Join the lab</a>
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>© ${new Date().getFullYear()} NAPLab at Columbia University</span>
      <span>Built for clarity, curiosity, and open science.</span>
    </div>
  </footer>`;

const pageHero = ({ eyebrow, title, copy, tone = "blue", image, alt = "" }) => `
  <section class="page-hero page-hero--${tone}">
    <div class="shell page-hero-grid">
      <div class="page-hero-copy reveal">
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${title}</h1>
        <p>${copy}</p>
      </div>
      ${
        image
          ? `<figure class="page-hero-media reveal"><img src="${assetUrl(image)}" alt="${escapeHtml(alt)}" /></figure>`
          : `<div class="page-hero-signal" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>`
      }
    </div>
  </section>`;

const temporarilyHiddenPageHero = (options) => {
  // return pageHero(options);
  return "";
};

const researchCards = () => `
  <div class="research-grid">
    <article class="research-card research-card--cyan reveal">
      <span class="card-index">01</span>
      <h3>Neural Basis of Auditory Cognition</h3>
      <p>Discovering how the brain encodes speech, language, and music in complex, naturalistic listening environments.</p>
      <a href="${routeUrl("research/")}#auditory-cognition">Explore cognition <span aria-hidden="true">→</span></a>
    </article>
    <article class="research-card research-card--coral reveal">
      <span class="card-index">02</span>
      <h3>Auditory Brain–Computer Interfaces</h3>
      <p>Decoding auditory attention from neural signals to enable responsive hearing and communication technologies.</p>
      <a href="${routeUrl("research/")}#auditory-bci">Explore BCI <span aria-hidden="true">→</span></a>
    </article>
    <article class="research-card research-card--yellow reveal">
      <span class="card-index">03</span>
      <h3>AI for Audio &amp; Brain Modeling</h3>
      <p>Building generative speech systems and using deep networks as <em>in silico</em> models of brain computation.</p>
      <a href="${routeUrl("research/")}#ai-audio">Explore AI &amp; audio <span aria-hidden="true">→</span></a>
    </article>
  </div>`;

const publicationCard = (publication, index, compact = false) => {
  const href = safeExternalUrl(publication.link);
  const details = [publication.journal, publication.volume ? `Vol. ${publication.volume}` : "", publication.pages ? `pp. ${publication.pages}` : ""]
    .filter(Boolean)
    .join(" · ");

  return `
    <article class="publication-card${compact ? " publication-card--compact" : ""} reveal">
      <div class="publication-year"><span>${escapeHtml(publication.year || "—")}</span><small>${String(index + 1).padStart(2, "0")}</small></div>
      <div class="publication-body">
        <h3>${escapeHtml(publication.title)}</h3>
        <p class="publication-authors">${escapeHtml(publication.authors)}</p>
        <p class="publication-venue">${escapeHtml(details)}</p>
        ${publication.tldr ? `<p class="publication-tldr">${escapeHtml(publication.tldr)}</p>` : ""}
      </div>
      ${href ? `<a class="publication-action" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escapeHtml(publication.title)}"><span aria-hidden="true">↗</span></a>` : ""}
    </article>`;
};

const renderHome = () => {
  const latest = publications.slice(0, 3).map((item, index) => publicationCard(item, index, true)).join("");
  const featuredMembers = people.labMembers.slice(0, 3);

  return `
    <section class="home-hero">
      <div class="home-collage" aria-hidden="true">
        <figure class="collage-photo collage-photo--lab"><img src="${assetUrl("/assets/img/gallery/bci_course.jpeg")}" alt="" /></figure>
        <figure class="collage-photo collage-photo--diagram"><img src="${assetUrl("/assets/img/pub/icassp_2025.png")}" alt="" /></figure>
        <div class="collage-signal"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="collage-dot collage-dot--one"></div>
        <div class="collage-dot collage-dot--two"></div>
      </div>
      <div class="shell home-hero-inner">
        <div class="hero-statement reveal">
          <p class="eyebrow">Neuroscience · Artificial Intelligence · Audio</p>
          <h1>Listen to the brain.<br /><em>Build the future</em> of sound.</h1>
          <p>We study how the human brain makes sense of sound—and turn those insights into intelligent systems that help people communicate.</p>
          <div class="hero-actions">
            <a class="button button--light" href="${routeUrl("research/")}">Explore our science</a>
            <a class="button button--ghost" href="${routeUrl("publications/")}">Read our work</a>
          </div>
        </div>
      </div>
      <a class="hero-scroll" href="#mission"><span>Discover</span><i aria-hidden="true">↓</i></a>
    </section>

    <section class="mission-section section" id="mission">
      <div class="shell mission-grid">
        <div class="section-kicker reveal">The future in hearing</div>
        <div class="reveal">
          <h2 class="display-heading">The brain is our most remarkable audio processor.</h2>
          <p class="large-copy">At Columbia University, the Neural Acoustic Processing Laboratory connects neural recordings, computational models, and real-world listening to understand—and improve—human auditory communication.</p>
        </div>
      </div>
    </section>

    <section class="section section--navy">
      <div class="shell">
        <div class="section-heading reveal">
          <div><p class="eyebrow">Our research</p><h2>Three paths. One listening brain.</h2></div>
          <p>From cortical computation to brain-controlled hearing, we work across disciplines and scales.</p>
        </div>
        ${researchCards()}
      </div>
    </section>

    <section class="section latest-section">
      <div class="shell">
        <div class="section-heading section-heading--dark reveal">
          <div><p class="eyebrow">Latest thinking</p><h2>Recent publications</h2></div>
          <a class="text-link" href="${routeUrl("publications/")}">View all publications <span aria-hidden="true">→</span></a>
        </div>
        <div class="publication-list">${latest}</div>
      </div>
    </section>

    <section class="community-section">
      <div class="community-photo reveal">
        <img src="${assetUrl("/assets/img/gallery/group.jpg")}" alt="NAPLab members gathered in the laboratory" />
      </div>
      <div class="community-copy reveal">
        <p class="eyebrow">People make the science</p>
        <h2>Different disciplines. Shared curiosity.</h2>
        <p>Our group brings together electrical and biomedical engineers, neuroscientists, and machine-learning researchers in an open, collaborative environment.</p>
        <div class="member-mini-row" aria-label="Featured lab members">
          ${featuredMembers.map((member) => `<img src="${assetUrl(member.avatar)}" alt="${escapeHtml(member.name)}" />`).join("")}
        </div>
        <a class="button button--dark" href="${routeUrl("people/")}">Meet the lab</a>
      </div>
    </section>`;
};

const renderResearch = () => `
  ${temporarilyHiddenPageHero({
    eyebrow: "Research",
    title: "How does the brain <em>find meaning</em> in sound?",
    copy: "We combine neuroscience, engineering, and artificial intelligence to study communication in the complex listening environments of everyday life.",
    tone: "green",
  })}
  <section class="section">
    <div class="shell intro-grid">
      <p class="section-kicker reveal">Our science</p>
      <div class="reveal"><h2 class="display-heading">From neural activity to intelligent audio.</h2><p class="large-copy">The laboratory works across three connected research programs. Each asks a different version of the same question: how can biological and artificial systems separate, represent, and understand sound?</p></div>
    </div>
  </section>
  <section class="research-story" id="auditory-cognition">
    <figure class="research-story-visual research-story-visual--figure research-story-visual--figure-sky reveal">
      <a class="research-figure-link" href="https://www.nature.com/articles/s41562-023-01520-0" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.ncbi.nlm.nih.gov/pmc/blobs/8ff0/10417567/f4babd58d918/nihms-1919650-f0001.jpg" alt="Electrode coverage, linguistic representations, and neural encoding analysis from Mesgarani and colleagues" loading="lazy" referrerpolicy="no-referrer" />
      </a>
      <figcaption>Hierarchical linguistic encoding in auditory cortex · Nature Human Behaviour, 2023</figcaption>
    </figure>
    <div class="research-story-copy reveal">
      <p class="story-number">01 · Neural basis</p>
      <h2>Auditory cognition in the real world</h2>
      <p>We investigate how auditory cortex represents speech, language, and music—and how those representations remain useful in noisy, dynamic scenes.</p>
      <ul class="topic-list"><li>Speech and language encoding</li><li>Music perception and expertise</li><li>Temporal integration in cortex</li><li>Naturalistic listening</li></ul>
    </div>
  </section>
  <section class="research-story research-story--reverse" id="auditory-bci">
    <figure class="research-story-visual research-story-visual--figure research-story-visual--figure-navy reveal">
      <a class="research-figure-link research-figure-link--panel-a" href="https://www.nature.com/articles/s41593-026-02281-5" target="_blank" rel="noopener noreferrer">
        <img src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41593-026-02281-5/MediaObjects/41593_2026_2281_Fig1_HTML.png" alt="Experimental paradigm and decoding results for a real-time brain-controlled selective hearing system" loading="lazy" referrerpolicy="no-referrer" />
      </a>
      <figcaption>Real-time brain-controlled selective hearing · Nature Neuroscience, 2026</figcaption>
    </figure>
    <div class="research-story-copy reveal">
      <p class="story-number">02 · Neural interfaces</p>
      <h2>Brain-controlled selective hearing</h2>
      <p>We develop real-time systems that infer which speaker a listener is attending to and use that signal to steer assistive hearing technologies.</p>
      <ul class="topic-list"><li>Auditory attention decoding</li><li>Real-time neural signal processing</li><li>Neuro-steered hearing devices</li><li>Human-centered evaluation</li></ul>
    </div>
  </section>
  <section class="research-story" id="ai-audio">
    <figure class="research-story-visual research-story-visual--figure research-story-visual--figure-yellow reveal">
      <a class="research-figure-link" href="https://proceedings.neurips.cc/paper_files/paper/2023/hash/3eaad2a0b62b5ed7a2e66c2188bb1449-Abstract-Conference.html" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.ncbi.nlm.nih.gov/pmc/blobs/98ea/11759097/ae19efc287c9/nihms-2009026-f0002.jpg" alt="Training and inference architecture of the StyleTTS 2 speech synthesis system" loading="lazy" referrerpolicy="no-referrer" />
      </a>
      <figcaption>StyleTTS 2 generative speech architecture · NeurIPS, 2023</figcaption>
    </figure>
    <div class="research-story-copy reveal">
      <p class="story-number">03 · Artificial intelligence</p>
      <h2>Models that speak—and models that explain</h2>
      <p>We build generative and separation systems for audio, while using deep networks as testable models of computation in the human brain.</p>
      <ul class="topic-list"><li>Speech separation and enhancement</li><li>Generative speech and audio</li><li>Brain–model correspondence</li><li>Interpretable representations</li></ul>
    </div>
  </section>
  <section class="section section--navy methods-section">
    <div class="shell">
      <div class="section-heading reveal"><div><p class="eyebrow">How we work</p><h2>One lab, many lenses.</h2></div><p>Experiments and models inform one another, creating a continuous path from fundamental discovery to useful technology.</p></div>
      <div class="methods-grid">
        ${["Human neural recordings", "Behavioral experiments", "Machine learning", "Real-time systems"].map((item, index) => `<div class="method reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${item}</h3></div>`).join("")}
      </div>
    </div>
  </section>`;

const personHref = (person) => {
  const website = safeExternalUrl(person.profile_url || person.contacts?.website || "");
  if (website) return website;
  const email = String(person.contacts?.email || "").trim();
  return email ? `mailto:${email}` : "";
};

const renderPersonCard = (person) => {
  const href = personHref(person);
  const degrees = person.degrees || person.highlights || [];
  const content = `
    <div class="person-photo"><img src="${assetUrl(person.avatar)}" alt="Portrait of ${escapeHtml(person.name)}" loading="lazy" /></div>
    <div class="person-card-copy">
      <div class="person-card-header">
        <p>${escapeHtml(person.title)}</p>
        <h3>${escapeHtml(person.name)}</h3>
      </div>
      ${degrees.length ? `<ul>${degrees.map((degree) => `<li>${escapeHtml(degree)}</li>`).join("")}</ul>` : ""}
      ${href ? '<span class="person-arrow" aria-hidden="true">↗</span>' : ""}
    </div>`;
  return `<article class="person-card reveal">${href ? `<a href="${escapeHtml(href)}"${externalAttrs(href)}>${content}</a>` : content}</article>`;
};

const renderPeople = () => {
  const faculty = people.faculty[0];
  const facultyLink = faculty ? personHref(faculty) : "";
  return `
    ${temporarilyHiddenPageHero({
      eyebrow: "People",
      title: "Curiosity is a <em>team sport.</em>",
      copy: "Engineers, neuroscientists, and computational researchers working together to understand hearing and communication.",
      tone: "coral",
      image: "/assets/img/gallery/group.jpg",
      alt: "NAPLab members gathered in the laboratory",
    })}
    ${
      faculty
        ? `<section class="section pi-section"><div class="shell pi-grid">
            <figure class="pi-photo reveal"><img src="${assetUrl(faculty.avatar)}" alt="Portrait of ${escapeHtml(faculty.name)}" /></figure>
            <div class="pi-copy reveal"><p class="eyebrow">Principal investigator</p><h1>${escapeHtml(faculty.name)}</h1><p class="pi-title">${escapeHtml(faculty.title)}</p>
              <div class="affiliation-row">${(faculty.affiliations || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
              <ul class="credential-list">${(faculty.highlights || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              ${facultyLink ? arrowLink("View profile", facultyLink, "button button--dark") : ""}
            </div>
          </div></section>`
        : ""
    }
    <section class="section section--soft">
      <div class="shell"><div class="section-heading section-heading--dark reveal"><div><p class="eyebrow">The lab</p><h2>Current members</h2></div><p>${people.labMembers.length} researchers working across neuroscience, engineering, and AI.</p></div>
      <div class="people-grid">${people.labMembers.map(renderPersonCard).join("")}</div></div>
    </section>
    <section class="section">
      <div class="shell people-lists">
        <div class="reveal"><p class="eyebrow">Across disciplines</p><h2>Collaborators</h2><div class="collaborator-list">${people.collaborators
          .map((person) => {
            const href = safeExternalUrl(person.contacts?.website || "");
            const name = href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(person.name)} <span aria-hidden="true">↗</span></a>` : `<strong>${escapeHtml(person.name)}</strong>`;
            return `<div>${name}<p>${escapeHtml(person.affiliation)}</p></div>`;
          })
          .join("")}</div></div>
        <div class="alumni-block reveal"><p class="eyebrow">Wherever they go</p><h2>Alumni</h2><div class="alumni-list">${people.alumni.map((name) => `<span>${escapeHtml(name)}</span>`).join("")}</div></div>
      </div>
    </section>`;
};

const renderPublications = () => {
  const years = [...new Set(publications.map((item) => item.year))];
  const grouped = years
    .map((year) => {
      const items = publications.filter((item) => item.year === year);
      return `<section class="publication-year-group"><div class="year-heading reveal"><span>${escapeHtml(year)}</span><small>${items.length} ${items.length === 1 ? "paper" : "papers"}</small></div><div class="publication-list">${items.map((item, index) => publicationCard(item, index)).join("")}</div></section>`;
    })
    .join("");

  return `
    ${temporarilyHiddenPageHero({
      eyebrow: "Publications",
      title: "Ideas made <em>testable.</em>",
      copy: `${publications.length} featured publications spanning neural computation, speech technology, and auditory brain–computer interfaces.`,
      tone: "yellow",
    })}
    <section class="section publication-page"><div class="shell">
      <div class="publication-intro reveal"><p>Featured recent work is listed below. For a complete publication record, visit Nima Mesgarani’s Google Scholar profile.</p>${arrowLink("Full list on Google Scholar", "https://scholar.google.com/citations?hl=en&user=DKhMx5gAAAAJ&view_op=list_works&sortby=pubdate", "button button--dark")}</div>
      ${grouped}
    </div></section>`;
};

const courseMaterials = [
  ["Introduction to EEG", "labinstruction1.pdf"],
  ["Biological artifacts in EEG", "labinstruction2.pdf"],
  ["Neurofeedback", "labinstruction3.pdf"],
  ["Auditory oddball paradigm", "labinstruction4.pdf"],
  ["P300 speller", "labinstruction5.pdf"],
  ["Auditory steady state response", "labinstruction6.pdf"],
  ["Attentional modulation of ASSR", "labinstruction7.pdf"],
  ["Steady state visually evoked responses", "labinstruction8.pdf"],
  ["Decoding imagined movement", "labinstruction9.pdf"],
  ["Project 1", "miniproject1.pdf"],
  ["Project 2", "miniproject2.pdf"],
];

const renderTeaching = () => `
  ${temporarilyHiddenPageHero({
    eyebrow: "Teaching",
    title: "Learn by <em>listening, building, testing.</em>",
    copy: "Courses connect the foundations of auditory neuroscience with hands-on signal processing, brain–computer interfaces, and modern machine learning.",
    tone: "blue",
    image: "/assets/img/bci/photo-nov-24-12-15-27-pm.jpg",
    alt: "Students working in a NAPLab brain-computer interface laboratory session",
  })}
  <section class="section"><div class="shell intro-grid"><p class="section-kicker reveal">Current courses</p><div class="course-list reveal">
    <article><span>EEBME 9070</span><h2>Advanced Topics: Bio-Inspired Computation</h2></article>
    <article><span>ELEN 6820</span><h2>Speech and Audio Signal Processing</h2></article>
    <article><span>ECBME 4090</span><h2>Brain–Computer Interfaces Laboratory</h2></article>
    <article><span>EEBME 9070</span><h2>Advanced Topics: Neural Processing of Acoustic Signals</h2></article>
  </div></div></section>
  <section class="bci-feature">
    <div class="bci-photo-grid reveal">
      ${["11-11-16", "11-13-00", "11-13-12", "12-15-27"].map((stamp, index) => `<img src="${assetUrl(`/assets/img/bci/photo-nov-24-${stamp}-am.jpg`.replace("12-15-27-am", "12-15-27-pm"))}" alt="BCI laboratory session ${index + 1}" loading="lazy" />`).join("")}
    </div>
    <div class="bci-copy reveal"><p class="eyebrow">Hands-on BCI Laboratory · ECBME 4090</p><h2>Record a signal. Ask a question. Build an interface.</h2><p>The course provides hands-on experience with neural interface technologies, including scalp EEG recording, real-time analysis of brain responses, and decoding perception and intention.</p>
      ${arrowLink("Read the course paper", assetUrl("/assets/files/finalbci.pdf"), "button button--light")}
    </div>
  </section>
  <section class="section section--soft"><div class="shell objectives-grid">
    <div class="reveal"><p class="eyebrow">Learning objectives</p><h2>From experimental design to real-time systems.</h2></div>
    <div class="objective-cards">
      <article class="reveal"><span>01</span><h3>Experimental design</h3><p>Design, data quality, optimization, and hypothesis testing.</p></article>
      <article class="reveal"><span>02</span><h3>Neuroscience</h3><p>EEG mechanisms, artifacts, ERPs, neurofeedback, ASSR, SSVEP, and imagined movement.</p></article>
      <article class="reveal"><span>03</span><h3>Data analysis</h3><p>Preprocessing, spectral methods, filtering, spatial patterns, classification, and evaluation.</p></article>
      <article class="reveal"><span>04</span><h3>Technical practice</h3><p>Hardware setup, debugging, MATLAB, Simulink, and EEGLAB.</p></article>
    </div>
  </div></section>
  <section class="section materials-section"><div class="shell"><div class="section-heading section-heading--dark reveal"><div><p class="eyebrow">Open course materials</p><h2>Eleven guided laboratories</h2></div><p>For educational use. PDF files open in a new tab.</p></div>
    <ol class="materials-list">${courseMaterials.map(([title, file], index) => `<li class="reveal"><span>${String(index + 1).padStart(2, "0")}</span><strong>${title}</strong><a href="${assetUrl(`/assets/files/${file}`)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(title)} PDF">PDF ↗</a></li>`).join("")}</ol>
  </div></section>`;

const renderOpportunities = () => `
  ${temporarilyHiddenPageHero({
    eyebrow: "Opportunities",
    title: "Bring your questions. <em>Join the work.</em>",
    copy: "We welcome researchers who want to work across disciplines and build a deeper understanding of human auditory communication.",
    tone: "green",
    image: "/assets/img/opportunities/science-center.jpg",
    alt: "Jerome L. Greene Science Center at Columbia University",
  })}
  <section class="section"><div class="shell opportunity-intro">
    <div class="reveal"><p class="eyebrow">Work with us</p><h2 class="display-heading">Engineering meets neuroscience in Manhattanville.</h2></div>
    <div class="large-copy reveal"><p>Our group includes electrical and biomedical engineers, neuroscientists, and machine-learning researchers. Applicants interested in research opportunities can contact Professor Mesgarani for more information.</p><p>NAPLab is part of Columbia’s Zuckerman Mind Brain Behavior Institute, the Department of Electrical Engineering, and the Center for Neural Engineering and Computation.</p></div>
  </div></section>
  <section class="opportunity-band">
    <div class="opportunity-card opportunity-card--phd reveal"><p class="eyebrow">Doctoral study</p><h2>PhD positions</h2><p>Apply to Columbia’s Electrical Engineering PhD program and mention Professor Mesgarani in your application. The current program deadline is December 15.</p>${arrowLink("Explore the EE PhD program", "https://www.ee.columbia.edu/", "button button--light")}</div>
    <div class="opportunity-card opportunity-card--research reveal"><p class="eyebrow">Research</p><h2>Students &amp; researchers</h2><p>Tell us what questions motivate you, what methods you bring, and how your interests connect to hearing, neural computation, or intelligent audio.</p>${arrowLink("Email Professor Mesgarani", "mailto:nima@ee.columbia.edu", "button button--dark")}</div>
  </section>
  <section class="section"><div class="shell affiliation-grid">
    <a class="affiliation-card reveal" href="https://zuckermaninstitute.columbia.edu/" target="_blank" rel="noopener noreferrer"><img src="${assetUrl("/assets/img/contact/manhattanville-building.jpg")}" alt="Columbia University Manhattanville campus" /><span>Zuckerman Institute <i aria-hidden="true">↗</i></span></a>
    <a class="affiliation-card reveal" href="https://www.engineering.columbia.edu/" target="_blank" rel="noopener noreferrer"><img src="${assetUrl("/assets/img/opportunities/images.jpg")}" alt="Columbia Engineering" /><span>Columbia Engineering <i aria-hidden="true">↗</i></span></a>
  </div></section>`;

const renderGallery = () => {
  const years = [...new Set(gallery.map((item) => item.year))];
  return `
    ${temporarilyHiddenPageHero({
      eyebrow: "Gallery",
      title: "Science is also a <em>shared life.</em>",
      copy: "Conferences, courses, celebrations, awards, dogs, dinners—and the people behind the work.",
      tone: "coral",
      image: "/assets/img/gallery/ZI_yearend2025.jpg",
      alt: "NAPLab members at the 2025 Zuckerman Institute year-end celebration",
    })}
    <section class="section gallery-section"><div class="shell">
      <div class="gallery-toolbar reveal"><div><p class="eyebrow">Lab life</p><h2>${gallery.length} moments and counting</h2></div><label for="gallery-year">Filter by year<select id="gallery-year"><option value="all">All years</option>${years.map((year) => `<option value="${year}">${year}</option>`).join("")}</select></label></div>
      <p id="gallery-status" class="sr-only" aria-live="polite"></p>
      <div class="gallery-grid">${gallery.map((item, index) => {
        const alt = item.highlight || `NAPLab gallery image from ${item.year}`;
        return `<figure class="gallery-item reveal" data-gallery-year="${escapeHtml(item.year)}"><img src="${assetUrl(item.file)}" alt="${escapeHtml(alt)}" loading="lazy" /><figcaption><span>${escapeHtml(item.year)}</span>${item.highlight ? `<p>${escapeHtml(item.highlight)}</p>` : ""}</figcaption></figure>`;
      }).join("")}</div>
    </div></section>`;
};

const renderContact = () => {
  const faculty = people.faculty[0];
  const email = String(faculty?.contacts?.email || "nima@ee.columbia.edu");
  return `
    ${pageHero({
      eyebrow: "Contact",
      title: "Find us at <em>Manhattanville.</em>",
      copy: "Our laboratory is located in Columbia University’s Jerome L. Greene Science Center in New York City.",
      tone: "blue",
      image: "/assets/img/contact/manhattanville-building.jpg",
      alt: "Jerome L. Greene Science Center at Columbia University's Manhattanville campus",
    })}
    <section class="contact-layout">
      <div class="contact-panel reveal"><p class="eyebrow">Visit the lab</p><h1>Jerome L. Greene<br />Science Center</h1><address><strong>NAPLab · L3-028</strong><br />3229 Broadway<br />New York, NY 10027</address><a class="button button--light" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      <div class="map-wrap reveal"><iframe title="Map showing the Jerome L. Greene Science Center" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.351182266466!2d-73.95916298459364!3d40.813551739157834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f63e6ef4740f%3A0xc4529a2e5f1d55d7!2sJerome%20L.%20Greene%20Science%20Center!5e0!3m2!1sen!2sus!4v1700696454906!5m2!1sen!2sus" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
    </section>
    <section class="section contact-links"><div class="shell affiliation-links">
      ${arrowLink("Columbia University", "https://www.columbia.edu/")}
      ${arrowLink("Zuckerman Institute", "https://zuckermaninstitute.columbia.edu/")}
      ${arrowLink("Electrical Engineering", "https://www.ee.columbia.edu/")}
      ${arrowLink("Center for Neural Engineering", "https://cnec.columbia.edu/")}
    </div></section>`;
};

const pageRenderers = {
  home: renderHome,
  research: renderResearch,
  people: renderPeople,
  publications: renderPublications,
  teaching: renderTeaching,
  opportunities: renderOpportunities,
  gallery: renderGallery,
  contact: renderContact,
};

document.querySelector("#site-header").innerHTML = renderHeader();
main.innerHTML = (pageRenderers[page] || renderHome)();
document.querySelector("#site-footer").innerHTML = renderFooter();

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

const closeMenu = () => {
  document.body.classList.remove("nav-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
};

menuButton?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuButton?.focus();
  }
});

const yearFilter = document.querySelector("#gallery-year");
yearFilter?.addEventListener("change", () => {
  const selectedYear = yearFilter.value;
  const items = [...document.querySelectorAll(".gallery-item")];
  let visible = 0;
  items.forEach((item) => {
    const show = selectedYear === "all" || item.dataset.galleryYear === selectedYear;
    item.hidden = !show;
    if (show) visible += 1;
  });
  const status = document.querySelector("#gallery-status");
  if (status) status.textContent = `Showing ${visible} gallery ${visible === 1 ? "image" : "images"}.`;
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px" },
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
