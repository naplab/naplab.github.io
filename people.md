---
layout: page
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
  background-color: #fff;
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
  filter: brightness(100%);
}

.member-card:hover .member-bg {
  transform: scale(1.08); /* 稍微缩小放大比例，更自然 */
}

/* --- 遮罩层与文字动画 (重点修改区域) --- */
.member-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* 默认状态：只有最底部有一点点黑，保证名字可见，上面全透明 */
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 35%);
  
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: background 0.4s ease;
}

/* 【修改点】悬停状态：不再全黑 */
/* 底部(0%)很黑以显示文字，中间(60%)半透明，顶部(100%)只保留淡淡的阴影(0.2) */
.member-card:hover .member-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.1) 100%);
}

/* 名字和头衔 */
.member-header {
  transform: translateY(0);
  transition: transform 0.4s ease;
  /* 始终保持文字阴影，这样即使背景不黑，文字也清晰 */
  text-shadow: 0 2px 5px rgba(0,0,0,0.9);
}

.member-card:hover .member-header {
  transform: translateY(-5px); /* 上移距离减小，更紧凑 */
}

.member-name {
  font-size: 1.25rem;
  font-weight: bold;
  display: block;
  line-height: 1.2;
}

.member-title {
  font-size: 0.9rem;
  opacity: 0.95;
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
  color: #fff; /* 纯白字 */
  /* 给学历文字也加阴影，这样背景即使比较亮也能看清 */
  text-shadow: 0 1px 3px rgba(0,0,0,0.9);
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
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.4);
}

/* --- Collaborators & Alumni --- */
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
  {% for person in site.data.people.collaborators %}
    <div class="col-12 col-md-6" style="margin-bottom: 25px; border: none;">
      
      {% if person.contacts.website %}
        <a href="{{ person.contacts.website }}" target="_blank" class="collab-name" style="font-size: 1.1rem; font-weight: normal; color: #333; display:block; text-decoration:none;">
          {{ person.name }}
        </a>
      {% else %}
        <span class="collab-name" style="font-size: 1.1rem; font-weight: normal; color: #333; display:block;">
          {{ person.name }}
        </span>
      {% endif %}

      <div class="collab-affil">
        {{ person.affiliation }}
      </div>

    </div>
  {% endfor %}
</div>

<hr>

## Alumni
<div class="row">
  {% for person in site.data.people.alumni %}
    <div class="col-12 col-sm-6 col-md-4" style="margin-bottom: 20px;">
      <span style="font-size: 1.1rem; font-weight: normal; color: #333; display: block;">
        {{ person }}
      </span>
    </div>
  {% endfor %}
</div>