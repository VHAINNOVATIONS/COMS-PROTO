Ext.define("COMS.controller.Common.EmeticInfo", {
	"extend" : "Ext.app.Controller",
	"views" : [
		"Common.EmeticInfo"
	],
	"refs" : [
		{ ref: "EmeticInfo",				selector: "EmeticInfo"}
	],
	init: function() {
		/**
		this.control({
			"scope" : this,
			"EmeticInfo": {
				afterrender : this.Render1
			}
		});
		**/
	},

	/**
	Render1 : function( theView, options) {
		var theEl = theView.getEl();
		var theContent = theEl.getHTML();
	},
	**/

	setEmeticInfoContent : function(data) {
		var theEl = this.getEmeticInfo().getEl();
		var theContent = theEl.getHTML();
		theEl.setHTML(data);
	}
});