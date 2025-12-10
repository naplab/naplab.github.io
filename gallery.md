---
layout: page
permalink: /gallery/
---

<style>
/* Masonry (瀑布流) layout using CSS columns */
.gallery-grid {
  column-count: 1;
  column-gap: 20px;
}

@media (min-width: 576px) {
  .gallery-grid {
    column-count: 2;
  }
}

@media (min-width: 992px) {
  .gallery-grid {
    column-count: 3;
  }
}

.gallery-col {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  margin-bottom: 20px;
}

/* Card container that keeps image aspect ratio */
.gallery-card {
  position: relative;
  width: 100%;
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

/* Background image using an actual <img> to preserve aspect ratio */
.gallery-bg {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* Background zoom on hover */
.gallery-card:hover .gallery-bg {
  transform: scale(1.06);
}

/* Overlay that holds highlight text */
.gallery-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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

<div class="gallery-grid">
  {% for item in sorted_gallery %}
    <div class="gallery-col">

      <!-- Gallery card -->
      <div class="gallery-card">
        <!-- Image keeps original aspect ratio -->
        <img class="gallery-bg" src="{{ item.file }}" alt="{{ item.highlight }}">

        <!-- Overlay with highlight text only -->
        <div class="gallery-overlay">
          <div class="gallery-highlight">{{ item.highlight }}</div>
        </div>
      </div>

    </div>
  {% endfor %}
</div>
