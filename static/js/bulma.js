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