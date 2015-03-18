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
				{
					header: 'Instructions',
					dataIndex: 'Instructions',
					width: 217,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
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
		return Ext.String.format('{0}', value);
	}
	return Ext.String.format('{0}', value);
}

function renderUnit(value, p, record) {

	var unit2 = record.data.Units2;

	if (null !== value && null !== unit2 && '' !== unit2) {
		return Ext.String.format('{0}', value);
	}
	return Ext.String.format('{0}', value);
}

function renderRoute(value, p, record) {
	if (value.indexOf(" : ") > 0) {
		return value.split(" : ")[0];
	}
	return Ext.String.format('{0}', value);
}

function renderFluidVol(value, p, record) {

	var val2 = record.data.FluidVol2;

	if (null !== value && null !== val2 && '' !== val2) {
		return Ext.String.format('{0}', value);
	}
	return Ext.String.format('{0}', value);
}

function renderFlowRate(value, p, record) {

	var val2 = record.data.FlowRate2;

	if (null !== value && null !== val2 && '' !== val2) {
		return Ext.String.format('{0}', value);
	}
	return Ext.String.format('{0}', value);
}

function renderInfusionTime(value, p, record) {

	var val2 = record.data.InfusionTime2;

	if (null !== value && null !== val2 && '' !== val2) {
		return Ext.String.format('{0}', value);
	}
	return Ext.String.format('{0}', value);
}

function renderFluidType(value, p, record) {

	var val2 = record.data.FluidType2;

	if (null !== value && null !== val2 && '' !== val2) {
		return Ext.String.format('{0}', value);
	}
	return Ext.String.format('{0}', value);
}