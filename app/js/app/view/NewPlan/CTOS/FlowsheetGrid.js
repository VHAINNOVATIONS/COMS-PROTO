Ext.define("COMS.view.NewPlan.CTOS.FlowSheetGrid" ,{
	extend : "Ext.grid.Panel",
	alias : "widget.FlowSheetGrid",
	id: "FlowSheetGrid",
	name : "Flow Sheet Grid",
	title : "Flowsheet",
	margin: "10 auto 10 auto",
	buttonAlign: "left",
	enableLocking : true,
	columns : [],

	features: [{
		id: "group",
		ftype: "groupingsummary",
		groupHeaderTpl: "{name}",
		hideGroupedHeader: true,
		enableGroupingMenu: false
	}],
	dockedItems: [
		{
			xtype: "toolbar",
			dock: "top",
			items: [
				{ xtype : "button", text:"<img src=\"/images/pencil.png\" />", name: "EditOptionalQues" }
			]
		},
		{
			xtype: "toolbar",
			dock: "bottom",
			items: [
				{ 
					xtype : "combobox",
					"name" : "ShowCycles",
					"fieldLabel" : "Select Cycle(s) to show",
					"labelWidth" : 120,
					"labelAlign" : "right",
					"width" : 500,
					"emptyText" : "List of Cycles",

					store : "FlowSheetCombo",
					queryMode: "local",
					valueField: "cols",
					displayField : "label"
/**************					,
					listeners : 
					{ 
						change : function(theCombo, newValue, oldValue, eOpts) {
							debugger;
							var grid = theCombo.up("grid");
							var comboStore = theCombo.getStore();
							var theRecord = comboStore.findRecord("label", theCombo.rawValue);
							var data, start, end;
							data = theRecord.getData();
							start = data.StartIdx;
							end = data.EndIdx;
							

							// id = ColCycle 1, Day 2
							var i, col, cols, colID;
							cols = grid.columns;
							var numCols = grid.columns.length;
							if ("Show All" === newValue) {
								for (i = 1; i < numCols; i++) {
									colID = "#Col" + i;
									col = grid.down(colID);
									col.show();
								}
							}
							else {
								if (oldValue) {
								var range = oldValue.split("-");		// theCombo.value.split("-");
								for (i = 1; i < numCols; i++) {
									colID = "#Col" + i;
									col = grid.down(colID);
									col.show();
								}
								for (i = (1 * range[0]); i < (1*range[1]); i++) {
									colID = "#Col" + i;
									col = grid.down(colID);
									col.hide();
								}
								}
							}
						}
					}
***********/
				}
			]
		}
	]
});