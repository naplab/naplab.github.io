---
layout: page
title: Project
permalink: /project/
---

<style>
/* fix mode */

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  margin-top: 18px;
  align-items: start;
}
.project {
  text-align: left;
  padding: 18px 16px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  transition: box-shadow 0.2s ease;
}


/* masonry mode */
/*
.projects-grid {
  column-count: 2;            
  column-gap: 28px;           
  margin-top: 18px;
}

.project {
  display: inline-block;
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 18px 16px;
  margin-bottom: 28px;        
  break-inside: avoid;       
  transition: box-shadow 0.2s ease;
}
*/


.project:hover {
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}
.project .name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
}
.project .lead {
  color: #555;
  font-style: italic;
  margin-bottom: 8px;
}
.project .description {
  color: #444;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 10px;
}
.project .keywords {
  margin-top: 6px;
}
.project .keyword {
  display: inline-block;
  background: #f2f2f2;
  color: #555;
  font-size: 0.85rem;
  padding: 3px 8px;
  border-radius: 8px;
  margin: 2px 4px 0 0;
}
.project .status {
  display: inline-block;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 3px 10px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.project .status.active {
  background: #e6f4ea;
  color: #137333;
}

.project .status.completed {
  background: #fce8e6;
  color: #a50e0e;
}

</style>

<div class="projects-grid">
{% for p in site.data.project %}
  <div class="project">
    <div class="name">{{ p.name }}</div>
    {% if p.status %}
        <div class="status {{ p.status | downcase }}">{{ p.status }}</div>
    {% endif %}
    {% if p.lead %}
      <div class="lead">Lead: {{ p.lead }}</div>
    {% endif %}
    {% if p.description %}
      <div class="description">{{ p.description | markdownify }}</div>
    {% endif %}
    {% if p.keywords %}
      <div class="keywords">
        {% for kw in p.keywords %}
          <span class="keyword">{{ kw }}</span>
        {% endfor %}
      </div>
    {% endif %}
  </div>
{% endfor %}
</div>
