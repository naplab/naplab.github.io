---
layout: page
permalink: /people/
description: Meet the NapLab @ Columbia team and alumni.
full-width: true
---

{% assign faculty = site.data.people.faculty | default: empty %}
{% assign lab_members = site.data.people.lab_members | default: empty %}
{% assign collaborators = site.data.people.collaborators | default: empty %}
{% assign alumni = site.data.people.alumni | default: empty %}

<div class="people-page">
  {% if faculty.size > 0 %}
  <section class="section-block">
    <h2 class="section-heading">Faculty</h2>
    <div class="person-card-grid">
      {% for person in faculty %}
        {% assign card_href = person.profile_url %}
        {% if card_href == nil or card_href == '' %}
          {% if person.contacts.website %}
            {% assign card_href = person.contacts.website %}
          {% elsif person.contacts.email %}
            {% assign card_href = 'mailto:' | append: person.contacts.email %}
          {% endif %}
        {% endif %}
        {% capture card_style -%}
          {%- if person.avatar and person.avatar != '' -%}--card-photo: url('{{ person.avatar | relative_url }}');{%- endif -%}
        {%- endcapture %}
        {% assign open_new = false %}
        {% if card_href and card_href contains 'http' %}
          {% assign open_new = true %}
        {% endif %}
        {% if card_href %}
          <a class="person-card person-card--with-photo" style="{{ card_style | strip }}" href="{{ card_href }}" {% if open_new %}target="_blank" rel="noopener"{% endif %}>
        {% else %}
          <div class="person-card person-card--with-photo" style="{{ card_style | strip }}">
        {% endif %}
            <div class="person-card__content">
              <div>
                <h3 class="person-card__name">{{ person.name }}</h3>
                <div class="person-card__links">
                  {% if person.contacts.email and person.contacts.email != '' %}
                    <a href="mailto:{{ person.contacts.email }}">email</a>
                  {% endif %}
                  {% if person.contacts.website %}
                    <a href="{{ person.contacts.website }}" target="_blank" rel="noopener">web</a>
                  {% endif %}
                </div>
                {% if person.title %}<p class="person-card__title">{{ person.title }}</p>{% endif %}
                {% if person.affiliations %}
                  <div class="person-card__affiliations">
                    {% for item in person.affiliations %}
                      <div>{{ item }}</div>
                    {% endfor %}
                  </div>
                {% endif %}
              </div>
              {% if person.highlights %}
                <ul class="person-card__list">
                  {% for item in person.highlights %}
                    <li>{{ item }}</li>
                  {% endfor %}
                </ul>
              {% endif %}
            </div>
        {% if card_href %}
          </a>
        {% else %}
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>
  {% endif %}

  {% if lab_members.size > 0 %}
  <section class="section-block">
    <h2 class="section-heading">Lab Members</h2>
    <div class="person-card-grid">
      {% for person in lab_members %}
        {% assign card_href = person.profile_url %}
        {% if card_href == nil or card_href == '' %}
          {% if person.contacts.website %}
            {% assign card_href = person.contacts.website %}
          {% elsif person.contacts.email and person.contacts.email != '' %}
            {% assign card_href = 'mailto:' | append: person.contacts.email %}
          {% endif %}
        {% endif %}
        {% capture card_style -%}
          {%- if person.avatar and person.avatar != '' -%}--card-photo: url('{{ person.avatar | relative_url }}');{%- endif -%}
        {%- endcapture %}
        {% assign open_new = false %}
        {% if card_href and card_href contains 'http' %}
          {% assign open_new = true %}
        {% endif %}
        {% if card_href %}
          <a class="person-card person-card--with-photo" style="{{ card_style | strip }}" href="{{ card_href }}" {% if open_new %}target="_blank" rel="noopener"{% endif %}>
        {% else %}
          <div class="person-card person-card--with-photo" style="{{ card_style | strip }}">
        {% endif %}
            <div class="person-card__content">
              <div>
                <h3 class="person-card__name">{{ person.name }}</h3>
                <div class="person-card__links">
                  {% if person.contacts.email and person.contacts.email != '' %}
                    <a href="mailto:{{ person.contacts.email }}">email</a>
                  {% endif %}
                  {% if person.contacts.website %}
                    <a href="{{ person.contacts.website }}" target="_blank" rel="noopener">web</a>
                  {% endif %}
                </div>
                {% if person.title %}<p class="person-card__title">{{ person.title }}</p>{% endif %}
              </div>
              {% if person.degrees %}
                <ul class="person-card__list">
                  {% for item in person.degrees %}
                    <li>{{ item }}</li>
                  {% endfor %}
                </ul>
              {% endif %}
            </div>
        {% if card_href %}
          </a>
        {% else %}
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>
  {% endif %}

  {% if collaborators.size > 0 %}
  <section class="section-block">
    <h2 class="section-heading">Collaborators</h2>
    <div class="person-card-grid person-card-grid--simple">
      {% for person in collaborators %}
        {% assign card_href = person.profile_url %}
        {% if card_href == nil or card_href == '' %}
          {% if person.contacts.website %}
            {% assign card_href = person.contacts.website %}
          {% elsif person.contacts.email %}
            {% assign card_href = 'mailto:' | append: person.contacts.email %}
          {% endif %}
        {% endif %}
        {% assign open_new = false %}
        {% if card_href and card_href contains 'http' %}
          {% assign open_new = true %}
        {% endif %}
        {% if card_href %}
          <a class="person-card person-card--simple" href="{{ card_href }}" {% if open_new %}target="_blank" rel="noopener"{% endif %}>
        {% else %}
          <div class="person-card person-card--simple">
        {% endif %}
            <div class="person-card__content">
              <div>
                <h3 class="person-card__name">{{ person.name }}</h3>
                <div class="person-card__links">
                  {% if person.contacts.email %}
                    <a href="mailto:{{ person.contacts.email }}">email</a>
                  {% endif %}
                  {% if person.contacts.website %}
                    <span>website</span>
                  {% endif %}
                </div>
                {% if person.affiliation %}
                  <p class="person-card__title">{{ person.affiliation }}</p>
                {% endif %}
              </div>
            </div>
        {% if card_href %}
          </a>
        {% else %}
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>
  {% endif %}

  {% if alumni.size > 0 %}
  <section class="section-block">
    <h2 class="section-heading">Former Lab Members</h2>
    <div class="person-card-grid person-card-grid--alumni">
      {% for name in alumni %}
        <div class="person-card person-card--simple">
          <div class="person-card__content">
            <h3 class="person-card__name">{{ name }}</h3>
          </div>
        </div>
      {% endfor %}
    </div>
  </section>
  {% endif %}
</div>

<style>
  .people-page {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 64px;
  }

  .section-heading {
    font-size: clamp(1.6rem, 2vw, 2rem);
    font-weight: 800;
    margin-bottom: 18px;
  }

  .person-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 28px;
  }

  .person-card {
    position: relative;
    border-radius: 22px;
    padding: 26px 26px 30px;
    text-decoration: none;
    overflow: hidden;
    transition: transform 180ms ease, box-shadow 220ms ease;
    box-shadow: 0 18px 34px rgba(17, 52, 94, 0.12);
    background: #ffffff;
    color: #1b2739;
    min-height: 240px;
    display: flex;
  }

  .person-card:hover,
  .person-card:focus-visible {
    transform: translateY(-6px);
    box-shadow: 0 26px 48px rgba(17, 52, 94, 0.18);
  }

  .person-card--with-photo {
    color: #f5f8ff;
    box-shadow: 0 22px 44px rgba(12, 32, 60, 0.34);
    background: #11223a;
  }

  .person-card--with-photo::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(210deg, rgba(17, 39, 70, 0.75), rgba(17, 39, 70, 0.55)),
      var(--card-photo, linear-gradient(135deg, #244b7a, #0d2035));
    background-size: cover;
    background-position: center;
    transition: transform 320ms ease;
  }

  .person-card--with-photo:hover::before,
  .person-card--with-photo:focus-visible::before {
    transform: scale(1.06);
  }

  .person-card__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }

  .person-card__name {
    font-size: 1.18rem;
    font-weight: 800;
    margin: 0;
  }

  .person-card__links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    font-weight: 600;
    text-transform: lowercase;
  }

  .person-card__links a,
  .person-card__links span {
    color: inherit;
    opacity: 0.88;
  }

  .person-card__links a:hover,
  .person-card__links a:focus {
    opacity: 1;
    text-decoration: underline;
  }

  .person-card__title {
    margin: 0;
    font-weight: 600;
    font-size: 0.98rem;
  }

  .person-card__affiliations {
    font-size: 0.92rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    opacity: 0.95;
  }

  .person-card__list {
    list-style: disc;
    padding-left: 1.2rem;
    margin: 0;
    font-size: 0.92rem;
    display: grid;
    gap: 6px;
  }

  .person-card--simple {
    background: linear-gradient(180deg, #ffffff, #f7faff);
    box-shadow: 0 16px 28px rgba(17, 52, 94, 0.12);
    color: #1f3044;
  }

  .person-card--simple .person-card__content {
    gap: 10px;
  }

  .person-card-grid--alumni .person-card {
    min-height: 140px;
    align-items: center;
    justify-content: center;
  }

  .person-card-grid--alumni .person-card__name {
    text-align: center;
    font-size: 1.05rem;
  }

  @media (max-width: 900px) {
    .people-page {
      gap: 48px;
    }
  }

  @media (max-width: 640px) {
    .person-card-grid {
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    }

    .person-card {
      padding: 24px;
    }

    .person-card--with-photo::before {
      background:
        linear-gradient(210deg, rgba(17, 39, 70, 0.8), rgba(17, 39, 70, 0.65)),
        var(--card-photo, linear-gradient(135deg, #244b7a, #0d2035));
    }
  }
</style>
