Ext.define("COMS.controller.NewPlan.ViewEndTreatmentSummary", {
    extend : "Ext.app.Controller",
	EoTSData : {},		// This is used for storing the EoTS Data calculated within this controller rather than passing a variable around.
    views : [
		"NewPlan.ViewEndTreatmentSummary"
    ],

    refs: [
		{ ref: "PatientInfoTable", selector: "ViewEndTreatmentSummary [name=\"PatientInfoTable\"]"},
		{ ref: "PatientInfoTableHeader", selector: "ViewEndTreatmentSummary [name=\"PatientInfoTableHeader\"]"},
		{ ref: "PatientInfoTableBody", selector: "ViewEndTreatmentSummary [name=\"PatientInfoTableBody\"]"},
		{ ref: "Reason4EOTSHead", selector: "ViewEndTreatmentSummary [name=\"Reason4EOTSHead\"]"}
	],
    init: function() {
        wccConsoleLog("Initialized End of Treatment Summary Controller!");
        this.control({
            "ViewEndTreatmentSummary button[action=\"cancel\"]": {
                click: this.CancelEoTS
            },

            "ViewEndTreatmentSummary" : {
				afterrender : this.AfterRenderWindow,
				close : this.CloseEoTSWin,
				resize : this.ResizeTable
            }

        });
    },

	CancelEoTS : function(button) {
        var win = button.up('window');
        win.close();
	},

	// Resize the EoTS Window based on the browser's size via the "onWindowResize" event handler
	AfterRenderWindow : function(theWin, eOPts) {
		Ext.EventManager.onWindowResize( this.ResizeTheEoTSWin, theWin );
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * 0.1;
		smaller = max - smaller;
		theWin.setHeight(smaller);
		Ext.Function.defer( theWin.focus, 2000, this );
		var theTpl = this.getPatientInfoTableHeader();
		var EoTSData;
		EoTSData = Ext.apply({}, this.application.Patient);

/*********** MWB - 10/30/2013
var SampleData = {
	"Amputations": [
		{
			"description": "Left Hand and Fingers"
		},
		{
			"description": "Left Foot"
		}
	],

	"Vitals": [
		{
			"Height": "70",
			"Weight": "172",
			"BP": "146/84",
			"WeightFormula": "Actual Weight",
			"BSA_Method": "DuBois",
			"BSA": "",
			"BSA_Weight": 78,
			"DateTaken": "07/16/2012",
			"Temperature": "98.4",
			"Pulse": "76",
			"Respiration": "12",
			"Pain": "4",
			"SPO2": "",
			"Cycle": "",
			"Day": "",
			"PS": "Fully active, able to carry on all pre-disease performance without restriction",
			"PSID": "0",
			"Age": 77,
			"Gender": "M",
			"Amputations": [
				{
					"description": "Left Hand and Fingers"
				},
				{
					"description": "Left Foot"
				}
			]
		},
		{
			"Height": "70",
			"Weight": "172",
			"BP": "146/84",
			"WeightFormula": "Actual Weight",
			"BSA_Method": "DuBois",
			"BSA": 1.84,
			"BSA_Weight": 78,
			"DateTaken": "07/30/2012",
			"Temperature": "98.4",
			"Pulse": "76",
			"Respiration": "12",
			"Pain": "4",
			"SPO2": "",
			"Cycle": "",
			"Day": "",
			"PS": "Fully active, able to carry on all pre-disease performance without restriction",
			"PSID": "0",
			"Age": 77,
			"Gender": "M",
			"Amputations": [
				{ "description": "Left Hand and Fingers" },
				{ "description": "Left Foot" }
			]
		}
	],

	"ProviderReport": "Provider Report<br>",
	"FollowUpAppointments": "Follow-Up Appointments<br>",

	"Meds" : [
		{ "name" : "Saline", "administered" : [
			{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "dosage" : "8 mg" }
		]},
		{ "name" : "Dexamathasone", "administered" : [ ] }
	],
	"DiseaseResponse" : [
		{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "desc" : "Minimal response noted" }
	],
	"Toxicity" : [
		{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "desc" : "None at this time" }
	],
	"Other" : [
		{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "desc" : "Minimal response noted" }
	],
	"id": null
};
**************************************/


//		EoTSData.Amputations = Ext.apply({}, SampleData.Amputations);
//		EoTSData.EoTS.FirstVitals = Ext.apply({}, SampleData.Vitals[0]);
//		EoTSData.EoTS.LastVitals = Ext.apply({}, SampleData.Vitals[1]);
//		EoTSData.EoTS.ProviderReport = Ext.apply({}, SampleData.ProviderReport);
//		EoTSData.EoTS.FollowUpAppointments = Ext.apply({}, SampleData.FollowUpAppointments);
//		EoTSData.EoTS.Meds = Ext.apply({}, SampleData.Meds);

//		EoTSData.EoTS.DiseaseResponse = Ext.apply({}, SampleData.DiseaseResponse);
//		EoTSData.EoTS.Toxicity = Ext.apply({}, SampleData.Toxicity);
//		EoTSData.EoTS.Other = Ext.apply({}, SampleData.Other);


if (0 === EoTSData.EoTS.Vitals.length) {
	EoTSData.EoTS.FirstVitals = {};
	EoTSData.EoTS.LastVitals = {};
}
else {
	EoTSData.EoTS.FirstVitals = EoTSData.EoTS.Vitals[0];
	EoTSData.EoTS.LastVitals = EoTSData.EoTS.Vitals[1];
}


		EoTSData.Disease = [];
		theTpl.update(EoTSData);
	},

	ResizeTheEoTSWin : function() {
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


	// Make sure to remove the "onWindowResize" event handler when the EoTS window is closed.
	CloseEoTSWin : function(theWin, eOPts) {
		Ext.EventManager.removeResizeListener( this.ResizeTheEoTSWin, theWin );
	}
});
