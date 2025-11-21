---
layout: page
title: People
permalink: /people_old/
description: Meet the Neurotech X Columbia team and alumni.
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

<div class="people-grid">
{% assign members = site.data.people | where: "status", "current" %}
{% for p in members %}
  <div class="person">
    <img src="{{ p.avatar | relative_url }}" alt="{{ p.name }}">
    <div class="name">{{ p.name }}</div>
    <div class="role">{{ p.role }}</div>

    {% if p.affiliation %}
      <div class="affiliation"><em>{{ p.affiliation }}</em></div>
    {% endif %}
    <div class="links">
      {% if p.website %}<a href="{{ p.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
      {% if p.email %}<a href="mailto:{{ p.email }}">Email</a>{% endif %}
    </div>
  </div>
{% endfor %}
</div>

---

# Alumni

<div class="people-grid">
{% assign alumni = site.data.people | where: "status", "alumni" %}
{% for p in alumni %}
  <div class="person">
    <img src="{{ p.avatar | relative_url }}" alt="{{ p.name }}">
    <div class="name">{{ p.name }}</div>
    <div class="role">{{ p.role }}</div>

    {% if p.affiliation %}
      <div class="affiliation"><em>{{ p.affiliation }}</em></div>
    {% endif %}
    <div class="links">
      {% if p.website %}<a href="{{ p.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
      {% if p.email %}<a href="mailto:{{ p.email }}">Email</a>{% endif %}
    </div>
  </div>
{% endfor %}
</div>
