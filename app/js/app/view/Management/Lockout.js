Ext.define("COMS.view.Management.Lockout", {
	"extend": "Ext.form.Panel",
	"alias": "widget.Lockout",
	"name": "Lockout",
	"autoEl": {
		tag: "section"
	},
	border: false,
	"defaults": {
		"labelAlign": "right",
		"labelClsExtra": "NursingDocs-label",
		"labelWidth" : 130,
		"allowBlank" : false,
		"margin": "10 0"
	},
	"items": [
		{
			"xtype": "LockoutButtons"
		},
		{
			"xtype": "grid",
			"name": "LockoutList",
			"title": "Lockout Sections",
			"store": 'Lockout',
			"forceFit": true,
			"overflowY": "scroll",
			"margin": "10 0",
			"multiSelect": true,
			"viewConfig": {
				"stripeRows": true,
				"markDirty": false
			},
			"columns": [
				{
					"text": "Name",
					"dataIndex": "Last_Name",
					"renderer" : function(value, metaData, record, row, col, store, gridView) {
						// debugger;
						var theData = record.getData();
						var theName = theData.Last_Name + " " + 
							theData.Suffix + ", " + 
							theData.First_Name + " " + 
							theData.Middle_Name + 
							" (" + theData.Match + ")";
						return theName.trim();




					},
					"flex": 2
				},
				{
					"text": "Section",
					"dataIndex": "Section",
					"flex": 2
				},
				{
					"text": "Date Locked",
					"dataIndex": "dtLocked",
					"flex": 1
				},
				{
					"text": "Locked by whom",
					"dataIndex": "UserName",
					"flex": 1
				}
			]
		}
	]
});