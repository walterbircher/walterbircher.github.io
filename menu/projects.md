---
layout: default
title: Projects
---

Just for fun, industry work, and unpublished research projects


<div class="filter_wrapper">
  <center>
<ul class="filters">
<li>
<button class="button" id="All" onclick="filterUsingCategory('All')">
  Show All Posts
</button>
</li>
{% assign alldocs = site.projects %} 
{% assign groupcat =  alldocs | map: 'categories' | join: ','  | split: ','  | group_by: category %}
{% for cat in groupcat %}
<li>
<button class="button" id="{{ cat.name }}" onclick="filterUsingCategory(this.id)">
{{ cat.name }}
</button>
</li>
{% endfor %}
</ul>
</center>
</div>

<h1 class="mt-4">Projects</h1>
{% assign id = 0 %}
{% assign projects = site.projects | sort: "year" | reverse %}
{% for proj in projects %}
{% assign id = id | plus:1 %}
<div class="projitem" id="{{id}}">
<div class="projteaser">

  <img src="/assets/img/{{ proj.slug }}_small.png" alt="{{proj.slug}} project teaser"/>

</div>
  <div class="projtitle">
    {{ proj.title }}
  </div>
  <div class="projauthors">
    {{ proj.authors }}
  </div>
  <div class="projinfo">
    {{ proj.thing }}, {{ proj.year}}
  </div>

</div>
{% endfor %}

<center>
<p class="modtext">
Last modified on January 17th, 2022
</p>
</center>
