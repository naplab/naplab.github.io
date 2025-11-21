---
layout: page
permalink: /publication/
---
For all publications, check [Google Scholar](https://scholar.google.com/citations?hl=en&user=DKhMx5gAAAAJ&view_op=list_works&sortby=pubdate). Recent feature publications are listed below.

{% assign sorted_pubs = site.data.pub | sort: "year" | reverse %}

<ul class="pub-list" style="list-style-type: none; padding-left: 0;">
  {% for pub in sorted_pubs %}
  <li style="margin-bottom: 18px; font-size: 0.95em;">
    <div class="pub-title" style="font-weight: 600; font-size: 1.0em;">
      {{ pub.title }}
    </div>
    <div class="pub-authors" style="font-size: 0.9em;">
      {{ pub.authors }}
    </div>
    <div class="pub-journal" style="font-style: italic; color: #555; font-size: 0.9em;">
      {{ pub.journal| replace: 'Nature  ', 'Nature ' | strip }}
      {% if pub.year %} ({{ pub.year}}){% endif %}
      {% if pub.volume %}, Vol. {{ pub.volume}}{% endif %}
      {% if pub.pages %}, pp. {{ pub.pages }}{% endif %}
    </div>

    {% if pub.pdf != "" or pub.link != "" %}
    <div class="pub-links" style="margin-top: 4px; font-size: 0.85em;">
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
