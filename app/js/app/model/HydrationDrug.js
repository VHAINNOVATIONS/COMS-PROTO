Ext.define("COMS.model.HydrationDrug", {
	extend: "Ext.data.Model",
	fields: [
		"id",
		"hydrationType",	// specifies pre or post hydration
		"Sequence",
		"Drug",

		"Amt1",
		"Units1",		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		"Infusion1",	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string

		"Amt2",
		"Units2",		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		"Infusion2",	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string

		"Instructions",
		"FluidVol1",
		"FlowRate1",
		"InfusionTime1",
		"FluidType1",

		"FluidVol2",
		"FlowRate2",
		"FluidType2",
		"InfusionTime2",

		"NumAdminDays",
		"CumDosePerCycle",
		"CumDosePerCycleUnits",

		"AdminTime",
		"Day"
	],

	validations : [
		{ type: "presence", name: "Drug", message: "Please select a drug"},
		{ type: "presence", name: "Sequence", message: "Please select a sequence"},
		{ type: "amt1hydration", name: "Amt1", message: "Dosage Amount must be entered."},
		{ type: "unit1hydration", name: "Units1", message: "Units must be entered."},
		{ type: "route1hydration", name: "Infusion1", message: "Route must be entered."},
		{ type: "fluidVol1hydration", name: "FluidVol1", message: "Fluid Volume must be entered."},
		{ type: "presence", name: "Day", message: "Administration Day(s) must be entered."},
		{ type: "flowRate1hydration", name: "FlowRate1", message: "Flow Rate must be entered"},
		{ type: "fluidType1hydration", name: "FluidType1", message: "Fluid Type must be entered "}
	],
	proxy: {
		type: "rest",
		url : Ext.URLs.HydrationDrug,
		reader: {
			type: "json",
			root : "records"
		}
	}

});
