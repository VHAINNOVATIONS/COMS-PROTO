Ext.define("COMS.view.TemplateList.TemplateListTab", {
	"extend" : "Ext.container.Container",
	"title" : "List of Active Templates",
	"header" : false,
	"alias" : "widget.TemplateListTab",
	"height" : "auto",
	"margin" : "10",
	"resizable" : true,
	"bodyStyle" : "padding:5px",
	"autoScroll" : true,

	"items" : [
		{ "xtype" : "selTemplateByStages", "name" : "tltSelTemplateByStages" },
		{
			"xtype" : "grid", 
			"name" : "tltGrid",
			"store" : "TemplateListStore", 
			"features" : [ Ext.create("Ext.grid.feature.Grouping")],
			"columns" : [
				{ "text" : "Template Name", "dataIndex" : "name" },
				{ "text" : "Description", dataIndex: "description", flex: 1 },
				{ "text" : "Disease Type", dataIndex: "DiseaseName", hidden: true },
				{ "text" : "# of Patients", "name" : "NumPatients", dataIndex: "PatientCount", "renderer" : 
					function(value) {
						var buf = "<div class=\"textAnchor\" style=\"text-align: center;\">" + value + "</div>";
						return buf;
					}
				},
				{ "text" : "", "hideable" : false, "sortable" : false, "name" : "ViewPrint", "groupable" : false, "dataIndex" : "id", "renderer" : 
					function(value) {
						var buf = "<a href=\"" + Ext.URLs.PrintTemplate + "/" + value + "\" target=\"print_template\">View/Print</a>";
						return buf;
					}
				}
			]
		}
	]
});