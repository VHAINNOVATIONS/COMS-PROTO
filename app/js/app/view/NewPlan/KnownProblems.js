Ext.define("COMS.view.NewPlan.KnownProblems" ,{
	extend: "Ext.grid.Panel",
	alias : "widget.KnownProblems",
	name : "Patient Existing Conditions",

	autoEl : { tag : "section" },
	cls : "xPandablePanel",
	collapsible : true,
	collapsed : true,

	title : "Existing Conditions",
	height: 300,

	store: Ext.create("Ext.data.Store", {
		fields:["DateEntered", "DateOfOnset", "DateUpdated", "Problem", "serviceConnected", "statusName", "unverified"],
		proxy: {
			type: "memory",
			reader: {
				type: "json",
				root: "items"
			}
		}
	}),

	columns : [
		{ header: "Date", dataIndex : "DateEntered" },
		{ header: "Date Of Onset", dataIndex : "DateOfOnset" },
		{ header: "Date Updated", dataIndex : "DateUpdated" },
		{ header: "Problem", dataIndex : "Problem", flex:1},
		{ header: "Service Connected", dataIndex : "serviceConnected" },
		{ header : "Status", dataIndex : "statusName" },
		{ header : "Unverified", dataIndex : "unverified" }
	]
});
