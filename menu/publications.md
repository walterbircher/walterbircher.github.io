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
  <table>
    <!-- <tr>
      <td><i class="pubaward">{{ pub.award }}</i></td>
      <td rowspan='2' width='150'><a href="/download/{{ pub.slug}}.pdf"><img src="/assets/img/{{ pub.slug }}_small.png" alt="{{pub.slug}} publication teaser"/></a></td>
      <td rowspan='1' colspan='2'><i class="pubaward">{{ pub.award }}</i></td>
    </tr>
    <tr>
      <td rowspan='1'>{{pub.video}}</td>
      <td rowspan='1' width='150'><a href="/download/{{ pub.slug}}.pdf"><i class="fa fa-file-pdf-o"></i>&nbsp;PDF</a></td>
      <!--old stuff video button similar to pdf button <a href="{{ pub.video}}"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp;Video</a>
    </tr>-->
    <tr>
      <!--<td><i class="pubaward">{{ pub.award }}</i></td>-->
      <td rowspan='1' width='200'><a href="/download/{{ pub.slug}}.pdf"><img src="/assets/img/{{ pub.slug }}_small.png" alt="{{pub.slug}} publication teaser"/></a></td>
      <td rowspan='1'>{{pub.video}}</td>
      <td rowspan='1' width='150'><a href="/download/{{ pub.slug}}.pdf"><i class="fa fa-file-pdf-o"></i>&nbsp;PDF</a></td>
    </tr>
    <tr>
      <td rowspan='1' colspan='3'><br/><i class="pubaward">{{ pub.award }}</i></td>
    </tr>
      <!--old stuff video button similar to pdf button <a href="{{ pub.video}}"><i class="fa fa-youtube-play" aria-hidden="true"></i>&nbsp;Video</a>-->
  </table>


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
<!-- <div class="publinks">-->
  <!--<a href="/download/{{ pub.slug}}.pdf"><i class="fa fa-file-pdf-o"></i> PDF</a>&nbsp;&nbsp;-->
  <!--<a href="{{pub.url}}"><i class="fa fa-link"></i> Project Page</a>-->
  <!-- <div class="pubaward">{{ pub.award }}</div>-->
<!--</div>-->
</div>
<br/><br/>
{% endfor %}