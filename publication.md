---
layout: page
---
## Feature Publications

For all publications, please Check [Google Scholar:](https://scholar.google.com/citations?hl=en&user=DKhMx5gAAAAJ&view_op=list_works&sortby=pubdate)

<style>
.pub-year-header {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.pub-item {
  margin-bottom: 25px;
  padding-left: 10px;
  border-left: 3px solid transparent; 
  transition: border-color 0.3s ease;
}

.pub-item:hover {
  border-left-color: #007bff; 
}

.pub-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #000;
  display: block;
  margin-bottom: 4px;
  line-height: 1.4;
}

.pub-title a {
  color: #000;
  text-decoration: none;
}

.pub-title a:hover {
  color: #007bff;
  text-decoration: underline;
}

.pub-authors {
  font-size: 1rem;
  color: #444;
  margin-bottom: 4px;
  line-height: 1.5;
}

.pub-journal {
  font-size: 0.95rem;
  color: #666;
  font-style: italic;
}

.pub-links {
  margin-top: 6px;
  font-size: 0.85rem;
}

.pub-link-btn {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 8px;
  margin-right: 8px;
  color: #555;
  text-decoration: none !important;
  transition: all 0.2s;
}

.pub-link-btn:hover {
  background-color: #333;
  color: #fff;
  border-color: #333;
}
</style>

{% assign pubs = site.data.publications | sort: 'year' | reverse %}
{% assign current_year = "" %}

{% for pub in pubs %}
  
  {% assign post_year = pub.year | append: "" %}
  {% if post_year != current_year %}
    <h2 class="pub-year-header">{{ post_year }}</h2>
    {% assign current_year = post_year %}
  {% endif %}

  <div class="pub-item">
    <div class="pub-title">
      {% if pub.link and pub.link != "" %}
        <a href="{{ pub.link }}" target="_blank">{{ pub.title }}</a>
      {% else %}
        {{ pub.title }}
      {% endif %}
    </div>

    <div class="pub-authors">
      {{ pub.authors | replace: "Nima Mesgarani", "<strong>Nima Mesgarani</strong>" }}
    </div>

    <div class="pub-journal">
      {{ pub.journal }}
      {% if pub.volume %}, Vol. {{ pub.volume }}{% endif %}
      {% if pub.pages %}, pp. {{ pub.pages }}{% endif %}
    </div>

    {% if pub.pdf or pub.link %}
    <div class="pub-links">
      {% if pub.pdf and pub.pdf != "" %}
        <a href="{{ pub.pdf }}" class="pub-link-btn" target="_blank">PDF</a>
      {% endif %}
      {% if pub.link and pub.link != "" %}
        <a href="{{ pub.link }}" class="pub-link-btn" target="_blank">Publisher</a>
      {% endif %}
    </div>
    {% endif %}

  </div>

{% endfor %}