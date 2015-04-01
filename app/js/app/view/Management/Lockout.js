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
					"text": "Patient DFN",
					"dataIndex": "Patient_DFN",
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
					"text": "User",
					"dataIndex": "UserName",
					"flex": 1
				}
			]
		}
	]
});