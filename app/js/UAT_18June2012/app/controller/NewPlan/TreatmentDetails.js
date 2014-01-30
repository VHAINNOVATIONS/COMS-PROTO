Ext.define("COMS.controller.NewPlan.TreatmentDetails", {
    extend : "Ext.app.Controller",
	TDData : {},		// This is used for storing the TD Data calculated within this controller rather than passing a variable around.
    views : [
		"NewPlan.TreatmentDetails"
    ],

    refs: [
		{ ref: "PatientInfoTable", selector: "TreatmentDetails [name=\"PatientInfoTable\"]"},
		{ ref: "PatientInfoTableHeader", selector: "TreatmentDetails [name=\"PatientInfoTableHeader\"]"},
		{ ref: "PatientInfoTableBody", selector: "TreatmentDetails [name=\"PatientInfoTableBody\"]"}
	],
	init: function() {
		wccConsoleLog("Initialized Treatment Details Controller!");
		this.control({
			"TreatmentDetails button[action=\"cancel\"]": {
				click: this.CancelTD
			},

			"TreatmentDetails" : {
				afterrender : this.AfterRenderWindow,
				close : this.CloseTDWin,
				resize : this.ResizeTable
			}
		});
	},

	CancelTD : function(button) {
		var win = button.up('window');
		win.close();
	},

	// Resize the TD Window based on the browser's size via the "onWindowResize" event handler
	AfterRenderWindow : function(theWin, eOPts) {
		Ext.EventManager.onWindowResize( this.ResizeTheTDWin, theWin );
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * 0.1;
		smaller = max - smaller;
		theWin.setHeight(smaller);
		Ext.Function.defer( theWin.focus, 2000, this );
		var theTpl = this.getPatientInfoTableHeader();
		var TDData;
		TDData = Ext.apply({}, this.application.Patient);
/**
		if (0 === TDData.TD.Vitals.length) {
			TDData.TD.FirstVitals = {};
			TDData.TD.LastVitals = {};
		}
		else {
			TDData.TD.FirstVitals = TDData.TD.Vitals[0];
			TDData.TD.LastVitals = TDData.TD.Vitals[1];
		}
**/
		TDData.Disease = [];
		theTpl.update(TDData);
	},

	ResizeTheTDWin : function() {
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * 0.1;
		smaller = max - smaller;
		this.setHeight(smaller);
	},

	ResizeTable : function(theWin, width, height, eOpts) {
		var tBody = this.getPatientInfoTableBody();
		if (tBody) {
			var max = theWin.getHeight();
			var smaller = max - 230;
			tBody.setHeight(smaller);
		}
	},


	// Make sure to remove the "onWindowResize" event handler when the TD window is closed.
	CloseTDWin : function(theWin, eOPts) {
		Ext.EventManager.removeResizeListener( this.ResizeTheTDWin, theWin );
	}
});
