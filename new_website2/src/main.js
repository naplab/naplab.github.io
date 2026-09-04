import "./styles.css";
import homeHero from "./assets/choudhari-mesgarani-2026-hero.png";
import { gallery, people, publications } from "./data.js";

const baseUrl = import.meta.env.BASE_URL;
const currentPage = document.body.dataset.page || "home";
const main = document.querySelector("#main-content");

const navigation = [
  ["home", "Home", ""],
  ["research", "Research", "research/"],
  ["people", "People", "people/"],
  ["publications", "Publications", "publications/"],
  ["teaching", "Teaching", "teaching/"],
  ["opportunities", "Opportunities", "opportunities/"],
  ["gallery", "Gallery", "gallery/"],
  ["contact", "Contact", "contact/"],
];

const pageTitles = {
  home: "NAPLab | Columbia University",
  research: "Research | NAPLab",
  people: "People | NAPLab",
  publications: "Publications | NAPLab",
  teaching: "Teaching | NAPLab",
  opportunities: "Opportunities | NAPLab",
  gallery: "Gallery | NAPLab",
  contact: "Contact | NAPLab",
};

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
  if (/^(https?:|data:)/i.test(value) || value.startsWith(baseUrl)) return value;
  return `${baseUrl}${value.replace(/^\/?assets\//, "").replace(/^\//, "")}`;
};

const safeExternalUrl = (value = "") => {
  const candidate = String(value || "").trim();
  return /^https?:\/\//i.test(candidate) ? candidate : "";
};

const emailUrl = (value = "") => {
  const email = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : "";
};

const externalLink = (label, href, className = "text-link") => {
  const url = safeExternalUrl(href);
  if (!url) return "";
  return `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span class="external-arrow" aria-hidden="true">↗</span></a>`;
};

const mailLink = (label, email, className = "text-link") => {
  const url = emailUrl(email);
  return url ? `<a class="${className}" href="${escapeHtml(url)}">${escapeHtml(label)}</a>` : "";
};

const resourceLink = (label, href) =>
  href
    ? `<a class="text-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span class="external-arrow" aria-hidden="true">↗</span></a>`
    : "";

const renderHeader = () => `
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="${routeUrl()}">
        <span class="brand-name"><span class="brand-accent">NAP</span>Lab</span>
        <span class="brand-subtitle">Columbia University</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
        <span>Menu</span>
      </button>
      <nav class="site-nav" id="primary-navigation" aria-label="Primary navigation">
        <ul class="nav-list">
          ${navigation
            .map(
              ([id, label, route]) =>
                `<li><a href="${routeUrl(route)}"${id === currentPage ? ' class="active" aria-current="page"' : ""}>${label}</a></li>`,
            )
            .join("")}
        </ul>
      </nav>
    </div>
  </header>`;

const renderFooter = () => `
  <footer class="site-footer">
    <div class="shell footer-inner">
      <p>© ${new Date().getFullYear()} Neural Acoustic Processing Lab, Columbia University.</p>
      <p><a href="https://zuckermaninstitute.columbia.edu/" target="_blank" rel="noopener noreferrer">Zuckerman Institute</a> · <a href="https://www.ee.columbia.edu/" target="_blank" rel="noopener noreferrer">Electrical Engineering</a></p>
    </div>
  </footer>`;

const pageIntro = (title, lead) => `
  <header class="page-intro reading-column">
    <h1>${escapeHtml(title)}</h1>
    ${lead ? `<p class="lead">${escapeHtml(lead)}</p>` : ""}
  </header>`;

const temporarilyHiddenPageLead = (copy) => {
  // return copy;
  return "";
};

const temporarilyHiddenSection = (markup) => {
  // return markup;
  return "";
};

const publicationMeta = (item) => {
  const details = [];
  if (item.journal) details.push(String(item.journal));
  if (item.volume) details.push(`Vol. ${item.volume}`);
  if (item.pages) details.push(String(item.pages));
  if (item.year) details.push(String(item.year));
  return details.join(" · ");
};

const publicationItem = (item, compact = false) => {
  const href = safeExternalUrl(item.link);
  const title = escapeHtml(item.title || "Untitled publication");
  const titleMarkup = href
    ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${title}</a>`
    : title;
  return `<li class="publication-item${compact ? " publication-item--compact" : ""}">
    <h3 class="publication-title">${titleMarkup}</h3>
    ${item.authors ? `<p class="publication-authors">${escapeHtml(item.authors)}</p>` : ""}
    ${publicationMeta(item) ? `<p class="publication-meta">${escapeHtml(publicationMeta(item))}</p>` : ""}
    ${item.tldr ? `<p class="publication-note">${escapeHtml(item.tldr)}</p>` : ""}
    ${href && !compact ? `<p class="publication-links"><a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">[paper]</a></p>` : ""}
  </li>`;
};

const renderHome = () => {
  const recent = publications.slice(0, 4);
  return `
    <section class="home-intro home-intro--home">
      <div class="home-intro-art" aria-hidden="true">
        <img src="${homeHero}" alt="" decoding="async" fetchpriority="high" />
      </div>
      <div class="shell"><div class="reading-column">
        <h1>Understanding how the brain makes sense of sound.</h1>
        <p class="lead">Welcome to the Neural Acoustic Processing Lab (NAPLab), where we bring together auditory neuroscience, signal processing, and artificial intelligence to study human communication and develop better speech and hearing technologies.</p>
      </div></div>
    </section>

    <section class="section shell">
      <div class="home-columns">
        <div>
          <h2 class="section-heading">Research</h2>
          <p>We study the neural representation of speech and language, auditory attention in complex scenes, brain–computer interfaces for hearing, and computational models of speech and audio.</p>
          <p><a class="text-link" href="${routeUrl("research/")}">Learn about our research</a></p>
        </div>
        <div>
          <h2 class="section-heading">Recent work</h2>
          <ol class="news-list">
            ${recent
              .map((item) => {
                const href = safeExternalUrl(item.link);
                const title = escapeHtml(item.title || "Untitled publication");
                const venue = escapeHtml(item.journal || "Preprint");
                return `<li><span>${escapeHtml(item.year || "")}</span><div>${href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${title}</a>` : `<strong>${title}</strong>`}<small>${venue}</small></div></li>`;
              })
              .join("")}
          </ol>
          <p><a class="text-link" href="${routeUrl("publications/")}">View all selected publications</a></p>
        </div>
      </div>
    </section>

    <section class="section shell reading-column">
      <h2 class="section-heading">About the lab</h2>
      <p>Led by Professor Nima Mesgarani, NAPLab is affiliated with Columbia Engineering, the Zuckerman Mind Brain Behavior Institute, and the Center for Neural Engineering and Computation. Our work connects fundamental questions about hearing with practical systems for communication.</p>
      <figure class="home-group-photo">
        <img src="${assetUrl("/assets/img/gallery/group.jpg")}" alt="Members of the Neural Acoustic Processing Lab" />
        <figcaption>Members of NAPLab at Columbia University.</figcaption>
      </figure>
    </section>`;
};

const researchAreas = [
  {
    title: "Auditory cognition and cortical computation",
    copy: "We investigate how auditory cortex represents speech, language, and music, and how those representations support robust perception in noisy and changing environments.",
    topics: ["Speech and language encoding", "Naturalistic listening", "Music perception", "Temporal integration in cortex"],
    image: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/8ff0/10417567/f4babd58d918/nihms-1919650-f0001.jpg",
    alt: "Electrode coverage and neural encoding analysis from an auditory cortex study",
    caption: "Hierarchical linguistic encoding in auditory cortex, Nature Human Behaviour (2023).",
    link: "https://www.nature.com/articles/s41562-023-01520-0",
  },
  {
    title: "Auditory brain–computer interfaces",
    copy: "We build systems that infer which speaker a listener is attending to and use neural signals to guide selective hearing and assistive audio technology in real time.",
    topics: ["Auditory attention decoding", "Real-time neural signal processing", "Neuro-steered hearing devices", "Human-centered evaluation"],
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41593-026-02281-5/MediaObjects/41593_2026_2281_Fig1_HTML.png",
    alt: "Experimental paradigm for a real-time brain-controlled selective hearing system",
    caption: "Real-time brain-controlled selective hearing, Nature Neuroscience (2026).",
    link: "https://www.nature.com/articles/s41593-026-02281-5",
    className: "research-figure--panel-a",
  },
  {
    title: "Artificial intelligence for speech and audio",
    copy: "We develop generative and separation models for speech and audio, and use deep networks as testable computational models of biological hearing.",
    topics: ["Speech separation and enhancement", "Generative speech and audio", "Brain–model correspondence", "Interpretable representations"],
    image: "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/98ea/11759097/ae19efc287c9/nihms-2009026-f0002.jpg",
    alt: "Training and inference architecture for a generative speech system",
    caption: "StyleTTS 2 generative speech architecture, NeurIPS (2023).",
    link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/3eaad2a0b62b5ed7a2e66c2188bb1449-Abstract-Conference.html",
  },
];

const renderResearch = () => `
  <div class="shell">
    ${pageIntro("Research", temporarilyHiddenPageLead("We combine experiments, neural recordings, signal processing, and machine learning to understand auditory communication."))}
    <section class="section research-list" aria-label="Research areas">
      ${researchAreas
        .map(
          (area) => `<article class="research-item">
            <div>
              <h2>${escapeHtml(area.title)}</h2>
              <p>${escapeHtml(area.copy)}</p>
              <ul>${area.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ul>
              ${externalLink("Representative publication", area.link)}
            </div>
            <figure class="research-figure ${area.className || ""}">
              <a href="${escapeHtml(area.link)}" target="_blank" rel="noopener noreferrer">
                <img src="${escapeHtml(area.image)}" alt="${escapeHtml(area.alt)}" loading="lazy" referrerpolicy="no-referrer" />
              </a>
              <figcaption>${escapeHtml(area.caption)}</figcaption>
            </figure>
          </article>`,
        )
        .join("")}
    </section>
    <section class="section reading-column">
      <h2 class="section-heading">Methods</h2>
      <p>Our research draws on intracranial and non-invasive neural recordings, behavioral experiments, machine learning, computational modeling, and real-time system design.</p>
    </section>
  </div>`;

const personWebsite = (person) => safeExternalUrl(person?.profile_url || person?.contacts?.website || "");

const renderPerson = (person) => {
  const website = personWebsite(person);
  return `<article class="person">
    <img class="person-photo" src="${assetUrl(person.avatar)}" alt="Portrait of ${escapeHtml(person.name)}" loading="lazy" />
    <h3 class="person-name">${website ? `<a href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(person.name)}</a>` : escapeHtml(person.name)}</h3>
    <p class="person-role">${escapeHtml(person.title || "Researcher")}</p>
  </article>`;
};

const renderAlumnus = (alumnus) => {
  if (typeof alumnus === "string") return `<li>${escapeHtml(alumnus)}</li>`;
  const website = personWebsite(alumnus);
  const affiliationWebsite = safeExternalUrl(alumnus.current_affiliation_url);
  const name = website
    ? `<a href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(alumnus.name)}</a>`
    : escapeHtml(alumnus.name);
  const affiliation = affiliationWebsite
    ? `<a href="${escapeHtml(affiliationWebsite)}" target="_blank" rel="noopener noreferrer">${escapeHtml(alumnus.current_affiliation)}</a>`
    : escapeHtml(alumnus.current_affiliation);
  return `<li><strong>${name}</strong>${alumnus.current_affiliation ? `<span>${affiliation}</span>` : ""}</li>`;
};

const renderPeople = () => {
  const faculty = people.faculty[0];
  const facultyWebsite = personWebsite(faculty);
  const facultyEmail = faculty?.contacts?.email || "";
  return `
    <div class="shell">
      ${pageIntro("People", temporarilyHiddenPageLead("NAPLab is a collaborative group of engineers, neuroscientists, and computational researchers."))}
      ${
        faculty
          ? `<section class="section">
              <h2 class="section-heading">Principal investigator</h2>
              <article class="faculty-profile">
                <img class="faculty-photo" src="${assetUrl(faculty.avatar)}" alt="Portrait of ${escapeHtml(faculty.name)}" />
                <div class="faculty-details">
                  <h2>${escapeHtml(faculty.name)}</h2>
                  <p><strong>${escapeHtml(faculty.title)}</strong></p>
                  ${(faculty.affiliations || []).map((item) => `<p>${escapeHtml(item)}, Columbia University</p>`).join("")}
                  ${(faculty.highlights || []).length ? `<ul>${faculty.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
                  <p>${facultyWebsite ? externalLink("Faculty profile", facultyWebsite) : ""}${facultyWebsite && emailUrl(facultyEmail) ? " · " : ""}${emailUrl(facultyEmail) ? mailLink(facultyEmail, facultyEmail) : ""}</p>
                </div>
              </article>
            </section>`
          : ""
      }
      <section class="section">
        <h2 class="section-heading">Current members</h2>
        ${people.labMembers.length ? `<div class="people-grid">${people.labMembers.map(renderPerson).join("")}</div>` : '<p class="empty-state">Current member information will be added soon.</p>'}
      </section>
      <section class="section directory-grid">
        <div>
          <h2 class="section-heading">Collaborators</h2>
          <ul class="plain-list">${people.collaborators
            .map((person) => {
              const website = personWebsite(person);
              const name = website ? `<a href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(person.name)}</a>` : escapeHtml(person.name);
              return `<li><strong>${name}</strong>${person.affiliation ? `<span>${escapeHtml(person.affiliation)}</span>` : ""}</li>`;
            })
            .join("")}</ul>
        </div>
        <div>
          <h2 class="section-heading">Alumni</h2>
          <ul class="plain-list plain-list--compact alumni-list">${people.alumni.map(renderAlumnus).join("")}</ul>
        </div>
      </section>
    </div>`;
};

const renderPublications = () => {
  const years = [...new Set(publications.map((item) => String(item.year || "Other")))];
  return `
    <div class="shell">
      ${pageIntro("Publications", temporarilyHiddenPageLead("Selected work in auditory neuroscience, neural computation, speech technology, and brain–computer interfaces."))}
      <p class="reading-column">For a complete publication record, see ${externalLink("Nima Mesgarani’s Google Scholar profile", "https://scholar.google.com/citations?hl=en&user=DKhMx5gAAAAJ&view_op=list_works&sortby=pubdate")}.</p>
      <section class="section" aria-label="Selected publications">
        ${years
          .map(
            (year) => `<section class="publication-year">
              <h2 class="year-heading">${escapeHtml(year)}</h2>
              <ol class="publication-list">${publications.filter((item) => String(item.year || "Other") === year).map((item) => publicationItem(item)).join("")}</ol>
            </section>`,
          )
          .join("")}
      </section>
    </div>`;
};

const courses = [
  ["EEBME 9070", "Advanced Topics: Bio-Inspired Computation"],
  ["ELEN 6820", "Speech and Audio Signal Processing"],
  ["ECBME 4090", "Brain–Computer Interfaces Laboratory"],
  ["EEBME 9070", "Advanced Topics: Neural Processing of Acoustic Signals"],
];

const courseMaterials = [
  ["Design and experimental considerations", "labinstruction1.pdf"],
  ["Event-related potential basics", "labinstruction2.pdf"],
  ["Frequency-domain analysis", "labinstruction3.pdf"],
  ["Filtering and artifact removal", "labinstruction4.pdf"],
  ["Spatial filtering", "labinstruction5.pdf"],
  ["Classification", "labinstruction6.pdf"],
  ["Steady-state auditory responses", "labinstruction7.pdf"],
  ["Steady-state visually evoked responses", "labinstruction8.pdf"],
  ["Decoding imagined movement", "labinstruction9.pdf"],
  ["Project 1", "miniproject1.pdf"],
  ["Project 2", "miniproject2.pdf"],
];

const renderTeaching = () => `
  <div class="shell">
    ${pageIntro("Teaching", temporarilyHiddenPageLead("Courses connect auditory neuroscience with signal processing, brain–computer interfaces, and modern machine learning."))}
    <section class="section reading-column">
      <h2 class="section-heading">Courses</h2>
      <ul class="course-list">${courses.map(([code, title]) => `<li class="course-item"><span>${escapeHtml(code)}</span><strong>${escapeHtml(title)}</strong></li>`).join("")}</ul>
    </section>
    <section class="section reading-column">
      <h2 class="section-heading">Brain–Computer Interfaces Laboratory</h2>
      <p>ECBME 4090 provides hands-on experience with neural interface technologies, including scalp EEG recording, experimental design, real-time analysis of brain responses, and decoding perception and intention.</p>
      <p>${resourceLink("Read the course paper", assetUrl("/assets/files/finalbci.pdf"))}</p>
      <h3>Open course materials</h3>
      <ol class="materials-list">${courseMaterials
        .map(([title, file], index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><a href="${assetUrl(`/assets/files/${file}`)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a><small>PDF</small></li>`)
        .join("")}</ol>
    </section>
  </div>`;

const renderOpportunities = () => {
  const faculty = people.faculty[0];
  const email = faculty?.contacts?.email || "nima@ee.columbia.edu";
  const postdoctoralSection = `
    <h2 class="section-heading">Postdoctoral and research positions</h2>
    <p>Researchers with experience in auditory neuroscience, neural signal processing, speech and audio, or machine learning are encouraged to get in touch.</p>
    <p>${mailLink(`Email ${faculty?.name || "Professor Mesgarani"}`, email)}</p>`;
  return `
    <div class="shell">
      ${pageIntro("Opportunities", temporarilyHiddenPageLead("We welcome researchers who want to work across neuroscience, engineering, and artificial intelligence."))}
      <section class="section reading-column">
        <h2 class="section-heading">PhD study</h2>
        <p>Prospective doctoral students should apply through Columbia University’s Electrical Engineering PhD program and mention Prof. Mesgarani in the application.</p>
        <p>The application deadline is December 15.</p>
        <p>${externalLink("Columbia Electrical Engineering graduate admissions", "https://www.ee.columbia.edu/graduate-admissions")}</p>

        ${temporarilyHiddenSection(postdoctoralSection)}
      </section>
    </div>`;
};

const renderGallery = () => {
  return `
    <div class="shell">
      ${pageIntro("Gallery", temporarilyHiddenPageLead("A record of conferences, courses, celebrations, awards, and everyday life in the lab."))}
      <section class="section">
        <div class="gallery-grid">
          ${gallery
            .map((item) => {
              const caption = item.highlight || "NAPLab gallery";
              return `<figure class="gallery-item">
                <img src="${assetUrl(item.file)}" alt="${escapeHtml(caption)}" loading="lazy" />
                ${item.highlight ? `<figcaption>${escapeHtml(item.highlight)}</figcaption>` : ""}
              </figure>`;
            })
            .join("")}
        </div>
      </section>
    </div>`;
};

const renderContact = () => {
  const faculty = people.faculty[0];
  const email = faculty?.contacts?.email || "nima@ee.columbia.edu";
  return `
    <section class="home-intro">
      <div class="home-intro-art" aria-hidden="true">
        <img src="${assetUrl("/assets/img/contact/manhattanville-building.jpg")}" alt="" decoding="async" fetchpriority="high" />
      </div>
      <div class="shell"><div class="reading-column">
        <h1>Contact</h1>
        <p class="lead">NAPLab is located in Columbia University’s Jerome L. Greene Science Center in Manhattanville.</p>
      </div></div>
    </section>
    <div class="shell">
      <section class="section contact-grid">
        <div class="address-block">
          <h2 class="section-heading">Address</h2>
          <address>
            <strong>Neural Acoustic Processing Lab</strong><br />
            Jerome L. Greene Science Center, L3-028<br />
            3229 Broadway<br />
            New York, NY 10027
          </address>
          <p>${mailLink(email, email)}</p>
          <p>${externalLink("Open in Google Maps", "https://maps.google.com/?q=Jerome+L.+Greene+Science+Center+3229+Broadway+New+York")}</p>
        </div>
        <div>
          <h2 class="section-heading">Affiliations</h2>
          <ul class="plain-list">
            <li>${externalLink("Zuckerman Mind Brain Behavior Institute", "https://zuckermaninstitute.columbia.edu/")}</li>
            <li>${externalLink("Department of Electrical Engineering", "https://www.ee.columbia.edu/")}</li>
            <li>${externalLink("Center for Neural Engineering and Computation", "https://cnec.columbia.edu/")}</li>
          </ul>
        </div>
      </section>
    </div>`;
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

document.title = pageTitles[currentPage] || pageTitles.home;
document.querySelector("#site-header").innerHTML = renderHeader();
main.innerHTML = (pageRenderers[currentPage] || renderHome)();
document.querySelector("#site-footer").innerHTML = renderFooter();

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav?.classList.toggle("is-open", !expanded);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav?.classList.remove("is-open");
    menuToggle.focus();
  }
});
