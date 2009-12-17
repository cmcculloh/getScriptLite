(function($){
	jQuery.getScriptLite = function(url) {
	var script = document.createElement("script");
	script.src = url;

	var head = document.getElementsByTagName("head")[0];    
	head.appendChild(script);
	return this;
})(jQuery);