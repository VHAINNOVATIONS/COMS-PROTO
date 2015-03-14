// create the combo instance
Ext.define("TemplateLocationModel", {
	extend: "Ext.data.Model",
	fields: [
		{name : "Name",type : "string"},
		{name : "id",type : "string"}
	]
});
var TemplateLocationStore = Ext.create("Ext.data.Store", {
	model : "TemplateLocationModel",
	proxy: {
		type: "ajax",
		method: "GET",
		url: "/LookUp/Locations",
		reader: {
			type: "json",
			root: "records"
		}
	},
	autoLoad: true
});
var TemplateLocationCombo = new Ext.form.ComboBox({
	typeAhead: true,
	triggerAction: "all",
	lazyRender: true,
	displayField: "Name",
	valueField: "id",
	store: TemplateLocationStore
});


Ext.define("COMS.view.TemplatePromotion.TemplatePromotionTab", {
	"extend" : "Ext.grid.Panel",
	"alias"  : "widget.TemplatePromotionTab",
	"name" : "ttmpProGrid",
	"title"  : "Template Promotion Management",
	"margin" : "0 10 10 10",
	"autoScroll" : "y",
	"columnLines" : true,
	width: 970, // Not used
	"viewConfig" : {
		"stripeRows" : true,
		"height" : 655,
		"forceFit" : true
	},

	"store" : "TemplateListStore", 
	"features" : [{
		"ftype" : "grouping", "startCollapsed" : true
	}],


	"plugins" : [
		Ext.create("Ext.grid.plugin.CellEditing", {
			clicksToEdit: 1
		})
	],

	selType: "cellmodel",

	"columns" : [
		{ "text" : "Generated Template Name", "dataIndex" : "name", flex: 1 },
		{ "text" : "User-Friendly Name", dataIndex: "description", flex: 1 },
		{ "text" : "Disease Type", dataIndex: "DiseaseName", hidden: true },
		{ "text" : "Location", dataIndex: "Location", editor: TemplateLocationCombo,
			renderer: function(v, a, b, c) {
				var Records = TemplateLocationStore.getRange();
				for (i = 0; i < Records.length; i++) {
					if (Records[i].getData().id == v) {
						return Records[i].getData().Name;
					}
				}
				return v;
			}
		},

		{ "text" : "# of Patients", "name" : "NumPatients", dataIndex: "PatientCount", "renderer" : 
			function(value) {
				if ("0" == value) {
					return "<div style=\"text-align: center;\">" + value + "</div>";
				}
				return "<div class=\"textAnchor\" style=\"text-align: center;\">" + value + "</div>";
			}
		},
		{ "text" : "", "hideable" : false, "sortable" : false, "name" : "ViewPrint", "groupable" : false, "dataIndex" : "id", "renderer" : 
			function(value) {
				var buf = "<a href=\"" + Ext.URLs.PrintTemplate + "/" + value + "\" target=\"print_template\">View/Print</a>";
				return buf;
			}
		}
	],
	buttons: [{
		text: "Refresh"
	}, {
		text: "Update Records"
	}],
	buttonAlign: "left"

});