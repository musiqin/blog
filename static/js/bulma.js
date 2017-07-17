 // The following code is based off a toggle menu by @Bradcomp
 // source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
 // Toggle menu for bulma nav
 (function() {
     var burger = document.querySelector('.navbar-burger');
     var menu = document.querySelector('.navbar-menu');
     
     if (burger!=null) {
         burger.addEventListener('click', function() {
             burger.classList.toggle('is-active');
             menu.classList.toggle('is-active');
         });
     }
 })();
 //Generate hash
 String.prototype.hashCode = function() {
     var hs = 0,
         i, chr;
     if (this.length === 0) return hs;
     for (i = 0; i < this.length; i++) {
         chr = this.charCodeAt(i);
         hs = ((hs << 5) - hs) + chr;
         hs |= 0; // Convert to 32bit integer
     }
     return (hs >>> 0);
 };
 //Generate Identicons
 var xv = document.getElementsByClassName('identicons');
 if (xv.length > 0) {
     for (var i = 0; i < xv.length; ++i) {
         var xy = xv[i];
         xy.setAttribute('data-jdenticon-hash', '555' + xy.getAttribute("data-jdenticon-url").hashCode());
     }
     jdenticon();
 }

 function outerHeight(elem) {
     var curStyle = elem.currentStyle || window.getComputedStyle(elem);
     ht = elem.offsetHeight;
     ht += parseInt(curStyle.marginTop);
     ht += parseInt(curStyle.marginBottom);
     return ht; //If you'd like to return the outerheight
 }
 (function() {
     'use strict';
     function generateHashOffset(section){
        var sections = {};
        Array.prototype.forEach.call(section, function(e) {
         var hash = e.hash.substr(1),
             header = document.getElementById(hash);
         sections[hash] = header.offsetTop + (5 * viewportHeight / 8);
     });
        return sections;
     }
     var left = document.getElementById("fixed-toc"),
         content = document.getElementById("post-content"),
         start = left.offsetTop + left.offsetHeight,
         stop = content.offsetTop + outerHeight(content),
         docBody = document.documentElement || document.body.parentNode || document.body,
         hasOffset = window.pageYOffset !== undefined,
         viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight.
    scrollTop;
    var section = document.querySelectorAll("#my_toc a[href]");
    var sections = generateHashOffset(section);
    window.onresize = function(event) {
        var sections = generateHashOffset(section);
    };
     var i = 0;
     
     
     window.onscroll = function(e) {
         var scrollPosition = hasOffset ? window.pageYOffset : docBody.scrollTop;
         if (scrollPosition >= start && scrollPosition <= stop) {
             // stick the div        
             left.className = 'is-sticky';
             left.removeAttribute("style");
         } else {
             if (scrollPosition >= stop) {
                 //console.log('stickypos: '+ scrollPosition);
                 left.className = 'is-sticky-end';
                 left.style["top"] = stop - scrollPosition + 'px';
             } else {
                 (document.querySelector('#my_toc .active') != null) ? document.querySelector('#my_toc .active').setAttribute('class', ' '): null;
                 // release the div
                 left.className = '';
                 left.removeAttribute("style");
             }
         }
         for (i in sections) {
             if (sections[i] <= scrollPosition) {
                 //console.log(i);
                 (document.querySelector('#my_toc .active') != null) ? document.querySelector('#my_toc .active').setAttribute('class', ' '): null;
                 document.querySelector('#my_toc li a[href="#' + i + '"]').setAttribute('class', 'active');
             }
         }
     };
 })();
 
 /*
  * - autoSmoothScroll -
  * Licence MIT
  * Written by Gabriel Delépine
  * Current version  1.3.1 (2014-10-22)
  * Previous version 1.3.0 (2014-07-23)
  * Previous version 1.2.0 (2014-02-13)
  * Previous version 1.0.1 (2013-11-08)
  * Previous version 1.0.0 (2013-10-27)
  * Requirement : None, it is a framework-free function (i.e. you do not need to include any other file in your page such as jQuery)
  * Fork-me on github : https://github.com/Yappli/smooth-scroll
  * */
 (function(window, undefined) // Code in a function to create an isolate scope
     {
         'use strict';
         var height_fixed_header = 0, // For layout with header with position:fixed. Write here the height of your header for your anchor don't be hiden behind
             speed = 500,
             moving_frequency = 15, // Affects performance ! High number makes scroll more smooth
             links = document.getElementsByTagName('a'),
             href;
         for (var i = 0; i < links.length; i++) {
             href = (links[i].attributes.href === undefined) ? null : links[i].getAttribute("href");
             if (href !== null && href.length > 1 && href.indexOf('#') != -1) // href.substr(0, 1) == '#'
             {
                 links[i].onclick = function() {
                     var element,
                         href = this.attributes.href.nodeValue.toString(),
                         url = href.substr(0, href.indexOf('#')),
                         id = href.substr(href.indexOf('#') + 1);
                     if (element = document.getElementById(id)) {
                         var hop_count = (speed - (speed % moving_frequency)) / moving_frequency, // Always make an integer
                             getScrollTopDocumentAtBegin = getScrollTopDocument(),
                             gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;
                         if (window.history && typeof window.history.pushState == 'function') window.history.pushState({}, undefined, url + '#' + id); // Change URL for modern browser
                         for (var i = 1; i <= hop_count; i++) {
                             (function() {
                                 var hop_top_position = gap * i;
                                 setTimeout(function() {
                                     window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin);
                                 }, moving_frequency * i);
                             })();
                         }
                         return false;
                     }
                 };
             }
         }
         var getScrollTopElement = function(e) {
             var top = height_fixed_header * -1;
             while (e.offsetParent != undefined && e.offsetParent != null) {
                 top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
                 e = e.offsetParent;
             }
             return top;
         };
         var getScrollTopDocument = function() {
             return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
         };
     })(window);