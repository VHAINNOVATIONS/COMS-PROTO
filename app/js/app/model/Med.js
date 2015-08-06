Ext.define('COMS.model.Med', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'id', type: 'string'},
		{ name : 'Drug', type: 'string'},
		{ name : 'MedicationType', type: 'string'},
		{ name : 'Amt', type: 'string'},
		{ name : 'Units', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name : 'Route', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string

		{ name : 'Day', type: 'string'},
		{ name : 'FluidVol', type: 'string'},
		{ name : 'InfusionTime', type: 'string'},
		{ name : 'FlowRate', type: 'string'},
		{ name : 'Instructions', type: 'string'},
		{ name : 'FluidType', type : 'string' },	// raw data                                
		{ name : 'Sequence', type: 'string'},
		{ name : 'AdminTime', type: 'string'}
	],

	belongsTo : 'COMS.model.CTOS'
});