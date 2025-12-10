---
layout: page
permalink: /gallery/
# gallery_mode can be "masonry" (瀑布流) or "square" (方块网格)
gallery_mode: square
---

<style>
/* Masonry (瀑布流) layout using CSS columns */
.gallery-grid-masonry {
  column-count: 1;
  column-gap: 20px;
}

@media (min-width: 576px) {
  .gallery-grid-masonry {
    column-count: 2;
  }
}

@media (min-width: 992px) {
  .gallery-grid-masonry {
    column-count: 3;
  }
}

.gallery-col-masonry {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  margin-bottom: 20px;
}

/* Square grid layout (previous version) */
.gallery-grid-square {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.gallery-col-square {
  padding: 10px;
  box-sizing: border-box;
}

@media (min-width: 0px) {
  .gallery-col-square {
    width: 100%;
  }
}

@media (min-width: 576px) {
  .gallery-col-square {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .gallery-col-square {
    width: 33.3333%;
  }
}

/* Card container */
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

/* Background image using an actual <img>
 * Masonry mode: keep original aspect ratio (height auto)
 * Square mode: force square crop using fixed height
 */
.gallery-bg {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* Square mode: crop to square */
.gallery-card-square .gallery-bg {
  height: 100%;
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
{% assign mode = page.gallery_mode | default: "masonry" %}

{% if mode == "square" %}
  <!-- Square grid mode (方块网格) -->
  <div class="gallery-grid-square">
    {% for item in sorted_gallery %}
      <div class="gallery-col-square">

        <!-- Square gallery card -->
        <div class="gallery-card gallery-card-square">
          <div style="position: relative; width: 100%; padding-top: 100%; overflow: hidden;">
            <!-- Image fills the square and is cropped with object-fit -->
            <img class="gallery-bg" src="{{ item.file }}" alt="{{ item.highlight }}" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;">

            <!-- Overlay with highlight text only -->
            <div class="gallery-overlay">
              <div class="gallery-highlight">{{ item.highlight }}</div>
            </div>
          </div>
        </div>

      </div>
    {% endfor %}
  </div>
{% else %}
  <!-- Masonry (瀑布流) mode -->
  <div class="gallery-grid-masonry">
    {% for item in sorted_gallery %}
      <div class="gallery-col-masonry">

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
{% endif %}
