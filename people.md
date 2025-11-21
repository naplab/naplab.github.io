---
layout: page
title: Team
subtitle: Meet the people behind our research
---

<style>
/* --- 基础布局 --- */
.people-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}
.people-col {
  padding: 15px;
  box-sizing: border-box;
}

/* --- 动态卡片核心样式 --- */
.member-card {
  position: relative;
  display: block;
  height: 400px; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none !important;
  background-color: #fff; /* 背景改为纯白，防止图片加载前透出灰色 */
  border: 1px solid #eee;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.2);
  z-index: 10;
}

/* 背景图 */
.member-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center top;
  transition: transform 0.5s ease;
  /* 确保图片亮度正常，不做任何滤镜处理 */
  filter: brightness(100%); 
}

.member-card:hover .member-bg {
  transform: scale(1.1); 
}

/* --- 遮罩层与文字动画 (关键修改点) --- */
.member-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* 【修改点】：默认状态下，渐变黑色只占底部 30%，上面 70% 完全透明，保证头像明亮 */
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 30%);
  
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: background 0.4s ease; /* 背景色过渡动画 */
}

/* 悬停时：背景变深，以便阅读学历文字 */
.member-card:hover .member-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 100%);
}

/* 名字和头衔 */
.member-header {
  transform: translateY(0);
  transition: transform 0.4s ease;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8); /* 加强文字阴影，防止背景亮时看不清字 */
}

/* 悬停时名字上移 */
.member-card:hover .member-header {
  transform: translateY(-10px);
  text-shadow: none; /* 背景变黑了，就不需要很重的文字阴影了 */
}

.member-name {
  font-size: 1.25rem;
  font-weight: bold;
  display: block;
  line-height: 1.2;
}

.member-title {
  font-size: 0.9rem;
  opacity: 0.95; /* 提高一点不透明度 */
  display: block;
  font-style: italic;
  margin-bottom: 5px;
}

/* --- 学历详细信息 --- */
.member-details {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  font-size: 0.85rem;
  color: #eee; /* 字体颜色稍微亮一点 */
}

.member-details ul {
  padding-left: 15px;
  margin: 0;
  list-style-type: disc;
}

.member-details li {
  margin-bottom: 4px;
  line-height: 1.3;
}

/* 悬停显示学历 */
.member-card:hover .member-details {
  max-height: 200px;
  opacity: 1;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.3);
}

/* --- 其他部分的样式 --- */
.collaborator-item {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.collaborator-item:last-child { border-bottom: none; }
.collab-name { font-size: 1.1rem; font-weight: bold; color: #333; }
.collab-affil { font-size: 0.95rem; color: #666; margin-top: 2px; }
.alumni-list-item { font-size: 1rem; color: #333; margin-bottom: 10px; }
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
        <div class="member-header">
          <span class="member-name">{{ person.name }}</span>
          <span class="member-title">{{ person.title }}</span>
        </div>
        {% if person.highlights %}
        <div class="member-details">
          <ul>
            {% for item in person.highlights %}
              <li>{{ item }}</li>
            {% endfor %}
          </ul>
        </div>
        {% endif %}
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
        <div class="member-header">
          <span class="member-name">{{ person.name }}</span>
          <span class="member-title">{{ person.title }}</span>
        </div>
        {% if person.degrees %}
        <div class="member-details">
          <ul>
            {% for degree in person.degrees %}
              <li>{{ degree }}</li>
            {% endfor %}
          </ul>
        </div>
        {% endif %}
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
        <div class="collab-affil">{{ person.affiliation }}</div>
      </div>
    {% endfor %}
  </div>
</div>

<hr>

## Alumni
<div class="row">
  {% for person in site.data.people.alumni %}
    <div class="col-6 col-md-4">
      <div class="alumni-list-item">• {{ person }}</div>
    </div>
  {% endfor %}
</div>