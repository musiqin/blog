function timeAgo(time) {
    var units = [{
        name: "second",
        limit: 60,
        in_seconds: 1
    }, {
        name: "minute",
        limit: 3600,
        in_seconds: 60
    }, {
        name: "hour",
        limit: 86400,
        in_seconds: 3600
    }, {
        name: "day",
        limit: 604800,
        in_seconds: 86400
    }, {
        name: "week",
        limit: 2629743,
        in_seconds: 604800
    }, {
        name: "month",
        limit: 31556926,
        in_seconds: 2629743
    }, {
        name: "year",
        limit: null,
        in_seconds: 31556926
    }];
    var diff = (new Date() - new Date(time * 1000)) / 1000;
    if (diff < 5) return "now";
    var i = 0,
        unit;
    while (unit = units[i++]) {
        if (diff < unit.limit || !unit.limit) {
            var diff = Math.floor(diff / unit.in_seconds);
            return diff + " " + unit.name + (diff > 1 ? "s" : "");
        }
    };
}

function commentsGenerate(data) {
    var el = document.getElementById('comments-generate');
    if (data.length < 1) {
        el.innerHTML = '<div class="message">\
  <div class="message-body">\
    <span class="icon"><i class="fa fa-info"></i></span> No comments where found for this post. Be the first!\
  </div>\
</div>\
<br>';
    } else {
        el.innerHTML = "";
        data.forEach(function(entry) {
            //console.log(entry);
            // Make a new div
            var elChild = document.createElement('div');
            // Give the new div some content
            elChild.innerHTML = '<article class="media comment">\
  <figure class="media-left">\
    <p class="image is-64x64">\
      <img src="/static/img/user-icon.png">\
    </p>\
  </figure>\
  <div class="media-content">\
    <div class="content">\
      <p>\
        <strong>' + entry.name + '</strong> <small>' + timeAgo(entry.timestamp) + ' ago</small>\
        <br>\
        ' + entry.text + '\
      </p>\
    </div>\
  </div>\
</article><br>';
            // Jug it into the parent element
            el.appendChild(elChild);
        });
    }
}
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', dataPath, true);
xmlhttp.onreadystatechange = function() {
    
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText);
            commentsGenerate(obj);
        } else{
            var el = document.getElementById('comments-generate');
            el.innerHTML = '<div class="message">\
  <div class="message-body">\
    <span class="icon"><i class="fa fa-info"></i></span> The comments server encountered a problem. Try again later!\
  </div>\
</div>\
<br>';
        }
    }
};
xmlhttp.send(null);