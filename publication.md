---
layout: page
title: ""
---
## Feature Publications

For all publications, please check [Google Scholar](https://scholar.google.com/citations?hl=en&user=DKhMx5gAAAAJ&view_op=list_works&sortby=pubdate).

{% assign pubs = site.data.pub | sort: "year" | reverse %}
{% assign current_year = "" %}

{% for p in pubs %}
  {% if p.year != current_year %}
### {{ p.year }}
  {% assign current_year = p.year %}
  {% endif %}

- **{{ p.title }}**  
  {{ p.authors }}  
  *{{ p.journal }}{% if p.volume %}, {{ p.volume }}{% endif %}{% if p.pages %}, {{ p.pages }}{% endif %}*  
  {% if p.link and p.link != "" %}[Link]({{ p.link }}){% endif %}{% if p.pdf and p.pdf != "" %}{% if p.link and p.link != "" %} · {% endif %}[PDF]({{ p.pdf }}){% endif %}
{% endfor %}
