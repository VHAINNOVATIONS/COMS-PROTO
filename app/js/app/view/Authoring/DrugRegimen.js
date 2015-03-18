Ext.define('COMS.view.Authoring.DrugRegimen' ,{
	extend: 'Ext.panel.Panel',
	alias : 'widget.TemplateDrugRegimen',
        border : 3,
	margin: '0 20 20 20',
        
        items:[
		{ xtype : 'textfield', name : "RegimenInstructions", fieldLabel: 'Instructions', labelAlign: 'right', margin : '10 10 0 10', width : 840, labelWidth: 100 },
                { xtype: 'grid',
                    autoScroll: 'y',
                    columnLines: true,
                    width: 925,
                    title : 'Drug Regimen',
                    viewConfig: {stripeRows: true, height: 125, forceFit: true},
                    margin: '10 10 10 10',
                    // store : { fields: ['Day', 'Drug', 'Dosage', 'Unit', 'PctDose', 'Reason', 'PDose', 'Route', 'AdminDay'] },
                    store : { model : Ext.COMSModels.DrugRegimen },	// create here since each instance of the Hydration panel needs it's own store
                    columns : [
                                {header : 'Sequence', dataIndex : 'Sequence', width: 60, sortable : true, align: 'center' },                        
                                {header : 'Admin<br/>Day(s)', dataIndex : 'Day', width: 80, align: 'center' },
                                {header : 'Admin<br/>Time', dataIndex : 'AdminTime', width: 60, align: 'center' },
                                {header : 'Drug', dataIndex : 'Drug', width: 100, align: 'center' },                                
                                {header : 'Dosage<br/>Amount', dataIndex : 'Amt', width: 50, align: 'center' },
                                {header : 'Units', dataIndex : 'Units', width: 50, align: 'center' },
                                {header : 'Route', dataIndex : 'Route', width: 50, align: 'center',
									renderer: function (value, p, record) {
										if (value.indexOf(" : ") > 0) {
											return value.split(" : ")[0];
										}
										return value;
									}
								},
                                // These are only needed during the administration
                                // {header : '% of Regimen Dose', dataIndex : 'PctDose', width: 110 },
                                // {header : 'Reason', dataIndex : 'Reason', flex : 1 },
                                // {header : 'Patient Dose', dataIndex : 'PDose', width: 90 },
                                {header : 'Fluid/<br/>Volume', dataIndex : 'FluidVol', width: 50, align: 'center' },
                                {header : 'Flow<br/>Rate', dataIndex : 'FlowRate', width: 40, align: 'center'},
                                {header : 'Infusion<br/>Time', dataIndex : 'InfusionTime', width: 100, align: 'center' },
                                {header : 'Fluid/<br/>Type', dataIndex : 'FluidType', width: 50, align: 'center'},
                                {header : 'Instructions', dataIndex: 'Instructions', flex: 1, align: 'center'}
                             ],
                            buttons: [
                                    { text: 'Add Drug' }, 
                                    { text: 'Add Non-Formulary Drug', title: 'AddNonForma' },
                                    { text: 'Remove Drug', disabled: true },
                                    { text: 'Edit Drug', disabled: true }
                            ],
                            buttonAlign: 'left'
                }
        ]
 
});
