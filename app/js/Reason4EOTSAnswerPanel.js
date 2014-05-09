
/**		
		
		var IIG_Panel = 

        var Reason4EOTSAnswerPanel1 = { "xtype" : "box", autoEl : "b", html : "Select the reason the current treatment regimen was supersceded", hidden: !(this.ChangeTemplate) };
        var Reason4EOTSAnswerPanel2 = {
			"xtype": "radiogroup",
			"name": "Reason4EOTSAnswer",
			"width": 200,
			"hideLabel": true,
			"columns": 1,
			"vertical": true,
			"hidden": (!this.ChangeTemplate),
			"items": [{
					"boxLabel": "Completed Prescribed Course",
					"name": "EOTS_Reason",
					"inputValue": "Completed Prescribed Course"
				}, {
					"boxLabel": "Treatment Change",
					"name": "EOTS_Reason",
					"inputValue": "Treatment Change",
					"listeners": {
						"change": function (theField, newValue, oldValue, eOpts) {
							var OtherField = Ext.ComponentQuery.query("AskQues2ApplyTemplate [name=\"Reason4EOTS_TCReason\"]")[0];
							if (newValue) {
								OtherField.show();
							} else {
								OtherField.hide();
							}
						}
					}
				}, {
					"xtype": "radiogroup",
					"name": "Reason4EOTS_TCReason",
					"width": 200,
					"hidden": true,
					"hideLabel": true,
					"margin": "0 10 0 20",
					"columns": 1,
					"vertical": true,
					"items": [{
						"boxLabel": "Toxicity",
						"name": "EOTS_TChange",
						"inputValue": "Toxicity"
					}, {
						"boxLabel": "Progression of the Disease",
						"name": "EOTS_TChange",
						"inputValue": "Progression of the Disease"
					}, {
						"boxLabel": "Patient Refusal",
						"name": "EOTS_TChange",
						"inputValue": "Patient Refusal"
					}, {
						"boxLabel": "Other",
						"name": "EOTS_TChange",
						"inputValue": "Other",
						"listeners": {
							"change": function (theField, newValue, oldValue, eOpts) {
								var OtherField = Ext.ComponentQuery.query("AskQues2ApplyTemplate [name=\"EOTS_TChangeOther\"]")[0];
								if (newValue) {
									OtherField.show();
								} else {
									OtherField.hide();
								}
							}
						}
					}, {
						"xtype": "textfield",
						"margin": "0 10 0 20",
						"hidden": true,
						"name": "EOTS_TChangeOther",
						"hideLabel": true
					}]
				},




				{
					"boxLabel": "Patient Discontinuation",
					"name": "EOTS_Reason",
					"inputValue": "Patient Discontinuation",
					"listeners": {
						"change": function (theField, newValue, oldValue, eOpts) {
							var OtherField = Ext.ComponentQuery.query("AskQues2ApplyTemplate [name=\"Reason4EOTS_PDReason\"]")[0];
							if (newValue) {
								OtherField.show();
							} else {
								OtherField.hide();
							}
						}
					}
				}, {
					"xtype": "radiogroup",
					"name": "Reason4EOTS_PDReason",
					"width": 200,
					"hideLabel": true,
					"hidden": true,
					"margin": "0 10 0 20",
					"columns": 1,
					"vertical": true,
					"items": [{
						"boxLabel": "Patient Terminated Regimen",
						"name": "EOTS_PDChange",
						"inputValue": "Patient Terminated Regimen"
					}, {
						"boxLabel": "Patient Left VA System",
						"name": "EOTS_PDChange",
						"inputValue": "Patient Left VA System"
					}, {
						"boxLabel": "Other",
						"name": "EOTS_PDChange",
						"inputValue": "Other",
						"listeners": {
							"change": function (theField, newValue, oldValue, eOpts) {
								var OtherField = Ext.ComponentQuery.query("AskQues2ApplyTemplate [name=\"EOTS_PDChangeOther\"]")[0];
								if (newValue) {
									OtherField.show();
								} else {
									OtherField.hide();
								}
							}
						}
					}, {
						"xtype": "textfield",
						"margin": "0 10 0 20",
						"hidden": true,
						"name": "EOTS_PDChangeOther",
						"hideLabel": true
					}]
				},



				{
					"boxLabel": "Other ",
					"name": "EOTS_Reason",
					"inputValue": "Other",
					"listeners": {
						"change": function (theField, newValue, oldValue, eOpts) {
							var OtherField = Ext.ComponentQuery.query("AskQues2ApplyTemplate [name=\"EOTS_ReasonOther\"]")[0];
							if (newValue) {
								OtherField.show();
							} else {
								OtherField.hide();
							}
						}
					}
				}, {
					"xtype": "textfield",
					"margin": "0 10 0 20",
					"hidden": true,
					"name": "EOTS_ReasonOther",
					"hideLabel": true
				}
			]
		};

*/