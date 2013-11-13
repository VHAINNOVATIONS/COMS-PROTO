Ext.define('COMS.model.HydrationDrug', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'hydrationType', type: 'string' },	// specifies pre or post hydration
		{ name: 'Sequence', type: 'string'},
		{ name: 'Drug', type: 'string'},

		{ name: 'Amt1', type: 'string'},
		{ name: 'Units1', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name: 'Infusion1', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string

		{ name: 'Amt2', type: 'string'},
		{ name: 'Units2', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name: 'Infusion2', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string

		{ name: 'Instructions', type: 'string'},
		{ name: 'FluidVol1', type: 'string'},
		{ name: 'FlowRate1', type: 'string'},
		{ name: 'InfusionTime1', type: 'string'},
		{ name: 'FluidType1', type: 'string'},

		{ name: 'FluidVol2', type: 'string'},
		{ name: 'FlowRate2', type: 'string'},
		{ name: 'FluidType2', type: 'string'},
		{ name: 'InfusionTime2', type: 'string'},

		{ name: 'AdminTime', type: 'string'},
		{ name: 'Day', type: 'string'}
	],

	// MWB - 11/1/2013 - No longer need optional dosing info but don't want to muck up the DB records by removing them from the actual model
	validations : [
		{ type: 'presence', name: 'Drug', message: 'Please select a drug'},
		{ type: 'presence', name: 'Sequence', message: 'Please select a sequence'},
		{ type: 'amt1hydration', name: 'Amt1', message: 'Dosage Amount must be entered.'},
		{ type: 'unit1hydration', name: 'Units1', message: 'Units must be entered.'},
		{ type: 'route1hydration', name: 'Infusion1', message: 'Route must be entered.'},
//		{ type: 'amt2hydration', name: 'Amt2', message: 'Dosage Amount2 must be entered.'},
//		{ type: 'unit2hydration', name: 'Units2', message: 'Units 2 must be entered.'},
//		{ type: 'route2hydration', name: 'Infusion2', message: 'Route 2 must be entered.'},
		{ type: 'fluidVol1hydration', name: 'FluidVol1', message: 'Fluid Volume must be entered.'},
//		{ type: 'fluidVol2hydration', name: 'FluidVol2', message: 'Fluid Volume 2 must be entered.'},
		{ type: 'adminTimehydration', name: 'AdminTime', message: 'Administration Time must be entered.'},
		{ type: 'presence', name: 'Day', message: 'Administration Day(s) must be entered.'},
		{ type: 'flowRate1hydration', name: 'FlowRate1', message: 'Flow Rate must be entered'},
//		{ type: 'flowRate2hydration', name: 'FlowRate2', message: 'Flow Rate 2 must be entered'},
		{ type: 'fluidType1hydration', name: 'FluidType1', message: 'Fluid Type must be entered '}
//		{ type: 'fluidType2hydration', name: 'FluidType2', message: 'Fluid Type 2 must be entered '}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['HydrationDrug'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});
