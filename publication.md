---
layout: page
title: Publications
permalink: /publications/
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

{% comment %}
将 authors 字符串转为数组，并把 "名字 姓" 转成 "首字母 姓"
{% endcomment %}

{% assign authors_raw = p.authors | split: "," %}
{% assign authors_clean = "" | split: "|" %}

{% for a in authors_raw %}
  {% assign name = a | strip %}
  {% assign parts = name | split: " " %}
  {% assign last = parts | last %}
  {% assign first = parts | first %}
  {% assign initial = first | slice: 0,1 %}
  {% assign formatted = initial | append: " " | append: last %}
  {% assign authors_clean = authors_clean | push: formatted %}
{% endfor %}

- {{ authors_clean | join: ", " }}. ({{ p.year }}). **{{ p.title }}**.  
  *{{ p.journal }}{% if p.volume %}, {{ p.volume }}{% endif %}{% if p.pages %}, {{ p.pages }}{% endif %}*.  
  {% if p.link %}[Link]({{ p.link }}){% endif %}{% if p.pdf %}{% if p.link %} · {% endif %}[PDF]({{ p.pdf }}){% endif %}
{% endfor %}
