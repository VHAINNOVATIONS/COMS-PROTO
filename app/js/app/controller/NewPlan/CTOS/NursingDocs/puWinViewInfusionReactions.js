Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions", {
	"extend" : "Ext.app.Controller",

	"views" : [
		"NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions",
		"Common.selInfusionReactionCombo" 
	],

	"stores" : [ 
		"InfusionReaction"
	],

	"refs" : [
		{ "ref" : "InfusionReactionCombo",		"selector" : "selInfusionReaction"}
	],


	"init" : function() {
		this.control({
			"scope" : this,
			"selInfusionReaction" : {
				"afterrender" : this.LoadCombo,
				"change" : this.IRDateSelected
			}
		});
	},

	"IRDateSelected" : function(combo, nValue) {
		var theStore = Ext.getStore("InfusionReaction");
		theStore.proxy.url = "/NursingDoc/ReactAssess/ireact_id/" + nValue;
		theStore.load({
			scope: this,
			callback: function(records, operation, success) {
				var i, st, categories = [], rLen = records.length, data = records[0].getData();
				st = data.sectionTitle;
				var category = {};
				var aField = {};
				category.sectionTitle = st;
				category.fields = [];
				for (i = 0; i < rLen; i++) {
					data = records[i].getData();
					if (st !== data.sectionTitle) {
						if (0 != categories.length) {
							categories.push(category);
						}
						st = data.sectionTitle;
						category = {};
						category.sectionTitle = st;
						category.fields = [];
					}
					aField = { "Choice" : data.Choice, "Comments" : data.Comments, "FieldName" : data.Field_Label, "Alert" : data.alertEvent };
					category.fields.push(aField);
				}
			}
		});
	},

	"LoadCombo" : function(theWinQues) {
		var theCombo = this.getInfusionReactionCombo();
		var theStore = theCombo.getStore();
		theStore.proxy.url = "/NursingDoc/ReactAssessList/" + this.application.Patient.PAT_ID;
		// console.log("Store Proxy - " + theStore.proxy.url);
//		theStore.load();
	},

	"Cancel" : function(btn) {
		btn.up('window').close();
	}
});