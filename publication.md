---
layout: page
permalink: /publication/
---

<style>
.pub-page-wrapper {
  max-width: 780px;
  margin: 0 auto;
}

.pub-intro {
  font-size: 1.0rem;
  line-height: 1.7;
  color: #31445e;
  margin-bottom: 1.8rem;
}

.pub-cards {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pub-card {
  display: block;
  background: #ffffff;
  color: #1e2d44;
  border-radius: 16px;
  padding: 18px 18px;
  border: 1px solid rgba(23, 76, 140, 0.12);
  box-shadow: 0 14px 26px rgba(17, 52, 94, 0.08);
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: transform 160ms ease, box-shadow 200ms ease, background-color 160ms ease;
}

.pub-card.has-link {
  cursor: pointer;
}

.pub-card.has-link:hover,
.pub-card.has-link:focus-within {
  transform: translateY(-3px);
  box-shadow: 0 20px 34px rgba(17, 52, 94, 0.14);
}

.pub-card-link {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
}

.pub-card-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(23, 76, 140, 0.45);
}

.pub-card-inner {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  position: relative;
  z-index: 2;
}

.pub-card-thumb {
  flex: 0 0 86px;
  height: 86px;
  border-radius: 12px;
  background-color: #eef3fb;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
}

.pub-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pub-card-body {
  flex: 1;
}

.pub-card-title {
  font-size: 1.0rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.pub-card-authors {
  font-size: 0.9rem;
  color: #3d5068;
  margin-bottom: 2px;
}

.pub-card-venue {
  font-size: 0.9rem;
  font-style: italic;
  color: #5a6f8b;
  margin-bottom: 4px;
}

.pub-card-tldr {
  font-size: 0.9rem;
  color: #31445e;
  margin-top: 4px;
}

.pub-card-meta {
  font-size: 0.82rem;
  color: #7a8aa3;
  margin-top: 4px;
}

@media (max-width: 600px) {
  .pub-card-inner {
    flex-direction: row;
  }

  .pub-card-thumb {
    flex: 0 0 72px;
    height: 72px;
  }
}
</style>

<div class="pub-page-wrapper">
  <p class="pub-intro">
    For a full list of publications, visit
    <a href="https://scholar.google.com/citations?hl=en&user=DKhMx5gAAAAJ&view_op=list_works&sortby=pubdate" target="_blank">Google Scholar</a>.
    Featured recent work is highlighted below.
  </p>

  {% assign sorted_pubs = site.data.pub | sort: "year" | reverse %}

  <section class="pub-cards">
    {% for pub in sorted_pubs %}
      {% assign href = pub.link %}
      {% if href == "" and pub.pdf and pub.pdf != "" %}
        {% assign href = pub.pdf %}
      {% endif %}

      <article class="pub-card{% if href and href != "" %} has-link{% endif %}">
        {% if href and href != "" %}
          <a class="pub-card-link" href="{{ href }}" target="_blank" aria-label="Open {{ pub.title }}"></a>
        {% endif %}

        <div class="pub-card-inner">
          <div class="pub-card-thumb">
            {% if pub.img and pub.img != "" %}
              <img src="{{ pub.img }}" alt="Thumbnail for {{ pub.title }}">
            {% else %}
              📄
            {% endif %}
          </div>

          <div class="pub-card-body">
            <div class="pub-card-title">{{ pub.title }}</div>
            <div class="pub-card-authors">{{ pub.authors }}</div>
            <div class="pub-card-venue">
              {{ pub.journal }}
              {% if pub.year %} ({{ pub.year }}){% endif %}{% if pub.volume %}, Vol. {{ pub.volume }}{% endif %}{% if pub.pages %}, pp. {{ pub.pages }}{% endif %}
            </div>

            {% if pub.tldr and pub.tldr != "" %}
              <div class="pub-card-tldr">{{ pub.tldr }}</div>
            {% endif %}
          </div>
        </div>
      </article>
    {% endfor %}
  </section>
</div>
