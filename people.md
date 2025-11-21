---
layout: page
---

<style>
/* Basic layout */
.people-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}
.people-col {
  padding: 15px;
  box-sizing: border-box;
}

/* Core styles for dynamic cards */
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

/* Background image */
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
  transform: scale(1.08); /* Slightly reduced scale factor for more natural motion */
}

/* Overlay and text animation (key edited section) */
.member-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Default state: strong black at the bottom for text readability, top is fully transparent */
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0 percent, rgba(0,0,0,0) 35 percent);

  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: background 0.4s ease;
}

/* Hover state: no longer fully black */
/* Bottom is dark for text visibility, middle is semi transparent, top keeps a very light shadow */
.member-card:hover .member-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0 percent, rgba(0,0,0,0.6) 60 percent, rgba(0,0,0,0.1) 100 percent);
}

/* Name and title */
.member-header {
  transform: translateY(0);
  transition: transform 0.4s ease;
  /* Always keep text shadow so text stays readable even when background becomes lighter */
  text-shadow: 0 2px 5px rgba(0,0,0,0.9);
}

.member-card:hover .member-header {
  transform: translateY(-5px); /* Smaller upward motion for tighter spacing */
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

/* Academic details */
.member-details {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  font-size: 0.85rem;
  color: #fff; /* White text */
  /* Text shadow for readability against light backgrounds */
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

/* Show details on hover */
.member-card:hover .member-details {
  max-height: 200px;
  opacity: 1;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.4);
}

/* Collaborators and Alumni */
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
