Ext.define('COMS.view.Authoring.CycleLength' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.CycleLength',
	name : 'Cycle Length',
	defaults : {xtype : 'combo', labelAlign: 'right', padding : '5 0 0 0', displayField: 'value', valueField: 'id' },
	layout: 'hbox', 

	items : [
		{name: 'CycleLength', fieldLabel: 'Cycle Length <em>*</em>', labelAlign: 'right',
			width: 155, labelWidth: 95,allowBlank : false,
			store: 'CycleLengthMax',
			margin: '0 5 5 0'
		},
		{name: 'CycleLengthUnits', 
			width: 70,
			store: 'TimeFrameUnit', displayField : 'name', valueField : 'id', allowBlank : false,    /* idField : 'id', */
			margin: '0 5 5 0'
		}
	]
});
