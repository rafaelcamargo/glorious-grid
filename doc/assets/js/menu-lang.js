(function(){

  'use strict';

  var langSelectors = document.querySelectorAll('.cp-menu-lang li');
  var path = window.location.pathname;

  function init(){
    setTriggers();
    identifyLang();
  }

  function setTriggers(){
    for (var i = 0; i < langSelectors.length; i++)
      langSelectors[i].onclick = changeLang;
  }

  function changeLang(evt){
    var lang = evt.currentTarget.getAttribute('data-lang');
    if(!isLangAlreadySetted(lang))
      window.location.pathname = path.replace(/doc\/\w{2}-\w{2}\//g,'doc/' + lang);
  }

  function isLangAlreadySetted(lang){
    return window.location.pathname.indexOf(lang) > -1;
  }

  function identifyLang(){
    for (var i = 0; i < langSelectors.length; i++)
      if(path.indexOf(langSelectors[i].getAttribute('data-lang')) > -1)
        langSelectors[i].setAttribute('class', 'is-active');
  }

  init();
  
})();
