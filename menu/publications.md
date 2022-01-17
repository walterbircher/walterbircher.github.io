---
layout: default
title: Publications
---

Peer-reviewed conference and journal papers

<h1 class="mt-4">Publications</h1>
{% assign publications = site.publications | sort: "date" | reverse %}
{% for pub in publications %}
<div class="pubitem">
<div class="pubteaser">
  {% if pub.alt_link == ""  or pub.alt_link == nil or pub.alt_link == blank %}
    <a href="/download/{{ pub.slug}}.pdf">
  {% else %}
    <a href="{{ pub.alt_link }}">
  {% endif %}
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
    {{ pub.publication }}, {{ pub.date | date: "%Y"}}
  </div>

</div>
{% endfor %}

<center>
<p class="modtext">
Last modified on December 19th, 2021
</p>
</center>