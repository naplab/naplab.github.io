---
layout: page
---

<style>
/* --- Part 1: 顶部卡片样式 (仅用于 Faculty 和 Lab Members) --- */
.people-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.people-col {
  padding: 15px;
  box-sizing: border-box;
}

.member-card {
  position: relative;
  display: block;
  height: 350px; /* 卡片高度 */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none !important;
  background-color: #f8f9fa;
  border: 1px solid #eee;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.2);
}

.member-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
  transition: transform 0.5s ease;
}

.member-card:hover .member-bg {
  transform: scale(1.05);
}

.member-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%);
  padding: 20px 15px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}

.member-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.member-title {
  font-size: 0.9rem;
  opacity: 0.9;
  display: block;
  font-style: italic;
}

/* --- Part 2: 底部文本样式 (用于 Collaborators 和 Alumni) --- */
.collaborator-item {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee; /* 可选：每人之间加一条极淡的分隔线 */
}

.collaborator-item:last-child {
  border-bottom: none;
}

.collab-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.collab-affil {
  font-size: 0.95rem;
  color: #666;
  margin-top: 2px;
}

.alumni-list-item {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}
</style>

## Principal Investigator
<div class="row">
{% for person in site.data.people.faculty %}
  {% assign link = person.profile_url | default: person.contacts.website %}
  {% unless link %}{% assign link = "mailto:" | append: person.contacts.email %}{% endunless %}
  
  <div class="col-12 col-md-6 col-lg-4 people-col">
    <a href="{{ link }}" class="member-card" target="_blank">
      <div class="member-bg" style="background-image: url('{{ person.avatar }}');"></div>
      <div class="member-overlay">
        <span class="member-name">{{ person.name }}</span>
        <span class="member-title">{{ person.title }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>

<hr>

## Lab Members
<div class="row">
{% for person in site.data.people.lab_members %}
  {% assign link = "#" %}
  {% if person.contacts.website %}
    {% assign link = person.contacts.website %}
  {% elsif person.contacts.email != "" %}
    {% assign link = "mailto:" | append: person.contacts.email %}
  {% endif %}

  <div class="col-12 col-md-6 col-lg-4 people-col">
    <a href="{{ link }}" class="member-card">
      <div class="member-bg" style="background-image: url('{{ person.avatar }}');"></div>
      <div class="member-overlay">
        <span class="member-name">{{ person.name }}</span>
        <span class="member-title">{{ person.title }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>

<hr>

## Collaborators
<div class="row">
  <div class="col-12">
    {% for person in site.data.people.collaborators %}
      <div class="collaborator-item">
        {% if person.contacts.website %}
          <a href="{{ person.contacts.website }}" target="_blank" class="collab-name">{{ person.name }}</a>
        {% else %}
          <span class="collab-name">{{ person.name }}</span>
        {% endif %}
        
        <div class="collab-affil">
          {{ person.affiliation }}
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<hr>

## Alumni
<div class="row">
  {% for person in site.data.people.alumni %}
    <div class="col-6 col-md-4">
      <div class="alumni-list-item">
        • {{ person }}
      </div>
    </div>
  {% endfor %}
</div>