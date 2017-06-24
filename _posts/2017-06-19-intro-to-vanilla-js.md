---
layout: post
title: "Why you should know about Vanila JS!"
date: 2017-06-19
author: "mobihack"
category: Javascript
tags: [js,javascript,vanilla js,pure js,intro]
comments: true
image:
  path: /static/article-pics/intro-to-vanilla-js-min.png
  height: 800
  width: 800
toc: true
---


> Vanilla JS is a fast, lightweight, cross-platform framework for building incredible, powerful JavaScript applications.

You might be thinking why you didn't know about this framework? Because it's just plain js. Vanilla JS is all about using regular js code to create code rather than using heavy frameworks like Jquery.

This is VanillaJS (unmodified):

```
// VanillaJS v1.0
// Released into the Public Domain
// Your code goes here:
```

## Why should I use it?

If you are a professional programmer who needs all the performance improvements you can get, then look no further. Vanilla JS has multiple times more performance than many frameworks. Why? Because they all use plain JS in their code :D

## What are the cons?

Everything has got their own pros and cons. One of the biggest problems with Vanilla JS is that the code is a little bit longer than using a framework. This is because frameworks do all the dirty works for you to have an easily usable and understandable piece of code.

## Some examples, please.

Of course, I'll list some of the alternatives for widely used jquery codes.

### Each Element

Jquery:

```js
$(selector).each(function(i, el){

});
```

Vanilla JS:

```js
function forEachElement(selector, fn) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++)
    fn(elements[i], i);
}

forEachElement(selector, function(el, i){

});
```

### Toggle Element Class

Jquery:

```js
$(el).toggleClass(className);
```

Vanilla JS:

```js
if (el.classList) {
  el.classList.toggle(className);
} else {
    var classes = el.className.split(' ');
    var existingIndex = -1;
    for (var i = classes.length; i--;) {
      if (classes[i] === className)
        existingIndex = i;
    }

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

  el.className = classes.join(' ');
}
```

### JSON-based AJAX

Jquery:

```js
$.getJSON('/my/url', function(data) {

});
```

Vanilla JS:

```js
//IE8+

var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.responseText);
    } else {
      // Error :(
    }
  }
};

request.send();
request = null;

```

## Summary

Vanilla JS is a running joke amongst programmers who use it to remind other developers that many things can be done nowadays without the need for additional JavaScript libraries. Everyone should use pure JS rather than relying on Jquery for small things. Pure JS also has high performance. If you are interested, you can visit these sites for more information and alternative codes:

* [Vanilla-JS.Com](http://vanilla-js.com/)

* [YouMightNotNeedJquery.Com](http://youmightnotneedjquery.com/)

* [PlainJS.Com](https://plainjs.com/)