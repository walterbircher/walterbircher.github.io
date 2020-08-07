---
layout: default
title: Projects
---

Just-for-fun, industry work, and unpublished research projects

<!--
<div style="border:1px solid #dddddd;border-radius:8px;padding:0px;">
<table style="border:none;padding:5px;margin:5px">
<tr style="border:none;padding:0px;">
  <td style="border:none; white-space:nowrap;padding:0px 10px 0px 10px;font-size:16px;color:#4a4a4a">
    <i>filter</i>
  </td>
<td style="border:none; white-space:nowrap;padding:0px;text-align:center;">
<button class="button" id="All" onclick="filterUsingCategory('All')">
  Show All Posts
</button>
</td>
-->

<div style="border:1px solid #dddddd;border-radius:8px;padding:0px;padding:0px;margin:0px;">
  <center>
<ul class="filters">
  <li>
    <i style="font-size:16px;">filters</i>
  </li>
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
<!--  <a href="/download/{{ proj.slug}}.pdf">--> <!--<a href="{{pub.url}}">-->
    <img src="/assets/img/{{ proj.slug }}_small.png" alt="{{proj.slug}} project teaser" style="float: left; margin-right: 2em; margin-bottom: 0.25em;"/>
<!--  </a>-->
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
  <!--
 <div class="projlinks">
  <a href="/download/{{ proj.slug}}.pdf"><i class="fa fa-file-pdf-o"></i> PDF</a>&nbsp;&nbsp;
  <a href="{{pub.url}}"><i class="fa fa-link"></i> Project Page</a>
   <div class="projaward">{{ proj.award }}</div>
</div>-->
</div>
{% endfor %}
