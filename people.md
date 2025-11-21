---
layout: page
title: Team
subtitle: Meet the people behind our research
---

<style>
/* 卡片基础容器 */
.people-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.people-col {
  padding: 15px;
  box-sizing: border-box;
}

/* 动态卡片样式 */
.member-card {
  position: relative;
  display: block;
  height: 350px; /* 卡片高度，可根据需要调整 */
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

/* 背景图片层 */
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

/* 文字遮罩层 (用于有背景图的卡片) */
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

/* 无背景图的卡片样式 (Collaborators & Alumni) */
.member-card.simple-card {
  height: auto;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: #fff; /* 或者使用 #f4f4f4 */
}

.member-card.simple-card .member-info-simple {
  color: #333;
}

/* 字体样式调整 */
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

.member-affil {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 5px;
  display: block;
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
{% for person in site.data.people.collaborators %}
  {% assign link = person.contacts.website | default: "#" %}
  
  <div class="col-12 col-md-6 col-lg-4 people-col">
    <a href="{{ link }}" class="member-card simple-card">
      <div class="member-info-simple">
        <span class="member-name">{{ person.name }}</span>
        <span class="member-affil">{{ person.affiliation }}</span>
      </div>
    </a>
  </div>
{% endfor %}
</div>

<hr>

## Alumni
<div class="row">
{% for person in site.data.people.alumni %} <div class="col-6 col-md-4 col-lg-3 people-col">
    <div class="member-card simple-card" style="min-height: 80px; align-items: center;">
      <div class="member-info-simple text-center">
        <span class="member-name" style="font-size: 1rem;">{{ person }}</span>
      </div>
    </div>
  </div>
{% endfor %}
</div>