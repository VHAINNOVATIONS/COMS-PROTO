Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.DischargeInstructions" ,{
	extend: "Ext.form.Panel",
	alias : "widget.DischargeInstructions",
	url: "XXX/DischargeInstructions",
	layout: "anchor",
	defaults: { anchor: "100%" },
	items : [
		{
			xtype: "fieldset",
			title: "Who Was Taught",
			defaultType: "checkbox", // each item will be a checkbox
			items: [{
				xtype: "checkbox",
				name: "taught_Patient",
				fieldLabel: "Patient"
			}, {
				xtype: "checkbox",
				name: "taught_Other",
				fieldLabel: "Other (Please designate)"
			},
			{
				xtype: 'textfield',
				name: 'taught_OtherDesignated'
			}
			]
		}
	]
});
