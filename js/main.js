var TIME_START = Date.parse("2012-10-18T11:16:00.0000-0700");
var TIME_END = Date.parse("2012-10-18T18:17:00.0000-0700");
var VIDEO_LEN_SECONDS = 41 * 60 + 50;

var TIME_FACTOR = ((TIME_END - TIME_START)/1000) / VIDEO_LEN_SECONDS;

var dp = 100;
var p;
var t;
var container = document.getElementsByClassName('viewer')[0];
var controls = document.getElementsByClassName('viewer-controls')[0];
var player = document.getElementById('ytViewer');
var ytPlayer;
var playing = false;
var ratio = player.getAttribute('width') / player.getAttribute('height');
var timeline_times;
var currentTime;
var TIME_DISPLAY_WIDTH = 65;
var w = $(container).width();
var size = { width: Math.max(480, w) };
size.width = size.width <= 1024 ? size.width : 1024;
size.height = size.width / ratio;
size.left = $('.container').offset().left;
$(container).width(size.width).height(size.height);
$(controls).css({
  position:'absolute',
  top: size.height - 20,
  left: 0
});
player.setAttribute('width', size.width);
player.setAttribute('height', size.height);

var paper = Raphael(controls, size.width+20, 70);
var timeline = new paper.set();

drawTimeline = function() {
  timeline.clear();
  timeline_times = [];
  
  var interval = (TIME_END - TIME_START) / 100;
  for( i = 0; i < 100; i++ ) {
    var time = new Date(TIME_START + interval * i);
    timeline_times[i] = { "time": time, "major": i%10==0 };
  }
  //console.log(timeline_times);
  timeline.clear();
  timeline.push( paper.rect(0,0,size.width,20)
    .attr("fill","#fff").attr("opacity","1")
    .attr("stroke-width","0"));
  timeline_times.forEach( function(i) {
    i["x"]= timeline_times.indexOf(i)*(size.width/timeline_times.length);


    var time = new Date(Date.parse(i.time));
    timeline.push( rect = paper.rect(i.x, 0, i.major ? 2 : 1, i.major ? 10 : 7,0) );
    if( i.major ) {
      timeline.push( label = paper.text(i.x,15,amPM(time,false)+":"+niceMins(time)+amPM(time,true)));
    }
    rect.attr("stroke-width","0");
    rect.attr("fill","#999");
  });
  timeline.forEach(function(i) {
    i.transform("t0,40");
  });
}
drawTimeline();

moveSlider = function(x,type) {
  //console.log(x,type);
  slider.toFront();
  var slider_x = x - slider.getBBox().width;
  var timer_x = slider_x;
  var timer_w = TIME_DISPLAY_WIDTH;
  //console.log(timer_w);
  //don't let time display off screen
  if( size.width - timer_x < timer_w ){
    timer_x = size.width - timer_w;
  } else if (timer_x < timer_w ){
    timer_x = timer_w;
  }

  if( type == "abs"){
    slider.transform("T"+slider_x+",15" );
    timeDisplay.transform("T"+(timer_x)+",10" );
  } else {
    slider.transform("t"+slider_x+",15" );
    timeDisplay.transform("t"+(timer_x+20)+",10" );
  }

  //console.log(timer_x);
}

var slider = paper.path( "M10.5,4.5 L28.5,4.5 L28.5,23.385 L19.503,35.01 L10.5,23.428z")
  .attr("fill", "#FFF").attr("stroke","#666").attr("stroke-width","2").transform("T0,30");

var timeDisplay = paper.set();
currentTime = new Date(TIME_START).toISOString();
timeDisplay.push( paper.rect(-65,-10,130,20).attr({'stroke-width':0, 'fill':'#fff', 'opacity':'.8'}) );
timeDisplay.push( paper.text(0,0,"").attr("fill","#000").attr("font-size","14px") );

function moveToTime(time) {
  moveSlider(xFromTime(time) ,"abs");
  timeDisplay.attr("text",toNiceTimeStamp( new Date(Date.parse(currentTime)) ));
}

slider.drag(
  function(dx,dy,x,y,e){
    var oX = x - size.left;
    e.preventDefault();

    if( oX > 0 && oX < size.width){
      moveSlider(oX,"abs");
      currentTime = timeFromX(oX);
      timeDisplay.attr("text",toNiceTimeStamp( new Date(Date.parse(currentTime)) ));
    }
  },
  function(x,y,e){

  },
  function(e){
    seekTo(currentTime);
  });


// it is often quicker or more meaningful to find the closest tick
// than to find the exact time at slider location
closestTimelineTime = function(time) {
  var diff = null;
  closestTime = null;
  timeline_times.forEach( function(i) {
    d = Math.abs(Date.parse(i.time) - Date.parse(time) );
    if( diff == null || d < diff ) {
      closestTime = i;
      diff = d;
    }
  });
  return closestTime;
}
function xFromTime(time) {
  var pos = (Date.parse(time) - TIME_START) / (TIME_END - TIME_START);
  return pos * size.width;
}

function timeFromX(x) {
  return new Date(TIME_START + (x/size.width) * (TIME_END - TIME_START)).toISOString();
}

function seekTo(time) {
  var pos = (Date.parse(time) - TIME_START) / (TIME_END - TIME_START);
  ytPlayer.seekTo(pos * VIDEO_LEN_SECONDS);
}



function include(arr,obj) {
  return (arr.indexOf(obj) != -1);
}

function onPlayerReady(evt) {
  ytPlayer = evt.target;
  ytPlayer.seekTo(0);
}

function onPlayerStateChange(evt) {
  if(evt.target.getPlayerState() == 1) {
    playing = true;
  } else {
    playing = false;
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytViewer', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

setInterval(function() {
  if(playing) {
    currentTime = new Date(Date.parse(currentTime) + TIME_FACTOR * 1000).toISOString();
    moveToTime(currentTime);
  }
}, 1000);
