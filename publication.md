---
layout: page
title: ""
permalink: /publication/
---

For latest publications, please check [Google Scholar](https://scholar.google.com/citations?hl=en&user=DKhMx5gAAAAJ&view_op=list_works&sortby=pubdate).

## Feature Publications
{% assign grouped_pubs = site.data.pub | group_by: "year" | sort: "name" | reverse %}

{% for group in grouped_pubs %}
  <h2 id="y{{ group.name }}">{{ group.name }}</h2>
  
  <ul class="pub-list" style="list-style-type: none; padding-left: 0;">
    {% for pub in group.items %}
      <li style="margin-bottom: 20px;">
        <div class="pub-title" style="font-weight: bold; font-size: 1.1em;">
          {{ pub.title }}
        </div>
        
        <div class="pub-authors">
          {{ pub.authors }}
        </div>
        
        <div class="pub-journal" style="font-style: italic; color: #555;">
          {{ pub.journal }}
          {% if pub.volume%}, Vol. {{ pub.volume }}{% endif %}
          {% if pub.pages %}, pp. {{ pub.pages }}{% endif %}
        </div>

        {% if pub.pdf != "" or pub.link != "" %}
          <div class="pub-links" style="margin-top: 5px;">
            {% if pub.pdf and pub.pdf != "" %}
              <a href="{{ pub.pdf }}" target="_blank" style="margin-right: 10px;">[PDF]</a>
            {% endif %}
            {% if pub.link and pub.link != "" %}
              <a href="{{ pub.link }}" target="_blank">[Link]</a>
            {% endif %}
          </div>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
  <hr>
{% endfor %}
