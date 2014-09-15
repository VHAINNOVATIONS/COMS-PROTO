/**
 *
 * Passed Patient ID on the query string
 * Need Template ID for the LookUp/EFNR service call
 **/

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
]);

Ext.URLs = [];
Ext.URLs.EFNR = "/LookUp/EFNR/";	// Plus Template ID
Ext.URLs.OEM = "/Patient/OEM/";	// Plus Patient ID


Ext.data.Connection.disableCaching = false;
Ext.data.proxy.Server.prototype.noCache = false;
Ext.Ajax.disableCaching = false;


Ext.application({
	name: "COMS",
	Query_String : Ext.Object.fromQueryString(location.search),

	controllers: [
		"NewPlan.CTOS.NursingDocs.Chemotherapy"
	],
	launch: function () {
		// getOEM_Data();
		// getEFNR_Data();
		// getFlowSheet_Data();

		var heading = Ext.get("heading");
		heading.dom.style.display="block";

		var tmpWidth = Ext.getBody().getViewSize().width - 50;
		var tmpHeight = Ext.getBody().getViewSize().height - 160;

		var minWidth = tmpWidth - 100;
		var minHeight = tmpHeight - 40;

		if (minWidth < 0) {
			minWidth = 200;
		}
		if (minHeight < 0) {
			minHeight = 200;
		}
		var ChemoHeader = Ext.create("COMS.view.NewPlan.CTOS.NursingDocs.Chemotherapy", { renderTo : "heading" });
	},

	getOEM_Data : function() {},
	getEFNR_Data : function() {
	console.log("Service Call Completion render to NursingDocs_Chemotherapy");
	},
	getFlowSheet_Data : function() {}

});




	/* js/app/view/NewPlan/CTOS/NursingDocs/Chemotherapy.js */
	Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Chemotherapy" ,{
		extend: "Ext.form.FieldSet",
		alias : "widget.NursingDocs_Chemotherapy",
		name : "NursingDocs.Chemotherapy",
		title : "Chemotherapy / Biotherapy",

		items : [ 
			{ "xtype" : "displayfield", "name" : "ndctRegimen", "fieldLabel" : "Regimen", "labelClsExtra" : "NursingDocs-label" },
			{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : 10, "name" : "NeutropeniaInfo"}, 
			{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : 10, "name" : "EmesisInfo"}
		]
	});


Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.Chemotherapy", {
	extend: "Ext.app.Controller",

	refs: [
		{ "ref" : "ndctRegimen",			"selector" : "NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]" },
		{ "ref" : "FNLPanel",			"selector" : "NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]" },
		{ "ref" : "EmoPanel",			"selector" : "NursingDocs_Chemotherapy [name=\"EmesisInfo\"]" }
	],

	

	init: function () {
		console.log("Controller Init");
		this.control({
			"NursingDocs_Chemotherapy" : {
				afterrender : function() {
					console.log("Fieldset Rendered");
					this.getEFNR_Data();
				},
				scope : this 
			},
			"NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]" : {
				afterrender : function() {
					console.log("FRN Rendered");
					var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.Chemotherapy");
					thisCtl.getFNRiskInfoAfterRender();
				},
				scope : this 
			},
			"NursingDocs_Chemotherapy [name=\"EmesisInfo\"]" : {
				afterrender : function() {
					console.log("Emesis Rendered");
					var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.Chemotherapy");
					thisCtl.getEmoLevelInfoAfterRender();
				},
				scope : this 
			}

		});
	},

	getFNRiskInfoAfterRender : function() {
//		var Data = this.application.Patient.OEMRecords;
//		if (Data) {
//			this.getFNRiskInfo(Data.FNRisk);
//		}
	},

	getEmoLevelInfoAfterRender : function() {
//		var Data = this.application.Patient.OEMRecords;
//		if (Data) {
//			this.getEmoLevelInfo(Data.ELevelName);
//		}
	},

	getFNRiskInfo : function(FNRisk) {
		var i, len, FNLPanel = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]");
		var FNLevelInfo = FNRisk < 10 ? "Low Risk" : FNRisk <= 20 ? "Intermediate Risk" : "High Risk";
		var theFNLevelData = Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.NeutropeniaRecommendation);

		len = FNLPanel.length;
		var theTitle = "Febrile Neutropenia Level = " + FNRisk + "% (" + FNLevelInfo + ")";

		for (i = 0; i < len; i++) {
			if (FNLPanel[i].rendered) {
				FNLPanel[i].setTitle(theTitle);
				FNLPanel[i].update(theFNLevelData);
				FNLPanel[i].doLayout();
			}
		}
	},

	getEmoLevelInfo : function(ELevel) {
		var i, len, EmoPanel = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"EmesisInfo\"]");
		len = EmoPanel.length;
		var emoTitle = "Emetogenic Level = Not Specified",
			theEmoLevelData = "Not Yet Available";

		if (ELevel && Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.ELevelRecommendation)) {
			emoTitle = "Emetogenic Level = " + ELevel;
			theEmoLevelData = Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.ELevelRecommendation);
		}
		for (i = 0; i < len; i++) {
			if (EmoPanel[i].rendered) {
				EmoPanel[i].setTitle(emoTitle);
				if (ELevel) {
					EmoPanel[i].update(theEmoLevelData);
					EmoPanel[i].doLayout();
				}
			}
		}
	},

	setChemoBioField : function(fieldQuery, value, showField) {
		// console.log("setChemoBioField - " + fieldQuery);
		var theField = Ext.ComponentQuery.query(fieldQuery);
		var i, len = theField.length;
		for (i = 0; i < len; i++) {
			theField[i].setValue(value);
			if (showField) {
				theField[i].show();
			}
			else {
				theField[i].hide();
			}
		}
	},

	ChemoBioSectionHandler : function ( Clear ) {		// Handles parsing and posting of data in the Chemotherapy/Biotherapy sections in ND and Flowsheet
		if (!this.application.Patient.ThisAdminDay) {
			this.application.Patient.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		}
		var ThisAdminDay = this.application.Patient.ThisAdminDay;

		var Patient = this.application.Patient;
		var TempDesc = Patient.TemplateDescription;
		if ("" === TempDesc) {
			TempDesc = Patient.TemplateName;
		}

		this.getFNRiskInfoAfterRender();
		this.getEmoLevelInfoAfterRender();

		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]", TempDesc, ("" !== TempDesc));
	},


	getEFNR_Data : function() {
		Ext.Ajax.request({
			url: Ext.URLs.EFNR + "/" + this.application.Query_String.PID,
			scope: this,
			success: function( response, opts ){

				var resp = Ext.JSON.decode( response.responseText ).records[0];
				resp.Template_ID = resp.id;
				delete resp.id;
				delete resp.RegimenId;
				this.application.Patient = {};
				this.application.Patient.OEM_TopLevelData = resp;

				this.getNdctRegimen().setValue(resp.description);
				this.getFNLPanel().setTitle("Febrile Neutropenia Level = " + resp.fnrLevel);
				this.getEmoPanel().setTitle("Emetogenic Level = " + resp.emoLevel);
				
				this.getFNLPanel().update( Ext.util.Format.htmlDecode(Ext.util.Format.htmlDecode(resp.fnrDetails)));
				this.getEmoPanel().update( Ext.util.Format.htmlDecode(Ext.util.Format.htmlDecode(resp.emoDetails)));

				debugger;
			},
			failure : function( response, opts ) {
				alert("Failure to load Medicstion Info");
			}
		});
	}

});











