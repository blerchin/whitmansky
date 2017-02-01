var tag = document.createElement('script');
tag.id = 'iframe-script'
tag.src = 'https://www.youtube.com/iframe_api';
var firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(tag, firstScript);
