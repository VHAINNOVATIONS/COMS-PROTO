Ext.define('COMS.model.CumulativeDoseMedsInRegimen', {
	extend: 'Ext.data.Model',
	fields: [ "ID", "CumDosePerCycle", "CumDosePerCycleUnits", "CumDosePerRegimen", "CumulativeDoseAmt", "CumulativeDoseUnits", "MedID", "MedName", "UnitsID" ],
	belongsTo : 'COMS.model.CTOS'
});
