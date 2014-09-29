Ext.define("COMS.controller.NewPlan.PatientHistory", {
	"extend" : "Ext.app.Controller",
	"views" : [
		"NewPlan.PatientHistory"
	],
	"refs" : [
		{ ref : "AddVitalsPanel", selector: "PatientHistory container[name=\"AddVitals\"]"},
	],
	"init" : function() {
		this.control({
			"scope" : this,
			"PatientHistory" : {
				"afterrender" : this.RenderPanel
			},
			"PatientHistory button[name=\"Show_Hide_Add_Vitals\"]" : {
				"click" : this.ShowHideVitals
			}
		});
	},

	RenderPanel : function (panel) {
	},

	ShowHideVitals : function (btn) {
		var thePanel = this.getAddVitalsPanel();
		if (thePanel.hidden) {
			thePanel.show();
			theButton.setText("Hide Add Vitals");
		} else {
			thePanel.hide();
			theButton.setText("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Vitals&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		}
	}

});