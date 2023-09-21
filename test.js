/*
* JavaScript Document
 * b2lembeder
 * Project: Bookwall - Book2Look (https://www.book2look.com)
 * Developer: Trupti Pawar
 * Copyright 2017 WITS Interactive (http://www.witsindia.com)
 * Created Date: 24112017
 * Description: 
 * Update
 * 15122017 - code updates to add new embedcode status  
 * Last update - 15122017
*/
var embedPath = "https://www.book2look.com/bookwall/";
var embederJSPath = "https://www.book2look.com/html5/b2lembeder.js?";
//embedPath = "https://10.100.0.25:808/bookwall/";
var parentTag;
var iframe;
var embedMinW = 220;
var embedMaxW = 1220;
var minW = 220;
var minH = 400;
var prevSetW, prevSetH,setW, setH;
var argsArr = [];
var ecodestatus = "1";

var argsSet = "";
__Args = "";

var B2LWallEmbeder = B2LWallEmbeder || (function(){
    var _args = {};
    return {
        init : function(__Args) {
            _args = __Args;
			argsSet = "";
			console.log('B2LWallEmbeder:' );
			var caller = this.getParent();
			var qString = caller.src.replace(/^[^\?]+\??/,'');
			if ( qString ) {
				this._queryString = qString;
				this.parseArgs();
			}
        },
		getParent : function () {
			var scripts = document.getElementsByTagName('script');
			return scripts[ scripts.length - 1 ];
		},
		parseArgs : function () {
		   if ( ! this._queryString ) return false;
		   var Pairs = this._queryString.split(/&/);
		   for ( var i = 0; i < Pairs.length; i++ ) {
				var KeyVal = Pairs[i].split('=');
				if ( ! KeyVal.length == 2 ) continue;
				if ( ! ( KeyVal[0] || KeyVal[1] ) ) continue;
				if ( KeyVal[0].match(/^_/) ) continue;
				var key = unescape( KeyVal[0] );
				var val = unescape( KeyVal[1] );
				val = val.replace(/\+/g, ' ');
				val = val.replace(/&/g, '&amp;');
				val = val.replace(/>/g, '&gt;');
				val = val.replace(/</g, '&lt;');
				this[key] = val;
				argsArr[key] = new Object();
				argsArr[key] = val;
				if(val.indexOf("(") >= 0 && key == "id")
				{
					argsArr["commid"] = val;	
					var t = val;
					t = t.substr(0, t.indexOf('('));
					argsArr[key] = t;										
				}
				
				if(Pairs[i].toString().indexOf("id=") >= 0 && Pairs[i].toString().indexOf("bwruid=") == -1 && Pairs[i].toString().indexOf("bweuid=") == -1)
					Pairs[i] = Pairs[i].toString().replace("id=", "");
				argsSet += Pairs[i]+"&";
		}
		if(argsSet.substr(-1) == "&")
			argsSet = argsSet.substr(0, argsSet.length-1);   		
		 
		 console.log("argsSet "+argsSet)
		   B2LWallEmbeder.createEmbedCode();		   
		},
		getKeys : function () {
			var keys = new Object();
			for ( var attr in this ) {
				if ( attr.match(/^(_|getKeys)/) ) continue;
			    keys[attr] = undefined;
			  }
			return keys;
		},
        readParams : function() {
			for ( var key in args.getKeys() ) {
				console.log("key value "+key+":"+args[key]);
				console.log("or access as "+args.param1);
			}
        },
		createEmbedCode:function() {
			var scriptTag = document.scripts[document.scripts.length - 1];
			parentTag = scriptTag.parentNode;
			
			iframe = document.createElement('iframe');
			iframe.setAttribute('id', 'b2lEmbedWallFrame');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('align', 'middle');
			iframe.setAttribute('width', '100%');
			iframe.setAttribute('height', '0');
			iframe.setAttribute('seamless', 'seamless');
			//iframe.setAttribute('scrolling', 'no');
			iframe.setAttribute('style', 'overflow: hidden; margin: 0 auto;');
			
			var embedFullPath = embedPath+argsSet+"&ecodestatus=1";
			iframe.setAttribute('src', embedFullPath);
			parentTag.style.textAlign = "center";
			iframe.style.border = "solid 1px #ccc";
			parentTag.appendChild(iframe);
			B2LWallEmbeder.resizeEmbedCode();
			window.onresize = function() {
				B2LWallEmbeder.resizeEmbedCode();
			};
		},
		resizeEmbedCode:function(e) {
			console.log("resize "+parentTag.clientWidth);
			setW = parentTag.getAttribute("data-width");
			setH = parentTag.getAttribute("data-height");
			if(parentTag.clientWidth <= setW)
			{
				setW = "100%";
				//setH = window.innerHeight*0.95;
				setH = parentTag.getAttribute("data-height");
			}
			else if(parentTag.getAttribute("data-size") == "fixed")
			{	
				setW = parentTag.getAttribute("data-width");
				setH = parentTag.getAttribute("data-height");				
			}
			else
			{
				setW = "100%";
				setH = window.innerHeight*0.95;
			}			
			setW = (setW < minW) ? minW : setW;
			setH = (setH < minH) ? minH : setH;
			
			iframe.width = setW;
			iframe.height = setH;
		}
    };
}());

B2LWallEmbeder.init();