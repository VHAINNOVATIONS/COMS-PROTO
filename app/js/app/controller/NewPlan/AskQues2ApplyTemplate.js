Ext.define("COMS.controller.NewPlan.AskQues2ApplyTemplate", {
	extend : "Ext.app.Controller",
	"views" : [
		"NewPlan.AskQues2ApplyTemplate"
		],
	refs: [ 
		{ ref: "TypeOfTrial",					selector: "AskQues2ApplyTemplate textfield[name=\"TypeOfTrial\"]"},
		{ ref: "Goal",						selector: "AskQues2ApplyTemplate form radiogroup[name=\"goalRadio\"]"},
		{ ref: "AmputeeType",					selector: "AskQues2ApplyTemplate form AmputationSelection"},
		{ ref: "AmputeeYes",					selector: "AskQues2ApplyTemplate form radiogroup[name=\"amputeeRadio\"] radio[boxLabel=\"Yes\"]"},
		{ ref: "AmputeeNo",					selector: "AskQues2ApplyTemplate form radiogroup[name=\"amputeeRadio\"] radio[boxLabel=\"No\"]"},
		{ ref: "CTOS_Tab",					selector: "NewPlan.CTOS form[name:\"NewPlan_CTOS_Form\"]"}
	],
	init: function() {
		// this.application.btnEditTemplatClicked=false;
		this.control({
			"AskQues2ApplyTemplate" : {
				"show" : this.ShowWindow,
				"scope" : this
			},
			"AskQues2ApplyTemplate button[text=\"Apply Template\"]": {
				click: this.ApplyTemplate
			},
			"AskQues2ApplyTemplate button[text=\"Cancel\"]": {
				click: this.cancelApply
			},
			"AskQues2ApplyTemplate radiogroup[name=\"ConcurRadTherapyRadio\"]":{
				change : this.ConcurRadTherapySelected
			},
			"AskQues2ApplyTemplate radiogroup[name=\"clinicalTrialRadio\"]":{
				change : this.ClinicalTrialTypeSelected
			},
			"AskQues2ApplyTemplate radiogroup[name=\"amputeeRadio\"]":{
				change : this.AmputeeSelected
			}
		});
	},
    cancelApply: function(button){
		button.up("window").close();
    },

	ShowWindow : function() {
		if (this.application.Patient.Amputations && this.application.Patient.Amputations.length > 0) {
			this.getAmputeeYes().setValue(true);
			this.AmputeeSelected("", { Amputee : true });
			var AmpuSelCtl = this.getController("NewPlan.AmputationSelection");
			AmpuSelCtl.renderAS();
		}
		else {
			this.getAmputeeNo().setValue(true);
			this.AmputeeSelected("", { Amputee : false });
		}
	},

    AmputeeSelected: function (rbtn, newValue, oldValue, eOpts ) {
        wccConsoleLog("User has selected Amputee Type");

        if (true === newValue.Amputee) {
            this.getAmputeeType().show();
        }
        else {
            this.getAmputeeType().hide();
        }
    },

	ConcurRadTherapySelected: function (rbtn, newValue, oldValue, eOpts ) {

	},

    ClinicalTrialTypeSelected: function (rbtn, newValue, oldValue, eOpts ) {
        wccConsoleLog("User has selected Clinical Trial Type");

        if (true === newValue.ClinicalTrial) {
            this.getTypeOfTrial().show();
        }
        else {
            this.getTypeOfTrial().hide();
        }
    },


	// Save button for the AskQues2ApplyTemplate Widget. This widget is for applying a new template to a patient
    ApplyTemplate: function(button){
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
        var amputations = [];

        if('' === values.startdate){
            Ext.MessageBox.alert('Invalid', 'You must select a start date.');
            return;
        }

        if(null == values.BSA_FormulaWeight){
            Ext.MessageBox.alert('Invalid', 'You must select a Weight Formula.');
            return;
        }

        if(null == values.BSA_Formula){
            Ext.MessageBox.alert('Invalid', 'You must select a BSA Formula.');
            return;
        }

        if(null == values.Goal){
            Ext.MessageBox.alert('Invalid', 'You must select a Goal.');
            return;
        }

        if(null == values.PerfStatus){
            Ext.MessageBox.alert('Invalid', 'You must select a Performance Status.');
            return;
        }

        if(null == values.ClinicalTrial){
            Ext.MessageBox.alert('Invalid', 'Please select either Yes to specify a type of clinical trial or select No.');
            return;
        }

        if(true === values.ClincalTrial && '' === values.TypeOfTrial){
            Ext.MessageBox.alert('Invalid', 'Please enter the type of Clinical Trial.');
            return;
        }

        if(true === values.Amputee){
            var amputationsCB = Ext.ComponentQuery.query('AmputationSelection checkboxgroup[name=\"amputations\"]')[0];
            var checkedVals = amputationsCB.getChecked();
			var i;

            if(0 === checkedVals.length){
                Ext.MessageBox.alert('Invalid', 'You must select an Amputation Type.');
                return;
            }

            for(i=0;i<checkedVals.length;i++){
                amputations.push(checkedVals[i].boxLabel);
            }
        }

        var startDate = Ext.Date.dateFormat(new Date(values.startdate), 'Y-m-j');		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        var today = Ext.Date.dateFormat(new Date(), 'Y-m-j');

		// Is this template pending approval?
		var thePatient = this.application.Patient, 
			TemplatePending, 
			ExistingRecordID, 
			ApprovedByUser, 
			OriginalAppliedDate, 
			PAT_ID,
			theRecord;
		if (thePatient.CurrentTemplatesApplied2Patient && thePatient.CurrentTemplatesApplied2Patient.length >= 1) {
			TemplatePending = thePatient.CurrentTemplatesApplied2Patient[0];
			ExistingRecordID = TemplatePending.id;
			ApprovedByUser = TemplatePending.ApprovedByUser;
			OriginalAppliedDate = TemplatePending.DateApplied;
			PAT_ID = thePatient.PAT_ID;
			if ("" === ApprovedByUser) {
				today = OriginalAppliedDate;
			}
		}





		var TemplateInfo = this.application.CurrentTemplate.data;
		var MaxCycles = TemplateInfo.CourseNumMax;
		var CycleLength = TemplateInfo.CycleLength; // (need to convert to days... 8 == weeks...
		var CycleLengthUnit = TemplateInfo.CycleLengthUnit[0].name;
		switch (CycleLengthUnit) {
			case "Weeks":
				CycleLength = CycleLength * 7;
				break;
			case "Months" :
				CycleLength = CycleLength * 30;
				break;
			case "Years" :
				CycleLength = CycleLength * 365;
				break;
		}
		var RegimenDuration = CycleLength * MaxCycles;
		var future;

		win.close();
		Ext.ComponentQuery.query("form[name=\"NewPlan_CTOS_Form\"]")[0].setLoading("Applying template, please wait...", false);
		future = Ext.Date.dateFormat(Ext.Date.add(new Date(values.startdate), Ext.Date.DAY, RegimenDuration),'Y-m-j');
		var newCtl = this.getController("NewPlan.NewPlanTab");

	theRecord = {
			PatientID: thePatient.id,
			DateApplied : today,
			DateStarted : startDate,
			DateEnded : future,
			Goal : values.Goal,
			ConcurRadTherapy : values.ConcurRadTherapy,
			ClinicalTrial: values.TypeOfTrial,
			PerformanceStatus: values.PerfStatus,
			WeightFormula: values.BSA_FormulaWeight,
			BSAFormula: values.BSA_Formula,
			BSA_Method: values.BSA_Formula,
			Amputations: amputations
		};

		if (thePatient.TemplateID) {
			theRecord.TemplateID = thePatient.TemplateID;
		}
		else {
			theRecord.TemplateID = thePatient.Template.id;
		}

		if (ExistingRecordID) {
			theRecord.id = ExistingRecordID;
		}
		var patientTemplate = Ext.create(Ext.COMSModels.PatientTemplates, theRecord);
		patientTemplate.save({
			scope: this,
			success: function (data) {
				// wccConsoleLog("Apply Template SUCCESS" );
				// Ext.MessageBox.hide();
				Ext.ComponentQuery.query("form[name=\"NewPlan_CTOS_Form\"]")[0].setLoading(false, false);
				var thisCtl = this.getController("NewPlan.NewPlanTab");
				var PatientSelection = thisCtl.getPatientSelectionPanel();
				PatientSelection.collapse();
				thisCtl.resetPanels(thisCtl, "", "", "");

				/**********
				 *	data.data = {
				 *	Amputations :  []
				 *	BSAFormula :  "DuBois"
				 *	ClinicalTrial :  ""
				 *	DateApplied :  "2012-05-25"
				 *	DateEnded :  "2012-11-9"
				 *	DateStarted :  "2012-05-25"
				 *	Goal :  "Curative"
				 *	PatientID :  "B1781155-AAA6-E111-903E-000C2935B86F"
				 *	PerformanceStatus :  "72DA9443-FF74-E111-B684-000C2935B86F"
				 *	TemplateID :  "2C987ADB-F6A0-E111-903E-000C2935B86F"
				 *	WeightFormula :  "Actual Weight"
				 *	id :  "519C8379-AAA6-E111-903E-000C2935B86F" <-- TreatmentID for linking all records together
				 *	}
				 ***********/
				thisCtl.PatientModelLoadSQLPostTemplateApplied(data.data.PatientID, data.data.id);
				if ("1" == SessionPreceptee) {
					Ext.MessageBox.alert('Success', 'Template applied to Patient - Pending Cosigner Approval');
				}
				else {
					Ext.MessageBox.alert('Success', 'Template applied to Patient ');
				}
			},
			failure : function(record, op) {
				wccConsoleLog("Apply Template Failed");
				// Ext.MessageBox.hide();
				Ext.ComponentQuery.query("form[name=\"NewPlan_CTOS_Form\"]")[0].setLoading(false, false);
				Ext.MessageBox.alert('Failure', 'Template not applied to Patient. <br />' + op.error);     // op.request.scope.reader.jsonData["frameworkErr"]);
			}
		});

	}
});