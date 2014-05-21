Ext.define('COMS.view.Authoring.CycleLength' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.CycleLength',
	name : 'Cycle Length',
	defaults : {xtype : 'combo', labelAlign: 'right', padding : '5 0 0 0', displayField: 'value', valueField: 'id' },
	layout: 'hbox', 

	items : [
		{name: 'CycleLength', fieldLabel: 'Cycle Length <em>*</em>', labelAlign: 'right',
			width: 155, labelWidth: 95,allowBlank : false,
			store: Ext.create('Ext.data.Store', {
				fields: ["id", "value"],
				data : [
					{ "id" : 1, "value" : "1"},
					{ "id" : 2, "value" : "2"},
					{ "id" : 3, "value" : "3"},
					{ "id" : 4, "value" : "4"},
					{ "id" : 5, "value" : "5"},
					{ "id" : 6, "value" : "6"},
					{ "id" : 7, "value" : "7"},
					{ "id" : 8, "value" : "8"},
					{ "id" : 9, "value" : "9"},
					{ "id" : 10, "value" : "10"}
				]
			}),
			margin: '0 5 5 0'
		},
		{name: 'CycleLengthUnits', 
			width: 70,
			store: 'TimeFrameUnit', displayField : 'name', valueField : 'id', allowBlank : false,    /* idField : 'id', */
			margin: '0 5 5 0'
		}
	]
});
