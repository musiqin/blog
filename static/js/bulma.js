 // The following code is based off a toggle menu by @Bradcomp
 // source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
 // Toggle menu for bulma nav
 (function() {
     var burger = document.querySelector('.nav-toggle');
     var menu = document.querySelector('.nav-menu');
     burger.addEventListener('click', function() {
         burger.classList.toggle('is-active');
         menu.classList.toggle('is-active');
     });
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

 function outerHeight(elem){
    var curStyle = elem.currentStyle || window.getComputedStyle(elem);
    outerHeight = elem.offsetHeight;
    outerHeight += parseInt(curStyle.marginTop);
    outerHeight += parseInt(curStyle.marginBottom);

    return outerHeight //If you'd like to return the outerheight
}

 (function() {
     'use strict';
     var left = document.getElementById("fixed-toc"),
         content = document.getElementById("post-content"),
         start = left.offsetTop + 380,
         stop = content.offsetTop + outerHeight(content),
         docBody = document.documentElement || document.body.parentNode || document.body,
         hasOffset = window.pageYOffset !== undefined,
         scrollTop;
     var section = document.querySelectorAll("h2[id],h3[id],h4[id],h5[id],h6[id]");
     var sections = {};
     var i = 0;
     Array.prototype.forEach.call(section, function(e) {
         sections[e.id] = e.offsetTop + 100;
     });
     console.log(stop);
     window.onscroll = function(e) {
         var scrollPosition = hasOffset ? window.pageYOffset : docBody.scrollTop;
         
         if (scrollPosition >= start && scrollPosition <= stop) {
             // stick the div        
             left.className = 'is-sticky';
             left.style["top"] = '0px';
         } else {
             if (scrollPosition >= stop) {
                console.log('stickypos: '+ scrollPosition);
                left.className = 'is-sticky-end';
                left.style["top"] = stop-scrollPosition+'px';
             } else {
                 (document.querySelector('#my_toc .active') != null) ? document.querySelector('#my_toc .active').setAttribute('class', ' '): null;
                 // release the div
                 left.className = '';
             }
         }



         for (i in sections) {
             if (sections[i] <= scrollPosition) {
                 (document.querySelector('#my_toc .active') != null) ? document.querySelector('#my_toc .active').setAttribute('class', ' '): null;
                 document.querySelector('#my_toc li a[href="#' + i + '"]').setAttribute('class', 'active');
             }
         }
     };
 })();