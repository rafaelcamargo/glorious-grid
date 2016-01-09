(function(){

	'use strict'

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
