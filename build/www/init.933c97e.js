!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){e.exports=n(102)},98:function(e,t,n){var o,i;!function(r,a){"object"==typeof e&&e.exports?e.exports=a():(o=a,i="function"==typeof o?o.call(t,n,t,e):o,!(void 0!==i&&(e.exports=i)))}(this,function(){"use strict";function e(e,t){var n,o=document.createElement(e||"div");for(n in t)o[n]=t[n];return o}function t(e){for(var t=1,n=arguments.length;t<n;t++)e.appendChild(arguments[t]);return e}function n(e,t,n,o){var i=["opacity",t,~~(100*e),n,o].join("-"),r=.01+n/o*100,a=Math.max(1-(1-e)/t*(100-r),e),c=s.substring(0,s.indexOf("Animation")).toLowerCase(),l=c&&"-"+c+"-"||"";return p[i]||(d.insertRule("@"+l+"keyframes "+i+"{0%{opacity:"+a+"}"+r+"%{opacity:"+e+"}"+(r+.01)+"%{opacity:1}"+(r+t)%100+"%{opacity:"+e+"}100%{opacity:"+a+"}}",d.cssRules.length),p[i]=1),i}function o(e,t){var n,o,i=e.style;if(t=t.charAt(0).toUpperCase()+t.slice(1),void 0!==i[t])return t;for(o=0;o<u.length;o++)if(n=u[o]+t,void 0!==i[n])return n}function i(e,t){for(var n in t)e.style[o(e,n)||n]=t[n];return e}function r(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)void 0===e[o]&&(e[o]=n[o])}return e}function a(e,t){return"string"==typeof e?e:e[t%e.length]}function c(e){this.opts=r(e||{},c.defaults,f)}function l(){function n(t,n){return e("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',n)}d.addRule(".spin-vml","behavior:url(#default#VML)"),c.prototype.lines=function(e,o){function r(){return i(n("group",{coordsize:d+" "+d,coordorigin:-s+" "+-s}),{width:d,height:d})}function c(e,c,l){t(p,t(i(r(),{rotation:360/o.lines*e+"deg",left:~~c}),t(i(n("roundrect",{arcsize:o.corners}),{width:s,height:o.scale*o.width,left:o.scale*o.radius,top:-o.scale*o.width>>1,filter:l}),n("fill",{color:a(o.color,e),opacity:o.opacity}),n("stroke",{opacity:0}))))}var l,s=o.scale*(o.length+o.width),d=2*o.scale*s,u=-(o.width+o.length)*o.scale*2+"px",p=i(r(),{position:"absolute",top:u,left:u});if(o.shadow)for(l=1;l<=o.lines;l++)c(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=o.lines;l++)c(l);return t(e,p)},c.prototype.opacity=function(e,t,n,o){var i=e.firstChild;o=o.shadow&&o.lines||0,i&&t+o<i.childNodes.length&&(i=i.childNodes[t+o],i=i&&i.firstChild,i=i&&i.firstChild,i&&(i.opacity=n))}}var s,d,u=["webkit","Moz","ms","O"],p={},f={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",opacity:.25,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"};if(c.defaults={},r(c.prototype,{spin:function(t){this.stop();var n=this,o=n.opts,r=n.el=e(null,{className:o.className});if(i(r,{position:o.position,width:0,zIndex:o.zIndex,left:o.left,top:o.top}),t&&t.insertBefore(r,t.firstChild||null),r.setAttribute("role","progressbar"),n.lines(r,n.opts),!s){var a,c=0,l=(o.lines-1)*(1-o.direction)/2,d=o.fps,u=d/o.speed,p=(1-o.opacity)/(u*o.trail/100),f=u/o.lines;!function e(){c++;for(var t=0;t<o.lines;t++)a=Math.max(1-(c+(o.lines-t)*f)%u*p,o.opacity),n.opacity(r,t*o.direction+l,a,o);n.timeout=n.el&&setTimeout(e,~~(1e3/d))}()}return n},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=void 0),this},lines:function(o,r){function c(t,n){return i(e(),{position:"absolute",width:r.scale*(r.length+r.width)+"px",height:r.scale*r.width+"px",background:t,boxShadow:n,transformOrigin:"left",transform:"rotate("+~~(360/r.lines*d+r.rotate)+"deg) translate("+r.scale*r.radius+"px,0)",borderRadius:(r.corners*r.scale*r.width>>1)+"px"})}for(var l,d=0,u=(r.lines-1)*(1-r.direction)/2;d<r.lines;d++)l=i(e(),{position:"absolute",top:1+~(r.scale*r.width/2)+"px",transform:r.hwaccel?"translate3d(0,0,0)":"",opacity:r.opacity,animation:s&&n(r.opacity,r.trail,u+d*r.direction,r.lines)+" "+1/r.speed+"s linear infinite"}),r.shadow&&t(l,i(c("#000","0 0 4px #000"),{top:"2px"})),t(o,t(l,c(a(r.color,d),"0 0 1px rgba(0,0,0,.1)")));return o},opacity:function(e,t,n){t<e.childNodes.length&&(e.childNodes[t].style.opacity=n)}}),"undefined"!=typeof document){d=function(){var n=e("style",{type:"text/css"});return t(document.getElementsByTagName("head")[0],n),n.sheet||n.styleSheet}();var h=i(e("group"),{behavior:"url(#default#VML)"});!o(h,"transform")&&h.adj?l():s=o(h,"animation")}return c})},102:function(e,t,n){"use strict";function o(e){"complete"===document.readyState?e():window.addEventListener("load",function(){e()})}function i(e){new u({lines:13,length:5,width:2,radius:5,speed:.8,color:"#848484"}).spin(document.querySelector("#loadingOverlay .spinner")),e()}function r(e){document.querySelector("#loadingOverlay").style.display="block",e()}function a(){document.querySelector("#loadingOverlay").style.display="none",document.querySelector("#errorOverlay").style.display="block"}function c(e){for(var t=["img/i-f7-material.ccc2c70.png","img/bg-home.461f116.jpg","img/circle1-grey.8c5fce2.png","img/circle1.92221dc.png","img/circle2-grey.145a725.png","img/circle2.bb5f420.png","img/circle3-grey.430e206.png","img/circle3.9bba241.png","img/circle4-grey.7f81211.png","img/circle4.0b7c83a.png","img/circle5-grey.83d468a.png","img/circle5.f9d6f99.png","img/circle6-grey.43eb354.png","img/circle6.9febaca.png","img/circle7-grey.4952277.png","img/circle7.15b5a1e.png","img/reward-purple.7b70f33.png","app.933c97e.js","app.933c97e.css","offline-service-worker.js","favicon-16x16.png","favicon-32x32.png","android-chrome-192x192.png"],n=[],o=function(o,i){if(i===!0){if(n.indexOf(o)===-1){n.push(o);var r=Math.ceil(n.length/t.length*100)+"%";document.querySelector("#loadingOverlay .progressBarInner").style.width=r}n.length===t.length&&e()}else a()},i=0;i<t.length;i++)/\.js$/.test(t[i])?l(t[i],o):/\.css$/.test(t[i])?s(t[i],o):/\.(jpe?g|png|gif)$/.test(t[i])?d(t[i],o):(console.error("Unknown file type to load: "+t[i]),a());var r=document.createElement("i");r.className="f7-icons",r.innerHTML="check",document.querySelector("#hiddenOverlay").append(r);var c=document.createElement("i");c.className="material-icons",c.innerHTML="check",document.querySelector("#hiddenOverlay").append(c);var u=document.createElement("i");u.className="fa fa-check",document.querySelector("#hiddenOverlay").append(u)}function l(e,t){var n=document.createElement("script");n.src=e,n.onload=function(){t(e,!0)},n.onerror=function(){console.error("Failed to load file: "+e),t(e,!1)},document.body.appendChild(n)}function s(e,t){var n=document.createElement("link");n.rel="stylesheet",n.href=e,n.onload=function(){t(e,!0)},n.onerror=function(){console.error("Failed to load file: "+e),t(e,!1)},document.head.appendChild(n)}function d(e,t){var n=document.createElement("img");n.src=e,n.onload=function(){t(e,!0)},n.onerror=function(){console.error("Failed to load file: "+e),t(e,!1)},document.querySelector("#hiddenOverlay").appendChild(n)}n(212);var u=n(98),p=n(228);window.cordova||p.install({onInstalled:function(){p.update()},onUpdateReady:function(){p.applyUpdate()},onUpdated:function(){window.location.reload()}}),o(function(){i(function(){r(function(){c(function(){window.initApplication(),window.Dom7("#loadingOverlay").remove(),window.Dom7("#errorOverlay").remove(),window.Dom7("#hiddenOverlay").remove()})})})})},212:function(e,t){},228:function(e,t){function n(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}function o(e){if(e||(e={}),n()){var t=navigator.serviceWorker.register("/offline-service-worker.js"),o=function(e){function t(){switch(a.state){case"redundant":i("onUpdateFailed"),a.onstatechange=null;break;case"installing":o||i("onUpdating");break;case"installed":r||i("onUpdateReady");break;case"activated":i("onUpdated"),a.onstatechange=null}}function n(){switch(a.state){case"redundant":a.onstatechange=null;break;case"installing":break;case"installed":break;case"activated":i("onInstalled"),a.onstatechange=null}}var o,r,a=e.installing||e.waiting;if(a&&!a.onstatechange){var c;e.active?(t(),c=t):(n(),c=n),o=!0,e.waiting&&(r=!0),a.onstatechange=c}},i=function(t){"function"==typeof e[t]&&e[t]({source:"ServiceWorker"})};return void t.then(function(e){e&&(o(e),e.onupdatefound=function(){o(e)})}).catch(function(e){return i("onError"),Promise.reject(e)})}if(window.applicationCache){var r="/",c="manifest",l=function(){var t=r+c+".html",n=document.createElement("iframe");window.addEventListener("message",function(t){if(t.source===n.contentWindow){var o=(t.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/);if(o){var i=o[1];"function"==typeof e[i]&&e[i]({source:"AppCache"})}}}),n.src=t,n.style.display="none",a=n,document.body.appendChild(n)};return void("complete"===document.readyState?setTimeout(l):window.addEventListener("load",l))}}function i(e,t){if(n())return void navigator.serviceWorker.getRegistration().then(function(n){return n&&n.waiting?(n.waiting.postMessage({action:"skipWaiting"}),void(e&&e())):void(t&&t())});if(a)try{a.contentWindow.__applyUpdate(),e&&setTimeout(e)}catch(e){t&&setTimeout(t)}}function r(){if(n()&&navigator.serviceWorker.getRegistration().then(function(e){if(e)return e.update()}),a)try{a.contentWindow.applicationCache.update()}catch(e){}}var a;setInterval(r,9e5),t.install=o,t.applyUpdate=i,t.update=r}});