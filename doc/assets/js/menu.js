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
