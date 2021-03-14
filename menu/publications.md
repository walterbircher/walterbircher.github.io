---
layout: default
title: Publications
---

Peer-reviewed conference and journal papers

<h1 class="mt-4">Publications</h1>
{% assign publications = site.publications | sort: "year" | reverse %}
{% for pub in publications %}
<div class="pubitem">
<div class="pubteaser">
  <a href="/download/{{ pub.slug}}.pdf">
    <img src="/assets/img/{{ pub.slug }}_small.png" alt="{{pub.slug}} publication teaser"/>&nbsp; <i class="fa fa-file-pdf-o"></i> PDF &nbsp;</a>
  {% if pub.video == "" or pub.video == nil or pub.video == blank %}
  {% else %}
    <a href="{{pub.video}}">
    <i class="fa fa-youtube-play"></i> Video &nbsp;</a>
  {% endif %} 
    <br/><br/><i class="pubaward">{{ pub.award }}</i>

</div>
  <div class="pubtitle">
    {{ pub.title }}
  </div>
  <div class="pubauthors">
    {{ pub.authors }}
  </div>
  <div class="pubinfo">
    {{ pub.publication }}, {{ pub.year}}
  </div>

</div>
{% endfor %}