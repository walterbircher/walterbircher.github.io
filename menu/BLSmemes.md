---
layout: default
title: Bud Light Selzter Meme Portfolio
---

New memes added daily through September 18th, 2020

<h1 class="mt-4">Bud Light Seltzer Meme Portfolio</h1>

{% assign int memecount = 0 %}
{% for image in site.static_files reversed %}
    {% if image.path contains 'img/memes' %}
    {% assign memecount = memecount | plus:1 %}
    {% endif %}
{% endfor %}

{% assign int m = memecount %}
{% for image in site.static_files reversed %}
<div class="memeitem">
    {% if image.path contains 'img/memes' %}
        <span class="post-date">
          {{ m }})
          {% assign m = m | minus:1 %}
          {% assign str = image.path %}
          {% assign a = str | split: '_' %}
          {% assign d = a[0] | date: "%-d"  %}
          {{ a[0] | date: "%B" }}
          {% case d %}
            {% when '1' or '21' or '31' %}{{ d }}st
            {% when '2' or '22' %}{{ d }}nd
            {% when '3' or '23' %}{{ d }}rd
            {% else %}{{ d }}th{% endcase %},
          {{ a[0] | date: "%Y" }}
        </span>
        <img src="{{ site.baseurl }}{{ image.path }}" alt="image" />
        <br/>
    {% endif %}
</div>
{% endfor %}