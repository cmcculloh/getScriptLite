/**
 * lightweight function to get a remote script and execute it on the page
 * http://github.com/cmcculloh/getScriptLite
 */
;(function($){
	/**
	 * Gets a remote script and appends to the page either at head or inline.
	 * Call like:
	 * 
	 * jQuery('img').getScriptLite({url: "http://scriptShack.com/makeImgZoomable.js"});
	 * or
	 * jQuery().getScriptLite({url: "http://scriptShack.com/pageCounter.js", appendToHead: true});
	 * 
	 * or if you have the metadate plugin installed, you can do this:
	 * <img class="{url:'http://scriptShack.com/makeImgZoomable.js'}" src="blah.jpg" />
	 * 
	 * <script>
	 * 	jQuery('img').getScriptLite();
	 * </script>
	 */
	jQuery.fn.getScriptLite = function(options){
		//get the default options, override with user options
		var opts = jQuery.extend({}, jQuery.fn.getScriptLite.defaults, options);
		
		//enable multiple DOM object results operations (for stuff like, $("p").getScriptLite("...");)
		return this.each(function(){
			//Merge in the metadata elements for this specific node
			var o = $.metadata ? $.extend({}, opts, $.metadata.get(this)) : opts;
			
			return doGetScriptLite($(this),opts);
		});
		
		function doGetScriptLite($obj,opts){
		        //Create a new script tag
			var script = document.createElement("script");
		        script.src = opts.url;

			if(!opts.appendToHead){//append to the element that called it
				jQuery($obj).append(script);
			}else{//append to the head of the document
				var head = document.getElementsByTagName("head")[0];    
				head.appendChild(script);
			}
			return $obj;
		}
	};
	
	/**
	 * Defaults for the getScriptLite function
	 * 
	 * If there is a certain script you want to get and execute throughout the
	 * page at different times, you can modify the defaults to contain the URL
	 * you desire, by:
	 * 
	 * jQuery.fn.getScriptLite.defaults = {
	 * 	url: "/global/js/min/plugins/includedScript.js",
	 * 	appendToHead: false;
	 * }
	 * 
	 * Or, if you always want it appended to head:
	 * 
	 * jQuery.fn.getScriptLite.defaults = {
	 * 	url: "",
	 * 	appendToHead: true;
	 * }
	 * 
	 */
	jQuery.fn.getScriptLite.defaults = {
		url: "",
		appendToHead: false
	};
})(jQuery);