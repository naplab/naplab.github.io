---
layout: page
title: People
permalink: /people_old/
description: Meet the NapLab @ Columbia team and alumni.
---

# Our Team

<style>
.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 28px;
  margin-top: 18px;
}
.person {
  text-align: center;
  padding: 16px 10px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
}
.person img {
  width: 140px; height: 140px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 12px;
}
.person .name { font-size: 1.05rem; font-weight: 700; margin: 2px 0; }
.person .role { color: #666; margin: 0 0 4px; }
.person .affiliation { color:#555; font-size:0.9rem; margin:0 0 8px; font-style: italic; }
.person .links a { margin: 0 6px; }
</style>

{% assign legacy_faculty = site.data.people.faculty | default: empty %}
{% assign legacy_lab = site.data.people.lab_members | default: empty %}

<div class="people-grid">
{% for person in legacy_faculty %}
  <div class="person">
    {% if person.avatar %}
      <img src="{{ person.avatar | relative_url }}" alt="{{ person.name }}">
    {% endif %}
    <div class="name">{{ person.name }}</div>
    {% if person.title %}<div class="role">{{ person.title }}</div>{% endif %}

    {% if person.affiliations %}
      <div class="affiliation">
        {% for item in person.affiliations %}
          <div>{{ item }}</div>
        {% endfor %}
      </div>
    {% endif %}
    <div class="links">
      {% if person.contacts.website %}<a href="{{ person.contacts.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
      {% if person.contacts.email %}<a href="mailto:{{ person.contacts.email }}">Email</a>{% endif %}
    </div>
  </div>
{% endfor %}

{% for person in legacy_lab %}
  <div class="person">
    {% if person.avatar %}
      <img src="{{ person.avatar | relative_url }}" alt="{{ person.name }}">
    {% endif %}
    <div class="name">{{ person.name }}</div>
    {% if person.title %}<div class="role">{{ person.title }}</div>{% endif %}

    {% if person.degrees %}
      <div class="affiliation">
        {% for degree in person.degrees %}
          <div>{{ degree }}</div>
        {% endfor %}
      </div>
    {% endif %}
    <div class="links">
      {% if person.contacts.website %}<a href="{{ person.contacts.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
      {% if person.contacts.email %}<a href="mailto:{{ person.contacts.email }}">Email</a>{% endif %}
    </div>
  </div>
{% endfor %}
</div>

---

# Alumni

{% assign legacy_alumni = site.data.people.alumni | default: empty %}

<div class="people-grid">
{% for name in legacy_alumni %}
  <div class="person">
    <div class="name">{{ name }}</div>
  </div>
{% endfor %}
</div>
