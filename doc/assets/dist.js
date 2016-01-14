(function(){

  'use strict';

  function init(){
    var codeBlocks = document.querySelectorAll('code');
    for (var i = 0; i < codeBlocks.length; i++)
      codeBlocks[i].innerHTML = replaceHTMLSpecialChars(codeBlocks[i].innerHTML).trim();
  }

  function replaceHTMLSpecialChars(text){
    return text.replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
  }

  init();
  
})();

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

(function(){

  'use strict';

  var menu, menuItems, menuHeight, menuOffset, introOffset, installOffset, usageOffset, contributeOffset;

  function init(){
    getMenuElements();
    setTriggers();
    setupMenu();
  }

  function setupMenu(){
    if(isWebfontLoaded()){
      getSectionOffsets();
      handleMenu();
    }
    else
      setTimeout(setupMenu, 100);
  }

  function isWebfontLoaded(){
    return document.getElementsByTagName('html')[0].className.indexOf('loading') === -1
  }

  function getSectionOffsets(){
    menuHeight = document.querySelectorAll('[data-js="menu"]')[0].clientHeight;
    introOffset = getTopOffset('section-intro');
    installOffset = getTopOffset('section-install');
    usageOffset = getTopOffset('section-usage');
  }

  function getMenuElements(){
    menu = document.querySelectorAll('[data-js="menu"]')[0];
    menuItems = document.querySelectorAll('[data-js="menu"] li');
  }

  function handleMenu(){
    var offset = window.pageYOffset;
    handleMenuPosition(offset);
    handleMenuSelection(offset);
  }

  function handleMenuPosition(offset){
    menu.className = menu.className.replace(' is-fixed','');
    if(shouldFixMenu(offset))
      menu.className = [menu.className,'is-fixed'].join(' ');
  }

  function handleMenuSelection(offset){
    handleMenuItems('enable', menuItems);
    if(isFixedMenu()){
      handleMenuItems('disable', menuItems);
      enableMenuItem(getMenuItemToBeEnabled(offset));
    }
  }

  function handleMenuItems(behavior, items){
    for (var i = 0; i < items.length; i++){
      if(behavior == 'disable')
        items[i].className =  [items[i].className, 'is-disabled'].join(' ');
      else
        items[i].className =  items[i].className.replace('is-disabled', '').replace('is-selected', '');
    }
  }

  function enableMenuItem(item){
    item.className = [item.className.replace('is-disabled',''),'is-selected'].join(' ');
  }

  function getMenuItemToBeEnabled(offset){
    if(offset >= introOffset && offset < installOffset)
      return getMenuItem('menu-intro');
    else if (offset >= installOffset && offset < usageOffset)
      return getMenuItem('menu-install');
    else if (offset >= usageOffset && offset < getPageBottomOffset(offset))
      return getMenuItem('menu-usage');
    return getMenuItem('menu-contribute');
  }

  function getMenuItem(dataAttr){
    return document.querySelectorAll('[data-js="' + dataAttr + '"]')[0];
  }

  function getPageBottomOffset(offset){
    return document.getElementsByTagName('body')[0].clientHeight - window.innerHeight;
  }

  function isFixedMenu(){
    return menu.className.indexOf('is-fixed') > -1;
  }

  function getTopOffset(dataAttr){
    return document.querySelectorAll('[data-js="' + dataAttr + '"]')[0].offsetTop - menuHeight;
  }

  function shouldFixMenu(offset){
    return offset >= menu.offsetTop;
  }

  function goToSection(evt){
    var section = evt.currentTarget.getAttribute('data-js').replace('menu','section');
    window.scrollTo(0, getTopOffset(section));
  }

  function setTriggers(){
    setMenuItemsTriggers();
    window.onscroll = handleMenu;
    window.onresize = setupMenu;
  }

  function setMenuItemsTriggers(){
    for (var i = 0; i < menuItems.length; i++)
      menuItems[i].addEventListener('click', goToSection);
  }

  window.onload = init;
  
})();

var WebFontConfig = {
  google: { families: [ 'Source+Sans+Pro:400,300:latin' ] }
};

(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
