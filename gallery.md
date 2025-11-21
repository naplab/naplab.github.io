---
layout: page
title: ""
permalink: /gallery/
---

<style>
/* Grid layout similar to people.md but with larger cards */
.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.gallery-col {
  padding: 10px;
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
  box-shadow: 0 6px 10px rgba(0,0,0,0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

/* Hover lift effect */
.gallery-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 28px rgba(0,0,0,0.22);
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

/* Overlay that holds highlight text */
.gallery-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px;
  color: #fff;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity 0.35s ease, background 0.35s ease;
}

/* Overlay becomes darker and visible on hover */
.gallery-card:hover .gallery-overlay {
  opacity: 1;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.1) 100%);
}

/* Highlight text only */
.gallery-highlight {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  text-shadow: 0 2px 5px rgba(0,0,0,0.9);
}
</style>

{% assign sorted_gallery = site.data.gallery | sort: "year" | reverse %}

<div class="row gallery-grid">
  {% for item in sorted_gallery %}
    <di
