/*
 *  @package    Flickrshow
 *  @subpackage Javascript
 *  @author     Ben Sekulowicz-Barclay
 *  @version    7.2
 *  
 *  Flickrshow is a Beseku thing licensed under a Creative Commons Attribution 3.0 
 *  Unported License. For more information visit http://www.flickrshow.co.uk.
 */

var flickrshow,__hasProp=Object.prototype.hasOwnProperty;flickrshow=function(j,i){var l,a;if(!this instanceof flickrshow)return new flickrshow(j,i);a=this;a.addEvent=function(b,d,e){if((b!=null?b.addEventListener:void 0)!=null)return b!=null?b.addEventListener(d,e,false):void 0;else if((b!=null?b.attachEvent:void 0)!=null){b["e"+d+e]=e;b[d+e]=function(){return b["e"+d+e](window.event)};return b!=null?b.attachEvent("on"+d,b[d+e]):void 0}};a.addUrl=function(){var b,d,e,f;d={api_key:"6cb7449543a9595800bc0c365223a4e8",extras:"url_s,url_m,url_z,url_l",format:"json",jsoncallback:"flickrshow_jsonp_"+a.constants.random,page:a.settings.page,per_page:a.settings.per_page};if(a.settings.licence!=null)d.license=a.settings.licence;if(a.settings.license!=null)d.license=a.settings.license;if(a.settings.gallery!=null){d.method="flickr.galleries.getPhotos";d.gallery_id=a.settings.gallery}else if(a.settings.group!=null){d.method="flickr.groups.pools.getPhotos";d.group_id=a.settings.group}else if(a.settings.set!=null){d.method="flickr.photosets.getPhotos";d.photoset_id=a.settings.set}else if(a.settings.person!=null){d.method="flickr.people.getPhotosOf";d.user_id=a.settings.person}else if(a.settings.tags!=null||a.settings.user!=null){d.method="flickr.photos.search";if(a.settings.tags!=null)d.tags=a.settings.tags;if(a.settings.user!=null)d.user_id=a.settings.user}else d.method="flickr.photos.getRecent";e="http://api.flickr.com/services/rest/?";for(b in d)if(__hasProp.call(d,b)){f=d[b];e+=b+"="+f+"&"}return e};a.animate=function(b,d,e,f,g){var h;a.constants.intervals[g]!=null&&window.clearInterval(a.constants.intervals[g]);h=function(){var c,k;c=Math.round(b.style[d].replace(/([a-zA-Z]{2})$/,""));k=Math.round(e-c);if(Math.abs(k)>1)return b.style[d]=Math.floor(c+k/2)+"px";else{b.style[d]=e+"px";return window.clearInterval(a.constants.intervals[g])}};a.constants.intervals[g]=window.setInterval(h,f/1.5)};a.onClickLeft=function(){if(a.constants.isLoading!==true){a.constants.imageCurrent=a.constants.imageCurrent-1<0?a.constants.imageTotal-1:a.constants.imageCurrent-1;a.animate(a.elements.images,"left","-"+a.constants.imageCurrent*a.elements.target.offsetWidth,a.constants.speed,"i");a.showTitle();typeof a.settings.onMove==="function"&&a.settings.onMove(a.elements.images.childNodes[a.constants.imageCurrent].childNodes[0])}};a.onClickPlay=function(){var b;if(a.constants.isPlaying===false){a.constants.isPlaying=true;a.elements.buttons.childNodes[2].style.backgroundImage="url("+a.constants.img_url+"static/images/is.png)";b=function(){return a.onClickRight()};a.constants.intervals.playing=window.setInterval(b,a.settings.interval);typeof a.settings.onPlay==="function"&&a.settings.onPlay()}else{a.constants.isPlaying=false;a.elements.buttons.childNodes[2].style.backgroundImage="url("+a.constants.img_url+"static/images/ip.png)";window.clearInterval(a.constants.intervals.playing);typeof a.settings.onPause==="function"&&a.settings.onPause(a.elements.images.childNodes[a.constants.imageCurrent].childNodes[0])}};a.onClickRight=function(){if(a.constants.isLoading!==true){a.constants.imageCurrent=a.constants.imageCurrent+2>a.constants.imageTotal?0:a.constants.imageCurrent+1;a.animate(a.elements.images,"left","-"+a.constants.imageCurrent*a.elements.target.offsetWidth,a.constants.speed,"i");a.showTitle();typeof a.settings.onMove==="function"&&a.settings.onMove(a.elements.images.childNodes[a.constants.imageCurrent].childNodes[0])}};a.onLoadImage=function(b){var d,e,f,g;e=b.srcElement||b.target;b=e.offsetHeight;d=e.offsetWidth;if(d>b){g=Math.ceil(a.elements.target.offsetWidth+a.elements.target.offsetHeight/100);f=Math.ceil(g/d*b)}else{f=Math.ceil(a.elements.target.offsetHeight+a.elements.target.offsetHeight/100);g=Math.ceil(f/b*d)}e.style.height=f+"px";e.style.left=Math.round((a.elements.target.offsetWidth-g)/2)+"px";e.style.position="absolute";e.style.top=Math.round((a.elements.target.offsetHeight-f)/2)+"px";e.style.width=g+"px";a.constants.imageLoaded+=1;b=Math.round(a.constants.imageLoaded/a.constants.imageTotal*240);a.animate(a.elements.loading.childNodes[0],"width",b<=36?36:b,"loading");if(a.constants.imageLoaded===a.constants.imageTotal){a.showTitle();a.elements.container.removeChild(a.elements.loading);a.elements.images.style.visibility="visible";a.constants.isLoading=false;a.settings.autoplay===true&&a.onClickPlay();typeof a.settings.onLoad==="function"&&a.settings.onLoad()}};a.onLoadJson=function(b){var d,e,f,g,h,c,k,o,m,n;a.elements.script.parentNode.removeChild(a.elements.script);if(b.photoset!=null){m=b.photoset.photo;h=0;for(k=m.length;h<k;h++){c=m[h];c.owner=b.photoset.owner}b.photos=b.photoset}if(b.stat!=null&&b.stat==="fail"||!b.photos)throw"Flickrshow: "+(b.message||"There was an unknown error with the data returned by Flickr");a.constants.imageTotal=b.photos.photo.length;n=b.photos.photo;h=0;for(o=n.length;h<o;h++){c=n[h];b=document.createElement("img");b.setAttribute("data-flickr-title",c.title);b.setAttribute("data-flickr-photo_id",c.id);b.setAttribute("data-flickr-owner",c.owner);b.setAttribute("rel",h);b.style.cursor="pointer";b.style.display="block";b.style.margin="0";b.style.padding="0";f=a.elements.target.offsetHeight*a.elements.target.offsetWidth;g=c.height_z*c.width_z;d=c.height_m*c.width_m;e=c.height_s*c.width_s;if(!c.url_m)c.url_m=c.url_s;if(!c.url_z)c.url_z=c.url_m;if(!c.url_l)c.url_l=c.url_z;b.src=f>g?c.url_l+"?"+a.constants.random:f>d?c.url_z+"?"+a.constants.random:f>e?c.url_m+"?"+a.constants.random:c.url_s+"?"+a.constants.random;c=document.createElement("li");c.style.left=h*a.elements.target.offsetWidth+"px";c.style.height=a.elements.target.offsetHeight+"px";c.style.margin="0";c.style.overflow="hidden";c.style.padding="0";c.style.position="absolute";c.style.top="0";c.style.width=a.elements.target.offsetWidth+"px";c.appendChild(b);a.elements.images.appendChild(c);a.addEvent(b,"load",a.onLoadImage)}};a.onLoadWindow=function(){a.elements.target=typeof a.elements.target==="string"?document.getElementById(a.elements.target):a.elements.target;a.elements.target.innerHTML='<div class="flickrshow-container" style="background:transparent;height:'+a.elements.target.offsetHeight+"px;margin:0;overflow:hidden;padding:0;position:relative;width:"+a.elements.target.offsetWidth+'px"><div class="flickrshow-loading" style="background:transparent url('+a.constants.img_url+'static/images/bg.png);border-radius:12px;height:24px;left:50%;margin:-12px 0 0 -120px;overflow:hidden;padding:0;position:absolute;top:50%;width:240px;-moz-border-radius:12px;-webkit-border-radius:12px"><div class="flickrshow-loading-bar" style="background:#000;border-radius:12px;height:24px;left:0;margin:0;padding:0;position:absolute;top:0;width:0;-moz-border-radius:12px;-webkit-border-radius:12px"></div></div><ul class="flickrshow-images" style="background:transparent;height:'+a.elements.target.offsetHeight+"px;left:0;list-style:none;margin:0;padding:0;position:absolute;top:0;visibility:hidden;width:"+a.elements.target.offsetWidth+'px"></ul><div class="flickrshow-buttons" style="background:transparent url('+a.constants.img_url+"static/images/bg.png);height:40px;margin:0;padding:0;position:absolute;top:"+a.elements.target.offsetHeight+"px;width:"+a.elements.target.offsetWidth+'px"><div class="flickrshow-buttons-left" style="background:#000 url('+a.constants.img_url+'static/images/il.png) 50% 50% no-repeat;border-radius:12px;cursor:pointer;height:24px;left:auto;margin:0;padding:0;position:absolute;right:40px;top:8px;width:24px;-moz-border-radius:12px;-webkit-border-radius:12px"></div><div class="flickrshow-buttons-right" style="background:#000 url('+a.constants.img_url+'static/images/ir.png) 50% 50% no-repeat;border-radius:12px;cursor:pointer;height:24px;left:auto;margin:0;padding:0;position:absolute;right:8px;top:8px;width:24px;-moz-border-radius:12px;-webkit-border-radius:12px"></div><div class="flickrshow-buttons-play" style="background:#000 url('+a.constants.img_url+'static/images/ip.png) 50% 50% no-repeat;border-radius:12px;cursor:pointer;height:24px;left:8px;margin:0;padding:0;position:absolute;right:auto;top:8px;width:24px;-moz-border-radius:12px;-webkit-border-radius:12px;"></div><p class="flickrshow-buttons-title" style="background:#000;border-radius:12px;color:#FFF;cursor:pointer;font:normal normal 600 11px/24px helvetica,arial,sans-serif;height:24px;left:40px;margin:0;overflow:hidden;padding:0;position:absolute;right:auto;text-align:center;text-shadow:none;text-transform:capitalize;top:8px;width:'+(a.elements.target.offsetWidth-112)+'px;-moz-border-radius:12px;-webkit-border-radius:12px">&nbsp</p></div></div>';a.elements.container=a.elements.target.childNodes[0];a.elements.buttons=a.elements.target.childNodes[0].childNodes[2];a.elements.images=a.elements.target.childNodes[0].childNodes[1];a.elements.loading=a.elements.target.childNodes[0].childNodes[0];if(false===a.settings.hide_buttons){a.addEvent(a.elements.images,"click",a.toggleButtons);a.addEvent(a.elements.container,"mouseover",a.showButtons);a.addEvent(a.elements.container,"mouseout",a.hideButtons);a.addEvent(a.elements.buttons.childNodes[0],"click",a.onClickLeft);a.addEvent(a.elements.buttons.childNodes[1],"click",a.onClickRight);a.addEvent(a.elements.buttons.childNodes[2],"click",a.onClickPlay);a.addEvent(a.elements.buttons.childNodes[3],"click",a.showFlickr)}window["flickrshow_jsonp_"+a.constants.random]=a.onLoadJson;a.elements.script=document.createElement("script");a.elements.script.async=true;a.elements.script.src=a.addUrl("flickrshow_jsonp_"+a.constants.random);(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a.elements.script)};a.hideButtons=function(){if(!(a.constants.isLoading===true||a.constants.isButtonsOpen===false)){a.constants.isButtonsOpen=false;a.animate(a.elements.buttons,"top",a.elements.target.offsetHeight,a.constants.speed,"buttons")}};a.showButtons=function(){if(!(a.constants.isLoading===true||a.constants.isButtonsOpen===true)){a.constants.isButtonsOpen=true;a.animate(a.elements.buttons,"top",a.elements.target.offsetHeight-40,a.constants.speed,"buttons")}};a.toggleButtons=function(){a.constants.isButtonsOpen===true?a.hideButtons():a.showButtons()};a.showFlickr=function(){var b;b=a.elements.images.childNodes[a.constants.imageCurrent].childNodes[0];if(b!=null)window.location="http://www.flickr.com/photos/"+b.getAttribute("data-flickr-owner")+"/"+b.getAttribute("data-flickr-photo_id")+"/"};a.showTitle=function(){var b;b=a.elements.images.childNodes[a.constants.imageCurrent].childNodes[0];if(b!=null)a.elements.buttons.childNodes[3].innerHTML=a.constants.imageCurrent+1+"/"+a.constants.imageTotal+" - "+b.getAttribute("data-flickr-title")};a.constants={img_url:"http://www.flickrshow.co.uk/",intervals:[],imageCurrent:0,imageLoaded:0,imageTotal:0,isButtonsOpen:false,isLoading:true,isPlaying:false,random:Math.floor(Math.random()*999999999999),speed:100};a.elements={buttons:null,button1:null,button2:null,button3:null,button4:null,container:null,images:null,loading:null,script:null,target:null};a.settings={autoplay:false,gallery:null,group:null,hide_buttons:false,interval:3000,license:"1,2,3,4,5,6,7",onLoad:null,onMove:null,onPlay:null,onPause:null,page:"1",person:null,per_page:"50",set:null,tags:null,user:null};a.elements.target=j;for(l in i)if(__hasProp.call(i,l)){j=i[l];a.settings[l]=j}if(i.flickr_group!=null)a.settings.group=i.flickr_group;if(i.flickr_photoset!=null)a.settings.set=i.flickr_photoset;if(i.flickr_tags!=null)a.settings.tags=i.flickr_tags;if(i.flickr_user!=null)a.settings.user=i.flickr_user;a.addEvent(window,"load",a.onLoadWindow);return{constants:a.constants,elements:a.elements,settings:a.settings,left:a.onClickLeft,right:a.onClickRight,play:a.onClickPlay}};if(window.jQuery!=null)window.jQuery.fn.flickrshow=function(j){return new flickrshow(window.jQuery(this)[0],j)};