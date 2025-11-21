---
layout: page
title: People
permalink: /people/
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
.section-title { margin-top: 28px; font-size: 1.25rem; font-weight: 800; }
</style>

{% assign current = site.data.people | where: "status", "current" %}

<div class="section-title">E-board</div>
<div class="people-grid">
  {% assign eboard = current | where: "group", "eboard" %}
  {% for p in eboard %}
    <div class="person">
      <img src="{{ p.avatar | relative_url }}" alt="{{ p.name }}">
      <div class="name">{{ p.name }}</div>
      <div class="role">{{ p.role }}</div>
      {% if p.affiliation %}<div class="affiliation"><em>{{ p.affiliation }}</em></div>{% endif %}
      <div class="links">
        {% if p.website %}<a href="{{ p.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
        {% if p.email %}<a href="mailto:{{ p.email }}">Email</a>{% endif %}
      </div>
    </div>
  {% endfor %}
</div>

<div class="section-title">Project Leads</div>
<div class="people-grid">
  {% assign leads = current | where: "group", "project_lead" %}
  {% for p in leads %}
    <div class="person">
      <img src="{{ p.avatar | relative_url }}" alt="{{ p.name }}">
      <div class="name">{{ p.name }}</div>
      <!-- <div class="role">{{ p.role }}</div> -->
      {% if p.affiliation %}<div class="affiliation"><em>{{ p.affiliation }}</em></div>{% endif %}
      <div class="links">
        {% if p.website %}<a href="{{ p.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
        {% if p.email %}<a href="mailto:{{ p.email }}">Email</a>{% endif %}
      </div>
    </div>
  {% endfor %}
</div>

<div class="section-title">Advisors</div>
<div class="people-grid">
  {% assign advisors = current | where: "group", "advisor" %}
  {% for p in advisors %}
    <div class="person">
      <img src="{{ p.avatar | relative_url }}" alt="{{ p.name }}">
      <div class="name">{{ p.name }}</div>
      <!-- <div class="role">{{ p.role }}</div> -->
      {% if p.affiliation %}<div class="affiliation"><em>{{ p.affiliation }}</em></div>{% endif %}
      <div class="links">
        {% if p.website %}<a href="{{ p.website }}" target="_blank" rel="noopener">Website</a>{% endif %}
        {% if p.email %}<a href="mailto:{{ p.email }}">Email</a>{% endif %}
      </div>
    </div>
  {% endfor %}
</div>

<div style="text-align:center; margin-top:40px;">
  <a href="{{ '/alumni/' | relative_url }}" 
     style="font-weight:600; color:#0066cc; text-decoration:none;">
     → View Alumni
  </a>
</div>
