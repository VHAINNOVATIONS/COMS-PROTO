Ext.define('COMS.controller.Management.EmeticMeds', {
	extend : 'Ext.app.Controller',
	views : [ 'Management.EmeticMeds' ],
	stores : ["EmeticMeds"],
	refs: [
		{ ref : "EmeticMedsGrid",           selector : "EmeticMeds grid" },
		{ ref : "PatientType",              selector : "EmeticMeds radiogroup[name=\"patientRadio\"]" },
		{ ref : "selDrug",                  selector : "EmeticMeds combo[name=\"Drug\"]" },
		{ ref : "DeleteBtn",                selector : "Toxicity button[text=\"Delete\"]" }

	],

	init: function() {

		this.control({
			"EmeticMeds " : {
				afterrender : this.initDrugStore
			},
			"EmeticMeds radiogroup[name=\"patientRadio\"]" : {
					change: this.selPatientType
			},
			"EmeticMeds combo[name=\"Drug\"]" : {
				select: this.selDrug
			},
			"Toxicity grid" : {
				select: this.selectGridRow,
				deselect: this.deSelectGridRow
			},
			"Toxicity button[text=\"Cancel\"]" : {
				click: this.CancelForm
			},
			"Toxicity button[text=\"Save\"]" : {
				click: this.SaveForm
			},
			"Toxicity button[text=\"Refresh\"]" : {
				click: this.RefreshPanel
			},
			"Toxicity button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
			}
		});

	},

	initDrugStore : function() {
		var theDrugCombo = this.getSelDrug();
		theDrugCombo.lastQuery = null; 
		var theDrugStore = theDrugCombo.getStore();
		var pType = this.getPatientType().getValue().PatientType;
		theDrugStore.proxy.url = Ext.URLs.Drugs + "/" + pType;
	},

	selPatientType : function(rgroup, nValue, oValue, eOpts) {
		this.initDrugStore();
	},

	selDrug : function(theCombo, theRecord) {
		var DrugID = theCombo.getValue();
		var DrugName = theDrugCombo.getRawValue();
		var theData = theRecord[0].getData();
		// theData.id, theData.name, theData.description
		var rawData = theRecord[0].raw;
		// rawData.id, rawData.name, rawData.description, rawData.type

		debugger;
	},

	selectGridRow : function() {
	},
	deSelectGridRow : function() {
	},
	CancelForm : function() {
	},
	SaveForm : function() {
	},
	RefreshPanel : function() {
	},
	DeleteSelectedRecords : function() {
	}
});
