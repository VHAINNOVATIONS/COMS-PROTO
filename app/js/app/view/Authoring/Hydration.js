/*global Ext, renderAmt, renderRoute, renderUnit, renderFluidVol, renderFlowRate, renderInfusionTime, renderFluidType */
Ext.define('COMS.view.Authoring.Hydration', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TemplateHydration',
	margin: '0 20 20 20',
	items: [
		{
			xtype: 'textfield',
			name: "HydrationInstructions",
			fieldLabel: 'Instructions',
			labelAlign: 'right',
			margin: '10 10 0 10',
			width: 840,
			labelWidth: 100
		},
		{
			xtype: 'grid',
			autoScroll: 'y',
			cls: 'custom-grid',
			columnLines: true,
			width: 925,
			viewConfig: {
				stripeRows: true,
				height: 125,
				forceFit: true
			},
			title: 'Drug Regimen',
			margin: '10 10 10 10',
			store: {
				model: Ext.COMSModels.Hydration
			},
			// create here since each instance of the Hydration panel needs it's own store
			columns: [
				{
					header: 'Sequence',
					dataIndex: 'Sequence',
					width: 60,
					sortable: true,
					align: 'center',
					renderer: function (value, p, record) {
						// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
						return Ext.String.format('{0}', value);
					}
				},
				{
					header: 'Admin<br/>Day(s)',
					dataIndex: 'Day',
					width: 80,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
						return Ext.String.format('{0}', value);
					}
				},
				{
					header: 'Admin<br/>Time',
					dataIndex: 'AdminTime',
					width: 60,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
						return Ext.String.format('{0}', value);
					}
				},
				{
					header: 'Drug',
					dataIndex: 'Drug',
					width: 100,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						// return Ext.String.format('{0}<br/><div class="OptionalDosing">-- <b>OR</b> --</div>', value, value);
						return Ext.String.format('{0}', value);
					}
				},
				{
					header: 'Dosage<br/>Amount',
					dataIndex: 'Amt1',
					width: 50,
					sortable: false,
					align: 'center',
					renderer: renderAmt
				},
				{
					header: 'Units',
					dataIndex: 'Units1',
					width: 50,
					sortable: false,
					renderer: renderUnit,
					align: 'center'
				},
				{
					header: 'Route',
					dataIndex: 'Infusion1',
					width: 50,
					sortable: false,
					renderer: renderRoute,
					align: 'center'
				},
					/******* MWB - 11/1/2013 - Eliminate optional Dosing Info
				{
					header: 'Dosage<br/>Amount',
					dataIndex: 'Amt2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Units',
					dataIndex: 'Units2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Route',
					dataIndex: 'Infusion2',
					width: 50,
					sortable: false,
					hidden: true
				},
				*************/
				{
					header: 'Fluid/<br/>Volume',
					dataIndex: 'FluidVol1',
					width: 50,
					sortable: false,
					renderer: renderFluidVol,
					align: 'center'
				},
				{
					header: 'Flow<br/>Rate',
					dataIndex: 'FlowRate1',
					width: 40,
					sortable: false,
					renderer: renderFlowRate,
					align: 'center'
				},
				{
					header: 'Infusion<br/>Time',
					dataIndex: 'InfusionTime1',
					width: 100,
					sortable: false,
					renderer: renderInfusionTime,
					align: 'center'
				},
				{
					header: 'Fluid/<br/>Type',
					dataIndex: 'FluidType1',
					width: 50,
					sortable: false,
					renderer: renderFluidType,
					align: 'center'
				},
					/******* MWB - 11/1/2013 - Eliminate optional Dosing Info
				{
					header: 'Flow<br/>Rate',
					dataIndex: 'FlowRate2',
					width: 40,
					sortable: false,
					hidden: true
				},
				{
					header: 'Fluid/<br/>Volume',
					dataIndex: 'FluidVol2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Infusion<br/>Time',
					dataIndex: 'InfusionTime2',
					width: 60,
					sortable: false,
					hidden: true
				},
				{
					header: 'Fluid/<br/>Type',
					dataIndex: 'FluidType2',
					width: 50,
					sortable: false,
					hidden: true
				},
				***/
				{
					header: 'Instructions',
					dataIndex: 'Instructions',
					width: 217,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
						return Ext.String.format('{0}', value);
					}
				}
			],
			buttons: [
				{
					text: 'Add Drug'
				},
				{
					text: 'Remove Drug',
					disabled: true
				},
				{
					text: 'Edit Drug',
					disabled: true
				}
			],
			buttonAlign: 'left'
		}		// END of Grid definition
	]
});

function renderAmt(value, p, record) {

	var amt2 = record.data.Amt2;

	if (null !== value && null !== amt2 && '' !== amt2) {
		// return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, amt2);
		return Ext.String.format('{0}', value);
	}
	// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
	return Ext.String.format('{0}', value);
}

function renderUnit(value, p, record) {

	var unit2 = record.data.Units2;

	if (null !== value && null !== unit2 && '' !== unit2) {
		// return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, unit2);
		return Ext.String.format('{0}', value);
	}
	// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
	return Ext.String.format('{0}', value);
}

function renderRoute(value, p, record) {

	var route2 = record.data.Infusion2;

	if (null !== value && null !== route2 && '' !== route2) {
		// return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, route2);
		return Ext.String.format('{0}', value);
	}
	// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
	return Ext.String.format('{0}', value);
}

function renderFluidVol(value, p, record) {

	var val2 = record.data.FluidVol2;

	if (null !== value && null !== val2 && '' !== val2) {
		// return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);
		return Ext.String.format('{0}', value);
	}
	// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
	return Ext.String.format('{0}', value);
}

function renderFlowRate(value, p, record) {

	var val2 = record.data.FlowRate2;

	if (null !== value && null !== val2 && '' !== val2) {
		// return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);
		return Ext.String.format('{0}', value);
	}
	// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
	return Ext.String.format('{0}', value);
}

function renderInfusionTime(value, p, record) {

	var val2 = record.data.InfusionTime2;

	if (null !== value && null !== val2 && '' !== val2) {
		// return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);
		return Ext.String.format('{0}', value);
	}
	// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
	return Ext.String.format('{0}', value);
}

function renderFluidType(value, p, record) {

	var val2 = record.data.FluidType2;

	if (null !== value && null !== val2 && '' !== val2) {
		// return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);
		return Ext.String.format('{0}', value);
	}
	// return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
	return Ext.String.format('{0}', value);
}