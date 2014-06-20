Ext.define("COMS.controller.CkBoxTArea", {
	extend: "Ext.app.Controller",
	views: [
		"CkBoxTArea"
	],

	init: function () {
		this.control({
			"CkBoxTArea checkbox" : {
				"change" : this.ClickCheckbox
			},
			"CkBoxTArea" : {
				"afterrender" : this.setLabel
			}
		});
	},

	setLabel : function(theOBJ) {
		var theCkBoxName = theOBJ.name;
		var theCkBox = theOBJ.down("checkbox");
		var theTArea = theOBJ.down("textarea");
		theCkBox.setFieldLabel(theOBJ.fieldLabel);
		theCkBox.name = theCkBoxName + "_Ck";
		theTArea.name = theCkBoxName + "_Comment";
	},

	ClickCheckbox : function(theField, newV, oldV, eOpts) {
		var tArea = theField.up("CkBoxTArea").down("textarea");
		if (newV) {
			tArea.show();
		}
		else {
			tArea.hide();
		}
	}
});
