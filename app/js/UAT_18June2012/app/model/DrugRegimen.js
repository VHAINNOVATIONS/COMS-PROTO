Ext.define('COMS.model.DrugRegimen', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'Drug', type: 'string'},
		{ name: 'Amt', type: 'string'},
		{ name: 'Units', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name: 'Route', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string
                { name: 'Sequence', type: 'string'},
		// { name: 'PctDose', type: 'string'},
		// { name: 'PctDose', type: 'string'},
		{ name: 'Day', type: 'string'},
		{ name: 'FluidVol', type: 'string'},
		{ name: 'InfusionTime', type: 'string'},		
		{ name: 'AdminTime', type: 'string'},
		{ name: 'FlowRate', type: 'string'},
                { name: 'FluidType', type: 'string'},
        { name: 'Instructions', type: 'string'}
	],
        validations : [
            { type: 'presence', name: 'Drug', message: 'Please select a drug'},
            { type: 'presence', name: 'Sequence', message: 'Please select a sequence'},
            { type: 'presence', name: 'Amt', message: 'Amount must be entered.'},
            { type: 'presence', name: 'Units', message: 'Units must be entered.'},
				// the name used to be "Infusion" rather than "Route", Infusion doesn't exist in the model, 
				// but a bug in the RC version of the library prevented this from being found. 
				// The release version fixed that bug which is why I saw a validation error and the UAT-Test site (which uses the RC library) did not.
			{ type: 'presence', name: 'Route', message: 'Route must be entered.'},		
            { type: 'fluidVolregimen', name: 'FluidVol', message: 'Fluid Volume must be entered.'},
            { type: 'adminTimeregimen', name: 'AdminTime', message: 'Administration Time must be entered.'},
            { type: 'flowRateregimen', name: 'FlowRate', message: 'Flow Rate must be entered'},
            { type: 'fluidTyperegimen', name: 'FluidType', message: 'Fluid Type must be selected'},
            { type: 'presence', name: 'Day', message: 'Administration Day(s) must be entered.'}
        ],
	proxy: {
		type: 'rest',
		url : Ext.URLs.DrugRegimen,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
