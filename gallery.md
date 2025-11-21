---
layout: page
title: "Gallery"
permalink: /gallery/
---

<style>
/* Grid layout similar to people.md */
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.gallery-col {
  padding: 15px;
  box-sizing: border-box;
}

/* Square card container */
.gallery-card {
  position: relative;
  width: 100%;
  padding-top: 100%; /* Forces the card to be a perfect square */
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

/* Hover lift effect */
.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.2);
  z-index: 10;
}

/* Background image */
.gallery-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center center;
  transition: transform 0.5s ease;
}

/* Background zoom on hover */
.gallery-card:hover .gallery-bg {
  transform: scale(1.06);
}

/* Overlay that holds text */
.gallery-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px;
  color: #fff;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0, rgba(0,0,0,0.05) 45, rgba(0,0,0,0) 100);
  opacity: 0;
  transition: opacity 0.35s ease, background 0.35s ease;
}

/* Overlay becomes darker and visible on hover */
.gallery-card:hover .gallery-overlay {
  opacity: 1;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0, rgba(0,0,0,0.4) 55, rgba(0,0,0,0.05) 100);
}

/* Year label */
.gallery-year {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
  opacity: 0.9;
  text-shadow: 0 1px 3px rgba(0,0,0,0.9);
}

/* Highlight text */
.gallery-highlight {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  text-shadow: 0 2px 5px rgba(0,0,0,0.9);
}
</style>

## Gallery

{% assign grouped_gallery = site.data.gallery | group_by: "year" | sort: "name" | reverse %}

{% for group in grouped_gallery %}
### {{ group.name }}

<div class="row gallery-grid">
  {% for item in group.items %}
    <div class="col-12 col-sm-6 col-md-3 gallery-col">

      <!-- Gallery card -->
      <div class="gallery-card">
        <!-- Background image -->
        <div class="gallery-bg" style="background-image: url('{{ item.file }}');"></div>

        <!-- Overlay with year and highlight text -->
        <div class="gallery-overlay">
          <div class="gallery-year">{{ item.year }}</div>
          <div class="gallery-highlight">{{ item.highlight }}</div>
        </div>
      </div>

    </div>
  {% endfor %}
</div>

{% endfor %}
